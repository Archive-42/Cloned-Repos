import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import styles from './Speech.scss';
import {clearAll, reset} from '../utils/helpers';
import {SaveNote} from '../savenote/SaveNote';
import {GetNotes} from '../getnote/GetNotes';
import {sessionStorageToFile} from '../utils/download';

const SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

class Speech extends Component {
    state = {
            listening: false
        }
        
    toggleListen = () => {
        this.setState({
            listening: !this.state.listening
        }, this.handleListen)
    }

    handleListen = () => {
        console.log('listening?', this.state.listening);
        if (this.state.listening) {
            recognition.start();
            recognition.onend = () => {
                console.log('...continue listening...');
                recognition.start();
            }
        } else {
            recognition.stop();
            recognition.onend = () => {
                console.log('Stopped listening per click');
            }
        }
        recognition.onstart = () => {
            console.log('Listening!');
        }
        let finalTranscript = '';
            
        recognition.onresult = event => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }
            document.getElementById('interim').innerHTML = interimTranscript;
            document.getElementById('final').innerHTML = finalTranscript;

            const transcriptArr = finalTranscript.split(' ');
            const stopCmd = transcriptArr.slice(-3, -1);
            console.log('stopCmd', stopCmd);

            if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening') {
                recognition.stop();
                recognition.onend = () => {
                    console.log('Stopped listening per command');
                    const finalText = transcriptArr.slice(0, -3).join(' ');
                    document.getElementById('final').innerHTML = finalText;
                }
            }
        }
        recognition.onerror = event => {
            console.log('Error occurred in recognition: ' + event.error);
        }
    }
    render() {
        return (
            <div>
                <h1 className={styles.appTitle}>Voice Controlled Notes App</h1>
                <p className={styles.pageDescription}>
                    A tiny app that allows you to take notes by recording your voice
                </p>
                <div className={styles.Speech}>
                    <h3>Add New Note</h3>
                    <div className="input-single">
                        <p>Create a new note by using voice recognition.</p>
                        <p>
                            This app is best used on desktop, because there is a 
                            <strong className={styles.strong}> repeat bug </strong> 
                            on <strong className={styles.strong}>Google Chrome mobile</strong>.
                        </p>
                        <p>Access detailed instructions <a 
                            className={styles.documentation} 
                                href="https://github.com/interglobalmedia/speech-to-text-app" 
                                target="blank" rel="noopener noreferrer">here
                                </a>.
                        </p>
                        <p id="recording-instructions">
                        Press the blue 
                        <strong className={styles.strong}> Start Recognition
                        </strong> button and allow access.
                        </p>
                        <div className={styles.supportMsg} id="support-msg">
                        {'webkitSpeechRecognition' in window ? 
                        'Your browser supports speech recognition.' 
                        : 'Sorry but your browser does not support speech recognition.'}
                        </div>
                        <div className={styles.storagequotaMsg} id="storagequota-msg"></div>
                        <button onClick={SaveNote} className={styles.saveNote} title="Save Note">
                        Save Note
                        </button>
                        <button onClick={sessionStorageToFile} className={styles.fileSaveButton}>
                            <a className={styles.download} id="save" title="Download Notes">
                            Download
                            </a>
                        </button>
                        <button onClick={reset} className={styles.reset} title="Clear All Notes">
                        Refresh
                        </button>
                    </div>
                    <div id="interim" className={styles.interim} rows="3">
                    Interim draft goes here
                    </div>
                    <div id="final" className={styles.final} rows="3">
                    Final draft goes here
                    </div>
                    <button id='microphone-btn' className={styles.button} onClick={this.toggleListen}>
                        <FontAwesomeIcon icon={faPlayCircle} />
                    </button>

                    <h3>My Saved Notes</h3>
                    <button className={styles.getStorage} onClick={GetNotes} title="Get Storage">
                    Get Storage
                    </button>
                    <button onClick={clearAll} className={styles.deleteAll} title="Clear All Notes">
                    Clear Storage
                    </button>
                    <ul id="storage">
                        <li id="note">
                        </li>
                    </ul>
                    <ul className="notes"></ul>
                </div>
            </div>
        )
    }
}

export default Speech;