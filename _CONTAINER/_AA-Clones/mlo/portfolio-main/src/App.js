import { Route, Switch } from 'react-router-dom';
import Home from './scenes/Home';
import NotFound from './scenes/NotFound';
import './animations.css';
import { createContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const ScrollContext = createContext();

function App() {
    const [yAxis, setYAxis] = useState();

    return (
        <ScrollContext.Provider value={{ yAxis }}>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
            <div
                className='app'
                onScroll={(e) => {
                    setYAxis(e.target.scrollTop);
                }}
            >
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path='*'>
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </ScrollContext.Provider>
    );
}

export default App;
