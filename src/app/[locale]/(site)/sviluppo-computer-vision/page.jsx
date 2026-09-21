import ServiceLanding, { buildServiceMetadata } from '../_services/ServiceLanding';
export async function generateMetadata({ params }) { const { locale } = await params; return buildServiceMetadata('computer-vision', locale); }
export default async function Page({ params }) { const { locale } = await params; return <ServiceLanding serviceKey="computer-vision" locale={locale} />; }
