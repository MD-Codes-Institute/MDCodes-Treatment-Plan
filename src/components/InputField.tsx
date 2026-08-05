import {  Control, useController, FieldValues, FieldPath } from "react-hook-form";

interface PropsInput<T extends FieldValues = FieldValues> {
  label?: string;
  name: FieldPath<T>;
  control: Control<T>;
  className?: string;
};


const InputField = <T extends FieldValues = FieldValues,>({
  label,
  control,
  name,
  className,
  ...rest
}: PropsInput<T> & React.InputHTMLAttributes<HTMLInputElement>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <div className={className ? className : "flex flex-col gap-3"}>
      {label && (<label className="text-white text-md whitespace-normal">{label}</label>)}
      <input {...field} {...rest} className="custom-input rounded-md! w-full" />
      {error && <p className="text-red-500! text-sm whitespace-normal">{error.message}</p>}
    </div>
  );
};

export default InputField;
