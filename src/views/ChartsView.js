import { useContext } from 'react';
import Charts from '../components/Charts/Charts';

import ResultsContext from '../context/ResultsContext';
import SettingsContext from '../context/SettingsContext';

import RegulatorSettings from '../components/RegulatorSettings';
import ControlButtons from '../components/ControlButtons';

function ChartsView() {
  const { state: resultsState, dispatch: resultsDispatch } = useContext(
    ResultsContext
  );
  const { state: settingsState } = useContext(SettingsContext);

  const runSimulation = async () => {
    resultsDispatch({ type: 'set-loading', payload: true });

    if ('Worker' in window) {
      const regulatorWorker = new Worker('regulatorWorker.js');
      const {
        givenAltitude,
        enhancement,
        doublingTime,
        leadTime,
        samplingTime,
        airDensity,
        radius,
        mass,
        gravitationalAcceleration,
        iterations,
      } = settingsState.inputs;

      const config = {
        hzad: givenAltitude.value, // wartość zadana
        Kp: enhancement.value, // wzmocnienie
        Ti: doublingTime.value, // czas zdwojenia
        Td: leadTime.value, // czas wyprzedzenia
        Tp: samplingTime.value, // Czas probkowania [s]
        rho: airDensity?.value ?? 1.2, // gęstość powietrza - 1.2 [kg/m3]
        R: radius?.value, // promień wirnika [m]
        m: mass?.value, // masa drona [kg]
        g: gravitationalAcceleration?.value ?? 9.8, // przyspieszenie ziemskie - 9.8 [m/s2]
        iterations: iterations.value,
      };

      const {
        altitude,
        controlSignal,
        rotationalSpeed,
      } = settingsState.sliders;
      const limits = {
        h: altitude.value,
        u: controlSignal.value,
        vr: rotationalSpeed.value,
      };
      regulatorWorker.postMessage([config, limits]);
      regulatorWorker.onmessage = (e) => {
        const [{ h, u, Fc, hzad_arr, performanceIndices }] = e.data;

        resultsDispatch({
          type: 'set-meta',
          payload: { iterations, samplingTime: samplingTime.value },
        });
        resultsDispatch({
          type: 'set-results',
          payload: { h, u, Fc, hzad_arr, performanceIndices },
        });
        resultsDispatch({ type: 'set-loading', payload: false });
      };
      regulatorWorker.onerror = (e) => {};
    } else {
      resultsDispatch({
        type: 'set-error',
        payload: 'You need Web Workers enabled!',
      });
      resultsDispatch({ type: 'set-loading', payload: false });
    }

    // const regulator = new Regulator(config, limits);
    // await regulator.run();
    // const { h, u, Fc, hzad_arr } = regulator;
    // try {
    //   const { data } = await axiosInstance.post('/regulator', {
    //     config,
    //     limits,
    //   });
    //   const { h, u, Fc, hzad_arr } = data;

    //   resultsDispatch({
    //     type: 'set-meta',
    //     payload: { iterations, samplingTime: samplingTime.value },
    //   });
    //   resultsDispatch({ type: 'set-results', payload: { h, u, Fc, hzad_arr } });
    // } catch (e) {
    //   resultsDispatch({ type: 'set-error', payload: e.message });
    // }
  };
  return (
    <>
      <RegulatorSettings loading={resultsState.loading} />
      <ControlButtons
        loading={resultsState.loading}
        runSimulation={runSimulation}
      />
      <Charts state={resultsState} resultsDispatch={resultsDispatch} />
    </>
  );
}

export default ChartsView;
