import { Header } from "@/components/layout/header";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  const showHeader = Component.header ?? true; // Defaults to true if header is undefined

  return (
    <SessionProvider>
      {showHeader ? (
        <>
          <Header />
          <Component {...pageProps} />
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}
