import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async ({ username, password }) => {
    try {
      const response = await axios.post('/login', { username, password });
      const { access_token } = response.data;
      setUser({ username, token: access_token });
      localStorage.setItem('token', access_token);
      return response;
    } catch (error) {
      console.error('Login failed', error);
      if (error.response) {
        return error.response;
      } else {
        throw error;
      }
    }
  };

  const register = async ({ firstName, secondName, email, password, role }) => {
    try {
      const response = await axios.post('/users', { firstName, secondName, email, password, role });
      const { access_token } = response.data;
      setUser({ email, token: access_token });
      localStorage.setItem('token', access_token);

      return response;
    } catch (error) {
      console.error('Registration failed', error);
      if (error.response) {
        return error.response;
      } else {
        throw error; 
      }
    }
  };

  const patchUser = async (userData) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      };
      const response = await axios.patch('/users', userData, { headers });
      return response.data;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, patchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
