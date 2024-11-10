import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Layout>
              {children}
              <Toaster />
            </Layout>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
