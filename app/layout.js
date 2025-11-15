import "./globals.css";

export const metadata = {
  title: "Chat App",
  description: "Powered by your API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
