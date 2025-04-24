'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';
import data from '@/public/recipes.json';

type Recipe = {
  id: number;
  name: string;
  author: string | '';
  description: string;
  servings: string | '';
  prep: string | '';
  ingredients: string[] | Partial<Record<string, string[]>>;
  directions: string[] | Partial<Record<string, string[]>>;
  tags: string[];
};

export default function Search() {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Recipe[]>([]);

  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  function normalize(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  useEffect(() => {
    if (search.length > 0) setIsOpen(true);
  }, [search]);

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // disable scroll on page
    return () => {
      document.body.style.overflow = ''; // restore scroll
    };
  }, [isOpen]);

  const handleSearch = useCallback((term: string) => {
    if (term.trim() === '') {
      setResults(data.recipes);
      return;
    }

    const recipes = data.recipes.filter((recipe: Recipe) =>
      normalize(recipe.name).includes(normalize(term))
    );
    setResults(recipes);
    console.log('Searching for:', term, recipes);
  }, []);

  const debounceSearch = useRef(
    debounce((term: string) => {
      handleSearch(term);
    }, 500)
  ).current;

  useEffect(() => {
    if (search.trim() === '') {
      debounceSearch.cancel(); // cancel if user clears input
      handleSearch(''); // Show all recipes
      return;
    }

    // Reset idle timer
    if (idleTimer.current) clearTimeout(idleTimer.current);

    // Start 2-second idle timer
    idleTimer.current = setTimeout(() => {
      // User has stopped typing for 2s so cancel debounce call
      debounceSearch.cancel();
      console.log('Idle: canceling search due to inactivity');
    }, 2000);

    // Trigger the throttled/debounced search
    debounceSearch(search);
  }, [search, debounceSearch, handleSearch]);

  return (
    <>
      <input
        type='text'
        placeholder='Search for a recipe'
        className='border-2 border-gray-300 rounded-md p-2 size-full'
        onChange={e => setSearch(e.target.value)}
      />
      {isOpen && (
        <div
          className='fixed left-0 right-0 top-44 z-20 flex justify-center'
          role='dialog'
          aria-modal='true'
        >
          <div className='bg-white rounded-xl shadow-xl w-full md:max-w-4xl xl:max-w-6xl 2xl:max-w-8xl mx-4 p-10 relative border'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='absolute top-3 right-3 text-gray-500 hover:text-gray-800'
              aria-label='Close modal'
            >
              &times;
            </button>
            <h1 className='text-lg font-semibold mb-4 p-2'>Recipes</h1>
            <ul className='list-inside list-disc'>
              {results.map((recipe: Recipe) => (
                <li key={recipe.id} className='p-2'>
                  <a href={`/recipes/${recipe.id}`}>{recipe.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
