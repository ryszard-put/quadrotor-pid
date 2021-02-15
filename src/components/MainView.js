import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import WorkingArea from './WorkingArea';
import { StyledH1 } from './Settings';
import Credits from './Credits';

const StyledRow = styled(Row)`
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.font};
`;

const StyledCol = styled(Col)`
  box-sizing: border-box;
`;

function MainView() {
  return (
    <StyledRow>
      <StyledCol>
        <Credits />
        <Row>
          <StyledCol style={{ padding: '0 1rem 2rem 2rem' }} span={12}>
            <WorkingArea num={1} />
          </StyledCol>
          <StyledCol style={{ padding: '0 2rem 2rem 1rem' }} span={12}>
            <WorkingArea num={2} />
          </StyledCol>
        </Row>
      </StyledCol>
    </StyledRow>
  );
}

export default MainView;
