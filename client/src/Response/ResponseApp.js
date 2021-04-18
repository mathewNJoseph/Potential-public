import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import './ResponseApp.css';
import HomeApp from '../Home/HomeApp';
import { useStateValue } from '../StateProvider';
import ResponseHeader from './ResponseHeader'
import ResponseBody from './ResponseBody'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import EditorSection from './EditorSection'

// container for all the sub-components for the reponse section
function ResponseApp() {
    const [{ user }, dispatch] = useStateValue(); 
    const location = useLocation();
    const {state} = location;
    
    const history = useHistory()

    useEffect(() => {
      window.scrollTo(0,0)

    }, [])

    if (!user || location == undefined || state == undefined) {
      let path = "/"
      history.push(path)
      return ( 
        <h1>ERROR</h1>
      )
    } else {
      return (
        <>     
        <ResponseHeader />
        <div className="ResponseApp">
        <div className="ResponseApp__body">
            <ResponseBody post={state.postDetail}/>
            <div className="SolutionResponseApp__body">
            <EditorSection id={state.postDetail.id}/>
            </div>
        </div>
        </div>
        </>
      )
    }
}
export default ResponseApp