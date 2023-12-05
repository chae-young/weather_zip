import { FormEvent } from 'react'

interface InputFieldProps {
  type: string
  placeholder: string
  id: string
  value: string
  errorMsg?: string
  onChange: (e: FormEvent<HTMLInputElement>) => void
}

const InputField = ({
  type,
  placeholder,
  id,
  value,
  errorMsg,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="mt-2">
      <label htmlFor={id} className="sr-only"></label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="placeholder-slate-300 border border-gray2 rounded-xl h-[50px] w-full px-5 py-3 text-body5"
      />
      {errorMsg && (
        <p className="text-red-600 text-body6 mt-2 ml-1">{errorMsg}</p>
      )}
    </div>
  )
}

export default InputField
