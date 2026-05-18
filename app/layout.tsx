import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Free Custom Website Mockup in 48h | $600 Flat, Pay After Approval | EverAdam',
  description:
    'US-based local service businesses: get a custom website mockup in 48 hours, free. Love it? Goes live for a flat $600 — no monthly fees, no contracts. No credit card today.',
  metadataBase: new URL('https://website.everadam.com'),
  alternates: { canonical: 'https://website.everadam.com/' },
  openGraph: {
    title: 'Stop Losing Service Calls — Free Custom Website Mockup in 48h | EverAdam',
    description:
      'Every week without a converting website, competitors book those jobs instead of you. See your new site in 48 hours. Pay $0 until you love it.',
    type: 'website',
    url: 'https://website.everadam.com/',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        {/* Google Analytics — replace placeholders before launch */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');gtag('config','AW-XXXXXXXXXX');`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
