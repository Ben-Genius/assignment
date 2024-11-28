import { AuthResponse } from '../model/model';
import axios from './axiosConfig';

export const checkAuth = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }
  return false;
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post<AuthResponse>('/auth/login/', {
      email,
      password
    });

    if (response.data.status) {
      localStorage.setItem('accessToken', response.data.data.access);
      localStorage.setItem('refreshToken', response.data.data.refresh);
      localStorage.setItem('userData', JSON.stringify(response.data.data.user));
      return { success: true, data: response.data };
    }
    
    return { success: false, error: response.data.message };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Login failed'
    };
  }
};


export const logoutUser = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    await axios.post('/auth/logout/', {
      refresh: refreshToken
    });
  } finally {
    localStorage.clear();
    window.location.href = '/';
  }
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userData');
};
