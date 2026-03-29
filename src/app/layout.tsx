import type {Metadata} from 'next';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Fizmat AI Tutor | Personal Academic Assistant',
  description: 'AI-powered personal tutor for Mathematics, Physics, and more. Get detailed explanations or practice problems instantly.',
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
        <Navigation />
        <div className="flex-1 pt-24">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
