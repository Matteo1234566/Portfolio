'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function Analytics() {
  const pathname = usePathname();
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'page_view', page_path: `${pathname}${window.location.search}` });
  }, [pathname]);

  useEffect(() => {
    function handleClick(event) {
      const link = event.target.closest('a[data-event]');
      if (!link) return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: link.dataset.event,
        destination: link.href,
        service: link.dataset.service || undefined,
      });
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (!gtmId) return null;
  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`}</Script>
      <Script src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`} strategy="afterInteractive" />
    </>
  );
}
