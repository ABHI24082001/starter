// authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = 'https://xkrakhtofyfnzsrvhhqx.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrcmFraHRvZnlmbnpzcnZoaHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1ODE1NTEsImV4cCI6MjA3ODE1NzU1MX0.UVZjkI1BmDS36OIv8x77f_XemaCKw4EIJ_gADsW2Eks';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// 🔹 Sign up user
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

// 🔹 Sign in user
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

// 🔹 Get logged-in user
export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
};

// 🔹 Sign out user
export const signOut = async () => {
  await supabase.auth.signOut();
};
