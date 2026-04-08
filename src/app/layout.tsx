import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  // 1. Podstawowy tytuł i opis
  title: 'qJonathan - Wsparcie w edukacji | Fizyka i Matematyka',
  description: 'AI Asystent - Korepetycje z fizyki i matematyki. Zadawaj pytania i ucz się efektywniej.',
  
  // 2. Ikonka SVG
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎓</text></svg>',
  },

  // 3. OpenGraph - to odpowiada za wygląd "karty" na Androidzie i w social mediach
  openGraph: {
    title: 'qJonathan - System rezerwacji zajęć',
    description: 'Buduj swoją przewagę z fizyki i matematyki.',
    url: 'https://qjonathan.pl', // Podaj swoją docelową domenę
    siteName: 'qJonathan',
    locale: 'pl_PL',
    type: 'website',
  },

  // 4. Twitter/X - ważne dla podglądu linków
  twitter: {
    card: 'summary_large_image',
    title: 'qJonathan - Fizyka i Matematyka',
    description: 'System rezerwacji i wsparcie AI w nauce.',
  },

  // 5. Apple Web App - to klucz do poprawnej nazwy na iPhone'ach
  appleWebApp: {
    capable: true,
    title: 'qJonathan', // Krótka nazwa pod ikonką na pulpicie
    statusBarStyle: 'default',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background flex flex-col">
        <div className="flex-1">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
