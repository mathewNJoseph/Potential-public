import React from 'react';
import './FeedHeader.css';
import { Avatar, IconButton } from '@material-ui/core';
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase'
import { Button } from '@material-ui/core';

// This is the top bar of the feed page. The difference between this and the home page Header is the user's username and sign out button
function Header() {
    const [{ user }, dispatch] = useStateValue();
    const history = useHistory()

    // reroutes to the home page
    const routeChangeFeed = () => {
        let path = `/`;
        history.push(path);
    }

    // signs the user out
    const signOut = () => {
        auth.signOut()
    }
    return (
        <div className="header">
            <div className="header__left">
                <div className="Potential" onClick={routeChangeFeed}>
                    <h1>P</h1>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe-a7-XVOwU7kusXzXdZ49tn_IUmAQ_gcUXg&usqp=CAU"
                    />
                    <h1>tential</h1>
                </div>
            </div>
            <div className="Feedheader__right">
                <div className="Feedheader__info" >
                    <Avatar src={user.photoURL} />
                    <h4> {user.displayName} </h4>
                </div>
                <Button type="submit" onClick={signOut}>SIGN OUT</Button>


            </div>
        </div>
    )
}

export default Header
