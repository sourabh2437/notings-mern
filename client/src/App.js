import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './App.css';
import { Card, CardTitle, CardText, Row, Col,Form, FormGroup, Label, Input } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      notes : [],
      selectedNotes : [],
      enableDelete : false,
      editMode : false
    }
    this.fnOnEdit = this.fnOnEdit.bind(this);
    this.fnToggleCheckBox = this.fnToggleCheckBox.bind(this);
    this.fnOnDeleteNote = this.fnOnDeleteNote.bind(this);
  }
  componentDidMount(){
    axios('/notes').then(res => {
      this.setState({notes : res.data });
      console.log(this.state.notes);
    })
  }
  fnToggleCheckBox(id,e){
    debugger;
    let isChecked = e.target.checked;
    let isPresent = false;
    if(isChecked){
      for(var i = 0;i<this.state.selectedNotes.length;i++){
        if(id === this.state.selectedNotes[i]){
          isPresent = true;
          break;
        }
      }
      if(!isPresent){
        this.setState({ selectedNotes: [...this.state.selectedNotes, id] });
      }
    }else{
      var aSelectedNotes = this.state.selectedNotes;
      for(var j = 0;j<aSelectedNotes.length;j++){
        if(id === aSelectedNotes[j]){
          isPresent = true;
          aSelectedNotes.splice(j,1);
          this.setState({
            selectedNotes : aSelectedNotes
          });
          break;
        }
      }
    }
  }
  fnOnDeleteNote(){
    for(let i = 0; i< this.state.selectedNotes.length;i++){
      let id = this.state.selectedNotes[i];
      axios.delete('/notes/' + id)
        .then((result) => {
        });
    }
    axios('/notes').then(res => {
      this.setState({
        notes : res.data,
        enableDelete : false,
        selectedNotes : [],
        editMode : false
      });
      console.log(this.state.notes);
    })

  }
  fnOnEdit(){
    this.setState({
      editMode: !this.state.editMode
    });
  }
  //
  render() {
    return (
      <div className="container-fluid custom-app">
        <Row>
          <div>
            <div className="header">
              <h1 className="h1">Notes</h1>
            </div>
            <div className="new_note">
              {this.state.editMode &&
                <button className="btn btn-xs btn-warning pull-right edit-button" onClick={this.fnOnEdit}>Cancel</button>
              }
              {this.state.editMode &&
                <button className="btn btn-xs btn-danger pull-right delete-multiple-notes"
                  onClick={this.fnOnDeleteNote} >
                  <span className="glyphicon glyphicon-trash"></span>
                </button>
              }
              {!this.state.editMode &&
                <button className="btn btn-xs btn-primary pull-right edit-button" onClick={this.fnOnEdit}>Edit</button>
              }
              {!this.state.editMode &&
                <Link className="pull-right" to="/create"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>New Note</Link>
              }

            </div>
          </div>
        </Row>
        <Row className="note_tiles">
          {this.state.notes.map(note =>
              <Col xs="12" sm="3" md="3" lg="3" key={note._id} className="card-col">
                {!this.state.editMode &&
                  <Link to={`/edit/${note._id}`}>
                    <Card className="custom-note-tile">
                        <div>
                          <div className="card-data">
                            <CardTitle>{note.titleValue}</CardTitle>
                            <CardText>
                              <small className="text-muted">{moment(note.updated_date).format('lll')}</small></CardText>
                          </div>
                        </div>
                    </Card>
                  </Link>
                }
                {this.state.editMode &&
                    <Card className="custom-note-tile">
                        <div>
                          {this.state.editMode &&
                            <div className="checkBox pull-right">
                              <FormGroup check>
                               <Label check>
                                 <Input type="checkbox" onChange={this.fnToggleCheckBox.bind(this,note._id)}/>
                               </Label>
                             </FormGroup>
                            </div>
                          }
                          <div className="card-data">
                            <CardTitle>{note.titleValue}</CardTitle>
                            <CardText>
                              <small className="text-muted">{moment(note.updated_date).format('lll')}</small></CardText>
                          </div>
                        </div>
                    </Card>

                }

              </Col>
          )}
          </Row>

        {/*<footer className="navbar navbar-default navbar-fixed-bottom">
          <div className="container">
            <Link className="pull-right" to="/create"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> New Note</Link>
          </div>
        </footer>*/}
      </div>
    );
  }
}

export default App;
