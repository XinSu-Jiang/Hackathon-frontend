import { cn } from '@/lib/utils';
import { FieldValues } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';
import { PostPayload } from '@/types/post';
type SimpleInputProps = {
  id: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<PostPayload>;
  errors: FieldErrors<PostPayload>;
  className?: string;
  label?: string;
};

const SimpleInput = ({
  id,
  type,
  placeholder,
  register,
  errors,
  className,
  label,
  ...props
}: SimpleInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-500" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={cn(
          'border-none focus:ring-0 focus:outline-none',
          errors.title ? 'border-red-500' : 'border-gray-300',
          className,
        )}
        {...props}
      />
      {errors[id as keyof PostPayload] && (
        <p className="mt-1 text-xs text-red-600">
          {errors[id as keyof PostPayload]?.message}
        </p>
      )}
    </div>
  );
};

export default SimpleInput;
