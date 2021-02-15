import React from 'react';
import { ResultsProvider } from '../context/ResultsContext';
import { SettingsProvider } from '../context/SettingsContext';
import Results from './Results';
import Settings from './Settings';

function WorkingArea({ num }) {
  return (
    <>
      <ResultsProvider>
        <SettingsProvider>
          <Settings num={num} />
        </SettingsProvider>
        <Results />
      </ResultsProvider>
    </>
  );
}

export default WorkingArea;
