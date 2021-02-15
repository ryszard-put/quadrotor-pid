import React from 'react';
import { ResultsProvider } from './ResultsContext';
import { SettingsProvider } from './SettingsContext';

function ContextProvider(props) {
  return (
    <ResultsProvider>
      <SettingsProvider>{props.children}</SettingsProvider>
    </ResultsProvider>
  );
}

export default ContextProvider;
