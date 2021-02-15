import styled from 'styled-components';
import Charts from '../Charts/Charts';
import Statistics from '../Statistics';

const StyledDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.background2};
  padding: 1rem 2rem;
  border-radius: 15px;
  margin: 2rem 0;
`;

function Results() {
  return (
    <>
      <StyledDiv>
        <Charts />
      </StyledDiv>
      <StyledDiv>
        <Statistics />
      </StyledDiv>
    </>
  );
}

export default Results;
