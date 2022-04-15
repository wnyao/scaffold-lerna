import React, { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import moment from 'moment';

interface IDateTimeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  format?: string;
  value?: string;
}

const DATETIME_FORMAT: Record<string, string> = {
  date: 'YYYY/MM/DD',
  'datetime-local': 'YYYY/MM/DD HH:mm:ss'
};

const DateTimeInput: FC<IDateTimeInputProps> = (props) => {
  const { type = '', value, placeholder, style, className, format } = props;
  const datetimeFormat = format || DATETIME_FORMAT[type] || DATETIME_FORMAT.date;

  return (
    <Wrapper>
      <Input
        readOnly
        type="text"
        style={style}
        className={className}
        placeholder={placeholder}
        value={value ? moment(value).format(datetimeFormat) : ''}
      />
      <Input {...props} type={type} value={value} />
    </Wrapper>
  );
};

export default DateTimeInput;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  flex: 1 1 auto;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 36px;
  padding: 4px 0;

  background-color: transparent;
  border-width: 0px;
  border: none;
  font-size: 12px;
  transition: border 0.2s ease;
  opacity: 0;
  text-align: left;
  box-sizing: border-box;
  outline: none;
  vertical-align: middle;
  appearance: none;
  line-height: 14px;
  z-index: 2;

  ::placeholder {
    vertical-align: middle;
    color: ${({ theme }) => theme.colors.black};
  }

  :-webkit-autofill {
    box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.white} inset !important;
  }
`;
