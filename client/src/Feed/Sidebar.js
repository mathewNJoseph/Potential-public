import React from 'react';
import './Sidebar.css';
import SidebarRow from './SidebarRow';
import PublicIcon from '@material-ui/icons/Public';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import StorefrontIcon from '@material-ui/icons/Storefront';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { ExpandMoreOutlined } from '@material-ui/icons';
import { useStateValue } from '../StateProvider';
import MapIcon from '@material-ui/icons/Map';
import {useHistory} from 'react-router-dom'

// This component displays the local news feed on the right side
// It currently displays the local news from Santa Cruz
function Sidebar({community}) {
    const [{ user }, dispatch] = useStateValue();
    const history = useHistory()
    const routeChangeMap = () => { 
        let path = `/Map/MapIndex`; 
        history.push(path);
      }
    return (
        <div className="sidebar">
            <SidebarRow src = {user.photoURL} title={user.displayName} />
            <div className="button"onClick={routeChangeMap}>
            <SidebarRow Icon={MapIcon} title={community} /> 
            </div>
            <a href="https://join.slack.com/t/potentialcorp/shared_invite/zt-ogqzd8n5-BMk_bQxEyhmbXlagVZ3~lw" target="_blank"><SidebarRow Icon={ChatIcon} title="Slack" /></a>
           
        </div>
    )
}

export default Sidebar