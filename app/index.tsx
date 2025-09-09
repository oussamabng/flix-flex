import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn === undefined) return;
    if (isSignedIn) {
      router.replace('/(tabs)/movies'); // no animation
    } else {
      router.replace('/(auth)/signin'); // no animation
    }
  }, [isSignedIn]);

  return null; // render nothing, just redirect
}
