import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'registered_users';
const CURRENT_USER_KEY = 'current_user';

export const signUp = async (email, password, fullName) => {
  try {
    // Get existing users
    const existingUsers = await AsyncStorage.getItem(USERS_KEY);
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    
    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      throw new Error('User already exists with this email');
    }
    
    // Create new user with confirmed status
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In real app, this should be hashed
      full_name: fullName,
      email_confirmed_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    };
    
    // Save user
    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return { 
      user: { 
        id: newUser.id, 
        email: newUser.email, 
        user_metadata: { full_name: fullName },
        email_confirmed_at: newUser.email_confirmed_at
      } 
    };
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    // Get existing users
    const existingUsers = await AsyncStorage.getItem(USERS_KEY);
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Save current user
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    
    return { 
      user: { 
        id: user.id, 
        email: user.email, 
        user_metadata: { full_name: user.full_name } 
      } 
    };
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const currentUser = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return currentUser ? JSON.parse(currentUser) : null;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email) => {
  // For demo purposes, just simulate success
  return Promise.resolve();
};
