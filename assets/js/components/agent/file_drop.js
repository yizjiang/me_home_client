var React = require('react');
var Dropzone = require('react-dropzone'),
  ServerActions = require('../../actions/server_action'),
  UserStore = require('../../stores/user_store'),
  Button = require('react-bootstrap').Button;

var FileDrop = React.createClass({
  getInitialState: function () {
    return {
      files: []
    };
  },

  onDrop: function (files) {
    this.setState({
      files: files
    });
    ServerActions.uploadFile(files[0], UserStore.getCurrentUser());
  },

  onOpenClick: function () {
    this.refs.dropzone.open();
  },

  render: function () {
    var content;
    if (this.state.files.length > 0) {
      content = <div>
        <h2>Uploaded {this.state.files.length} files...</h2>
        <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
      </div>
    } else {
      content = (<div><Dropzone ref="dropzone" onDrop={this.onDrop}>
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
        <Button bsStyle='success' onClick={this.onOpenClick}>Open Dropzone</Button></div>)
    }


  return (
    <div>
      {content}
    </div>
    );
}
})
;

module.exports = FileDrop;