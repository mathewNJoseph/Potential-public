import React, { Component, useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import db, {storageRef} from '../firebase';
//import { useAlert } from 'react-alert'
import firebase from 'firebase'
import {useHistory} from 'react-router-dom'
import './createrEditor.css'

function PushRoute() {
  const history = useHistory()

  const routeToFeed = () => {
    let path = '/Feed/FeedApp'
    history.push(path)
  }
}

class EditorSection extends Component{
    constructor(props){
        super(props)
        this.state = {  
            editorState: EditorState.createEmpty(),
            ref: storageRef,
            readOnly: false,
            
            // array: []
          };

          this.toggleBlockType = this._toggleBlockType.bind(this);
          this.toggleInlineStyle = this._toggleInlineStyle.bind(this);

          this.state.inputId = props.id
          
          this.profile_pic = props.profilePic
          this.state.image = ""
          this.username = props.username
          this.state.title = ""
          this.community = window.localStorage.getItem("community")
          if (!this.community) {
            this.community = "Santa Cruz"
          }
          // this.message = props.message

    }
    

    
  componentDidMount() {
    // this.updateEditor()
    // this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "FONT_SIZE_100"))
  }

  onChange = (editorState) => {

      this.setState({ editorState })

  }

  onSave = () => {
    const contentState = this.state.editorState.getCurrentContent()

    const serverMessage = JSON.stringify(convertToRaw(contentState)) 

    const result = db.collection("Communities").doc(this.community).collection("Posts").add({
        title: this.state.title,
        message: serverMessage,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        profile_pic: this.profile_pic,
        username: this.username,
        image: this.state.image,
        starred: [],
    }).then((event) => {
        const contentState = EditorState.createEmpty().getCurrentContent()
        const blob = new Blob([JSON.stringify(convertToRaw(contentState))], {type: "text"})
        const newRef = this.state.ref.child(event.id) 
        
        newRef.put(blob).then((snapshot) => {
            console.log("Uploaded File")

        }).catch((error) => {
            console.log(error)
        })
        this.props.routeToFeed()
    })
  }
  
  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)

    if (newState) {
      this.onChange(newState)
      return 'handled'
    }

    return 'not-handled'
  }
  
  onItalicClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }
  

  onStrikethroughClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'))
  }

  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
  }

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }

  onToggleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState))
    // RichUtils.toggleInlineStyle
  }

  enableWrite = () => {
    this.setState({readOnly: false});
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }



  render() {
    let className = 'RichEditor-editor';
    var contentState = this.state.editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className="textfield">
      <input className="titleInput" value={this.state.title} onChange={(event) => {this.setState({title: event.target.value})}} placeholder=" Title"/>
      <div className = "RichEditor-root" onClick={this.enableWrite}>
        <div className="buttons">
          {!this.state.readOnly ? 
          <div> 
            <BlockStyleControls
              editorState={this.state.editorState}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={this.state.editorState}
              onToggle={this.toggleInlineStyle}
            />
          </div>
          : null}
        </div>
        <div className={className}>
          <Editor
            editorClassName="editorSection1"
            editorState={this.state.editorState}
            handleKeyCommand = {this.handleKeyCommand}
            onChange={this.onChange}
            readOnly={this.state.readOnly}
            placeholder="Details"
          
          />
        </div>
      </div>
      <input className="imageInput" value={this.state.image} onChange={(event) => {this.setState({image: event.target.value})}} placeholder=" Image URL (Optional)"/>
      <button className="submitButton" onClick={this.onSave} >Submit</button>
      </div>
    );
  }
}

const styleMap = {
  
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 100,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <button className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </button>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};



export default EditorSection