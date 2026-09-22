import Link from 'next/link';
import { localizedUrl } from '@/lib/site';

export default function PageBreadcrumbs({ locale, items }) {
  const homeLabel = 'DevOP';
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
      <div className="relative h-[52px]">
        <nav
          aria-label={locale === 'it' ? 'Percorso di navigazione' : 'Breadcrumb'}
          className="absolute left-0 right-0 top-40 z-30"
        >
          <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-1 px-5 text-sm text-ink/60 dark:text-white/60">
            {breadcrumbs.map((item, index) => {
              const current = index === breadcrumbs.length - 1;
              return (
                <li key={item.href} className="flex min-w-0 items-center gap-2">
                  {index > 0 && <span aria-hidden="true">/</span>}
                  {current ? (
                    <span aria-current="page" className="max-w-[18rem] truncate">{item.name}</span>
                  ) : (
                    <Link href={item.href} className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bubblegum">
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </>
  );
}
