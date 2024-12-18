import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const AuthWrapper: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg overflow-hidden">
          <button
            className={`px-4 py-2 ${
              isLogin
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 ${
              !isLogin
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
      </div>

      {isLogin ? <LoginForm /> : <SignUpForm />}
    </div>
  );
};

export default AuthWrapper;