import { createClient } from '../supabase/server';

export async function fetchRecipes() {
  const supabase = createClient();
  const { data, error } = await (await supabase).from('recipes').select('*');
  console.log(data);
  if (error) throw new Error(error.message);
  return data;
}
