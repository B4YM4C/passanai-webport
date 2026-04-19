import "./globals.css";

export const metadata = {
  title: "Passanai 'Mac' Tampawisit — Product Owner & BA",
  description:
    "Bilingual Thai/English portfolio — Product Owner and Business Analyst. 6+ years bridging engineering, analysis, and product strategy.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F1EFEA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Caveat+Brush&family=Mali:wght@500;700&family=Inter:wght@300;400;500;600;700;800&family=Prompt:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
