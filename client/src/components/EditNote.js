import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import '../App.css';
import {Row} from 'reactstrap';
import moment from 'moment';
import $ from 'jquery';
import {
  Modal,
  Button,
  Table,
  tr,
  thead,
  tbody,
  td
} from 'react-bootstrap';
const {Delta} = ReactQuill;
class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {},
      show: false,
      aResponse: [],
      aPO: [],
      aNewQt: [],
      aNewPO: [],
      showConfirmationDialog: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.fnOnAnalyse = this.fnOnAnalyse.bind(this);
    this.fnOnSync = this.fnOnSync.bind(this);
    this.fnCallRecastAPI = this.fnCallRecastAPI.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.fnOnDeleteNote = this.fnOnDeleteNote.bind(this);
    this.fnShowConfirmationDialog = this.fnShowConfirmationDialog.bind(this);
  }
  componentDidMount() {
    axios.get('/notes/' + this.props.match.params.id).then(res => {
      this.setState({note: res.data});
    })
  }
  handleClose() {
    this.setState({show: false, showConfirmationDialog: false});
  }

  handleShow() {
    this.setState({show: true});
  }
  fnShowConfirmationDialog() {
    this.setState({show: false, showConfirmationDialog: true});
  }
  handleChange(content, delta, source, editor) {
    //console.log(editor);
    var aText = editor.getText().split("\n");
    let note = {
      ...this.state.note
    };
    note.textValue = aText;
    note.updated_date = moment().format('lll');
    note.textHtml = content;
    this.setState({note});
    var that = this;
    this.oTextDelta = delta;
    this.oTextDelta = this.oTextDelta.compose(delta);
    setTimeout(function() {
      const {
        textValue,
        titleValue,
        textHtml,
        titleHtml,
        creation_date,
        updated_date
      } = that.state.note;
      if (Object.keys(that.oTextDelta).length !== 0 && that.oTextDelta.length() > 0) {
        axios.put('/notes/' + that.props.match.params.id, {
          textValue,
          titleValue,
          textHtml,
          titleHtml,
          creation_date,
          updated_date
        }).then((result) => {
          //this.props.history.push("/")
        });
        that.oTextDelta = {};
      }

    }, 5000);
  }

  handleTitleChange(content, delta, source, editor) {
    var sTitle = editor.getText().split("\n")[0];
    let note = {
      ...this.state.note
    };
    note.titleValue = sTitle;
    note.titleHtml = content;
    note.updated_date = moment().format('lll');
    this.setState({note});
    var that = this;
    this.oTitleDelta = delta;
    this.oTitleDelta = this.oTitleDelta.compose(delta);
    setTimeout(function() {
      const {
        textValue,
        titleValue,
        textHtml,
        titleHtml,
        creation_date,
        updated_date
      } = that.state.note;
      if (titleValue !== "" && (Object.keys(that.oTitleDelta).length !== 0 && that.oTitleDelta.length() > 0)) {
        axios.put('/notes/' + that.props.match.params.id, {
          textValue,
          titleValue,
          textHtml,
          titleHtml,
          creation_date,
          updated_date
        }).then((result) => {
          //this.props.history.push("/")
        });
        that.oTitleDelta = {};
      }
    }, 5000);
  }
  fnOnDeleteNote() {
    let id = this.state.note._id;
    axios.delete('/notes/' + id).then((result) => {
      this.props.history.push("/")
    });
  }
  fnOnAnalyse() {
    const {
      textValue,
      titleValue,
      textHtml,
      titleHtml,
      creation_date,
      updated_date
    } = this.state.note;

    axios.put('/notes/' + this.props.match.params.id, {
      textValue,
      titleValue,
      textHtml,
      titleHtml,
      creation_date,
      updated_date
    }).then((result) => {
      //this.props.history.push("/")
    });
    var aNotes = [];
    this.setState({aResponse: [], aPO: [], aNewQt: [], aNewPO: []});
    aNotes.push(titleValue);
    for (let i = 0; i < textValue.length; i++) {
      if (textValue[i] !== "") {
        aNotes.push(textValue[i]);
      }
    }
    this.fnCallRecastAPI(aNotes, 0, aNotes.length);
  }
  fnCallRecastAPI(aNotes, index, length) {
    if (index >= length) {
      return;
    } else {
      var that = this;
      fetch('https://api.recast.ai/v2/request/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token df06ae2b77ecb0f1f56da0059b7dd166'
        },
        body: JSON.stringify({text: aNotes[index], language: 'en'})
      }).then((response) => response.json()).then((responseJson) => {
        var aResponse = this.state.aResponse.concat(responseJson);
        this.setState({aResponse: aResponse});
        console.log(this.state.aResponse);
      }).then(function() {
        that.fnCallRecastAPI(aNotes, index + 1, length);
      }).catch((error) => {
        console.error(error);
      });
    }
  }
  fnOnSync() {
    // this.setState({ show: true });
    // var bInitial = 0;
    // var bInitial2 = 0;
    // var bInitial3 = 0;
    // var oGlobal = {};
    // var aResponse = this.state.aResponse;
    // this.aPurchaseOrder = [];
    // this.aNewQuotation = [];
    // this.aNewPurchaseOrder = [];
    // for (var i = 0; i < aResponse.length; i++) {
    //     if (aResponse[i].results.intents[0] !== undefined && aResponse[i].results.intents[0].slug === "update-purchase-order") {
    //         var oCurr = aResponse[i].results.entities;
    //         var oObj = this.fnCheckProperties(oCurr);
    //         if (oCurr.hasOwnProperty("purchase-order-number")) {
    //             if (bInitial === 0) {
    //                 bInitial = 1;
    //                 this.oCurrObj = {};
    //                 $.extend(this.oCurrObj, oObj);
    //             } else if (bInitial === 1) {
    //                 bInitial = 1;
    //                 this.aPurchaseOrder.push(this.oCurrObj);
    //                 this.oCurrObj = {};
    //                 $.extend(this.oCurrObj, oObj);
    //             }
    //
    //         } else if (bInitial === 0) {
    //             $.extend(oGlobal, oObj);
    //         } else if (bInitial === 1) {
    //             $.extend(this.oCurrObj, oObj);
    //         }
    //
    //
    //     } else if (aResponse[i].results.intents[0] !== undefined && aResponse[i].results.intents[0].slug === "create-purchase-order") {
    //       var oCurr = aResponse[i].results.entities;
    //       var oObj = this.fnCheckProperties(oCurr);
    //       if(bInitial3 ===0 ){
    //         bInitial3 = 1;
    //         this.oNewPOObj =  {};
    //         $.extend(this.oNewPOObj, oObj);
    //       }else{
    //         $.extend(this.oNewPOObj, oObj);
    //       }
    //          var oCurr = aResponse[i].results.entities;
    //          var len = Object.keys(oCurr).length;
    //          this.oNewPOOrg = this.fnCreateNewPOObject(oCurr);
    //          this.aNewPurchaseOrder.push(this.oNewPOOrg);
    //     } else if (aResponse[i].results.intents[0] !== undefined && aResponse[i].results.intents[0].slug === "create-quotation") {
    //        var oCurr = aResponse[i].results.entities;
    //        var len = Object.keys(oCurr).length;
    //        this.oNewQtn = this.fnCreateNewQtnObject(oCurr);
    //        this.aNewQuotation.push(this.oNewQtn);
    //       var oCurr = aResponse[i].results.entities;
    //       var oObj = this.fnCheckProperties(oCurr);
    //       if(bInitial2 ===0 ){
    //         bInitial2 = 1;
    //         this.oCurrQtnObj =  {};
    //         $.extend(this.oCurrQtnObj, oObj);
    //       }else{
    //         $.extend(this.oCurrQtnObj, oObj);
    //       }
    //     }
    // }
    // if (this.oCurrObj !== undefined) {
    //   this.aPurchaseOrder.push(this.oCurrObj);
    // }
    // if(this.oCurrQtnObj!== undefined){
    //   this.aNewQuotation.push(this.oCurrQtnObj);
    // }
    // if(this.oNewPOObj!== undefined){
    //   this.aNewPurchaseOrder.push(this.oNewPOObj);
    // }
    // for (var i = 0; i < this.aPurchaseOrder.length; i++) {
    //     $.extend(this.aPurchaseOrder[i], oGlobal);
    // }
    // this.setState({
    //     aPO: [ ...this.state.aPO, ...this.aPurchaseOrder ],
    //     aNewQt: [ ...this.state.aNewQt, ...this.aNewQuotation ],
    //     aNewPO: [ ...this.state.aNewQt, ...this.aNewPurchaseOrder ]
    // })
    this.setState({show: true, aPO: [], aNewQt: [], aNewPO: []});
    var bInitial = 0;
    var bInitial2 = 0;
    var bInitial3 = 0;
    this.oGlobal = {};
    var aResponse = this.state.aResponse;
    this.aPurchaseOrder = [];
    this.aNewQuotation = [];
    this.aNewPurchaseOrder = [];

    // this.setState({
    //   aPO: [ ...this.state.aPO, ...this.aPurchaseOrder ],
    //   aNewQt: [ ...this.state.aNewQt, ...this.aNewQuotation ],
    //   aNewPO: [ ...this.state.aNewQt, ...this.aNewPurchaseOrder ]
    // });

    this.sIntent = "";
    this.oPOobj = {};
    this.oNewPOobj = {};
    this.oNewQtnobj = {};
    for (var i = 0; i < aResponse.length; i++) {
      debugger;
      var oEntities;
      if (aResponse[i].results.intents[0] !== undefined) {
        oEntities = aResponse[i].results.entities;
        if (Object.keys(oEntities).length === 1) {
          //Change intents here
          //this.sIntent = Object.keys(oEntities)[0];
          bInitial2 = 0;
          bInitial3 = 0;
          this.sIntent = aResponse[i].results.intents[0].slug; //=== "create-purchase-order";
        } else if (Object.keys(oEntities).length === 2 && oEntities.hasOwnProperty("purchase-order-number")) {
          this.sIntent = aResponse[i].results.intents[0].slug;
          //this.sIntent = Object.keys(oEntities)[0];
          bInitial = 0;
          //this.oPOGlobalObj = this.fnCheckProperties(oEntities);
          //$.extend(this.oPOGlobalObj,oGlobalObj);
        } else if (oEntities.hasOwnProperty("supplier")) {
          //handle global values like supplier
          var oGlobalObj = this.fnCheckProperties(oEntities);
          $.extend(this.oGlobal, oGlobalObj);
        }
      }
      oEntities = aResponse[i].results.entities;
      var oObj = this.fnCheckProperties(oEntities);
      if (this.sIntent === "update-purchase-order") {
        if (bInitial === 0) {
          if (Object.keys(this.oPOobj).length !== 0) {
            this.aPurchaseOrder.push(this.oPOobj);
            this.oPOobj = {};
          }
          bInitial = 1;
        }
        $.extend(this.oPOobj, oObj);
      } else if (this.sIntent === "create-purchase-order") {
        if (bInitial2 === 0) {
          if (Object.keys(this.oNewPOobj).length !== 0) {
            this.aNewPurchaseOrder.push(this.oNewPOobj);
            this.oNewPOobj = {};
          }
          bInitial2 = 1;
        }
        $.extend(this.oNewPOobj, oObj);
      } else if (this.sIntent === "create-quotation") {
        if (bInitial3 === 0) {
          if (Object.keys(this.oNewQtnobj).length !== 0) {
            this.aNewQuotation.push(this.oNewQtnobj);
            this.oNewQtnobj = {};
          }
          bInitial3 = 1;

        }
        $.extend(this.oNewQtnobj, oObj);
      }
    }

    if (Object.keys(this.oPOobj).length !== 0) {
      this.aPurchaseOrder.push(this.oPOobj);
      for (let i = 0; i < this.aPurchaseOrder.length; i++) {
        $.extend(this.aPurchaseOrder[i], this.oGlobal);
      }
    }
    if (Object.keys(this.oNewQtnobj).length !== 0) {
      //$.extend(this.oNewQtnobj, this.oGlobal);
      this.aNewQuotation.push(this.oNewQtnobj);
      for (let i = 0; i < this.aNewQuotation.length; i++) {
        $.extend(this.aNewQuotation[i], this.oGlobal);
      }
    }
    if (Object.keys(this.oNewPOobj).length !== 0) {
      this.aNewPurchaseOrder.push(this.oNewPOobj);
      for (let i = 0; i < this.aNewPurchaseOrder.length; i++) {
        $.extend(this.aNewPurchaseOrder[i], this.oGlobal);
      }
    }
    this.setState({
      aPO: [
        ...this.state.aPO,
        ...this.aPurchaseOrder
      ],
      aNewQt: [
        ...this.state.aNewQt,
        ...this.aNewQuotation
      ],
      aNewPO: [
        ...this.state.aNewQt,
        ...this.aNewPurchaseOrder
      ]
    });
  }
  fnCheckProperties(oCurr) {
    if (oCurr.hasOwnProperty("payment-term")) {
      return {
        "PaymentTerms": {
          "newValue": oCurr["payment-term"][0].value,
          "oldValue": "0001"
        }
      }
    } else if (oCurr.hasOwnProperty("delivery-date")) {
      return {
        "DeliveryDate": {
          "newValue": oCurr["delivery-date"][0].value,
          "oldValue": "12/01/2019"
        }
      }
    } else if (oCurr.hasOwnProperty("purchase-order-number")) {
      return {
        "PurchaseOrder": {
          "newValue": oCurr["purchase-order-number"][0].value,
          "oldValue": "-"
        }
      }
    } else if (oCurr.hasOwnProperty("supplier")) {
      return {
        "Supplier": {
          "newValue": oCurr["supplier"][0].value,
          "oldValue": "ASTRID"
        }
      }
    } else if (oCurr.hasOwnProperty("purchasing-group")) {
      return {
        "PurchasingGroup": oCurr["purchasing-group"][0].value
      }
    } else if (oCurr.hasOwnProperty("purchasing-org")) {
      return {
        "PurchasingOrg": oCurr["purchasing-org"][0].value
      }
    } else if (oCurr.hasOwnProperty("material")) {
      return {
        "material": {
          "newValue": oCurr["material"][0].value,
          "oldValue": "MAT_02"
        }
      }
    } else if (oCurr.hasOwnProperty("plant")) {
      return {
        "plant": oCurr["plant"][0].value
      }
    } else if (oCurr.hasOwnProperty("quantity")) {
      return {
        "quantity": {
          "newValue": oCurr["quantity"][0].value,
          "oldValue": "100"
        }
      }
    } else if (oCurr.hasOwnProperty("sales-area")) {
      return {
        "SalesArea": oCurr["sales-area"][0].value
      }
    } else if (oCurr.hasOwnProperty("validity")) {
      return {
        "validity": {
          "newValue": oCurr["validity"][0].value,
          "oldValue": "31/12/2018"
        }
      }
    } else if (oCurr.hasOwnProperty("discount")) {
      return {
        "discount": {
          "newValue": oCurr["discount"][0].value,
          "oldValue": "5%"
        }
      }
    }
  }
  fnCreateNewPOObject(oCurr) {
    var oObj = {};
    if (oCurr.hasOwnProperty("purchasing-group")) {
      $.extend(oObj, {"PurchasingGroup": oCurr["purchasing-group"][0].value
      });
    }
    if (oCurr.hasOwnProperty("purchasing-org")) {
      $.extend(oObj, {"PurchasingOrg": oCurr["purchasing-org"][0].value
      });
    }
    if (oCurr.hasOwnProperty("material")) {
      $.extend(oObj, {"material": oCurr["material"][0].value
      });
    }
    if (oCurr.hasOwnProperty("plant")) {
      $.extend(oObj, {"plant": oCurr["plant"][0].value
      });
    }
    if (oCurr.hasOwnProperty("quantity")) {
      $.extend(oObj, {"quantity": oCurr["quantity"][0].value
      });
    }
    return oObj;
  }
  fnCreateNewQtnObject(oCurr) {
    var oObj = {};
    if (oCurr.hasOwnProperty("material")) {
      $.extend(oObj, {"Material": oCurr["material"][0].value
      });
    }
    if (oCurr.hasOwnProperty("sales-area")) {
      $.extend(oObj, {"Sales Area": oCurr["sales-area"][0].value
      });
    }
    if (oCurr.hasOwnProperty("quantity")) {
      $.extend(oObj, {"Quantity": oCurr["quantity"][0].value
      });
    }
    if (oCurr.hasOwnProperty("validity")) {
      $.extend(oObj, {"Valid Upto": oCurr["validity"][0].value
      });
    }
    if (oCurr.hasOwnProperty("discount")) {
      $.extend(oObj, {"Discount": oCurr["discount"][0].value
      });
    }
    return oObj;
  }
  render() {
    return (<div className="container-fluid custom-app">
      <Row>
        <div>
          <div className="note-timestamp">
            {moment(this.state.note.creation_date).format('lll')}
          </div>
          <div className="note_action_buttons">
            <button className="btn btn-xs btn-danger pull-right delete-note" onClick={this.fnOnDeleteNote}>
              <span className="glyphicon glyphicon-trash"></span>
            </button>
            <button className="btn btn-xs btn-success pull-right sync-button" onClick={this.fnOnSync}>Sync</button>
            <button className="btn btn-xs btn-primary pull-right analyse-button" onClick={this.fnOnAnalyse}>Analyse</button>

          </div>
        </div>
      </Row>
      <Row>
        <ReactQuill className="quill-title" theme="bubble" placeholder="Add title" value={this.state.note.titleHtml || " "} onChange={this.handleTitleChange}/>
        <ReactQuill id="quill" className="quill-editor" theme="bubble" placeholder="Add note" value={this.state.note.textHtml || " "} onChange={this.handleChange}/>
      </Row>
      <Row>
        <div>
          <Modal show={this.state.showConfirmationDialog} onHide={this.handleClose}>
            <Modal.Header closeButton="closeButton">
              <Modal.Title>Information
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                The job
                <strong> QFADS1CDSSJCN23VKDNVDSDS2D232  
                  </strong>
                has been scheduled.</div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-primary" onClick={this.handleClose}>OK</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton="closeButton">
              <Modal.Title>Notings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                this.state.aPO.map((po, itr) => <div key={itr}>Update Purchase Order
                  <Table striped="striped" bordered="bordered" condensed="condensed" hover="hover">
                    <thead>
                      <tr>
                        <th>Fields</th>
                        <th>New Values</th>
                        <th>Old Values</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Object.keys(po).map((key, index) => <tr key={index}>
                          <td>{key}</td>
                          <td>{Object.values(po)[index].newValue}</td>
                          <td>{Object.values(po)[index].oldValue}</td>
                        </tr>)
                      }
                    </tbody>
                  </Table>
                </div>)
              }
              {
                this.state.aNewQt.map((qt, itr) => <div key={itr}>Create new Sales quotaion
                  <Table striped="striped" bordered="bordered" condensed="condensed" hover="hover">
                    <thead>
                      <tr>
                        <th>Fields</th>
                        <th>New Values</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Object.keys(qt).map((key, index) => <tr key={index}>
                          <td>{key}</td>
                          <td>{Object.values(qt)[index].newValue}</td>
                        </tr>)
                      }
                    </tbody>
                  </Table>
                </div>)
              }
              {
                this.state.aNewPO.map((newPo, itr) => <div key={itr}>Create new Purchase Order
                  <Table striped="striped" bordered="bordered" condensed="condensed" hover="hover">
                    <thead>
                      <tr>
                        <th>Fields</th>
                        <th>New Values</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Object.keys(newPo).map((key, index) => <tr key={index}>
                          <td>{key}</td>
                          <td>{Object.values(newPo)[index].newValue}</td>
                        </tr>)
                      }
                    </tbody>
                  </Table>
                </div>)
              }
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-success" onClick={this.fnShowConfirmationDialog}>Apply Changes</Button>
              <Button className="btn btn-primary" onClick={this.handleClose}>Cancel</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Row>
    </div>);
  }
}
export default EditNote;
