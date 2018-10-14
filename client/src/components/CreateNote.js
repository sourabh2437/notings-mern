import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import '../App.css';
import {Row,Col} from 'reactstrap';
import moment from 'moment';
import axios from 'axios';
import { Throttle } from 'react-throttle';
import $ from 'jquery'
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
      aResponse:[],
      aPurchaseOrder:[],
      aNewQuotation:[],
      aNewPurchaseOrder:[]
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
        //this.newNoteId = result.data._id;
        //console.log(result);
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
    var bInitial = 0;
    var oGlobal = {};
    var aResponse = this.state.aResponse;
    for (var i = 0; i < aResponse.length; i++) {
        if (aResponse[i].results.intents[0] !== undefined && aResponse[i].results.intents[0].slug === "update-purchase-order") {
            var oCurr = aResponse[i].results.entities;
            var oObj = this.fnCheckProperties(oCurr);
            if (oCurr.hasOwnProperty("purchase-order-number")) {
                if (bInitial === 0) {
                    bInitial = 1;
                    this.oCurrObj = {};
                    $.extend(this.oCurrObj, oObj);
                } else if (bInitial === 1) {
                    bInitial = 1;
                    var aPurchaseOrder  = this.state.aPurchaseOrder.concat(this.oCurrObj);
                    this.setState({aPurchaseOrder : aPurchaseOrder});
                    this.oCurrObj = {};
                    $.extend(this.oCurrObj, oObj);
                }

            } else if (bInitial === 0) {
                $.extend(oGlobal, oObj);
            } else if (bInitial === 1) {
                $.extend(this.oCurrObj, oObj);
            }


        } else if (aResponse[i].results.intents[0] !== undefined && aResponse[i].results.intents[0].slug === "create-purchase-order") {
            var oCurr = aResponse[i].results.entities;
            var len = $.keys(oCurr).length;
            this.oNewPOOrg = this.fnCreateNewPOObject(oCurr);
            let aNewPurchaseOrder  = this.state.aNewPurchaseOrder.concat(this.oNewPOOrg);
            this.setState({aNewPurchaseOrder : aNewPurchaseOrder});
        } else if (aResponse[i].results.intents[0] !== undefined && aResponse[i].results.intents[0].slug === "create-quotation") {
            var oCurr = aResponse[i].results.entities;
            var len = $.keys(oCurr).length;
            this.oNewQtn = this.fnCreateNewQtnObject(oCurr);
            let aNewQuotation  = this.state.aNewQuotation.concat(this.oNewQtn);
            this.setState({aNewQuotation : aNewQuotation});
        }
    }
    if (this.oCurrObj !== undefined) {
      let aPurchaseOrder  = this.state.aPurchaseOrder.concat(this.oCurrObj);
      this.setState({aPurchaseOrder : aPurchaseOrder});
    }
    for (var i = 0; i < this.state.aPurchaseOrder.length; i++) {
        $.extend(aPurchaseOrder[i], oGlobal);
    }
  }
 fnCheckProperties(oCurr) {
    if (oCurr.hasOwnProperty("payment-term")) {
        return {
            "PaymentTerms": oCurr["payment-term"][0].value
        }
    } else if (oCurr.hasOwnProperty("delivery-date")) {
        return {
            "DeliveryDate": oCurr["delivery-date"][0].value
        }
    } else if (oCurr.hasOwnProperty("purchase-order-number")) {
        return {
            "PurchaseOrder": oCurr["purchase-order-number"][0].value
        }
    } else if (oCurr.hasOwnProperty("supplier")) {
        return {
            "Supplier": oCurr["supplier"][0].value
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
            "material": oCurr["material"][0].value
        }
    } else if (oCurr.hasOwnProperty("plant")) {
        return {
            "plant": oCurr["plant"][0].value
        }
    } else if (oCurr.hasOwnProperty("quantity")) {
        return {
            "quantity": oCurr["quantity"][0].value
        }
    }


}
 fnCreateNewPOObject(oCurr) {
    var oObj = {};
    if (oCurr.hasOwnProperty("purchasing-group")) {
        $.extend(oObj, {
            "PurchasingGroup": oCurr["purchasing-group"][0].value
        });
    }
    if (oCurr.hasOwnProperty("purchasing-org")) {
        $.extend(oObj, {
            "PurchasingOrg": oCurr["purchasing-org"][0].value
        });
    }
    if (oCurr.hasOwnProperty("material")) {
        $.extend(oObj, {
            "material": oCurr["material"][0].value
        });
    }
    if (oCurr.hasOwnProperty("plant")) {
        $.extend(oObj, {
            "plant": oCurr["plant"][0].value
        });
    }
    if (oCurr.hasOwnProperty("quantity")) {
        $.extend(oObj, {
            "quantity": oCurr["quantity"][0].value
        });
    }
    return oObj;
}
 fnCreateNewQtnObject(oCurr) {
    var oObj = {};
    if (oCurr.hasOwnProperty("material")) {
        $.extend(oObj, {
            "Material": oCurr["material"][0].value
        });
    }
    if (oCurr.hasOwnProperty("sales-area")) {
        $.extend(oObj, {
            "Sales Area": oCurr["sales-area"][0].value
        });
    }
    if (oCurr.hasOwnProperty("quantity")) {
        $.extend(oObj, {
            "Quantity": oCurr["quantity"][0].value
        });
    }
    if (oCurr.hasOwnProperty("validity")) {
        $.extend(oObj, {
            "Valid Upto": oCurr["validity"][0].value
        });
    }
    if (oCurr.hasOwnProperty("discount")) {
        $.extend(oObj, {
            "Discount": oCurr["discount"][0].value
        });
    }
    return oObj;
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
              <ReactQuill className="quill-title" theme="bubble" placeholder="Add title" value={this.state.titleHtml || " "} onChange={this.handleTitleChange} >
              </ReactQuill>
              <ReactQuill id="quill" className="quill-editor" theme="bubble" placeholder="Add note" value={this.state.textHtml|| " "}
                      onChange={this.handleChange} ></ReactQuill>

        </Row>
      </div>
    );
  }
}
export default CreateNote;
