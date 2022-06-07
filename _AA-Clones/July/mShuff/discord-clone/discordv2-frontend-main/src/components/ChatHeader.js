import React from 'react';
import './stylesheets/ChatHeader.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/authentication';


function ChatHeader({ title, topic, channelId }) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="chatHeader">

            <div className="chatHeader__left">
                <h3><span className="chatHeader__hash">#</span>{ title }-{ channelId }</h3>
            </div>

            <div className="chatHeader__right">

                <div className="chatHeader__logout">
                    <ExitToAppIcon onClick={ handleLogout } size="40" />
                </div>
            </div>

        </div>
    );
}

export default ChatHeader;
