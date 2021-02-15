import { Col, Row } from 'antd';
import { useContext } from 'react';
import ResultsContext from '../../context/ResultsContext';
import SettingsContext from '../../context/SettingsContext';
import CustomSlider from './CustomSlider';

function Sliders() {
  const { state } = useContext(SettingsContext);
  const {
    state: { loading: resultsLoading },
  } = useContext(ResultsContext);
  const { loading: settingsLoading } = state;
  return (
    <Row>
      <Col span={24}>
        <CustomSlider
          title='Wysokość'
          property='altitude'
          state={state.sliders.altitude}
          disabled={settingsLoading || resultsLoading}
        />
        <CustomSlider
          title='Sygnał sterujący'
          property='controlSignal'
          state={state.sliders.controlSignal}
          disabled={settingsLoading || resultsLoading}
        />
        <CustomSlider
          title='Obroty wirnika'
          property='rotationalSpeed'
          state={state.sliders.rotationalSpeed}
          disabled={settingsLoading || resultsLoading}
        />
      </Col>
    </Row>
  );
}

export default Sliders;
