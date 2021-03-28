import React from 'react';
import styles from './App.scss';
import Loadable from 'react-loadable';

export function Loading() {
    return <div className={styles.loader}>Loading...</div>;
}

const Speech = Loadable({
    loader: () => import(/* webpackChunkName: "Speech" */ './components/speech/Speech'),
    loading: Loading
})

const App = () => {
    if(Speech) {
        return (
            <div className={styles.Site}>
                <div className={styles.Sitecontent}>
                    <div id="speech" className={styles.App}>
                        <Speech />
                    </div>
                </div>
                <div className={styles.footercontainer}>
                    <footer className={styles.sitefooter}>
                        <p className={styles.identity}>© 2018 Maria D. Campbell</p>
                    </footer>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.loader}>{Loading()}</div>
        )
    }
}
export default App;



