'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useReportWebVitals } from 'next/web-vitals';

export default function Analytics() {
  const pathname = usePathname();
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  useReportWebVitals((metric) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'web_vitals',
      web_vital_name: metric.name,
      web_vital_value: metric.name === 'CLS' ? Math.round(metric.value * 1000) : Math.round(metric.value),
      web_vital_id: metric.id,
      web_vital_rating: metric.rating,
    });
  });

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
