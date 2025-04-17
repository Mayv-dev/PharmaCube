import { getAuthToken } from './storage';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface RegisterResponse extends LoginResponse {}

class ApiService {
  private static async getHeaders(): Promise<HeadersInit> {
    const token = await getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  private static async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || data.message || 'An error occurred');
    }
    
    return data.data;
  }

  static async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: await this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    
    return this.handleResponse<LoginResponse>(response);
  }

  static async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: await this.getHeaders(),
      body: JSON.stringify(userData),
    });
    
    return this.handleResponse<RegisterResponse>(response);
  }

  static async getUserProfile(): Promise<LoginResponse['user']> {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'GET',
      headers: await this.getHeaders(),
    });
    
    return this.handleResponse<LoginResponse['user']>(response);
  }

  static async updateUserProfile(userData: Partial<LoginResponse['user']>): Promise<LoginResponse['user']> {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: await this.getHeaders(),
      body: JSON.stringify(userData),
    });
    
    return this.handleResponse<LoginResponse['user']>(response);
  }

  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/user/change-password`, {
      method: 'POST',
      headers: await this.getHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    
    await this.handleResponse<{ success: boolean }>(response);
  }

  static async forgotPassword(email: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: await this.getHeaders(),
      body: JSON.stringify({ email }),
    });
    
    await this.handleResponse<{ success: boolean }>(response);
  }

  static async resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: await this.getHeaders(),
      body: JSON.stringify({ token, newPassword }),
    });
    
    await this.handleResponse<{ success: boolean }>(response);
  }
}

export default ApiService; 