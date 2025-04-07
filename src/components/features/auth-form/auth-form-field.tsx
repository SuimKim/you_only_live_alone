import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authFormData } from '@/lib/utils/validation/auth-validate';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// 동적 필드 타입
interface FieldProps<T extends keyof authFormData> {
  inputType: string;
  fieldName: T;
  placeholder: string;
  labelName?: string;
  isCheckButton?: boolean;
  isLabel?: boolean;
  form: UseFormReturn<authFormData, any, undefined>;
}

const AuthFormField = <T extends keyof authFormData>({
  inputType,
  fieldName,
  placeholder,
  labelName,
  isCheckButton = false,
  isLabel = false,
  form
}: FieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex items-center space-x-5">
          {isLabel && <FormLabel className="w-20 text-end text-lg">{labelName}</FormLabel>}
          <div className="flex flex-1 items-center space-x-3">
            <div className="flex-1">
              <FormControl>
                <Input className="h-11 w-full" placeholder={placeholder} type={inputType} {...field} />
              </FormControl>
              <FormMessage />
            </div>
            {isCheckButton && (
              <Button type="button" className="h-11 w-[70px]">
                중복확인
              </Button>
            )}
          </div>
        </FormItem>
      )}
    />
  );
};

export default AuthFormField;
