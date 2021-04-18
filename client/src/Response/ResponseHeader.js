import React from 'react';
import './ResponseHeader.css';
import { Avatar, IconButton } from '@material-ui/core';
import { useStateValue } from '../StateProvider';
import {useHistory} from 'react-router-dom'
import {auth} from '../firebase'
import { Button } from '@material-ui/core';

function ResponseHeader() {

    const history = useHistory()
    const signOut = () => {
        auth.signOut()
    }
    const routeChangeHome = () => { 
        let path = '/Home/HomeApp'; 
        history.push(path);
      }
    const [{ user }, dispatch] = useStateValue();
    return (
        <div className="header">
            <div className="header__left">
            <div className="Potential"onClick={routeChangeHome}>
                <h1>P</h1>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe-a7-XVOwU7kusXzXdZ49tn_IUmAQ_gcUXg&usqp=CAU"/>
                <h1>tential</h1>
                </div>
            </div>
        <div className="Feedheader__right">
        <div className="Feedheader__info" >
            <Avatar src = {user.photoURL} />
            <h4> {user.displayName} </h4>
        </div>
        <Button type="submit" onClick={signOut}>SIGN OUT</Button>
        
         
         </div>  
        </div>
    )
}

export default ResponseHeader
