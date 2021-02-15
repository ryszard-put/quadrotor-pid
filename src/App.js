//import { ConfigProvider } from 'antd';
import 'antd/dist/antd.dark.css';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import MainView from './components/MainView';

const GlobalStyles = createGlobalStyle`
  body,
  html {
    margin: 0;
    padding: 0;
  }

  body {
    overflow: overlay;
  }

  * {
    box-sizing: border-box;
  }
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #101010;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: #000;
}

::-webkit-scrollbar-track {
  background: ${({ theme }) => theme.colors.background2};
  border-radius: 5px;
}

`;

const theme = {
  colors: {
    primary: '#febc2c',
    secondary: '#fd413c',
    // background: '#212529',
    background: '#1f1f1f',
    // background2: '#2a2e32',
    background2: '#282828',
    font: '#eeeeee',
  },
  charts: {
    colors: ['#febc2c', '#fd413c'],
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainView />
    </ThemeProvider>
  );
}

export default App;
