"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

const posts = [
    {
        slug: "1",
        titleKey: "posts.1.title",
        excerptKey: "posts.1.excerpt",
    },
];

export default function BlogPage() {
    const t = useTranslations("Blog");

    return (
        <section className="max-w-3xl mx-auto py-16 space-y-6">
            <h1 className="text-3xl font-bold">{t("title")}</h1>
            <p className="text-ink/70 dark:text-smoke/70">{t("subtitle")}</p>

            <div className="space-y-4">
                {posts.map((post) => (
                    <article
                        key={post.slug}
                        className="border border-border/40 rounded-xl p-4 hover:border-primary/60 transition"
                    >
                        <h2 className="text-xl font-semibold mb-1">
                            {t(post.titleKey)}
                        </h2>
                        <p className="text-sm text-ink/70 dark:text-smoke/70 mb-2">
                            {t(post.excerptKey)}
                        </p>
                        <Link
                            href={`/blogs/${post.slug}`}
                            className="text-sm font-medium underline underline-offset-4"
                        >
                            {t("readMore")}
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}
