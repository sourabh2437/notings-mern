import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';
import { Card, Button, CardTitle,CardGroup, CardText, Row, Col } from 'reactstrap';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      notes:[]
    }
  }
  componentDidMount(){
    axios('/notes').then(res => {
      this.setState({notes : res.data });
      console.log(this.state.notes);
    })
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
              <Link className="pull-right" to="/create"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>New Note</Link>
            </div>
          </div>
        </Row>
        <Row>
          {this.state.notes.map(note =>
              <Col sm="10" md="5" lg="3" key={note._id} className="card-col">
                <Link to={`/edit/${note._id}`}>
                <Card className="custom-note-tile">
                  <CardTitle>{note.titleValue}</CardTitle>
                  <CardText><small>{moment(note.updated_date).format('lll')}</small></CardText>
                </Card>
                </Link>
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
