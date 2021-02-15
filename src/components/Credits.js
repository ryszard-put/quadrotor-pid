import { Modal, Row, Col } from 'antd';
import styled from 'styled-components';
import { QuestionCircleOutlined } from '@ant-design/icons';

const StyledRow = styled(Row)`
  padding: 2em;
`;

const StyledH1 = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledH3 = styled.h3`
  font-size: 20px;
  text-align: center;
`;

const StyledParagraph = styled.p`
  font-size: 16px;
  text-align: justify;
`;

const ModalContent = () => (
  <div style={{ padding: '2em' }}>
    <StyledH1>Informacje o projekcie</StyledH1>
    <StyledH3>Autorzy</StyledH3>
    <Row gutter={[0, 20]} justify='space-between'>
      <Col
        style={{
          display: 'inline-block',
          textAlign: 'center',
          fontSize: '16px',
        }}
        span={8}
      >
        Natalia Rybiałek
      </Col>
      <Col
        style={{
          display: 'inline-block',
          textAlign: 'center',
          fontSize: '16px',
        }}
        span={8}
      >
        Jan Sobański
      </Col>
      <Col
        style={{
          display: 'inline-block',
          textAlign: 'center',
          fontSize: '16px',
        }}
        span={8}
      >
        Ryszard Poznański
      </Col>
    </Row>
    <StyledH3>Opis</StyledH3>
    <Row>
      <Col span={24}>
        <StyledParagraph>
          Celem było zaprojektowanie symulatora układu regulacji. Wielkością
          regulowaną jest położenie UAV (Unnamed Aerial Vehicle) w kierunku
          poziomym (wysokość). Zasymulowany układ jest regulatorem PID, którego
          zadaniem jest dobór odpowiedniej wielkości obrotów śmigieł w celu
          stabilizacji wysokości. Symulator pozwala na dostosowanie wielkości
          fizycznych zarówno UAV (masa, promień śmigła) jak i otoczenia (gęstość
          powietrza, przyspieszenie ziemskie - domyślne wartości stanowią
          uśrednione wartości dla Ziemi), oraz co najważniejsze, nastaw
          regulatora, dyskretnego czasu próbkowania i liczby iteracji. Do
          dyspozycji są dwa niezależne symulatory, każdy z własnym zestawem
          ustawień, wykresami oraz wskaźnikami jakości. Istnieje możliwość
          zapisu konfiguracji własnej do bazy danych oraz załadowanie wcześniej
          zapisanych konfiguracji.
        </StyledParagraph>
      </Col>
    </Row>
  </div>
);

const modalConfig = {
  centered: true,
  width: '700px',
  icon: null,
  maskClosable: true,
  content: <ModalContent />,
  okButtonProps: {
    style: {
      background: '#fd413c',
      borderColor: '#fd413c',
    },
  },
};

function Credits() {
  return (
    <StyledRow>
      <Col span={24}>
        <StyledH1>
          Symulacja regulacji wysokości quadkoptera{' '}
          <QuestionCircleOutlined
            onClick={() => {
              Modal.info(modalConfig);
            }}
          />
        </StyledH1>
      </Col>
    </StyledRow>
  );
}

export default Credits;
