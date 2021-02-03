import React, { useEffect, useRef } from 'react';
// import moment from 'moment';
import './stylesheets/Message.css';
import { Avatar } from '@material-ui/core';

function Message({ messageInfo }) {
    const messageElement = useRef(null);
    useEffect(() => {
        if (messageElement.current) {
            messageElement.current.scrollIntoView({
                block: 'nearest'
            });
        }

    }, []);

    return (
        <div ref={ messageElement } className="message">
            <Avatar className="messageAvatar" />
            <div className="message__info">
                <h4>{ messageInfo.User.username }
                    <span className="message__timestamp">{ messageInfo.createdAt }</span>
                </h4>
                <p>{ messageInfo.body }</p>
            </div>

        </div>
    );
}


export default Message;
