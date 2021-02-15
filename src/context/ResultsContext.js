import { createContext, useReducer } from 'react';

const ResultsContext = createContext(null);

const initialState = {
  error: '',
  evaluated: false,
  loading: false,
  iterations: 0,
  samplingTime: 0.1,
  charts: {
    0: {
      datasets: [
        {
          data: [],
        },
      ],
    },
    1: {
      datasets: [
        {
          data: [],
        },
        {
          data: [],
        },
      ],
    },
    2: {
      datasets: [
        {
          data: [],
        },
      ],
    },
  },
  performanceIndices: {
    fixedError: 0,
    overshoot: 0,
    adjustmentTime: 0,
    integral: {
      accuracyAbs: 0,
      accuracySquared: 0,
      costAbs: 0,
      costSquared: 0,
    },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-error': {
      return { ...state, error: action.payload };
    }
    case 'set-meta': {
      const { payload } = action;
      return {
        ...state,
        iterations: payload.iterations,
        samplingTime: payload.samplingTime,
      };
    }
    case 'set-results': {
      const { payload } = action;
      const newState = { ...state };
      newState.charts[0].datasets[0].data = payload.Fc;
      newState.charts[1].datasets[0].data = payload.h;
      newState.charts[1].datasets[1].data = payload.hzad_arr;
      newState.charts[2].datasets[0].data = payload.u;
      newState.performanceIndices = payload.performanceIndices;
      newState.evaluated = true;
      return newState;
    }
    case 'set-loading':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export function ResultsProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ResultsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ResultsContext.Provider>
  );
}

export default ResultsContext;
