interface FormInputProps {
  label: string;
  setValue: (value: string) => void;
  type?: string;
  placeHolder?: string;
}
export const FormInput = ({
  label,
  setValue,
  type,
  placeHolder,
}: FormInputProps) => {
  return (
    <div className="flex flex-col  justify-center">
      <div className="flex flex-col gap-1">
        <div className="text-zinc-100">{label}</div>
        <div>
          <input
            type={type}
            placeholder={placeHolder}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="border-1 p-2 px-6 rounded-md border-slate-400 bg-slate-200 text-blue-700 text-[18px] w-full"
          />
        </div>
      </div>
    </div>
  );
};
