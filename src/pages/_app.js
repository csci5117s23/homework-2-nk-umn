//import '../styles/globals.css'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { use, useEffect } from 'react';
import "../styles/globals.css"
import "bootstrap/dist/css/bootstrap.css"
import Head from 'next/head';
import Link from 'next/link';

const public_paths = ['/'];

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, []);
  const { pathname } = useRouter();
  const page_is_public = public_paths.includes(pathname);

  return (
    <>
    {/* <Head>
      <Link rel="stylesheet" href="/sty;es/globals.css"></Link>
    </Head> */}
      <ClerkProvider>
        {page_is_public ? (
          <Component {...pageProps} /> ) : (
          <>
            <SignedIn>
              <Component {...pageProps} />
            </SignedIn>
            
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
      </ClerkProvider>
    </>
  );
}