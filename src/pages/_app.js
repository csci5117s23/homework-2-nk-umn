// import '@/styles/globals.css'

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }


////////////
// import { ClerkProvider } from '@clerk/nextjs'

// export default function App({ Component, pageProps }) {
  
//   return (
//   <ClerkProvider {...pageProps} >

//     <Component {...pageProps} />

//   </ClerkProvider>
//   )
// }
//////////

//import '../styles/globals.css'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';

const public_paths = ['/'];

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();
  const page_is_public = public_paths.includes(pathname);

  return (
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
  );
}
//export default MyApp;


// import { ClerkProvider } from '@clerk/nextjs';

// function MyApp({ Component, pageProps }) {
//   return (
//     <ClerkProvider {...pageProps} >
//       <Component {...pageProps} />
//     </ClerkProvider>
//   );
// }

// export default MyApp;