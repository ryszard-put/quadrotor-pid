import React, { useContext } from 'react';
import { Statistic, Row, Col, Spin } from 'antd';

import { StyledH1, StyledH3 } from '../Settings';
import ResultsContext from '../../context/ResultsContext';

function BasicIndices({ fixedError, adjustmentTime, overshoot }) {
  return (
    <Row>
      <Col span={24}>
        <Statistic
          title={
            <CustomTitle>
              Uchyb ustalony e<sub>ust</sub>
            </CustomTitle>
          }
          value={fixedError.toFixed(2)}
          suffix={'m'}
          precision={2}
          decimalSeparator=','
          groupSeparator=' '
          style={{ textAlign: 'center' }}
        />
      </Col>
      <Col span={24}>
        <Statistic
          title={
            <CustomTitle>
              Czas regulacji t<sub>r</sub>
            </CustomTitle>
          }
          value={adjustmentTime}
          suffix={'s'}
          precision={2}
          decimalSeparator=','
          groupSeparator=' '
          style={{ textAlign: 'center' }}
        />
      </Col>
      <Col span={24}>
        <Statistic
          title={<CustomTitle>Przeregulowanie</CustomTitle>}
          value={overshoot}
          suffix={'%'}
          precision={2}
          decimalSeparator=','
          groupSeparator=' '
          style={{ textAlign: 'center' }}
        />
      </Col>
    </Row>
  );
}

function CustomTitle({ children }) {
  return <span style={{ fontSize: '20px' }}>{children}</span>;
}

function IntegralIndices({ integral }) {
  const { accuracyAbs, accuracySquared, costAbs, costSquared } = integral;
  return (
    <>
      <StyledH3>Całkowe wskaźniki kosztów regulacji</StyledH3>
      <Row>
        <Col span={12}>
          <Statistic
            title={
              <CustomTitle>
                ∫<sub>|u|</sub>
              </CustomTitle>
            }
            value={accuracyAbs}
            precision={2}
            decimalSeparator=','
            groupSeparator=' '
            style={{ textAlign: 'center' }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={
              <CustomTitle>
                ∫
                <sub>
                  u<sup>2</sup>
                </sub>
              </CustomTitle>
            }
            value={accuracySquared}
            precision={2}
            decimalSeparator=','
            groupSeparator=' '
            style={{ textAlign: 'center' }}
          />
        </Col>
      </Row>
      <StyledH3>Całkowe wskaźniki dokładności regulacji</StyledH3>
      <Row>
        <Col span={12}>
          <Statistic
            title={
              <CustomTitle>
                ∫<sub>|e|</sub>
              </CustomTitle>
            }
            value={costAbs}
            precision={2}
            decimalSeparator=','
            groupSeparator=' '
            style={{ textAlign: 'center' }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={
              <CustomTitle>
                ∫
                <sub>
                  e<sup>2</sup>
                </sub>
              </CustomTitle>
            }
            value={costSquared}
            precision={2}
            decimalSeparator=','
            groupSeparator=' '
            style={{ textAlign: 'center' }}
          />
        </Col>
      </Row>
    </>
  );
}

function Statistics() {
  const { state } = useContext(ResultsContext);
  const {
    performanceIndices: { fixedError, overshoot, adjustmentTime, integral },
  } = state;
  return (
    <>
      <StyledH1>Wskaźniki jakości regulacji</StyledH1>
      {state.loading ? (
        <Spin size='large' tip='Obliczanie' />
      ) : state.evaluated ? (
        <Row>
          <Col span={12}>
            <StyledH3>Podstawowe wskaźniki</StyledH3>
            <BasicIndices
              fixedError={fixedError}
              overshoot={overshoot}
              adjustmentTime={adjustmentTime}
            />
          </Col>
          <Col span={12}>
            <IntegralIndices integral={integral} />
          </Col>
        </Row>
      ) : (
        <h2 style={{ textAlign: 'center' }}>
          Wskaźniki wyświetlają się po uruchomieniu symulacji
        </h2>
      )}
    </>
  );
}

export default Statistics;
