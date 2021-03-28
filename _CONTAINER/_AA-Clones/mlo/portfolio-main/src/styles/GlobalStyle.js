import { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { back, front, accent, cursor } from './themes';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
   ${reset}

   
    button {
        font-size: 0.8em;
        border: 3px ${front} solid;
        padding: 10px;
        background: none;
        color: ${front}
    }

    button:hover {
        color: ${accent};
        border: 3px ${accent} solid;
    }

   html {
       width: 100vw;
       cursor: ${cursor}
   }
   .app a {
       color: ${front};
       text-decoration: none;
     
   }
   .app a:visited {
       text-decoration: none;
       color: ${front}
   }
   .app {
      background: radial-gradient(circle, ${back}, #06051f);
       width: 100vw;
       height: 100vh;
       box-sizing: border-box;
       font-family: 'Rubik', sans-serif;
       color: ${front};
       font-size: calc(16px + 4 * ((100vw - 320px) / 680));
       overflow-y: scroll;
       overflow-x: hidden;
       scroll-behavior: smooth;
       -webkit-overflow-scrolling: smooth;

   }

   ::-webkit-scrollbar {
    width: 12px;
   }
 
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
  }
 
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
  }

  .app * {
    box-sizing: border-box;
   }
`;

const GlobalStyleWrapper = ({ children }) => {
    const [mode, setMode] = useState('dark');
    const [cursor, setCursor] = useState('default');

    return (
        <ThemeProvider theme={{ mode, setMode, cursor, setCursor }}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
};

export default GlobalStyleWrapper;
