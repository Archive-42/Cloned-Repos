import ReactDOM from 'react-dom';
import GlobalStyle from './styles/GlobalStyle';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <GlobalStyle>
            <App />
        </GlobalStyle>
    </BrowserRouter>,

    document.getElementById('root')
);
