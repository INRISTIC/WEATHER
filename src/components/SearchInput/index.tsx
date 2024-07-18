import React, { useState, ChangeEvent, KeyboardEvent, MouseEvent, FocusEvent, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from "use-debounce";

import { setSearchValue, getWeatherData, getSuggestions, setSuggestions, setSelectedSuggestion } from '../../redux/slices/weatherSlice';
import { WeatherUnitType } from '../../../src/intarfeces';
import Loupe from '../../assets/images/loupe.svg'
import { Theme } from '../../../src/hooks/useTheme';

interface ISearchInput {
  searchValue: string;
  theme: Theme
}

const lightTheme = {
  background: '#e0f7fa',
  color: '#006064',
  borderColor: '#b2ebf2',
  hoverBackground: '#b2dfdb', 
  hoverBorderColor: '#80deea',
};

const darkTheme = {
  background: '#003d60',
  color: '#e2f2f1',
  borderColor: '#00396b',
  hoverBackground: '#00395c',
  hoverBorderColor: '#003d40',
};

const SearchInputWrapper = styled.div`
  width: 100%;
  position: relative;
  grid-area: input;
  padding: 0 0 5px;
  font-size: 22px;
`;

const StyledInput = styled.input`
  width: 100%;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus-visible {
    outline: none;
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  width: 1.25rem;
  background: none;
  border: none;
  padding: 0;
`;

const Search = styled.div`
  padding: 0 0 0.75rem;
  display: flex;
  border-bottom: rgba(255, 255, 255, 0.6) 2px solid;
`;

const SearchSelect = styled.select<{ theme: typeof lightTheme | typeof darkTheme }>`
  font-family: 'Helvetica Neue', sans-serif;
  position: absolute;
  z-index: 1;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  appearance: none;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    border-color: ${(props) => props.theme.hoverBorderColor};
    background-color: ${(props) => props.theme.hoverBackground};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.hoverBorderColor};
  }
`;

const SearchOption = styled.option<{ theme: typeof lightTheme | typeof darkTheme }>`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
  }
`;

const SearchInput: React.FC<ISearchInput> = ({ searchValue, theme }) => {
  const [inputValue, setInputValue] = useState<string>(searchValue);
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const suggestions = useSelector((state: any) => state.weather.suggestions);
  const selectedSuggestion = useSelector((state: any) => state.weather.selectedSuggestion);
  const dispatch = useDispatch();

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      dispatch(getSuggestions(inputValue));
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue, 500]);

  const fetchWeatherDataBySearch = (location: string) => {
    const payload = {
      location: {
        location,
        weatherUnitType: WeatherUnitType.METRIC,
      },
    };
    dispatch(setSearchValue(location));
    dispatch(getWeatherData(payload));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsSelectVisible(true);
  };

  const handleSearchClick = (e: MouseEvent<HTMLButtonElement>): void => {
    fetchWeatherDataBySearch(inputValue);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      fetchWeatherDataBySearch(inputValue);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    dispatch(setSelectedSuggestion(selectedValue));
    const selectedOption = suggestions.find(suggestion => suggestion.name === selectedValue);
    if (selectedOption) {
      setInputValue(selectedOption.name);
      fetchWeatherDataBySearch(selectedOption.name);
      dispatch(setSuggestions([]));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLSelectElement>) => {
    setIsSelectVisible(false);
  };
  
  const handleFocus = () => {
    setIsSelectVisible(true);
  };
  

  return (
    <SearchInputWrapper>
      <Search>
        <StyledInput
          placeholder='E.g. Warsaw'
          onChange={handleInputChange}
          value={inputValue}
          onKeyUp={handleKeyPress}
        />
        <StyledButton onClick={handleSearchClick}>
          <img src={Loupe} alt="Search" />
        </StyledButton>
      </Search>
      
      {suggestions.length > 0 && (
        <SearchSelect theme={theme === Theme.LIGHT ? lightTheme : darkTheme}  value={selectedSuggestion} onChange={handleSelectChange} size={suggestions.length} onBlur={handleBlur}
        onFocus={handleFocus}
        hidden={!isSelectVisible}>
        {suggestions.map((suggestion) => (
          <SearchOption theme={theme === Theme.LIGHT ? lightTheme : darkTheme }  key={suggestion.code} value={suggestion.name}>
            {suggestion.name}
          </SearchOption>
        ))}
      </SearchSelect>
    )}
  </SearchInputWrapper>
);
};

export default SearchInput;