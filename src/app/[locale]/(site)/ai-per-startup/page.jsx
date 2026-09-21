import ServiceLanding, { buildServiceMetadata } from '../_services/ServiceLanding';
export async function generateMetadata({ params }) { const { locale } = await params; return buildServiceMetadata('startup-ai', locale); }
export default async function Page({ params }) { const { locale } = await params; return <ServiceLanding serviceKey="startup-ai" locale={locale} />; }
