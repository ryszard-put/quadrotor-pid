import { Col, Row } from 'antd';
import { useContext } from 'react';
import { StyledH3 } from '.';
import ResultsContext from '../../context/ResultsContext';
import SettingsContext from '../../context/SettingsContext';
import CustomInput from './CustomInput';

function Inputs() {
  const { state } = useContext(SettingsContext);
  const {
    state: { loading: resultsLoading },
  } = useContext(ResultsContext);
  const { loading: settingsLoading } = state;
  return (
    <>
      <StyledH3>Parametry fizyczne</StyledH3>
      <Row justify='center' gutter={[20, 20]}>
        <Col span={6}>
          <CustomInput
            disabled={settingsLoading || resultsLoading}
            title='Masa'
            property='mass'
            state={state.inputs.mass}
          />
        </Col>
        <Col span={6}>
          <CustomInput
            disabled={settingsLoading || resultsLoading}
            title='Promień'
            property='radius'
            state={state.inputs.radius}
          />
        </Col>
        <Col span={6}>
          <CustomInput
            disabled={settingsLoading || resultsLoading}
            title='Gęstość powietrza'
            property='airDensity'
            state={state.inputs.airDensity}
          />
        </Col>
        <Col span={6}>
          <CustomInput
            disabled={settingsLoading || resultsLoading}
            title='Przyspieszenie graw.'
            property='gravitationalAcceleration'
            state={state.inputs.gravitationalAcceleration}
          />
        </Col>
      </Row>
      <StyledH3>Parametry regulatora</StyledH3>
      <Row justify='center' gutter={[20, 20]}>
        <Col span={6}>
          <CustomInput
            disabled={settingsLoading || resultsLoading}
            title='Wysokość zadana'
            property='givenAltitude'
            state={state.inputs.givenAltitude}
          />
        </Col>
        <Col span={6}>
          <CustomInput
            disabled={settingsLoading || resultsLoading}
            title='Wzmocnienie'
            property='enhancement'
            state={state.inputs.enhancement}
          />
        </Col>
        <Col span={6}>
          <CustomInput
            disabled={settingsLoading || resultsLoading}
            title='Czas zdwojenia'
            property='doublingTime'
            state={state.inputs.doublingTime}
          />
        </Col>
        <Col span={6}>
          <CustomInput
            disabled={settingsLoading || resultsLoading}
            title='Czas wyprzedzenia'
            property='leadTime'
            state={state.inputs.leadTime}
          />
        </Col>
      </Row>
      <StyledH3>Parametry symulacji</StyledH3>
      <Row justify='center' gutter={20}>
        <Col span={6}>
          <CustomInput
            disabled={settingsLoading || resultsLoading}
            title='Czas próbkowania'
            property='samplingTime'
            state={state.inputs.samplingTime}
          />
        </Col>
        <Col span={6}>
          <CustomInput
            disabled={settingsLoading || resultsLoading}
            title='Liczba iteracji'
            property='iterations'
            state={state.inputs.iterations}
          />
        </Col>
      </Row>
    </>
  );
}

export default Inputs;
