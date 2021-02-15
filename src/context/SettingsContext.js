import { createContext, useReducer } from 'react';

const SettingsContext = createContext(null);

const initialState = {
  loading: false,
  sliders: {
    altitude: {
      maxRange: [0, 100],
      value: [0, 100],
      step: 1,
      unit: 'm',
    },
    controlSignal: {
      maxRange: [0, 20],
      value: [0, 10],
      step: 1,
      unit: '',
    },
    rotationalSpeed: {
      maxRange: [0, 10000],
      value: [0, 5000],
      step: 100,
      unit: 'rpm',
    },
  },
  inputs: {
    mass: {
      value: 1,
      unit: 'kg',
    },
    radius: {
      value: 0.1,
      unit: 'm',
    },
    airDensity: {
      value: 1.2,
      unit: 'kg/m^3',
    },
    gravitationalAcceleration: {
      value: 9.8,
      unit: 'm/s^2',
    },
    samplingTime: {
      value: 0.1,
      unit: 's',
    },
    enhancement: {
      value: 0.1,
      unit: '',
    },
    doublingTime: {
      value: 0.1,
      unit: '',
    },
    leadTime: {
      value: 0.1,
      unit: '',
    },
    iterations: {
      value: 1000,
      unit: '',
    },
    givenAltitude: {
      value: 10,
      unit: 'm',
    },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'changeSlider': {
      const newState = { ...state };
      newState.sliders[action.property].value[1] = action.value;
      return newState;
    }
    case 'changeInput': {
      const newState = { ...state };
      newState.inputs[action.property].value = action.value;
      return newState;
    }
    case 'loadDataSet': {
      const newState = { ...state };
      newState.sliders.altitude.value[0] = action.value.limits.h[0];
      newState.sliders.altitude.value[1] = action.value.limits.h[1];
      newState.sliders.controlSignal.value[0] = action.value.limits.u[0];
      newState.sliders.controlSignal.value[1] = action.value.limits.u[1];
      newState.sliders.rotationalSpeed.value[0] = action.value.limits.vr[0];
      newState.sliders.rotationalSpeed.value[1] = action.value.limits.vr[1];

      newState.inputs.givenAltitude.value = action.value.config.hzad;
      newState.inputs.enhancement.value = action.value.config.Kp;
      newState.inputs.doublingTime.value = action.value.config.Ti;
      newState.inputs.leadTime.value = action.value.config.Td;
      newState.inputs.samplingTime.value = action.value.config.Tp;
      newState.inputs.airDensity.value = action.value.config.rho;
      newState.inputs.radius.value = action.value.config.R;
      newState.inputs.mass.value = action.value.config.m;
      newState.inputs.gravitationalAcceleration.value = action.value.config.g;
      newState.inputs.iterations.value = action.value.config.iterations;
      return newState;
    }
    case 'set-loading':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export function SettingsProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsContext;
