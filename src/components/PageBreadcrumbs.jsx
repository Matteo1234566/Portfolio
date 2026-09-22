import Link from 'next/link';
import { localizedUrl } from '@/lib/site';

export default function PageBreadcrumbs({ locale, items }) {
  const homeLabel = locale === 'it' ? 'Home' : 'Home';
  const breadcrumbs = [{ name: homeLabel, href: `/${locale}` }, ...items];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: localizedUrl(locale, item.href.replace(`/${locale}`, '')),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav
        aria-label={locale === 'it' ? 'Percorso di navigazione' : 'Breadcrumb'}
        className="absolute left-0 right-0 top-28 z-30 px-4"
      >
        <ol className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-ink/10 bg-paper/90 px-4 py-2 text-xs font-bold text-ink/65 shadow-soft backdrop-blur dark:border-white/15 dark:bg-ink/90 dark:text-white/70">
          {breadcrumbs.map((item, index) => {
            const current = index === breadcrumbs.length - 1;
            return (
              <li key={item.href} className="flex min-w-0 items-center gap-2">
                {index > 0 && <span aria-hidden="true" className="text-bubblegum">/</span>}
                {current ? (
                  <span aria-current="page" className="max-w-[18rem] truncate text-ink dark:text-white">{item.name}</span>
                ) : (
                  <Link href={item.href} className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bubblegum">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
