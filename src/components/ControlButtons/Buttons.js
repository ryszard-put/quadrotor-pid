import { Col, Row } from 'antd';

import LoadFromDB from './LoadFromDB';
import SaveToDB from './SaveToDB';
import RunSimulation from './RunSimulation';

function Buttons() {
  return (
    <>
      <Row justify={'center'} gutter={20}>
        <Col span={6}>
          <LoadFromDB />
        </Col>
        <Col span={6}>
          <SaveToDB />
        </Col>
        <Col span={6}>
          <RunSimulation />
        </Col>
      </Row>
    </>
  );
}

export default Buttons;
