import React, { FC } from 'react';
import styled from 'styled-components';

import cls from '@/lib/classNames';

export interface ITabOption {
  label: string;
  value: string;
}

interface ITabProps {
  options: ITabOption[];
  value: string;
  className?: string;
  onClick: (option: ITabOption) => void;
}

const Tab: FC<ITabProps> = ({ className, options, value, onClick }) => (
  <TabContainer className={className}>
    {options.map((option) => {
      const { value: optionValue, label } = option;

      return (
        <TabItem key={label} className={cls({ active: value === optionValue })} onClick={() => onClick(option)}>
          {label}
        </TabItem>
      );
    })}
  </TabContainer>
);

export default Tab;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TabItem = styled.div`
  cursor: pointer;

  &:not(:last-child) {
    padding-right: 10px;
  }

  &.active {
    font-weight: bold;
  }
`;
