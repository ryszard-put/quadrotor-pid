import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Slider } from 'antd';
import styled from 'styled-components';
import SettingsContext from '../../context/SettingsContext';

const StyledSlider = styled(Slider)`
  & > .ant-slider-track,
  &:hover > .ant-slider-track {
    background: ${({ theme }) => theme.colors.secondary};
  }
  & > .ant-slider-step span,
  & > .ant-slider-handle,
  &:hover > .ant-slider-handle:not(.ant-tooltip-open) {
    border-color: ${({ theme }) => theme.colors.secondary};
  }

  & > .ant-slider-mark span {
    color: #fff;
  }
`;

function CustomSlider({ title, property, state, disabled }) {
  const [localValue, setLocalValue] = useState(state.value[1]);
  const { dispatch } = useContext(SettingsContext);
  const onAfterChange = (value) => {
    dispatch({ type: 'changeSlider', property, value });
  };
  const onChange = (value) => {
    setLocalValue(value);
  };
  useEffect(() => {
    setLocalValue(state.value[1]);
  }, [state.value]);

  const marks = {
    [state.maxRange[0]]: state.maxRange[0],
    [state.maxRange[1]]: state.maxRange[1],
  };

  return (
    <Row align='middle'>
      <Col span={5}>
        <span>
          {title} {state.unit && `[${state.unit}]`}
        </span>
      </Col>
      <Col span={19}>
        <StyledSlider
          onAfterChange={onAfterChange}
          onChange={onChange}
          step={state.step}
          min={state.maxRange[0]}
          max={state.maxRange[1]}
          value={localValue}
          marks={marks}
          disabled={disabled}
        />
      </Col>
    </Row>
  );
}

CustomSlider.propTypes = {
  title: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CustomSlider;
