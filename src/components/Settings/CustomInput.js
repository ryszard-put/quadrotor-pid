import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, InputNumber } from 'antd';

import SettingsContext from '../../context/SettingsContext';

const StyledInputNumber = styled(InputNumber)`
  &.ant-input-number:hover,
  &.ant-input-number-focused,
  &.ant-input-number:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
  & > .ant-input-number-handler-wrap > span:hover svg {
    fill: ${({ theme }) => theme.colors.secondary};
  }
`;

function CustomInput({ title, property, state, disabled }) {
  const { dispatch } = useContext(SettingsContext);
  const onChange = (value) => {
    dispatch({ type: 'changeInput', property, value });
  };

  return (
    <>
      <Row>
        <Col style={{ textAlign: 'center' }} span={24}>
          {title} {state.unit && `[${state.unit}]`}
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: 'center' }} span={24}>
          <StyledInputNumber
            disabled={disabled}
            min={0}
            decimalSeparator=','
            value={state.value}
            onChange={onChange}
            size='large'
            style={{
              width: '70%',
              display: 'inline-block',
            }}
          />
        </Col>
      </Row>
    </>
  );
}

CustomInput.propTypes = {
  title: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
};

export default CustomInput;
