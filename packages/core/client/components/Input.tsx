import React, { FC, InputHTMLAttributes, ReactNode, CSSProperties } from 'react';
import styled from 'styled-components';
import DateInput from './DateInput';

const DEFAULT_LABEL_WIDTH = 64;

interface IInputProps extends IWrapper, InputHTMLAttributes<HTMLInputElement> {
  name: string;
  prefix?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  labelWidth?: number;
  borderColor?: string;
  format?: string;
  children?: ReactNode;
  icon?: ReactNode;
  label?: ReactNode;
  extendButton?: ReactNode;
  inputStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  wrapperStyle?: CSSProperties;
}

const Input: FC<IInputProps> = (props) => {
  const {
    icon,
    label,
    prefix,
    placeholder,
    children,
    labelWidth,
    extendButton,
    inline,
    border,
    inputStyle,
    labelStyle,
    borderColor,
    wrapperStyle
  } = props;

  const computedLabelWidth = computeLabelWidth(label, labelWidth);

  return (
    <InputContainer border={border} inline={inline}>
      <Wrapper border={border} inline={inline} borderColor={borderColor} style={wrapperStyle}>
        <LabelWrapper>
          {icon}
          {label && (
            <Label inline={inline} width={computedLabelWidth} style={labelStyle}>
              {label}
            </Label>
          )}
        </LabelWrapper>
        <InputWrapper inline={inline}>
          {children}
          {!!prefix && (
            <Prefix style={inputStyle} $hasValue {...props}>
              {prefix}
            </Prefix>
          )}
          <InputComponent {...props} />
          {extendButton}
        </InputWrapper>
      </Wrapper>
      {!inline && <BottomPlaceholder>{placeholder}</BottomPlaceholder>}
    </InputContainer>
  );
};

const InputComponent: FC<IInputProps> = ({
  inline,
  placeholder,
  disabled,
  inputStyle,
  value = '',
  type,
  name,
  ...restProps
}) => {
  const inputPlaceholder = !inline ? '' : placeholder;
  const isDateTime = type === 'date' || type === 'datetime-local';

  if (disabled) {
    return (
      <Text style={inputStyle} $hasValue={!!value} {...restProps}>
        {value || inputPlaceholder}
      </Text>
    );
  }

  if (isDateTime) {
    return <DateInput style={inputStyle} name={name} value={value} type={type} {...restProps} />;
  }

  return (
    <InputField
      type={type}
      name={name}
      value={value}
      style={inputStyle}
      placeholder={inputPlaceholder}
      {...restProps}
    />
  );
};

const computeLabelWidth = (label?: ReactNode, labelWidth?: number) => {
  if (typeof labelWidth === 'number' && labelWidth !== DEFAULT_LABEL_WIDTH) {
    return labelWidth;
  }

  if (typeof label === 'string') {
    return label.substring(4).length * 8 + DEFAULT_LABEL_WIDTH;
  }

  return DEFAULT_LABEL_WIDTH;
};

Input.defaultProps = {
  inline: true,
  border: true,
  disabled: false,
  labelWidth: DEFAULT_LABEL_WIDTH
};

export default Input;

interface IWrapper {
  border?: boolean;
  inline?: boolean;
  borderColor?: string;
}

const InputContainer = styled.div<IWrapper>`
  margin-bottom: ${({ inline }) => (inline ? '4px' : '12px')};
  padding-bottom: ${({ inline }) => (inline ? '4px' : '0px')};
`;

const Wrapper = styled.div<IWrapper>`
  display: flex;
  flex: 0 0 auto;
  flex-direction: ${({ inline }) => (inline ? 'row' : 'column')};
  align-items: ${({ inline }) => (inline ? 'center' : 'flex-start')};
  position: relative;

  font-size: 12px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.colors.gray2};
  border-bottom-width: ${({ border }) => (border ? '1px' : '0')};

  ::after {
    display: ${({ border }) => (border ? 'block' : 'none')};
    content: '';

    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -1px;
    left: 0;

    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.2s ease-in-out;
    background-color: ${({ borderColor, theme }) => borderColor || theme.colors.black};
  }

  :focus-within::after {
    transform: scaleX(1);
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputWrapper = styled(LabelWrapper)<IWrapper>`
  flex: 1;
  justify-content: space-between;
  width: ${({ inline }) => (inline ? 'auto' : '100%')};
`;

interface ILabel {
  inline?: boolean;
  width?: number;
}

const Label = styled.div<ILabel>`
  display: flex;
  align-items: center;
  flex: 0 0 auto;

  box-sizing: border-box;
  width: ${({ width }) => `${width}px`};
  height: ${({ inline }) => (inline ? '36px' : 'auto')};

  line-height: 14px;
  white-space: nowrap;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.black};
`;

const InputField = styled.input<{ value: string }>`
  flex: 1 1 auto;

  width: 100%;
  height: 32px;
  padding: 4px 0;
  z-index: 2;

  background-color: transparent;
  border-width: 0px;
  border: none;
  font-size: 12px;
  line-height: 14px;
  text-align: left;
  vertical-align: middle;
  box-sizing: border-box;
  outline: none;
  appearance: none;
  transition: border 0.2s ease;

  ::placeholder {
    vertical-align: middle;
    color: ${({ theme }) => theme.colors.gray1};
  }

  :-webkit-autofill {
    box-shadow: 0 0 0 30px white inset !important;
  }

  :disabled {
    color: ${({ theme }) => theme.colors.red};
  }
`;

const Text = styled.div<{ $hasValue: boolean }>`
  display: flex;
  flex: 1 1 auto;
  align-items: center;

  min-height: 36px;
  line-height: 1.25;
  text-align: left;
  font-size: 12px;
  color: ${({ theme, $hasValue }) => ($hasValue ? theme.colors.gray1 : theme.colors.gray2)};
`;

const BottomPlaceholder = styled.small`
  color: ${({ theme }) => theme.colors.gray1};
`;

const Prefix = styled(Text)`
  flex: 0 0 auto;
  margin-right: 0.3rem;
`;
