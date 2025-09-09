import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';

import { signupSchema, SignupFormValues } from '@/schemas/signup-schema';
import { Button } from '@/components/ui/button';
import { AuthHeader } from '@/components/auth/auth-header';
import { AuthFooter } from '@/components/auth/auth-footer';
import { KeyboardAvoidingViewWrapper } from '@/components/ui/keyboard-avoiding-view-wrapper';
import { AuthFormField } from '@/components/auth/auth-form-field';
import { getClerkError } from '@/utils/clerk';

export default function SignupScreen() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (values: SignupFormValues) => {
    if (!isLoaded) return;
    try {
      const result = await signUp.create({
        username: values.username,
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
      <AuthHeader title="FlixFlex" subtitle="Create your account" />
      <View className="flex flex-1 justify-between px-4">
        <View className="gap-6">
          <AuthFormField control={control} name="username" placeholder="Username" />
          <AuthFormField control={control} name="password" placeholder="Password" password />
          <AuthFormField
            control={control}
            name="confirmPassword"
            placeholder="Confirm Password"
            password
          />
          <Button
            label={isSubmitting ? 'Signing Up...' : 'Sign Up'}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            size="lg"
          />
          {error && <Text className="text-red-500">{error}</Text>}
        </View>
        <AuthFooter
          text="Already have an account?"
          linkLabel="Sign In"
          onPress={() => router.push('/(auth)/signin')}
        />
      </View>
    </KeyboardAvoidingViewWrapper>
  );
}
