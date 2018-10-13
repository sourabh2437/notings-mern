import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import '../App.css';
import {Row,Col} from 'reactstrap';
import moment from 'moment';
import axios from 'axios';
class  CreateNote extends Component{
  constructor(props){
    super(props);
    this.state = {
      textValue:[],
      titleValue:"",
      textHtml:"",
      titleHtml:"",
      creation_date : null,
      updated_date :null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.fnOnAnalyse = this.fnOnAnalyse.bind(this);
    this.fnOnSync = this.fnOnSync.bind(this);
  }
  componentDidMount(){
      var oCurrentTime = moment().format('lll');
      this.setState({ creation_date : oCurrentTime });
  }

  handleChange(content, delta,source, editor) {
    //console.log(editor);
    var aText = editor.getText().split("\n");
    var oTime = moment().format('lll');
    this.setState({
      textValue : aText,
      textHtml : content,
      updated_date: oTime
    });
  }

  handleTitleChange(content, delta, source, editor) {
    var sTitle = editor.getText().split("\n")[0];
    var oTime = moment().format('lll');
    this.setState({
      titleValue : sTitle,
      titleHtml : content,
      updated_date: oTime
     });
  }
  fnOnAnalyse(){
    const { textValue, titleValue, textHtml, titleHtml, creation_date, updated_date } = this.state;

    axios.post('/notes', { textValue, titleValue, textHtml, titleHtml, creation_date, updated_date })
      .then((result) => {
        //this.props.history.push("/")
      });
  }
  fnOnSync(){

  }
  render(){
    return(
      <div className="container-fluid">
        <div className="note-timestamp">{this.state.creation_date}</div>
        <Row className="button-row">
          <Col sm="4" md="10">
            <ReactQuill className="quill-title" theme="bubble" placeholder="Add title" value={this.state.titleHtml || " "} onChange={this.handleTitleChange} />
          </Col>
          <Col sm="8" md="2">
            <button className="btn btn-success pull-right sync-button" onClick={this.fnOnSync}>Sync</button>
            <button className="btn btn-primary pull-right analyse-button" onClick={this.fnOnAnalyse}>Analyse</button>
          </Col>
        </Row>
        <Row>

        <ReactQuill id="quill" className="quill-editor" theme="bubble" placeholder="Add note" value={this.state.textHtml|| " "}
                  onChange={this.handleChange} />
        </Row>
      </div>
    );
  }
}
export default CreateNote;
