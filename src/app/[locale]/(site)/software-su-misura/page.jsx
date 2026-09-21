import ServiceLanding, { buildServiceMetadata } from '../_services/ServiceLanding';
export async function generateMetadata({ params }) { const { locale } = await params; return buildServiceMetadata('custom-software', locale); }
export default async function Page({ params }) { const { locale } = await params; return <ServiceLanding serviceKey="custom-software" locale={locale} />; }
