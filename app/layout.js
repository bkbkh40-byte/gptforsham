export const metadata = {
  title: "GPTforsham",
  description: "AI Assistant built with Next.js"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
