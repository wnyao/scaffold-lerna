import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

export interface ISelectOption {
  label: string;
  value: string;
}

interface ISelectProps {
  options: ISelectOption[];
  value: string;
  onChange: (option: ISelectOption, event: ChangeEvent<HTMLSelectElement>) => void;
}

const mapValueWithOptions = (selectedValue: string, options: ISelectOption[]): ISelectOption =>
  options.find(({ value }) => value === selectedValue) as ISelectOption;

const Select: FC<ISelectProps> = ({ options, value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const selectedOption = mapValueWithOptions(value, options);
    return onChange(selectedOption, event);
  };

  return (
    <SelectContainer value={value} onChange={handleChange}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </SelectContainer>
  );
};

export default Select;

const SelectContainer = styled.select``;
