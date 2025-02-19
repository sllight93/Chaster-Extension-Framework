// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Chaster Extension',
  description: 'Frontend für Chaster in Next.js',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
        <body>
            {children}
        </body>
    </html>
  );
}
