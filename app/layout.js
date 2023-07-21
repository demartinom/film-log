import "./globals.css";
import Provider from "@/components/provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body>{children}</body>
      </Provider>
    </html>
  );
}
