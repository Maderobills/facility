'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../firebase/sync';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import HomePage from '../page';

type AuthMode = 'login' | 'register' | 'reset';

const Auth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      let userCredential;
      switch (mode) {
        case 'login':
          userCredential = await signInWithEmailAndPassword(auth, email, password);
          setIsLoggedIn(true);
          await storeUserData(userCredential.user.uid);
          break;
        case 'register':
          if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
          }
          userCredential = await createUserWithEmailAndPassword(auth, email, password);
          alert('Registration successful!');
          setMode('login');
          await storeUserData(userCredential.user.uid);
          break;
        case 'reset':
          await sendPasswordResetEmail(auth, email);
          alert('Password reset email sent!');
          setMode('login');
          break;
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  const storeUserData = async (userId: string) => {
    try {
      const userDocRef = doc(db, 'Managers', userId);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
  
        sessionStorage.setItem('user', JSON.stringify({
          id: userId,
          firstName: userData?.FirstName || '',
          lastName: userData?.LastName || '',
          email: userData?.Email || '',
          contact: userData?.Contact || '',
          role: userData?.Role || ''
        }));
  
        console.log('User data stored in session');
      } else {
        console.log('No user data found!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  if (isLoggedIn) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    return <HomePage username={`${user.firstName || ''}`} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {mode === 'login' ? 'Sign in to your account' :
             mode === 'register' ? 'Create a new account' :
             'Reset your password'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {mode !== 'reset' && (
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
            {mode === 'register' && (
              <div>
                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {mode === 'login' ? 'Sign in' :
               mode === 'register' ? 'Register' :
               'Reset Password'}
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          {mode === 'login' ? (
            <>
              <button onClick={() => setMode('register')} className="font-medium text-indigo-600 hover:text-indigo-500">
                Create an account
              </button>
              {' | '}
              <button onClick={() => setMode('reset')} className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </button>
            </>
          ) : (
            <button onClick={() => setMode('login')} className="font-medium text-indigo-600 hover:text-indigo-500">
              Back to login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;