import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Unity Hub - Build. Collaborate. Innovate.',
  description: 'The future of team collaboration and project management. Connect with developers, join hackathons, and build amazing projects together.',
  openGraph: {
    title: 'Unity Hub - Build. Collaborate. Innovate.',
    description: 'The future of team collaboration and project management. Connect with developers, join hackathons, and build amazing projects together.',
    images: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="pt-16 min-h-screen flex flex-col justify-between">
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}