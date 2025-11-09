import AsyncStorage from '@react-native-async-storage/async-storage';

const DEV_USERS_KEY = 'dev_users';
const DEV_SESSION_KEY = 'dev_session';

export const devSignUp = async (email, password, fullName) => {
  try {
    const users = await getDevUsers();
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      full_name: fullName,
      created_at: new Date().toISOString(),
      confirmed: true
    };
    
    users.push(newUser);
    await AsyncStorage.setItem(DEV_USERS_KEY, JSON.stringify(users));
    
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        user_metadata: { full_name: fullName }
      }
    };
  } catch (error) {
    throw error;
  }
};

export const devSignIn = async (email, password) => {
  try {
    const users = await getDevUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    await AsyncStorage.setItem(DEV_SESSION_KEY, JSON.stringify(user));
    
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

const getDevUsers = async () => {
  const users = await AsyncStorage.getItem(DEV_USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const devSignOut = async () => {
  await AsyncStorage.removeItem(DEV_SESSION_KEY);
};
