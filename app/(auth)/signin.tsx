import { View, Text, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, SigninFormValues } from '@/schemas/signin-schema';
import { Button } from '@/components/ui/button';
import { AuthHeader } from '@/components/auth/auth-header';
import { AuthFooter } from '@/components/auth/auth-footer';
import { KeyboardAvoidingViewWrapper } from '@/components/ui/keyboard-avoiding-view-wrapper';
import { AuthFormField } from '@/components/auth/auth-form-field';
import { useSignIn } from '@clerk/clerk-expo';
import { useState } from 'react';
import { getClerkError } from '@/utils/clerk';

export default function SigninScreen() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = async (values: SigninFormValues) => {
    if (!isLoaded) return;
    try {
      const result = await signIn.create({
        identifier: values.username,
        password: values.password,
      });
      await setActive({ session: result.createdSessionId });
      router.replace('/(tabs)/movies');
    } catch (err) {
      setError(getClerkError(err));
    }
  };

  return (
    <KeyboardAvoidingViewWrapper>
      <AuthHeader title="FlixFlex" subtitle="Welcome back" />
      <View className="flex flex-1 justify-between px-4">
        <View className="gap-6">
          <AuthFormField control={control} name="username" placeholder="Username" />
          <AuthFormField control={control} name="password" placeholder="Password" password />
          <Button
            label={isSubmitting ? 'Signing In...' : 'Sign In'}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            size="lg"
          />
          {error && <Text className="text-red-500">{error}</Text>}
        </View>
        <AuthFooter
          text="Don't have an account?"
          linkLabel="Sign Up"
          onPress={() => router.push('/(auth)/signup')}
        />
      </View>
    </KeyboardAvoidingViewWrapper>
  );
}
