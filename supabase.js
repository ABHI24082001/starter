// authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

// ✅ 1. Your Supabase URL & Key (no "check iy" mistake)
const SUPABASE_URL = 'https://xkrakhtofyfnzsrvhhqx.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrcmFraHRvZnlmbnpzcnZoaHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1ODE1NTEsImV4cCI6MjA3ODE1NzU1MX0.UVZjkI1BmDS36OIv8x77f_XemaCKw4EIJ_gADsW2Eks';

// ✅ 2. Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// 🔹 3. Normal Sign Up (with optional full name)
export const signUp = async (email, password, fullName = null) => {
  const signUpOptions = {
    email,
    password,
    options: {
      emailRedirectTo: 'https://your-app-url.com/auth/callback', // Replace later with real URL
    },
  };

  if (fullName) {
    signUpOptions.options.data = { full_name: fullName };
  }

  const { data, error } = await supabase.auth.signUp(signUpOptions);
  if (error) throw error;
  return data;
};

// 🔹 4. Development Sign Up (auto-confirm)
export const signUpDev = async (email, password, fullName = null) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: fullName ? { full_name: fullName } : {},
      },
    });

    if (error) throw error;

    // ✅ Auto sign-in for dev (so no email verification needed)
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) throw loginError;
    return loginData;
  } catch (error) {
    throw error;
  }
};

// 🔹 5. Admin Sign Up (same as regular but structured)
export const adminSignUp = async (email, password, fullName = null) => {
  try {
    const signUpOptions = {
      email,
      password,
    };

    if (fullName) {
      signUpOptions.options = { data: { full_name: fullName } };
    }

    const { data, error } = await supabase.auth.signUp(signUpOptions);
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// 🔹 6. Sign In
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

// 🔹 7. Resend Confirmation
export const resendConfirmation = async email => {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  });
  if (error) throw error;
};

// 🔹 8. Get Logged-in User
export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
};

// 🔹 9. Sign Out
export const signOut = async () => {
  await supabase.auth.signOut();
};

// 🔹 10. Reset Password
export const resetPassword = async email => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
};
