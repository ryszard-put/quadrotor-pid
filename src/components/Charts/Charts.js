import { Col, Row, Spin } from 'antd';
import { useContext } from 'react';
import ResultsContext from '../../context/ResultsContext';

import { StyledDivider, StyledH1 } from '../Settings';
import Chart from './Chart';

const Charts = () => {
  const { state } = useContext(ResultsContext);
  return (
    <>
      <StyledH1>Wykresy</StyledH1>
      <Row justify='center'>
        <Col span={24}>
          {state.loading ? (
            <Spin size='large' tip='Obliczanie' />
          ) : state.evaluated ? (
            <>
              <Chart id='1' />
              <StyledDivider />
              <Chart id='0' />
              <StyledDivider />
              <Chart id='2' />
            </>
          ) : (
            <h2 style={{ textAlign: 'center' }}>
              Wykresy wyświetlają się po uruchomieniu symulacji
            </h2>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Charts;
