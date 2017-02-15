
import React from 'react';
import {render} from 'react-dom';
import Loading from 'react-loading';

import { connect  } from 'react-redux';
import { showLoading, hideLoading  } from 'react-redux-loading-bar';
import { shuffle, slice  } from 'lodash';


import {Editor, EditorState, RichUtils,convertToRaw} from 'draft-js';
import $ from 'jquery';

//react-redux-loading-bar-packages
var bands  = []


 class RichEditorExample extends React.Component {
        constructor(props) {
          super(props);
          this.state = {editorState: EditorState.createEmpty()};

          this.focus = () => this.refs.editor.focus();
          this.onChange = (editorState) => this.setState({editorState});

          this.handleKeyCommand = (command) => this._handleKeyCommand(command);
          this.onTab = (e) => this._onTab(e);
          this.toggleBlockType = (type) => this._toggleBlockType(type);
          this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        }

        _handleKeyCommand(command) {
          const {editorState} = this.state;
          const newState = RichUtils.handleKeyCommand(editorState, command);
          if (newState) {
            this.onChange(newState);
            return true;
          }
          return false;
        }

        _onTab(e) {
          const maxDepth = 4;
          this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
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
          const {editorState} = this.state;

          // If the user changes block type before entering any text, we can
          // either style the placeholder or hide it. Let's just hide it now.
          let className = 'RichEditor-editor';
          var contentState = editorState.getCurrentContent();
          if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
              className += ' RichEditor-hidePlaceholder';
            }
          }

          return (
            <div className="RichEditor-root">
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />
              <div className={className} onClick={this.focus}>
                <Editor
                  blockStyleFn={getBlockStyle}
                  customStyleMap={styleMap}
                  editorState={editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  onChange={this.onChange}
                  onTab={this.onTab}
                  placeholder="Tell a story..."
                  ref="editor"
                  spellCheck={true}
                />
              </div>
            </div>
          );
        }
      }

      // Custom overrides for "code" style.
      const styleMap = {
        CODE: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
          fontSize: 16,
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
            <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
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
        {label: 'Code Block', style: 'code-block'},
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
        var currentStyle = props.editorState.getCurrentInlineStyle();
        return (
          <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
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







class App extends React.Component {
	constructor() {
		super();

	}

	render () {
		return (
			<div>
			      <Loading type='bars' color='#000' />
			</div>
		);
	}
};

var BandComponent = React.createClass({
		getInitialState: function() {
	    return {customText: "Text before the click",show:true};
		},
	
	componentDidMount: function() {
		//startLoadingBar
		$.ajax({
		xhr: function() {
				var xhr = new window.XMLHttpRequest();
				 // Download progress
				xhr.addEventListener("progress", function(evt){
				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					// Do something with download progress
					console.log(percentComplete);
					}
				}, false);
				console.log(xhr);
				return xhr;
		},

			      url: "band/api.json",
			      dataType: 'json',
			      cache: false,
			success: function(data) {
					this.setState(
						{data:data}
					);

			}.bind(this),
			error: function(xhr, status, err) {
					console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	//
	//	customClickFunction: function () {
	//		this.setState({customText: "You clicked the button "});
	//	},
	//
		render : function () {
			var bands = []
			for (var key in this.state.data) {
				bands.push(this.state.data[key])
			}

			var testStyle = {fontSize : '18px', marginRight : '20px' ,fontColor : 'Red'}
			return (
				<div style ={testStyle}>
					<button onClick={this.customClickFunction}>Click Me!! </button>
				{
					bands.map(function(band){
					return (
						<Band name={band.name} image={band.image} />
					)
				})
				}
				</div>
			)
		}
	}
);


var Band = React.createClass({
	render : function () {

		return (
			<div>
				<h2>{this.props.name} </h2>
				<img src={this.props.image} />
			</div>
		)
	}
});


render(
      <RichEditorExample />,
        document.getElementById('container')
      );

render(<App/>, document.getElementById('loading-bar'));

render(
	<BandComponent bands={bands} />,
	document.getElementById("content"));

