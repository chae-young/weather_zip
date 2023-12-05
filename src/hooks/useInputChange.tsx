import { useState } from 'react'

const useInputChange = (
  defaultValue = '',
): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (e: React.FormEvent<HTMLInputElement>) => void,
] => {
  const [value, setValue] = useState(defaultValue)

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue((e.target as HTMLInputElement).value)
  }

  return [value, setValue, handleOnChange]
}

export default useInputChange
