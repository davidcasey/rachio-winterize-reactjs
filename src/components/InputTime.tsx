import React, { useState, ChangeEvent } from 'react';

export type InputTimeProps = {
  id: string;
  label: string;
  initialValue?: number;
  onInputChange: (value: number) => void;
}
export const InputTime = ({ id, label, initialValue }: InputTimeProps) => {
  const [time, setTime] = useState(initialValue);

  const timeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(parseFloat(e.target.value));
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        min="1"
        max="600"
        value={time}
        onChange={timeChange}
      /> seconds
    </>
  );
};
