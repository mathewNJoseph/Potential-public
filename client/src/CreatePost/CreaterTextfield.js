import React, { Component, useState } from 'react';
import db, {storageRef} from '../firebase';
import firebase from 'firebase';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import {useHistory} from 'react-router-dom'
import "./CreaterTextfield.css"

function CreaterTextfield({inputProfilePic, inputUsername}) {
    const ref = storageRef
    const history = useHistory()
    const [textarea, setTextarea] = useState("")
    const [profile_pic, setProfile_pic] = useState(inputProfilePic)
    const [username, setUsername] = useState(inputUsername)
    const [image, setImage] = useState("")

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onClick = (e) => {
        var id = ""
        const result = db.collection('Posts').add({
            message: textarea,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            profile_pic: profile_pic,
            username: username,
            image: image,
        }).then((event) => {
            const contentState = EditorState.createEmpty().getCurrentContent()
            const blob = new Blob([JSON.stringify(convertToRaw(contentState))], {type: "text"})
            const newRef = ref.child(event.id) 
            
            newRef.put(blob).then((snapshot) => {
                console.log("Uploaded File")

            }).catch((error) => {
                console.log(error)
            })
            routeToReponse()
        })
        setTextarea("")
        
    }

    const routeToReponse = () => {
        let path = '/Feed/FeedApp'
        history.push(path)
    }

    const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      setEditorState(newState)
      return 'handled'
    }

    return 'not-handled'
    }


    return (
        <div className="textfield">
                <h2>Post about an issue in you community</h2>
                <textarea className="textArea" value={textarea} onChange={(event) => {setTextarea(event.target.value)}} />
                <h2>Input an image URL</h2>
                <input className="imageInput" value={image} onChange={(event) => {setImage(event.target.value)}} />
                <button className="submitButton" onClick={onClick}>Submit</button>
                <Editor 
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={(inputEditor) => setEditorState(inputEditor)}
                />
                <h2>Hello</h2>
            </div>
    )
}

export default CreaterTextfield