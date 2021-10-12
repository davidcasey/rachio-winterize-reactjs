import React, { useState, ChangeEvent } from 'react';

export type InputCyclesProps = {
  id: string;
  label: string;
  initialValue?: number;
  onInputChange: (value: number) => void;
}
export const InputCycles = ({ id, label, initialValue }: InputCyclesProps) => {
  const [cycles, setCycles] = useState(initialValue);

  const cyclesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCycles(parseFloat(e.target.value));
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        min="1"
        max="5"
        value={cycles}
        onChange={cyclesChange}
      /> cycles
    </>
  );
};
