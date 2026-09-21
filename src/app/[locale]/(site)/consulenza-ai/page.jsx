import ServiceLanding, { buildServiceMetadata } from '../_services/ServiceLanding';
export async function generateMetadata({ params }) { const { locale } = await params; return buildServiceMetadata('ai-consulting', locale); }
export default async function Page({ params }) { const { locale } = await params; return <ServiceLanding serviceKey="ai-consulting" locale={locale} />; }
