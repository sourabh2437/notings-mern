import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import '../App.css';
import {Row,Col} from 'reactstrap';
import moment from 'moment';
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class  CreateNote extends Component{
  constructor(props){
    super(props);
    this.state = {
      textValue:[],
      titleValue:"",
      textHtml:"",
      titleHtml:"",
      creation_date : null,
      updated_date :null,
      aResponse:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.fnOnAnalyse = this.fnOnAnalyse.bind(this);
    this.fnOnSync = this.fnOnSync.bind(this);
    this.fnCallRecastAPI = this.fnCallRecastAPI.bind(this);
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
      var aNotes = [];
      aNotes.push(titleValue);
      for(let i=0;i<textValue.length;i++){
        if(textValue[i] !== ""){
          aNotes.push(textValue[i]);
        }
      }
      this.fnCallRecastAPI(aNotes,0,aNotes.length);
  }

  fnCallRecastAPI(aNotes, index, length){
      if(index >= length){
        return;
      }else{
        var that = this;
        fetch('https://api.recast.ai/v2/request/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token df06ae2b77ecb0f1f56da0059b7dd166'
              },
              body: JSON.stringify({
                text: aNotes[index],
                language: 'en',
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                var aResponse = this.state.aResponse.concat(responseJson);
                this.setState({ aResponse: aResponse });
                console.log(this.state.aResponse);
              }).then(function(){
                that.fnCallRecastAPI(aNotes,index+1,length);
            })
            .catch((error) => {
              console.error(error);
            });
     }
  }
  fnOnSync(){

  }
  render(){
    return(
      <div className="container-fluid custom-app">
        <Row>
          <div>
            <div className="note-timestamp">
              {this.state.creation_date}
            </div>
            <div className="note_action_buttons">
              <button className="btn btn-xs btn-success pull-right sync-button" onClick={this.fnOnSync}>Sync</button>
              <button className="btn btn-xs btn-primary pull-right analyse-button" onClick={this.fnOnAnalyse}>Analyse</button>
            </div>
          </div>
        </Row>
        <Row>
          <ReactQuill className="quill-title" theme="bubble" placeholder="Add title" value={this.state.titleHtml || " "} onChange={this.handleTitleChange} />
          <ReactQuill id="quill" className="quill-editor" theme="bubble" placeholder="Add note" value={this.state.textHtml|| " "}
                    onChange={this.handleChange} />
        </Row>
      </div>
    );
  }
}
export default CreateNote;
