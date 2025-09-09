import React from 'react';
import { Pressable, Text, PressableProps } from 'react-native';

type Variant = 'default' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends PressableProps {
  variant?: Variant;
  size?: Size;
  label: string;
  className?: string;
}

export const Button = ({
  variant = 'default',
  size = 'md',
  label,
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses = 'flex-row items-center justify-center rounded-xl active:opacity-80';

  const variantClasses: Record<Variant, string> = {
    default: 'bg-primary',
    outline: 'border border-primary bg-transparent',
    ghost: 'bg-transparent',
  };

  const sizeClasses: Record<Size, string> = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-5 py-4',
  };

  const textVariant: Record<Variant, string> = {
    default: 'text-white',
    outline: 'text-primary',
    ghost: 'text-primary',
  };

  return (
    <Pressable
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}>
      <Text className={`font-semibold ${textVariant[variant]}`}>{label}</Text>
    </Pressable>
  );
};
