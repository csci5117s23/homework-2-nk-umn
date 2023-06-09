import TodoList from '@/components/TodoList';
import React, { useState, useEffect } from 'react';
import { useAuth, UserButton, SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function UseTodoList() {
  //return<TodoList></TodoList>
  return <>
    <div className="create-space">
    <span>
        <UserButton></UserButton>
      </span>
      <span>
        <Link href="/done" className='btn btn-success btn-large'>Done</Link>
      </span>
    </div>
    <TodoList></TodoList>
  </>
}
