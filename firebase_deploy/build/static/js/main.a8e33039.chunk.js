(this["webpackJsonpreact-simple"]=this["webpackJsonpreact-simple"]||[]).push([[0],{186:function(e,t,n){},193:function(e,t){},195:function(e,t){},206:function(e,t){},208:function(e,t){},235:function(e,t){},237:function(e,t){},238:function(e,t){},243:function(e,t){},245:function(e,t){},264:function(e,t){},276:function(e,t){},279:function(e,t){},284:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=284},294:function(e,t,n){"use strict";n.r(t);var c=n(0),o=n.n(c),a=n(12),i=n.n(a),r=(n(186),n(67)),s=n.n(r),l=n(102),u=n(43),d=n(23),j=n(168),f=n(295),b=n(333),g=n(341),p=n(335),m=n(336),O=n(337),h=n(338),y=n(345),x=n(339),v=n(340),w=n(342),U=n(158),k=n.n(U),M=n(159),S=n.n(M),F=n(4),C=function(e){var t=e.stream,n=Object(c.useRef)();return Object(c.useEffect)((function(){n.current.srcObject=t}),[]),Object(F.jsx)("video",{id:t.id,ref:n,width:"100%",height:"50%",style:{margin:"auto auto"},autoPlay:!0,display:"flex"})},E=n(169),T=n(327),R=n(330),G=n(332),I=n(344),L=n(164),_=n.n(L),z=Object(T.a)((function(e){return{root:{width:"100%",backgroundColor:e.palette.background.paper}}})),B=function(e){return Object(F.jsx)(R.a,Object(E.a)({button:!0,component:"a"},e))},D=function(e){var t=e.file;console.log(t.type,t.type.split("/"));var n=z();return Object(F.jsx)("div",{className:n.root,children:Object(F.jsxs)(B,{href:"#",onClick:function(){return window.open(t.url,"_blank")},children:[Object(F.jsx)(G.a,{children:"image"===t.type.split("/")[0]?Object(F.jsx)("img",{width:30,height:30,src:t.url}):Object(F.jsx)(_.a,{})}),Object(F.jsxs)(I.a,{children:[" ",t.name]})]})})},W=function(e){var t=e.data,n=e.peer;return console.log(t),Object(F.jsx)(R.a,{style:{display:"flex",justifyContent:t.from===n.id?"flex-end":"flex-start"},children:t.msg})},H=Object(j.a)({typography:{fontFamily:["-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(",")}}),J=function(){var e=Object(c.useState)(new S.a(k.a.generate(2)+"-CS",{initiator:!0,trickle:!1,secure:!0})),t=Object(d.a)(e,2),n=t[0],o=(t[1],Object(c.useState)(n.id)),a=Object(d.a)(o,2),i=a[0],r=a[1],j=Object(c.useState)(),U=Object(d.a)(j,2),M=U[0],E=U[1],T=Object(c.useState)(),R=Object(d.a)(T,2),G=R[0],I=R[1],L=Object(c.useState)(""),_=Object(d.a)(L,2),z=_[0],B=_[1],J=Object(c.useState)(),N=Object(d.a)(J,2),A=N[0],P=N[1],V=Object(c.useState)([]),K=Object(d.a)(V,2),q=K[0],Q=K[1],X=Object(c.useRef)(),Y=Object(c.useState)([]),Z=Object(d.a)(Y,2),$=Z[0],ee=Z[1],te=Object(c.useState)([]),ne=Object(d.a)(te,2),ce=ne[0],oe=ne[1],ae=Object(c.useState)(!1),ie=Object(d.a)(ae,2),re=ie[0],se=ie[1];Object(c.useEffect)((function(){n.on("open",(function(e){r(e)})),n.on("error",(function(e){se(!1),ue(e)})),n.on("disconnected",(function(){console.log("peer id ".concat(n.id," disconnected")),de()})),n.on("connection",(function(e){se(!0),E(e),console.log(":N:---\x3e> peer connection"),console.log(e),e.on("open",(function(){se(!1);var t="".concat(n.id," is Joined");e.send({type:"chat",data:t,from:n.id})})),e.on("data",(function(t){if(se(!1),void 0===G&&(B(t.from),I(t.from)),"disconnect"===t.type&&(console.log("".concat(G," is disconnected")),de()),"chat"===t.type)Q((function(e){return[{from:t.from,msg:t.data}].concat(Object(u.a)(e))})),P(2);else if("file"===t.type){if(P(3),console.log(t),t.filename){var n=new Blob([t.file],{type:t.data_type}),c=URL.createObjectURL(n);oe((function(e){return[{name:t.filename,url:c,type:t.data_type}].concat(Object(u.a)(e))})),c&&e.send({type:"connect",success:!0})}}else"connect"===t.type&&t.success&&(console.log("success"),e.send({type:"connect",success:!0}))})),e.on("error",(function(e){se(!1),ue(e)}))})),n.on("call",(function(e){se(!0),navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia||navigator.mozGetUserMedia.getUserMedia,navigator.getUserMedia({video:{width:window.innerWidth/2,height:window.innerHeight/2},audio:!0},(function(t){X.current.srcObject=t,e.answer(t),e.on("stream",(function(t){B(e.peer),se(!1),le.push(t);var n=le.filter((function(e,t){return t===le.findIndex((function(t){return t.id===e.id}))}));ee(n),E(e)})),e.on("error",(function(e){se(!1),ue(e),t.getTracks().forEach((function(e){return e.stop()}))}))}),(function(e){se(!1),console.error("Failed to get local stream",e)}))}))}),[]);var le=[],ue=function(){var e=Object(l.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"unavailable-id"===t.type||"peer-unavailable"===t.type?(console.log(t),setInterval((function(){n.destroy()}),2345),n.disconnected&&window.location.reload()):console.error(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),de=function(){var e=Object(l.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("reconnect"),window.location.reload();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),je=function(e){if(se(!0),1===e)se(!0),navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia||navigator.mozGetUserMedia.getUserMedia,navigator.getUserMedia({video:{width:window.innerWidth/2,height:window.innerHeight/2},audio:!0},(function(e){var t=n.call(G,e);console.log(" caller => ",t,e),X.current.srcObject=e,t.on("stream",(function(e){se(!1),le.push(e);var n=le.filter((function(e,t){return t===le.findIndex((function(t){return t.id===e.id}))}));ee(n),E(t)})),t.on("error",(function(t){se(!1),ue(t),e.getTracks().forEach((function(e){return e.stop()})),e.getAudioTracks()[0].stop(),e.getVideoTracks()[0].stop()}))}),(function(e){console.log("\u0e44\u0e21\u0e48\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e40\u0e1b\u0e34\u0e14\u0e01\u0e25\u0e49\u0e2d\u0e07\u0e44\u0e14\u0e49"),console.log(e),se(!1)}));else if(2===e){var t=n.connect(G);console.log("<<---:E: peer connection"),console.log(t),t.on("open",(function(){se(!1);var e="".concat(n.id," is Joined");t.send({type:"chat",data:e,from:n.id})})),E(t),t.on("data",(function(e){if(se(!1),void 0===G&&I(e.from),"chat"===e.type)Q((function(t){return[{from:e.from,msg:e.data}].concat(Object(u.a)(t))})),P(2);else if("file"===e.type&&(P(3),console.log(e),e.filename)){var n=new Blob([e.file],{type:e.type}),c=URL.createObjectURL(n);oe((function(t){return[{name:e.filename,url:c,type:e.data_type}].concat(Object(u.a)(t))})),c&&t.send({type:"connect",success:!0})}"disconnect"===e.type&&(console.log("".concat(G," is disconnected")),se(!1),de())})),t.on("error",(function(e){se(!1),ue(e)}))}else if(3===e){var c=n.connect(G);console.log("<<---:E: peer connection"),console.log(c),c.on("open",(function(){se(!1);var e="".concat(n.id," is Joined");c.send({type:"file",data:e,from:n.id})})),E(c),c.on("data",(function(e){if(se(!1),"file"===e.type&&(P(3),console.log(e),e.filename)){var t=new Blob([e.file],{type:e.data_type}),o=URL.createObjectURL(t);oe((function(t){return[{name:e.filename,url:o,type:e.data_type}].concat(Object(u.a)(t))})),o&&c.send({type:"connect",success:!0})}"disconnect"===e.type&&(console.log("".concat(G," is disconnected")),c.send({type:"disconnect",from:n.id}))})),c.on("error",(function(e){se(!1),ue(e)})),P(3)}else se(!1),console.warn("fail to connect")},fe=Object(c.useState)(""),be=Object(d.a)(fe,2),ge=be[0],pe=be[1],me=Object(c.useState)(),Oe=Object(d.a)(me,2),he=Oe[0],ye=Oe[1],xe=Object(c.useState)(!0),ve=Object(d.a)(xe,2),we=ve[0],Ue=ve[1];return Object(F.jsx)(F.Fragment,{children:n?Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)(m.a,{maxWidth:"sm",children:Object(F.jsxs)(O.a,{children:[Object(F.jsx)(h.a,{display:"flex",children:Object(F.jsx)(y.a,{title:"\u0e01\u0e14\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e04\u0e31\u0e14\u0e25\u0e2d\u0e01",children:Object(F.jsxs)(w.a,{severity:"success",onClick:function(){try{navigator.clipboard.writeText(i)}catch(e){console.log("ERROR : \u0e44\u0e21\u0e48\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e43\u0e0a\u0e49\u0e07\u0e32\u0e19\u0e04\u0e25\u0e34\u0e01\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e04\u0e31\u0e14\u0e25\u0e2d\u0e01\u0e44\u0e14\u0e49 \n \u0e43\u0e2b\u0e49\u0e1c\u0e39\u0e49\u0e43\u0e0a\u0e49\u0e04\u0e25\u0e38\u0e21\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e04\u0e31\u0e14\u0e25\u0e2d\u0e01\u0e41\u0e17\u0e19 \n")}},children:["ID : ",i," ",M?Object(F.jsx)(p.a,{variant:"outlined",color:"secondary",size:"small",display:"flex",justify:"space-between",style:{justifyContent:"flex"},onClick:function(){try{M.send({type:"disconnect",success:"bye"})}catch(e){}de()},children:"\u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01\u0e23\u0e30\u0e1a\u0e1a"}):Object(F.jsx)(F.Fragment,{})]})})}),M?Object(F.jsx)(F.Fragment,{}):Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)("hr",{}),Object(F.jsxs)(x.a,{container:!0,xs:12,p:"2",children:[Object(F.jsx)(x.a,{xs:10,style:{margin:"1% auto"},children:Object(F.jsx)(g.a,{type:"text",label:"ID \u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19 ",defaultValue:z,onChange:function(e){I(e.target.value),B(e.target.value)}})}),Object(F.jsx)(x.a,{xs:3,style:{margin:"3% auto"},children:Object(F.jsx)(p.a,{variant:"contained",size:"small",onClick:function(){console.log("open camera"),je(1)},disabled:!G&&!z,children:"\u0e01\u0e25\u0e49\u0e2d\u0e07"})}),Object(F.jsx)(x.a,{xs:3,style:{margin:"3% auto"},children:Object(F.jsx)(p.a,{variant:"contained",size:"small",onClick:function(){return je(2)},disabled:!G&&!z,children:"\u0e41\u0e0a\u0e17"})}),Object(F.jsx)(x.a,{xs:3,style:{margin:"3% auto"},children:Object(F.jsx)(p.a,{variant:"contained",size:"small",onClick:function(){return je(3)},disabled:!G&&!z,children:"\u0e44\u0e1f\u0e25\u0e4c"})})]})]})]})}),Object(F.jsx)(m.a,{theme:H,maxWidth:"sm",style:{marginTop:"2%"},children:2===A?Object(F.jsx)(F.Fragment,{children:Object(F.jsxs)("div",{style:{margin:"16px auto"},children:[Object(F.jsx)(f.a,{style:{maxHeight:200,overflow:"auto"},children:Object(F.jsx)(b.a,{children:q.map((function(e,t){return Object(F.jsx)(W,{data:e,peer:n},t)}))})}),Object(F.jsx)(g.a,{type:"text",label:"\u0e43\u0e2a\u0e48\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21",style:{margin:"16px auto",width:"100%"},defaultValue:ge,onChange:function(e){return pe(e.target.value)},onKeyDown:function(e){if("Enter"==e.key&&ge.length>0){var t=ge,c=n.id;try{M.send({type:"chat",data:t,from:c})}catch(e){se(!1),console.warn(e.message),de()}Q((function(e){return[{from:c,msg:ge}].concat(Object(u.a)(e))})),e.target.value="",pe("")}}})]})}):3===A&&M?Object(F.jsx)(F.Fragment,{children:Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)("input",{style:{marginTop:"3% auto"},type:"file",accept:"*",onChange:function(e){return function(e){ye(e.target.files[0]),Ue(!1)}(e)}}),Object(F.jsx)(p.a,{variant:"outlined",color:"primary",style:{margin:" auto"},disabled:we,onClick:function(){return function(){var e=new Blob([he],{type:he.type});M.send({type:"file",data_type:he.type,file:e,filename:he.name,from:n.id}),console.log("send ",he.name),Ue(!0)}()},children:"Upload"})]})}):Object(F.jsx)(F.Fragment,{})}),re?Object(F.jsx)(v.a,{style:{marginTop:"2%"}}):Object(F.jsx)(F.Fragment,{children:" "}),ce.length>0?Object(F.jsx)(m.a,{theme:H,justify:"center",maxWidth:"sm",style:{marginTop:"2%"},children:Object(F.jsx)(f.a,{style:{maxHeight:200,overflow:"auto"},children:Object(F.jsx)(b.a,{children:ce&&ce.map((function(e,t){return Object(F.jsx)(D,{file:e})}))})})}):Object(F.jsx)(F.Fragment,{}),Object(F.jsxs)(m.a,{theme:H,justify:"center",maxWidth:"sm",style:{marginTop:"2%"},children:[Object(F.jsx)("video",{ref:X,style:{margin:"auto auto"},width:"100%",height:"50%",autoPlay:!0,muted:!0}),$&&$.map((function(e,t){return Object(F.jsx)(C,{stream:e},t)}))]})]}):Object(F.jsx)(F.Fragment,{})})},N=n(166),A=n(167),P=n(14),V=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,346)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),o(e),a(e),i(e)}))},K=Object(N.a)();console.table(K);i.a.render(Object(F.jsx)(o.a.StrictMode,{children:Object(F.jsx)(A.a,{children:Object(F.jsx)(P.c,{children:"edge-chromium"===K.name?Object(F.jsx)(w.a,{severity:"error",style:{textAlign:"center"},children:"\u0e43\u0e0a\u0e49\u0e44\u0e21\u0e48\u0e44\u0e14\u0e49\u0e19\u0e30 \u0e43\u0e2b\u0e49\u0e44\u0e1b\u0e43\u0e0a\u0e49 firefox \u0e2b\u0e23\u0e37\u0e2d chrome \u0e41\u0e17\u0e19 "}):Object(F.jsx)(P.a,{path:"/",exact:!0,component:function(){return Object(F.jsx)(J,{})}})})})}),document.getElementById("root")),V()}},[[294,1,2]]]);
//# sourceMappingURL=main.a8e33039.chunk.js.map