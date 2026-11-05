import './globals.css';
import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond, Noto_Serif_SC, Noto_Serif_Armenian } from 'next/font/google';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

// Fallbacks for the glyphs Cormorant doesn't have
const notoSC = Noto_Serif_SC({
  weight: ['300', '400'],
  preload: false,
  variable: '--font-noto-sc',
});
const notoArm = Noto_Serif_Armenian({
  subsets: ['armenian'],
  weight: ['300', '400'],
  preload: false,
  variable: '--font-noto-arm',
});

const siteUrl = 'https://cvrclecollective.com'; // replace once you have it

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CVRCLE Collective',
    template: '%s | CVRCLE Collective',
  },
  description:
    'A multicultural, multidisciplinary art collective in Luxembourg exploring what exists in between: places, memories, identities and narratives.',
  openGraph: {
    title: 'CVRCLE Collective',
    description:
      'Beyond borders. Between forms. A multicultural art collective based in Luxembourg.',
    siteName: 'CVRCLE Collective',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'CVRCLE Collective' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CVRCLE Collective',
    description: 'Beyond borders. Between forms.',
    images: ['/og.png'],
  },
  icons: { icon: '/logo.png' }, // better: a square 512x512 favicon
  themeColor: '#050505'
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${notoSC.variable} ${notoArm.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}