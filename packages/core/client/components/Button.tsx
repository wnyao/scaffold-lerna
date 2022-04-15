import React, { FC, PropsWithoutRef } from 'react';
import styled from 'styled-components';

interface IButtonProps extends PropsWithoutRef<JSX.IntrinsicElements['button']> {
  className?: string;
}

const Button: FC<IButtonProps> = ({ children, ...props }) => <ButtonContainer {...props}>{children}</ButtonContainer>;

export default Button;

const ButtonContainer = styled.button`
  padding: 10px;
  cursor: pointer;
`;
