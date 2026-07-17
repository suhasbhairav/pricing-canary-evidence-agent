import "./globals.css";

export const metadata = {
  title: "Pricing Canary Evidence Agent",
  description: "Plan canary runs, capture evidence, and verify pricing changes before rollout.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
