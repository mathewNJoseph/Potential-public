import React, { useState } from 'react';
import './MessageSender.css';
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router-dom';

// this component is the rectangle above the posts saying "Post about an issue in your community"
// When you click in the input field, it will reroute you to the creater page to create a post
// This functionality was inspired by Reddit's user flow when creating a post. 
function MessageSender() {
    const [{ user }, dispatch] = useStateValue();
    const [input, setInput] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const history = useHistory()

    // reroutes to the creater page to create a post
    const routeChange_creater = () => {
        let path = '/creater'
        history.push(path)
    }
    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <Avatar src={user.photoURL} />
                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onClick={routeChange_creater}
                        className="messageSender__input" placeholder={`Post about an issue in your community`} />

                </form>
            </div>

        </div>
    )
}

export default MessageSender