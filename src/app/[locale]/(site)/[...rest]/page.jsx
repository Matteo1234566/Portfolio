import { setRequestLocale } from 'next-intl/server';
import NotFoundHero from "@/components/NotFoundHero";

export default function CatchAllPage({ params: { locale } }) {
    // Imposta la locale per permettere l'uso di useTranslations nei componenti server/client figli
    setRequestLocale(locale);

    // Renderizza il componente grafico
    return <NotFoundHero />;
}
