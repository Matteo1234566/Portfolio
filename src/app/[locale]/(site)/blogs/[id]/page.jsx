"use client";

import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import {use} from "react";

const POSTS = ["1"];

export default function BlogPostPage({ params }) {
    const t = useTranslations("Blog.posts");
    const { id } = use(params);
    if (!POSTS.includes(id)) {
        notFound();
    }

    return (
        <article className="max-w-3xl mx-auto py-16 space-y-4">
            <h1 className="text-3xl font-bold">
                {t(`${id}.title`)}
            </h1>
            <p className="text-ink/70 dark:text-smoke/70">
                {t(`${id}.excerpt`)}
            </p>
            <div className="prose dark:prose-invert max-w-none">
                {t(`${id}.content`)}
            </div>
        </article>
    );
}
