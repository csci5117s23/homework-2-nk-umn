import Todo from '@/components/Todo';
import React, { useState, useEffect } from 'react';
import { useAuth, UserButton, SignIn, UserProfile } from '@clerk/nextjs';
import { useRouter } from "next/router";
import Link from 'next/link';

export default function TodoListCreator() {
    const router = useRouter();
    console.log("routerquery: ", router.query);
    console.log("routerquery2: ", router.asPath);
    if (router.query) {
        return <>
        <div className="create-space">
        <span>
            <UserButton></UserButton>
        </span>
        <span>
            <Link href="/todos" className='btn btn-success btn-large'>Todos</Link>
        </span>
        </div>
        <Todo individualTodo={router.query}></Todo>
        </>
    } else {
        return <></>
    }
}