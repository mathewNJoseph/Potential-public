import React, { Component, useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import {storageRef} from '../firebase';
import './EditorSection.css'
import { Button } from '@material-ui/core';
//import { useAlert } from 'react-alert'

// The editor page to edit the "Collaborative Response"
class EditorSection extends Component{

    constructor(props){
        super(props)
        this.state = {  
            editorState: EditorState.createEmpty(),
            ref: storageRef,
            readOnly: true,
            // onSaveWasCalled: false,

            
            // array: []
          };

          this.onSaveWasCalled = false

          this.toggleBlockType = this._toggleBlockType.bind(this);
          this.toggleInlineStyle = this._toggleInlineStyle.bind(this);

          this.state.inputId = props.id
          

    }
    

  // Function called to load the content in the editor section 
  // Pulls the content from firestore storage
  componentDidMount() {
    this.updateEditor()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "FONT_SIZE_100"))
  }

  onChange = (editorState) => {
    this.setState({ editorState })
  }
  
  // Function called to save the content in the editor section 
  // Stores content in firestore storage
  onSave = () => {

    if (!this.onSaveWasCalled){
      this.setState({readOnly: true})
    }
    this.onSaveWasCalled = true

    const contentState = this.state.editorState.getCurrentContent()

    const blob = new Blob([JSON.stringify(convertToRaw(contentState))], {type: "text"})
    const newRef = this.state.ref.child(this.state.inputId)
    
    newRef.put(blob).then((snapshot) => {
      console.log("Uploaded File")
      alert("Your changes have been saved")
    }).catch((error) => {
      console.log(error)
    })
  }

  // reloads the editor with the content saved on the firebase storage 
  updateEditor = () => {
    
    var blob = null
    storageRef.child(this.state.inputId).getDownloadURL().then((url) => {

      if (url){        
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {

          xhr.response.text().then((result) =>{

            let jsonResponse = JSON.parse(result);
            this.onChange(EditorState.createWithContent(convertFromRaw(jsonResponse)))
          })

          
          blob = xhr.response.text;
        };
        xhr.open('GET', url);
        xhr.send();
      } 
 
    }).catch((error) => {
      const contentState = this.state.editorState.getCurrentContent()
      const blob = new Blob([JSON.stringify(convertToRaw(contentState))], {type: "text"})
      const newRef = this.state.ref.child('blobFile')
      
      newRef.put(blob).then((snapshot) => {
        console.log("Uploaded File")
      }).catch((error) => {
        console.log(error)
      })
      
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
    if (!this.onSaveWasCalled){
      this.setState({readOnly: false});
    }
    this.onSaveWasCalled = false

    // this.setState({showButtons: true})
    // document.getElementsByClassName("boldButton").hidden = true
    // return !this.state.readOnly;
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
      <>
      

      <div className = "RichEditor-root" onClick={this.enableWrite}>
        <span className="editorHeader">
          <h1>Collaborative Response</h1>
          <Button onClick={() => {this.setState({readOnly: true})}} className="editButton">Edit</Button>
          {/* <button onClick={() => {this.setState({readOnly: true})}} className="editButton">Edit</button> */}
        </span>
        <div className="buttons">
          {!this.state.readOnly ? 
          <span className='subButtons'> 
            <BlockStyleControls
              editorState={this.state.editorState}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={this.state.editorState}
              onToggle={this.toggleInlineStyle}
            />
            
            <button onClick={this.onSave} className="saveButton">Save</button>
            <button onClick={this.updateEditor} className="updateButton">Update</button>
          </span>
          : null}
        </div>
        <div className={className}>
          <Editor
            editorClassName="editorSection"
            editorState={this.state.editorState}
            handleKeyCommand = {this.handleKeyCommand}
            onChange={this.onChange}
            readOnly={this.state.readOnly}
            // plugins={plugins}
          />
        </div>
      </div>

      </>
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
    <span className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </span>
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
    <span className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </span>
  );
};



export default EditorSection