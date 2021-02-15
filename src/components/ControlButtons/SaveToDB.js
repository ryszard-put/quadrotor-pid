import React, { useContext } from 'react';

import { axiosInstance as axios } from '../../utils/axios';
import SettingsContext from '../../context/SettingsContext';
import ResultsContext from '../../context/ResultsContext';
import { displayError, displaySuccess } from '../../utils/notification';

import { StyledButton } from './styled';

function SaveToDB() {
  const { state: settingsState, dispatch } = useContext(SettingsContext);
  const { state: resultsState } = useContext(ResultsContext);

  const saveSettings = async () => {
    dispatch({ type: 'set-loading', payload: true });

    const settings = {
      config: {
        hzad: settingsState.inputs.givenAltitude.value,
        Kp: settingsState.inputs.enhancement.value,
        Ti: settingsState.inputs.doublingTime.value,
        Td: settingsState.inputs.leadTime.value,
        Tp: settingsState.inputs.samplingTime.value,
        rho: settingsState.inputs.airDensity.value,
        R: settingsState.inputs.radius.value,
        m: settingsState.inputs.mass.value,
        g: settingsState.inputs.gravitationalAcceleration.value,
        iterations: settingsState.inputs.iterations.value,
      },
      limits: {
        h: settingsState.sliders.altitude.value,
        u: settingsState.sliders.controlSignal.value,
        vr: settingsState.sliders.rotationalSpeed.value,
      },
    };

    try {
      const { status } = await axios.put('/result', settings);
      if (status === 200) displaySuccess('Zapisano pomyślnie!', '');
      else displayError('Wystąpił bład!', 'Spróbuj ponownie później!');
    } catch (exc) {
      console.log(exc);
      displayError('Wystąpił bład!', 'Spróbuj ponownie później!');
    }

    dispatch({ type: 'set-loading', payload: false });
  };

  return (
    <StyledButton
      disabled={resultsState.loading || settingsState.loading}
      type='primary'
      size='large'
      block
      onClick={saveSettings}
    >
      Zapisz ustawienia
    </StyledButton>
  );
}

export default SaveToDB;
