import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unspoken Corners | Joshua Joby',
  description: 'Capturing the beauty hidden in everyday life.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        <meta name="google-adsense-account" content="ca-pub-4279215015479886" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
