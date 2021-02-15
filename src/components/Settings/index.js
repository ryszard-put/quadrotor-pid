import React from 'react';
import { Divider } from 'antd';
import styled from 'styled-components';
import Sliders from './Sliders';
import Inputs from './Inputs';
import Buttons from '../ControlButtons/Buttons';

const StyledDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.background2};
  padding: 2rem;
  border-radius: 15px;
`;

export const StyledDivider = styled(Divider)`
  background: ${({ theme }) => theme.colors.primary};
  opacity: 0.6;
`;

export const StyledH1 = styled.h1`
  color: ${({ theme }) => theme.colors.font};
  text-align: center;
`;

export const StyledH3 = styled.h3`
  color: ${({ theme }) => theme.colors.font};
  text-align: center;
`;

function Settings({ num }) {
  return (
    <StyledDiv>
      <StyledH1>Symulator #{num}</StyledH1>
      <StyledDivider />
      <StyledH3>Ograniczenia parametrów</StyledH3>
      <Sliders />
      <StyledDivider />
      <Inputs />
      <StyledDivider />
      <Buttons />
    </StyledDiv>
  );
}

export default Settings;
