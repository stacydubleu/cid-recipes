'use client';
import { useState } from 'react';

export default function Search() {
  const [search, setSearch] = useState('');
  // TODO: Add search functionality
  console.log(search);
  return (
    <input
      type='text'
      placeholder='Search for a recipe'
      className='border-2 border-gray-300 rounded-md p-2 size-full'
      onChange={e => setSearch(e.target.value)}
    />
  );
}
