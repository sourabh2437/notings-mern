import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import '../App.css';
import {Row,Col} from 'reactstrap';
import moment from 'moment';
class EditNote extends Component{
  constructor(props){
    super(props);
    this.state = {
      note:{}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.fnOnAnalyse = this.fnOnAnalyse.bind(this);
    this.fnOnSync = this.fnOnSync.bind(this);
  }
  componentDidMount(){
    axios.get('/notes/' + this.props.match.params.id)
    .then(res => {
      this.setState({note:res.data});
    })
  }

  handleChange(content, delta,source, editor) {
    //console.log(editor);
    var aText = editor.getText().split("\n");
    let note = {...this.state.note};
    note.textValue =  aText;
    note.updated_date = moment().format('lll');
    note.textHtml =  content;
    this.setState({note});
  }

  handleTitleChange(content, delta, source, editor) {
    var sTitle = editor.getText().split("\n")[0];
    let note = {...this.state.note};

    note.titleValue =  sTitle;
    note.titleHtml =  content;
    note.updated_date = moment().format('lll');
    this.setState({note});
  }
  fnOnAnalyse(){
    const { textValue, titleValue, textHtml, titleHtml, creation_date, updated_date } = this.state.note;

    axios.put('/notes/' + this.props.match.params.id, { textValue, titleValue, textHtml, titleHtml, creation_date, updated_date })
      .then((result) => {
        //this.props.history.push("/")
      });
  }
  fnOnSync(){

  }
  render(){
    return(
      <div className="container-fluid custom-app">
        <Row>
          <div>
            <div className="note-timestamp">
              {moment(this.state.note.creation_date).format('lll')}
            </div>
            <div className="note_action_buttons">
              <button className="btn btn-xs btn-success pull-right sync-button" onClick={this.fnOnSync}>Sync</button>
              <button className="btn btn-xs btn-primary pull-right analyse-button" onClick={this.fnOnAnalyse}>Analyse</button>
            </div>
          </div>
        </Row>
        <Row>
          <ReactQuill className="quill-title" theme="bubble" placeholder="Add title" value={this.state.note.titleHtml || " "} onChange={this.handleTitleChange} />
          <ReactQuill id="quill" className="quill-editor" theme="bubble" placeholder="Add note" value={this.state.note.textHtml|| " "}
                    onChange={this.handleChange} />
        </Row>
      </div>
    );
  }
}
export default EditNote;
