import { supabase } from './supabase';

// SIGN UP
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

// SIGN IN
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// GET CURRENT USER
export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// SIGN OUT
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}


// password : Abhi@24082001Health!