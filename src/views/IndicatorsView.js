import { useContext } from 'react';
import { Col, Row, Statistic } from 'antd';
import styled from 'styled-components';
import ResultsContext from '../context/ResultsContext';

function IndicatorsView() {
  const { state } = useContext(ResultsContext);
  const {
    performanceIndices: {
      fixedError,
      overshoot,
      adjustmentTime,
      integral: { accuracyAbs, accuracySquared, costAbs, costSquared },
    },
  } = state;
  return (
    <div>
      <h1>Wskaźniki jakości</h1>
      <Row>
        <Col span={6}>
          <Statistic value={fixedError} />
        </Col>
        <Col span={6}>
          <Statistic value={overshoot} />
        </Col>
        <Col span={6}>
          <Statistic value={adjustmentTime} />
        </Col>
        <Col span={6}>
          <Statistic value={accuracyAbs} />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Statistic value={accuracySquared} />
        </Col>
        <Col span={8}>
          <Statistic value={costAbs} />
        </Col>
        <Col span={8}>
          <Statistic value={costSquared} />
        </Col>
      </Row>
    </div>
  );
}

export default IndicatorsView;
