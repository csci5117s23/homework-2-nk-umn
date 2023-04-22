import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { useAuth, UserButton, SignIn } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';
import TodoList from '@/components/TodoList'
import Router from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Test() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  if (userId) {
    Router.push('/todos')
  }

  return <>
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark">
        <div className='text-center pb-5 text-light'>
          <h2>
            Nathan Kohane's Todo Helper Website
          </h2>
          <h3>
            CSCI 5117
          </h3>
          <h3>
            Please Login Below
          </h3>
        </div>
        <div >
          {userId ? <UserButton></UserButton> : <SignIn></SignIn>}
        </div>
    </div>
    </>
}

