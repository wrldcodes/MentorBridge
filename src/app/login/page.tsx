'use client';

import { Card, CardContent,CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signInWithPopup} from 'firebase/auth'
import { auth, provider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useId } from 'react';

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
     const result = await signInWithPopup(auth, provider);
      const user = result.user; // Redirect to dashboard after successful login
    
      console.log('logged in user:', user, {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
      });
    //add call API to sync db later
    // redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleGoogleSignIn} className="w-full 
          bg-emerald-500 hover:bg-emerald-600 text-white">
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}