import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import styled from 'styled-components';

import ChartsView from './ChartsView';
import CombinedView from './CombinedView';
import IndicatorsView from './IndicatorsView';
import SettingsView from './SettingsView';

const views = [
  { button: 'Ustawienia' },
  { button: 'Symulacja' },
  { button: 'Wskaźniki' },
  { button: 'Widok łączony' },
];

const StyledWrapper = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 30px 0 0;
`;

function ViewsWrapper() {
  const [currentView, setCurrentView] = useState(0);

  const changeView = (view) => {
    setCurrentView(view);
  };
  return (
    <StyledWrapper>
      <Row justify='center' gutter={[10, 30]}>
        {views.map((view, idx) => (
          <Col span={6} key={view.button}>
            <Button
              type={currentView === idx ? 'primary' : 'dashed'}
              size='large'
              onClick={() => changeView(idx)}
              block
            >
              {view.button}
            </Button>
          </Col>
        ))}
      </Row>
      {(() => {
        switch (currentView) {
          case 0:
            return <SettingsView />;
          case 1:
            return <ChartsView />;
          case 2:
            return <IndicatorsView />;
          case 3:
            return <CombinedView />;
          default:
            return <div>Opsiee...</div>;
        }
      })()}
    </StyledWrapper>
  );
}

export default ViewsWrapper;
