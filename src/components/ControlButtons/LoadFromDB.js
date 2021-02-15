import React, { useContext, useState } from 'react';
import { Col, Collapse, Modal, Row } from 'antd';

import { axiosInstance as axios } from '../../utils/axios';
import ResultsContext from '../../context/ResultsContext';
import SettingsContext from '../../context/SettingsContext';
import { displayError, displaySuccess } from '../../utils/notification';

import { StyledButton } from './styled';
import { StyledH3 } from '../Settings';

function RecordContent({ data }) {
  return (
    <>
      <StyledH3>Ograniczenia parametrów</StyledH3>
      <Row justify='space-around'>
        <Col style={{ textAlign: 'center' }} span={8}>
          Wysokość: {JSON.stringify(data.limits.h)}
        </Col>
        <Col style={{ textAlign: 'center' }} span={8}>
          Sygnał sterujący: {JSON.stringify(data.limits.u)}
        </Col>
        <Col style={{ textAlign: 'center' }} span={8}>
          Obroty: {JSON.stringify(data.limits.vr)}
        </Col>
      </Row>
      <StyledH3>Parametry fizyczne</StyledH3>
      <Row justify='space-around'>
        <Col style={{ textAlign: 'center' }} span={8}>
          Masa: {data.config.m}
        </Col>
        <Col style={{ textAlign: 'center' }} span={8}>
          Promień: {data.config.R}
        </Col>
        <Col style={{ textAlign: 'center' }} span={8}>
          Gęstość powietrza: {data.config.rho}
        </Col>
        <Col style={{ textAlign: 'center' }} span={8}>
          Stała grawitacyjna: {data.config.g}
        </Col>
        <Col style={{ textAlign: 'center' }} span={8}>
          Wysokość zadana: {data.config.hzad}
        </Col>
        <Col style={{ textAlign: 'center' }} span={8}>
          Wzmocnienie: {data.config.m}
        </Col>
        <Col style={{ textAlign: 'center' }} span={8}>
          Czas zdwojenia: {data.config.m}
        </Col>
        <Col style={{ textAlign: 'center' }} span={8}>
          Czas wyprzedzenia: {data.config.m}
        </Col>
        <Col style={{ textAlign: 'center' }} span={8}>
          Czas próbkowania: {data.config.Tp}
        </Col>
        <Col style={{ textAlign: 'center' }} span={8}>
          Liczba iteracji: {data.config.iterations}
        </Col>
      </Row>
    </>
  );
}

function LoadModal({ handleSettings, visible, setVisible, data }) {
  return (
    <Modal
      centered
      destroyOnClose
      width={600}
      bodyStyle={{ height: '500px', overflowY: 'scroll' }}
      title='Wybierz konfigurację'
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <Collapse>
        {data.reverse().map((record) => {
          return (
            <Collapse.Panel
              header={new Date(record.createdAt)
                .toLocaleString('pl-PL')
                .replaceAll('.', '/')}
              key={record._id}
            >
              <RecordContent data={record} />
              <StyledButton
                onClick={() => {
                  handleSettings(record);
                  displaySuccess('Wczytano pomyślnie!', '');
                }}
                type='primary'
                size='large'
                block
              >
                Wybierz
              </StyledButton>
            </Collapse.Panel>
          );
        })}
      </Collapse>
    </Modal>
  );
}

function LoadFromDB() {
  const [visible, setVisible] = useState(false);
  const [APIdata, setAPIdata] = useState([]);
  const { state: settingsState, dispatch: settingsDispatch } = useContext(
    SettingsContext
  );
  const { state: resultsState } = useContext(ResultsContext);

  const loadSettings = async () => {
    setVisible(true);

    try {
      const { data, status } = await axios.get('/results');
      if (status === 200) {
        setAPIdata(data);
      } else displayError('Wystąpił bład!', 'Spróbuj ponownie później!');
    } catch (exc) {
      console.log(exc);
      displayError('Wystąpił bład!', 'Spróbuj ponownie później!');
    }
  };

  const handleSettings = (record) => {
    settingsDispatch({ type: 'loadDataSet', value: record });
    setVisible(false);
  };

  return (
    <>
      <StyledButton
        disabled={resultsState.loading || settingsState.loading}
        type='primary'
        size='large'
        block
        onClick={loadSettings}
      >
        Wczytaj ustawienia
      </StyledButton>
      <LoadModal
        handleSettings={handleSettings}
        data={APIdata}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
}

export default LoadFromDB;
