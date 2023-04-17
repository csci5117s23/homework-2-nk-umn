import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { useAuth, UserButton, SignIn } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';
import TodoList from '@/components/TodoList'

const inter = Inter({ subsets: ['latin'] })

export default function Test() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  async function test() {
    const token = await getToken({template: 'codehooks'})
    
  }

  return <>{userId ? <UserButton></UserButton> : <SignIn></SignIn>}
    </>
}

// import { 
//   ClerkProvider,
//   SignedIn,
//   SignedOut,
//   RedirectToSignIn 
// } from "@clerk/clerk-react";

// //function to handle private page
// export default function PrivatePage() {
//   return (
//     <ClerkProvider publishableKey={"pk_test_YmlnLWdhdG9yLTU2LmNsZXJrLmFjY291bnRzLmRldiQ"}>
//       <SignedIn>
//         Content that is displayed to signed in
//         users.
//       </SignedIn>
//       <SignedOut>
//         {/* 
//           Non-authenticated visitors will be redirected
//           to the sign in page.
//         */}
//         <RedirectToSignIn />
//       </SignedOut>
//     </ClerkProvider>
//   );
// }
