(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{151:function(e,t,a){e.exports=a(362)},156:function(e,t,a){},177:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},362:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),r=a(9),s=a.n(r),i=a(369),c=a(368),u=(a(156),a(25)),o=a(26),h=a(28),d=a(27),m=a(29),p=a(363),O=a(30),b=a.n(O),y=a(18),v=a.n(y),f=(a(177),a(65),a(13)),w=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(h.a)(this,Object(d.a)(t).call(this,e))).state={notes:[]},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;b()("/notes").then(function(t){e.setState({notes:t.data}),console.log(e.state.notes)})}},{key:"render",value:function(){return l.a.createElement("div",{className:"container-fluid custom-app"},l.a.createElement(f.e,null,l.a.createElement("div",null,l.a.createElement("div",{className:"header"},l.a.createElement("h1",{className:"h1"},"Notes")),l.a.createElement("div",{className:"new_note"},l.a.createElement(p.a,{className:"pull-right",to:"/create"},l.a.createElement("span",{className:"glyphicon glyphicon-plus-sign","aria-hidden":"true"}),"New Note")))),l.a.createElement(f.e,{className:"note_tiles"},this.state.notes.map(function(e){return l.a.createElement(f.d,{xs:"12",sm:"3",md:"3",lg:"3",key:e._id,className:"card-col"},l.a.createElement(p.a,{to:"/edit/".concat(e._id)},l.a.createElement(f.a,{className:"custom-note-tile"},l.a.createElement(f.c,null,e.titleValue),l.a.createElement(f.b,null,l.a.createElement("small",null,v()(e.updated_date).format("lll"))))))})))}}]),t}(n.Component),E=a(14),g=a(90),P=a(5),j=a(34),N=a.n(j),C=(a(119),a(6)),k=a.n(C),x=a(364),S=a(365),A=a(367),Q=a(366),q=a(370),_=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(h.a)(this,Object(d.a)(t).call(this,e))).state={note:{},show:!1,aResponse:[],aPO:[],aNewQt:[],aNewPO:[]},a.handleChange=a.handleChange.bind(Object(P.a)(Object(P.a)(a))),a.handleTitleChange=a.handleTitleChange.bind(Object(P.a)(Object(P.a)(a))),a.fnOnAnalyse=a.fnOnAnalyse.bind(Object(P.a)(Object(P.a)(a))),a.fnOnSync=a.fnOnSync.bind(Object(P.a)(Object(P.a)(a))),a.fnCallRecastAPI=a.fnCallRecastAPI.bind(Object(P.a)(Object(P.a)(a))),a.handleClose=a.handleClose.bind(Object(P.a)(Object(P.a)(a))),a.handleShow=a.handleShow.bind(Object(P.a)(Object(P.a)(a))),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;b.a.get("/notes/"+this.props.match.params.id).then(function(t){e.setState({note:t.data})})}},{key:"handleClose",value:function(){this.setState({show:!1})}},{key:"handleShow",value:function(){this.setState({show:!0})}},{key:"handleChange",value:function(e,t,a,n){var l=n.getText().split("\n"),r=Object(g.a)({},this.state.note);r.textValue=l,r.updated_date=v()().format("lll"),r.textHtml=e,this.setState({note:r})}},{key:"handleTitleChange",value:function(e,t,a,n){var l=n.getText().split("\n")[0],r=Object(g.a)({},this.state.note);r.titleValue=l,r.titleHtml=e,r.updated_date=v()().format("lll"),this.setState({note:r})}},{key:"fnOnAnalyse",value:function(){var e=this.state.note,t=e.textValue,a=e.titleValue,n=e.textHtml,l=e.titleHtml,r=e.creation_date,s=e.updated_date;b.a.put("/notes/"+this.props.match.params.id,{textValue:t,titleValue:a,textHtml:n,titleHtml:l,creation_date:r,updated_date:s}).then(function(e){});var i=[];this.setState({aResponse:[],aPO:[],aNewQt:[],aNewPO:[]}),i.push(a);for(var c=0;c<t.length;c++)""!==t[c]&&i.push(t[c]);this.fnCallRecastAPI(i,0,i.length)}},{key:"fnCallRecastAPI",value:function(e,t,a){var n=this;if(!(t>=a)){var l=this;fetch("https://api.recast.ai/v2/request/",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Token df06ae2b77ecb0f1f56da0059b7dd166"},body:JSON.stringify({text:e[t],language:"en"})}).then(function(e){return e.json()}).then(function(e){var t=n.state.aResponse.concat(e);n.setState({aResponse:t}),console.log(n.state.aResponse)}).then(function(){l.fnCallRecastAPI(e,t+1,a)}).catch(function(e){console.error(e)})}}},{key:"fnOnSync",value:function(){this.setState({show:!0});var e=0,t={},a=this.state.aResponse;this.aPurchaseOrder=[],this.aNewQuotation=[],this.aNewPurchaseOrder=[];for(var n=0;n<a.length;n++)if(void 0!==a[n].results.intents[0]&&"update-purchase-order"===a[n].results.intents[0].slug){var l=a[n].results.entities,r=this.fnCheckProperties(l);l.hasOwnProperty("purchase-order-number")?0===e?(e=1,this.oCurrObj={},k.a.extend(this.oCurrObj,r)):1===e&&(e=1,this.aPurchaseOrder.push(this.oCurrObj),this.oCurrObj={},k.a.extend(this.oCurrObj,r)):0===e?k.a.extend(t,r):1===e&&k.a.extend(this.oCurrObj,r)}else if(void 0!==a[n].results.intents[0]&&"create-purchase-order"===a[n].results.intents[0].slug){l=a[n].results.entities,Object.keys(l).length;this.oNewPOOrg=this.fnCreateNewPOObject(l),this.aNewPurchaseOrder.push(this.oNewPOOrg)}else if(void 0!==a[n].results.intents[0]&&"create-quotation"===a[n].results.intents[0].slug){l=a[n].results.entities,Object.keys(l).length;this.oNewQtn=this.fnCreateNewQtnObject(l),this.aNewQuotation.push(this.oNewQtn)}void 0!==this.oCurrObj&&this.aPurchaseOrder.push(this.oCurrObj);for(n=0;n<this.aPurchaseOrder.length;n++)k.a.extend(this.aPurchaseOrder[n],t);this.setState({aPO:Object(E.a)(this.state.aPO).concat(Object(E.a)(this.aPurchaseOrder)),aNewQt:Object(E.a)(this.state.aNewQt).concat(Object(E.a)(this.aNewQuotation)),aNewPO:Object(E.a)(this.state.aNewQt).concat(Object(E.a)(this.aNewPurchaseOrder))})}},{key:"fnCheckProperties",value:function(e){return e.hasOwnProperty("payment-term")?{PaymentTerms:e["payment-term"][0].value}:e.hasOwnProperty("delivery-date")?{DeliveryDate:e["delivery-date"][0].value}:e.hasOwnProperty("purchase-order-number")?{PurchaseOrder:e["purchase-order-number"][0].value}:e.hasOwnProperty("supplier")?{Supplier:e.supplier[0].value}:e.hasOwnProperty("purchasing-group")?{PurchasingGroup:e["purchasing-group"][0].value}:e.hasOwnProperty("purchasing-org")?{PurchasingOrg:e["purchasing-org"][0].value}:e.hasOwnProperty("material")?{material:e.material[0].value}:e.hasOwnProperty("plant")?{plant:e.plant[0].value}:e.hasOwnProperty("quantity")?{quantity:e.quantity[0].value}:void 0}},{key:"fnCreateNewPOObject",value:function(e){var t={};return e.hasOwnProperty("purchasing-group")&&k.a.extend(t,{PurchasingGroup:e["purchasing-group"][0].value}),e.hasOwnProperty("purchasing-org")&&k.a.extend(t,{PurchasingOrg:e["purchasing-org"][0].value}),e.hasOwnProperty("material")&&k.a.extend(t,{material:e.material[0].value}),e.hasOwnProperty("plant")&&k.a.extend(t,{plant:e.plant[0].value}),e.hasOwnProperty("quantity")&&k.a.extend(t,{quantity:e.quantity[0].value}),t}},{key:"fnCreateNewQtnObject",value:function(e){var t={};return e.hasOwnProperty("material")&&k.a.extend(t,{Material:e.material[0].value}),e.hasOwnProperty("sales-area")&&k.a.extend(t,{"Sales Area":e["sales-area"][0].value}),e.hasOwnProperty("quantity")&&k.a.extend(t,{Quantity:e.quantity[0].value}),e.hasOwnProperty("validity")&&k.a.extend(t,{"Valid Upto":e.validity[0].value}),e.hasOwnProperty("discount")&&k.a.extend(t,{Discount:e.discount[0].value}),t}},{key:"render",value:function(){l.a.createElement(x.a,{id:"modal-popover",title:"popover"},"very popover. such engagement"),l.a.createElement(S.a,{id:"modal-tooltip"},"wow.");return l.a.createElement("div",{className:"container-fluid custom-app"},l.a.createElement(f.e,null,l.a.createElement("div",null,l.a.createElement("div",{className:"note-timestamp"},v()(this.state.note.creation_date).format("lll")),l.a.createElement("div",{className:"note_action_buttons"},l.a.createElement("button",{className:"btn btn-xs btn-success pull-right sync-button",onClick:this.fnOnSync},"Sync"),l.a.createElement("button",{className:"btn btn-xs btn-primary pull-right analyse-button",onClick:this.fnOnAnalyse},"Analyse")))),l.a.createElement(f.e,null,l.a.createElement(N.a,{className:"quill-title",theme:"bubble",placeholder:"Add title",value:this.state.note.titleHtml||" ",onChange:this.handleTitleChange}),l.a.createElement(N.a,{id:"quill",className:"quill-editor",theme:"bubble",placeholder:"Add note",value:this.state.note.textHtml||" ",onChange:this.handleChange})),l.a.createElement(f.e,null,l.a.createElement("div",null,l.a.createElement(A.a,{show:this.state.show,onHide:this.handleClose},l.a.createElement(A.a.Header,{closeButton:!0},l.a.createElement(A.a.Title,null,"Notings")),l.a.createElement(A.a.Body,null,this.state.aPO.map(function(e){return l.a.createElement(Q.a,{striped:!0,bordered:!0,condensed:!0,hover:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Fields"),l.a.createElement("th",null,"New Values"),l.a.createElement("th",null,"Old Values"))),l.a.createElement("tbody",null,Object.keys(e).map(function(t,a){return l.a.createElement("tr",{key:a},l.a.createElement("td",null,t),l.a.createElement("td",null,Object.values(e)[a]),l.a.createElement("td",null,"Old"))})))}),this.state.aNewQt.map(function(e){return l.a.createElement(Q.a,{striped:!0,bordered:!0,condensed:!0,hover:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Fields"),l.a.createElement("th",null,"New Values"))),l.a.createElement("tbody",null,Object.keys(e).map(function(t,a){return l.a.createElement("tr",{key:a},l.a.createElement("td",null,t),l.a.createElement("td",null,Object.values(e)[a]))})))}),this.state.aNewPO.map(function(e){return l.a.createElement(Q.a,{striped:!0,bordered:!0,condensed:!0,hover:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Fields"),l.a.createElement("th",null,"New Values"))),l.a.createElement("tbody",null,Object.keys(e).map(function(t,a){return l.a.createElement("tr",{key:a},l.a.createElement("td",null,t),l.a.createElement("td",null,Object.values(e)[a]))})))})),l.a.createElement(A.a.Footer,null,l.a.createElement(q.a,{className:"btn btn-success",onClick:this.handleClose},"Apply Changes"),l.a.createElement(q.a,{className:"btn btn-primary",onClick:this.handleClose},"Cancel"))))))}}]),t}(n.Component),V=(a(340),function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(h.a)(this,Object(d.a)(t).call(this,e))).state={textValue:[],titleValue:"",textHtml:"",titleHtml:"",creation_date:null,updated_date:null,show:!1,aResponse:[],aPO:[],aNewQt:[],aNewPO:[]},a.handleChange=a.handleChange.bind(Object(P.a)(Object(P.a)(a))),a.handleTitleChange=a.handleTitleChange.bind(Object(P.a)(Object(P.a)(a))),a.fnOnAnalyse=a.fnOnAnalyse.bind(Object(P.a)(Object(P.a)(a))),a.fnOnSync=a.fnOnSync.bind(Object(P.a)(Object(P.a)(a))),a.fnCallRecastAPI=a.fnCallRecastAPI.bind(Object(P.a)(Object(P.a)(a))),a.handleClose=a.handleClose.bind(Object(P.a)(Object(P.a)(a))),a.handleShow=a.handleShow.bind(Object(P.a)(Object(P.a)(a))),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=v()().format("lll");this.setState({creation_date:e})}},{key:"handleClose",value:function(){this.setState({show:!1})}},{key:"handleShow",value:function(){this.setState({show:!0})}},{key:"handleChange",value:function(e,t,a,n){var l=n.getText().split("\n"),r=v()().format("lll");this.setState({textValue:l,textHtml:e,updated_date:r})}},{key:"handleTitleChange",value:function(e,t,a,n){var l=n.getText().split("\n")[0],r=v()().format("lll");this.setState({titleValue:l,titleHtml:e,updated_date:r})}},{key:"fnOnAnalyse",value:function(){var e=this.state,t=e.textValue,a=e.titleValue,n=e.textHtml,l=e.titleHtml,r=e.creation_date,s=e.updated_date;b.a.post("/notes",{textValue:t,titleValue:a,textHtml:n,titleHtml:l,creation_date:r,updated_date:s}).then(function(e){});var i=[];this.setState({aResponse:[],aPO:[],aNewQt:[],aNewPO:[]}),i.push(a);for(var c=0;c<t.length;c++)""!==t[c]&&i.push(t[c]);this.fnCallRecastAPI(i,0,i.length)}},{key:"fnCallRecastAPI",value:function(e,t,a){var n=this;if(!(t>=a)){var l=this;fetch("https://api.recast.ai/v2/request/",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Token df06ae2b77ecb0f1f56da0059b7dd166"},body:JSON.stringify({text:e[t],language:"en"})}).then(function(e){return e.json()}).then(function(e){var t=n.state.aResponse.concat(e);n.setState({aResponse:t}),console.log(n.state.aResponse)}).then(function(){l.fnCallRecastAPI(e,t+1,a)}).catch(function(e){console.error(e)})}}},{key:"fnOnSync",value:function(){this.setState({show:!0,aPO:[],aNewQt:[],aNewPO:[]});var e=0,t={},a=this.state.aResponse;this.aPurchaseOrder=[],this.aNewQuotation=[],this.aNewPurchaseOrder=[];for(var n=0;n<a.length;n++)if(void 0!==a[n].results.intents[0]&&"update-purchase-order"===a[n].results.intents[0].slug){var l=a[n].results.entities,r=this.fnCheckProperties(l);l.hasOwnProperty("purchase-order-number")?0===e?(e=1,this.oCurrObj={},k.a.extend(this.oCurrObj,r)):1===e&&(e=1,this.aPurchaseOrder.push(this.oCurrObj),this.oCurrObj={},k.a.extend(this.oCurrObj,r)):0===e?k.a.extend(t,r):1===e&&k.a.extend(this.oCurrObj,r)}else if(void 0!==a[n].results.intents[0]&&"create-purchase-order"===a[n].results.intents[0].slug){l=a[n].results.entities,Object.keys(l).length;this.oNewPOOrg=this.fnCreateNewPOObject(l),this.aNewPurchaseOrder.push(this.oNewPOOrg)}else if(void 0!==a[n].results.intents[0]&&"create-quotation"===a[n].results.intents[0].slug){l=a[n].results.entities,Object.keys(l).length;this.oNewQtn=this.fnCreateNewQtnObject(l),this.aNewQuotation.push(this.oNewQtn)}void 0!==this.oCurrObj&&this.aPurchaseOrder.push(this.oCurrObj);for(n=0;n<this.aPurchaseOrder.length;n++)k.a.extend(this.aPurchaseOrder[n],t);this.setState({aPO:Object(E.a)(this.state.aPO).concat(Object(E.a)(this.aPurchaseOrder)),aNewQt:Object(E.a)(this.state.aNewQt).concat(Object(E.a)(this.aNewQuotation)),aNewPO:Object(E.a)(this.state.aNewQt).concat(Object(E.a)(this.aNewPurchaseOrder))})}},{key:"fnCheckProperties",value:function(e){return e.hasOwnProperty("payment-term")?{PaymentTerms:e["payment-term"][0].value}:e.hasOwnProperty("delivery-date")?{DeliveryDate:e["delivery-date"][0].value}:e.hasOwnProperty("purchase-order-number")?{PurchaseOrder:e["purchase-order-number"][0].value}:e.hasOwnProperty("supplier")?{Supplier:e.supplier[0].value}:e.hasOwnProperty("purchasing-group")?{PurchasingGroup:e["purchasing-group"][0].value}:e.hasOwnProperty("purchasing-org")?{PurchasingOrg:e["purchasing-org"][0].value}:e.hasOwnProperty("material")?{material:e.material[0].value}:e.hasOwnProperty("plant")?{plant:e.plant[0].value}:e.hasOwnProperty("quantity")?{quantity:e.quantity[0].value}:void 0}},{key:"fnCreateNewPOObject",value:function(e){var t={};return e.hasOwnProperty("purchasing-group")&&k.a.extend(t,{PurchasingGroup:e["purchasing-group"][0].value}),e.hasOwnProperty("purchasing-org")&&k.a.extend(t,{PurchasingOrg:e["purchasing-org"][0].value}),e.hasOwnProperty("material")&&k.a.extend(t,{material:e.material[0].value}),e.hasOwnProperty("plant")&&k.a.extend(t,{plant:e.plant[0].value}),e.hasOwnProperty("quantity")&&k.a.extend(t,{quantity:e.quantity[0].value}),t}},{key:"fnCreateNewQtnObject",value:function(e){var t={};return e.hasOwnProperty("material")&&k.a.extend(t,{Material:e.material[0].value}),e.hasOwnProperty("sales-area")&&k.a.extend(t,{"Sales Area":e["sales-area"][0].value}),e.hasOwnProperty("quantity")&&k.a.extend(t,{Quantity:e.quantity[0].value}),e.hasOwnProperty("validity")&&k.a.extend(t,{"Valid Upto":e.validity[0].value}),e.hasOwnProperty("discount")&&k.a.extend(t,{Discount:e.discount[0].value}),t}},{key:"render",value:function(){l.a.createElement(x.a,{id:"modal-popover",title:"popover"},"very popover. such engagement"),l.a.createElement(S.a,{id:"modal-tooltip"},"wow.");return l.a.createElement("div",{className:"container-fluid custom-app"},l.a.createElement(f.e,null,l.a.createElement("div",null,l.a.createElement("div",{className:"note-timestamp"},this.state.creation_date),l.a.createElement("div",{className:"note_action_buttons"},l.a.createElement("button",{className:"btn btn-xs btn-success pull-right sync-button",onClick:this.fnOnSync},"Sync"),l.a.createElement("button",{className:"btn btn-xs btn-primary pull-right analyse-button",onClick:this.fnOnAnalyse},"Analyse")))),l.a.createElement(f.e,null,l.a.createElement(N.a,{className:"quill-title",theme:"bubble",placeholder:"Add title",value:this.state.titleHtml||" ",onChange:this.handleTitleChange}),l.a.createElement(N.a,{id:"quill",className:"quill-editor",theme:"bubble",placeholder:"Add note",value:this.state.textHtml||" ",onChange:this.handleChange})),l.a.createElement(f.e,null,l.a.createElement("div",null,l.a.createElement(A.a,{show:this.state.show,onHide:this.handleClose},l.a.createElement(A.a.Header,{closeButton:!0},l.a.createElement(A.a.Title,null,"Notings")),l.a.createElement(A.a.Body,null,this.state.aPO.map(function(e){return l.a.createElement(Q.a,{striped:!0,bordered:!0,condensed:!0,hover:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Fields"),l.a.createElement("th",null,"New Values"),l.a.createElement("th",null,"Old Values"))),l.a.createElement("tbody",null,Object.keys(e).map(function(t,a){return l.a.createElement("tr",{key:a},l.a.createElement("td",null,t),l.a.createElement("td",null,Object.values(e)[a]),l.a.createElement("td",null,"Old"))})))}),this.state.aNewQt.map(function(e){return l.a.createElement(Q.a,{striped:!0,bordered:!0,condensed:!0,hover:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Fields"),l.a.createElement("th",null,"New Values"))),l.a.createElement("tbody",null,Object.keys(e).map(function(t,a){return l.a.createElement("tr",{key:a},l.a.createElement("td",null,t),l.a.createElement("td",null,Object.values(e)[a]))})))}),this.state.aNewPO.map(function(e){return l.a.createElement(Q.a,{striped:!0,bordered:!0,condensed:!0,hover:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Fields"),l.a.createElement("th",null,"New Values"))),l.a.createElement("tbody",null,Object.keys(e).map(function(t,a){return l.a.createElement("tr",{key:a},l.a.createElement("td",null,t),l.a.createElement("td",null,Object.values(e)[a]))})))})),l.a.createElement(A.a.Footer,null,l.a.createElement(q.a,{className:"btn btn-success",onClick:this.handleClose},"Apply Changes"),l.a.createElement(q.a,{className:"btn btn-primary",onClick:this.handleClose},"Cancel"))))))}}]),t}(n.Component)),H=function(e){function t(){return Object(u.a)(this,t),Object(h.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,"Show Note")}}]),t}(n.Component);s.a.render(l.a.createElement(i.a,null,l.a.createElement("div",null,l.a.createElement(c.a,{exact:!0,path:"/",component:w}),l.a.createElement(c.a,{path:"/edit/:id",component:_}),l.a.createElement(c.a,{path:"/create",component:V}),l.a.createElement(c.a,{path:"/show/:id",component:H}))),document.getElementById("root"))},65:function(e,t,a){}},[[151,2,1]]]);
//# sourceMappingURL=main.c6d40ef2.chunk.js.map