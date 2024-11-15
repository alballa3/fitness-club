import { Header } from "@/components/layout/header";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const showHeader = Component.header ?? true; // Defaults to true if header is undefined
  
  return (
    <>
    <Head>
      <title>{Component.title || "Fitness Club"}</title>
    </Head>
    <SessionProvider>
      {showHeader ? (
        <>
          <ToastContainer />
          <Header />
          <Component {...pageProps} />
        </>
      ) : (
        <>
          <ToastContainer />
          <Component {...pageProps} />
        </>
      )}
    </SessionProvider>
    </>
  );
}
