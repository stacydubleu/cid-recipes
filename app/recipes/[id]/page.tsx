import data from '@/public/recipes.json';
import { Fragment } from 'react';

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

console.log(data.recipes);

// TO DO figure out if reducer is needed here. Is it better
const showItems = (
  items: Recipe['ingredients'] | Recipe['directions'],
  type: 'ingredients' | 'directions'
) => {
  if (!items || Array.isArray(items)) return null;

  const handleInnerLists = (item: string) => {
    if (item.includes('\n')) {
      const firstLine = item.split('\n')[0];
      const lines = item.split('\n').slice(1);
      return (
        <>
          {firstLine}
          <ul className='list-inside list-disc'>
            {lines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </>
      );
    }
    return item;
  };

  const sections = Object.keys(items);
  return sections.map(section => (
    <div key={section}>
      {section !== 'ingredients' && section !== 'directions' && (
        <b>{section}</b>
      )}
      <ul
        className={`list-inside ${
          type === 'ingredients' ? 'list-disc' : 'list-decimal'
        }`}
      >
        {items[section]?.map((item: string) => (
          <li key={item}>{handleInnerLists(item)}</li>
        ))}
      </ul>
      <br />
    </div>
  ));
};

export default async function Recipe({ params }: { params: { id: string } }) {
  const id = await params.id;
  const recipe = data.recipes.find(recipe => recipe.id === parseInt(id));
  if (!recipe) return <div>Oops! Recipe not found</div>;

  return (
    <>
      <h1 className='text-2xl font-bold underline'>{recipe.name}</h1>
      <br />
      <div>{recipe.description}</div>
      <br />
      <div>{recipe.servings}</div>
      <div>{recipe.prep}</div>
      <br />
      <div>
        <h2 className='text-lg font-bold underline'>Ingredients</h2>
        {showItems(recipe.ingredients, 'ingredients')}
      </div>
      <div>
        <h2 className='text-lg font-bold underline'>Directions</h2>
        {showItems(recipe.directions, 'directions')}
      </div>
      <div>
        <b>Tags</b>
        {recipe.tags.map(tag => (
          <div key={tag}>{tag}</div>
        ))}
      </div>
    </>
  );
}
