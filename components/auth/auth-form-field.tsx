import { Controller, Control } from 'react-hook-form';
import { SimpleInput } from '@/components/ui/input'; // <- use the lightweight one
import { View, Text } from 'react-native';

interface AuthFormFieldProps {
  control: Control<any>;
  name: string;
  placeholder: string;
  password?: boolean;
}

export function AuthFormField({
  control,
  name,
  placeholder,
  password = false,
}: AuthFormFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={{ width: '100%' }}>
          <SimpleInput
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            password={password}
          />
          {error && (
            <Text style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
