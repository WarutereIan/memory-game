export interface User {
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  success: boolean;
  _user: {
    username: string;
  };
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthError {
  msg: string;
  field?: string;
  success: boolean;
}