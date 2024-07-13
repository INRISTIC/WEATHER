import React from 'react';
import { Theme } from '../../../src/hooks/useTheme';
import styled from 'styled-components';

interface ToggleProps {
  theme: string;
  toggleTheme: () => void;
}

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

  &:checked + .slider {
    background-color: #d8dbe0;
  }

  &:checked + .slider::before {
    transform: translateX(38px);
    background-color: #28292c;
    box-shadow: none;
  }
`;

export const Slider = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  transition: 0.3s;

  &::before {
    content: "";
    position: absolute;
    top: 4.2px; /* Уменьшено в 5 раз */
    left: 6.4px; /* Уменьшено в 5 раз */
    width: 28px; /* Уменьшено в 5 раз */
    height: 28px; /* Уменьшено в 5 раз */
    border-radius: 50%;
    box-shadow: inset 8.2px -1.6px 0px 0px #d8dbe0;
    background-color: #28292c;
    transition: 0.3s;
  }
`;

const ToggleTheme: React.FC<ToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <ToggleSwitchContainer>
      <Label>
        <Input type="checkbox" checked={theme === Theme.DARK} onChange={toggleTheme} />
        <Slider className="slider" />
      </Label>
    </ToggleSwitchContainer>
  );
};

export default ToggleTheme;