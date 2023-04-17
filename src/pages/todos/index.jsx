import TodoList from '@/components/TodoList';
import React, { useState, useEffect } from 'react';
import { useAuth, UserButton, SignIn } from '@clerk/nextjs';

export default function UseTodoList() {
  //return<TodoList></TodoList>
  return <>
    <UserButton></UserButton>
    <TodoList></TodoList>
  </>
}
