import React from 'react';
import './CreatePostHeader.css';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { Avatar, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStateValue } from '../StateProvider';
import {useHistory} from 'react-router-dom'
function CreatePostHeader() {
    const [{ user }, dispatch] = useStateValue();
    const history = useHistory()

    const routeChangeFeed = () => { 
        let path = `/Home/HomeApp`; 
        history.push(path);
      }
    return (
        <div className="header">
            <div className="header__left"onClick={routeChangeFeed}>
            <div className="title">
                <h1>P</h1>
                    
                </div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe-a7-XVOwU7kusXzXdZ49tn_IUmAQ_gcUXg&usqp=CAU"
                />
                
                <div className="title">
                <h1>tential</h1>
                    
                </div>
               
            </div>
        

        <div className="header__right">
        <div className="header__info">
            <Avatar src = {user.photoURL} />
            <h4> {user.displayName} </h4>
        </div>
        
         </div>  
        </div>
    )
}

export default CreatePostHeader
