#!/usr/bin/env python3
"""Validate repositories listed in repos.txt and save their GitHub READMEs."""

from __future__ import annotations

import argparse
import base64
import json
import os
import re
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


REPOSITORY_PART = re.compile(r"^[A-Za-z0-9_.-]+$")
DEFAULT_TIMEOUT = 15


def parse_repositories(path: Path) -> tuple[list[tuple[int, str, str]], list[str]]:
    """Read non-empty lines in pairs: repository name, then GitHub owner.

    Both plain pairs and the labelled ``Repo:``/``Autore:`` format are accepted.
    """
    lines = [
        (number, line.strip())
        for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1)
        if line.strip() and not line.lstrip().startswith("#")
    ]
    repositories = []
    errors = []

    if len(lines) % 2:
        number, value = lines[-1]
        errors.append(f"riga {number}: manca l'autore per {value!r}")

    for index in range(0, len(lines) - 1, 2):
        repo_line, repo = lines[index]
        owner_line, owner = lines[index + 1]
        if repo.lower().startswith("repo:"):
            repo = repo.split(":", 1)[1].strip()
        if owner.lower().startswith("autore:"):
            owner = owner.split(":", 1)[1].strip()
        if not REPOSITORY_PART.fullmatch(repo):
            errors.append(f"riga {repo_line}: nome repository non valido: {repo!r}")
        if not REPOSITORY_PART.fullmatch(owner):
            errors.append(f"riga {owner_line}: nickname GitHub non valido: {owner!r}")
        if REPOSITORY_PART.fullmatch(repo) and REPOSITORY_PART.fullmatch(owner):
            repositories.append((repo_line, owner, repo))

    return repositories, errors


def github_json(url: str, token: str | None) -> dict:
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "portfolio-trending-repo-importer",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = Request(url, headers=headers)
    with urlopen(request, timeout=DEFAULT_TIMEOUT) as response:
        return json.loads(response.read())


def raw_readme(owner: str, repo: str) -> str:
    request = Request(
        f"https://raw.githubusercontent.com/{owner}/{repo}/HEAD/README.md",
        headers={"User-Agent": "portfolio-trending-repo-importer"},
    )
    with urlopen(request, timeout=DEFAULT_TIMEOUT) as response:
        return response.read().decode("utf-8")


def download_readme(owner: str, repo: str, token: str | None) -> str:
    try:
        # Raw GitHub is not subject to the REST API rate limit.
        return raw_readme(owner, repo)
    except HTTPError as error:
        if error.code != 404:
            raise

    # Fallback for repositories whose README casing/path needs API resolution.
    data = github_json(f"https://api.github.com/repos/{owner}/{repo}/readme", token)
    if data.get("encoding") != "base64" or not data.get("content"):
        raise ValueError("GitHub non ha restituito un README in base64")
    return base64.b64decode(data["content"].replace("\n", "")).decode("utf-8")


def describe_error(error: Exception) -> str:
    if isinstance(error, HTTPError):
        if error.code == 404:
            return "repository o README non trovato"
        if error.code == 403:
            return "richiesta rifiutata (rate limit GitHub? usa GITHUB_TOKEN)"
        return f"GitHub ha risposto HTTP {error.code}"
    if isinstance(error, URLError):
        return f"errore di rete: {error.reason}"
    return str(error)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, default=Path("repos.txt"))
    parser.add_argument("--output", type=Path, default=Path("readmes"))
    args = parser.parse_args()

    if not args.input.is_file():
        print(f"ERRORE: file non trovato: {args.input}", file=sys.stderr)
        return 1

    try:
        repositories, errors = parse_repositories(args.input)
    except UnicodeDecodeError:
        print(f"ERRORE: {args.input} non è UTF-8", file=sys.stderr)
        return 1

    for error in errors:
        print(f"INPUT: {error}")
    if not repositories:
        print("Nessuna repository valida da controllare.")
        return 1 if errors else 0

    token = os.getenv("GITHUB_TOKEN")
    checked = downloaded = 0
    failures = []
    for line, owner, repo in repositories:
        checked += 1
        try:
            # The README endpoint also verifies the repository URL and avoids a second API call.
            readme = download_readme(owner, repo, token)
            destination = args.output / repo / "README.md"
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_text(readme, encoding="utf-8")
            downloaded += 1
            print(f"OK riga {line}: https://github.com/{owner}/{repo} -> {destination}")
        except (HTTPError, URLError, ValueError, UnicodeDecodeError) as error:
            message = f"riga {line}: https://github.com/{owner}/{repo}: {describe_error(error)}"
            failures.append(message)
            print(f"ERRORE: {message}")

    print(f"Riepilogo: {checked} controllate, {downloaded} README scaricati, {len(failures)} fallite.")
    return 1 if errors or failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
