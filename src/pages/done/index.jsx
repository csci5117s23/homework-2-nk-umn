import TodoListDone from '@/components/TodoListDone';
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
        <Link href="/todos" className='btn btn-success btn-large'>Todos</Link>
      </span>
    </div>
    <TodoListDone></TodoListDone>
  </>
}

