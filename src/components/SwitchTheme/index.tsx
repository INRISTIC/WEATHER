import React from 'react';
import useTheme, { ThemeTypes } from '../../hooks/useTheme';
import styled from 'styled-components';

export const ToggleSwitchContainer = styled.div`
  position: relative;
  width: 80px;
`;

export const Label = styled.label`
  grid-area: theme;
  position: absolute;
  width: 100%;
  height: 2.25rem;
  background-color: #28292c;
  border-radius: 50px;
  cursor: pointer;
`;

export const Input = styled.input`
  position: absolute;
  display: none;

  &:checked + span {
    background-color: #fff;
  }

  &:checked + span::before {
    transform: translateX(38px);
    background-color: #28292c;
    box-shadow: none;
  }
`;

export const Switch = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  transition: 0.3s;

  &::before {
    content: '';
    position: absolute;
    top: 4.2px;
    left: 6.4px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    box-shadow: inset 8.2px -1.6px 0px 0px #d8dbe0;
    background-color: #28292c;
    transition: 0.3s;
  }
`;

const SwitchTheme: React.FC = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <ToggleSwitchContainer>
      <Label>
        <Input
          type="checkbox"
          checked={theme === ThemeTypes.LIGHT}
          onChange={toggleTheme}
        />
        <Switch />
      </Label>
    </ToggleSwitchContainer>
  );
};

export default SwitchTheme;
