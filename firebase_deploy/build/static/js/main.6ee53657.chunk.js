(this["webpackJsonpreact-simple"]=this["webpackJsonpreact-simple"]||[]).push([[0],{174:function(e,t,n){},181:function(e,t){},183:function(e,t){},194:function(e,t){},196:function(e,t){},223:function(e,t){},225:function(e,t){},226:function(e,t){},231:function(e,t){},233:function(e,t){},252:function(e,t){},264:function(e,t){},267:function(e,t){},272:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=272},278:function(e,t,n){"use strict";n.r(t);var c=n(0),o=n.n(c),i=n(12),a=n.n(i),r=(n(174),n(58)),s=n.n(r),l=n(94),d=n(39),u=n(21),f=n(158),j=n(309),b=n(312),m=n(313),O=n(320),g=n(315),p=n(316),h=n(317),x=n(318),y=n(323),v=n(319),w=n(321),U=n(149),k=n.n(U),M=n(150),S=n.n(M),C=n(4),F=function(e){var t=e.stream,n=Object(c.useRef)();return Object(c.useEffect)((function(){n.current.srcObject=t}),[]),Object(C.jsx)("video",{id:t.id,ref:n,width:"50%",autoPlay:!0,display:"flex"})},I=Object(f.a)({typography:{fontFamily:["-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(",")}}),E=function(){var e=Object(c.useState)(new S.a(k.a.generate(2)+"-CS",{initiator:!0,trickle:!1,secure:!0})),t=Object(u.a)(e,2),n=t[0],o=(t[1],Object(c.useState)(n.id)),i=Object(u.a)(o,2),a=i[0],r=i[1],f=Object(c.useState)(),U=Object(u.a)(f,2),M=U[0],E=U[1],R=Object(c.useState)(),T=Object(u.a)(R,2),G=T[0],L=T[1],z=Object(c.useState)(""),B=Object(u.a)(z,2),D=B[0],_=B[1],J=Object(c.useState)(),P=Object(u.a)(J,2),W=P[0],A=P[1],N=Object(c.useState)([]),H=Object(u.a)(N,2),V=H[0],K=H[1],q=Object(c.useRef)(),Q=Object(c.useState)([]),X=Object(u.a)(Q,2),Y=X[0],Z=X[1],$=Object(c.useState)([]),ee=Object(u.a)($,2),te=ee[0],ne=ee[1],ce=Object(c.useState)(!1),oe=Object(u.a)(ce,2),ie=oe[0],ae=oe[1];Object(c.useEffect)((function(){n.on("open",(function(e){r(e)})),n.on("error",(function(e){ae(!1),se(e)})),n.on("disconnected",(function(){console.log("peer id ".concat(n.id," disconnected")),le()})),n.on("connection",(function(e){ae(!0),E(e),console.log(":N:---\x3e> peer connection"),console.log(e),e.on("open",(function(){ae(!1);var t="".concat(n.id," is Joined");e.send({type:"chat",data:t,from:n.id})})),e.on("data",(function(t){if(ae(!1),void 0===G&&(_(t.from),L(t.from)),"disconnect"===t.type&&(console.log("".concat(G," is disconnected")),le()),"chat"===t.type)K((function(e){return[].concat(Object(d.a)(e),[{from:t.from,msg:t.data}])})),A(2);else if("file"===t.type){if(A(3),console.log(t),t.filename){var n=new Blob([t.file],{type:t.data_type}),c=URL.createObjectURL(n);ne((function(e){return[].concat(Object(d.a)(e),[{name:t.filename,url:c}])})),c&&e.send({type:"connect",success:!0})}}else"connect"===t.type&&t.success&&(console.log("success"),e.send({type:"connect",success:!0}))})),e.on("error",(function(e){ae(!1),se(e)}))})),n.on("call",(function(e){ae(!0),navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia||navigator.mozGetUserMedia.getUserMedia,navigator.getUserMedia({video:{width:window.innerWidth/2,height:window.innerHeight/2},audio:!0},(function(t){q.current.srcObject=t,e.answer(t),e.on("stream",(function(t){_(e.peer),ae(!1),re.push(t);var n=re.filter((function(e,t){return t===re.findIndex((function(t){return t.id===e.id}))}));Z(n),E(e)})),e.on("error",(function(e){ae(!1),se(e),t.getTracks().forEach((function(e){return e.stop()}))}))}),(function(e){ae(!1),console.error("Failed to get local stream",e)}))}))}),[]);var re=[],se=function(){var e=Object(l.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"unavailable-id"===t.type||"peer-unavailable"===t.type?(console.log(t),setInterval((function(){n.destroy()}),2345),n.disconnected&&window.location.reload()):console.error(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),le=function(){var e=Object(l.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("reconnect"),window.location.reload();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),de=function(e){if(ae(!0),1===e)ae(!0),navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia||navigator.mozGetUserMedia.getUserMedia,navigator.getUserMedia({video:{width:window.innerWidth/2,height:window.innerHeight/2},audio:!0},(function(e){var t=n.call(G,e);console.log(" caller => ",t,e),q.current.srcObject=e,t.on("stream",(function(e){ae(!1),re.push(e);var n=re.filter((function(e,t){return t===re.findIndex((function(t){return t.id===e.id}))}));Z(n),E(t)})),t.on("error",(function(t){ae(!1),se(t),e.getTracks().forEach((function(e){return e.stop()})),e.getAudioTracks()[0].stop(),e.getVideoTracks()[0].stop()}))}),(function(e){console.log("\u0e44\u0e21\u0e48\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e40\u0e1b\u0e34\u0e14\u0e01\u0e25\u0e49\u0e2d\u0e07\u0e44\u0e14\u0e49"),console.log(e),ae(!1)}));else if(2===e){var t=n.connect(G);console.log("<<---:E: peer connection"),console.log(t),t.on("open",(function(){ae(!1);var e="".concat(n.id," is Joined");t.send({type:"chat",data:e,from:n.id})})),E(t),t.on("data",(function(e){if(ae(!1),void 0===G&&L(e.from),"chat"===e.type)K((function(t){return[].concat(Object(d.a)(t),[{from:e.from,msg:e.data}])})),A(2);else if("file"===e.type&&(A(3),console.log(e),e.filename)){var n=new Blob([e.file],{type:e.type}),c=URL.createObjectURL(n);ne((function(t){return[].concat(Object(d.a)(t),[{name:e.filename,url:c}])})),c&&t.send({type:"connect",success:!0})}"disconnect"===e.type&&(console.log("".concat(G," is disconnected")),ae(!1),le())})),t.on("error",(function(e){ae(!1),se(e)}))}else if(3===e){var c=n.connect(G);console.log("<<---:E: peer connection"),console.log(c),c.on("open",(function(){ae(!1);var e="".concat(n.id," is Joined");c.send({type:"file",data:e,from:n.id})})),E(c),c.on("data",(function(e){if(ae(!1),"file"===e.type&&(A(3),console.log(e),e.filename)){var t=new Blob([e.file],{type:e.data_type}),o=URL.createObjectURL(t);ne((function(t){return[].concat(Object(d.a)(t),[{name:e.filename,url:o}])})),o&&c.send({type:"connect",success:!0})}"disconnect"===e.type&&(console.log("".concat(G," is disconnected")),c.send({type:"disconnect",from:n.id}))})),c.on("error",(function(e){ae(!1),se(e)})),A(3)}else ae(!1),console.warn("fail to connect")},ue=Object(c.useState)(""),fe=Object(u.a)(ue,2),je=fe[0],be=fe[1],me=Object(c.useState)(),Oe=Object(u.a)(me,2),ge=Oe[0],pe=Oe[1],he=Object(c.useState)(!0),xe=Object(u.a)(he,2),ye=xe[0],ve=xe[1];return Object(C.jsx)(C.Fragment,{children:n?Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(p.a,{theme:I,maxWidth:"sm",children:Object(C.jsxs)(h.a,{children:[Object(C.jsx)(x.a,{display:"flex",children:Object(C.jsx)(y.a,{title:"\u0e01\u0e14\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e04\u0e31\u0e14\u0e25\u0e2d\u0e01",children:Object(C.jsxs)(w.a,{severity:"success",onClick:function(){try{navigator.clipboard.writeText(a)}catch(e){console.log("ERROR : \u0e44\u0e21\u0e48\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e43\u0e0a\u0e49\u0e07\u0e32\u0e19\u0e04\u0e25\u0e34\u0e01\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e04\u0e31\u0e14\u0e25\u0e2d\u0e01\u0e44\u0e14\u0e49 \n \u0e43\u0e2b\u0e49\u0e1c\u0e39\u0e49\u0e43\u0e0a\u0e49\u0e04\u0e25\u0e38\u0e21\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e04\u0e31\u0e14\u0e25\u0e2d\u0e01\u0e41\u0e17\u0e19 \n")}},children:["ID : ",a," "]})})}),M?Object(C.jsx)(b.a,{style:{width:"90%",justifyContent:"flex-end"},children:Object(C.jsx)(g.a,{variant:"contained",size:"small",justify:"space-between",onClick:function(){try{M.send({type:"disconnect",success:"bye"})}catch(e){}le()},children:"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a"})}):Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)("hr",{}),Object(C.jsxs)(j.a,{container:!0,xs:12,p:"2",children:[Object(C.jsx)(j.a,{Item:!0,xs:10,children:Object(C.jsx)(O.a,{type:"text",label:"ID \u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19 ",defaultValue:D,onChange:function(e){L(e.target.value),_(e.target.value)}})}),Object(C.jsx)(j.a,{Item:!0,xs:3,children:Object(C.jsx)(g.a,{variant:"contained",size:"small",onClick:function(){console.log("open camera"),de(1)},disabled:!G&&!D,children:"\u0e01\u0e25\u0e49\u0e2d\u0e07"})}),Object(C.jsx)(j.a,{Item:!0,xs:3,children:Object(C.jsx)(g.a,{variant:"contained",size:"small",onClick:function(){return de(2)},disabled:!G&&!D,children:"\u0e41\u0e0a\u0e17"})}),Object(C.jsx)(j.a,{Item:!0,xs:3,children:Object(C.jsx)(g.a,{variant:"contained",size:"small",onClick:function(){return de(3)},disabled:!G&&!D,children:"\u0e44\u0e1f\u0e25\u0e4c"})})]})]})]})}),Object(C.jsx)(p.a,{theme:I,maxWidth:"sm",mt:2,children:Object(C.jsx)(j.a,{container:!0,justify:"center",children:2===W?Object(C.jsx)(C.Fragment,{children:Object(C.jsxs)(C.Fragment,{children:[V.map((function(e,t){return Object(C.jsx)(j.a,{Item:!0,xs:12,children:Object(C.jsx)(b.a,{style:{width:"90%",justifyContent:e.from===n.id?"flex-end":"flex-start"},children:Object(C.jsx)(m.a,{color:e.from===n.id?"primary":"textPrimary",children:e.msg})})},t+e.from+e.msg)})),Object(C.jsx)(O.a,{type:"text",label:"\u0e43\u0e2a\u0e48\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21",defaultValue:je,onChange:function(e){return be(e.target.value)},onKeyDown:function(e){if("Enter"==e.key&&je.length>0){var t=je,c=n.id;try{M.send({type:"chat",data:t,from:c})}catch(e){ae(!1),console.warn(e.message),le()}K((function(e){return[].concat(Object(d.a)(e),[{from:c,msg:je}])})),e.target.value="",be("")}}})]})}):3===W&&M?Object(C.jsx)(C.Fragment,{children:Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)("input",{style:{marginTop:"3%"},type:"file",accept:"*",onChange:function(e){return function(e){pe(e.target.files[0]),ve(!1)}(e)}}),Object(C.jsx)(g.a,{variant:"outlined",color:"primary",style:{marginTop:"3%"},disabled:ye,onClick:function(){return function(){var e=new Blob([ge],{type:ge.type});M.send({type:"file",data_type:ge.type,file:e,filename:ge.name,from:n.id}),console.log("send ",ge.name)}()},children:"Upload"})]})}):Object(C.jsx)(C.Fragment,{})})}),ie?Object(C.jsx)(v.a,{style:{marginTop:"1%"}}):Object(C.jsx)(C.Fragment,{children:" "}),Object(C.jsx)(p.a,{theme:I,justify:"center",maxWidth:"sm",mt:2,children:te&&te.map((function(e,t){return Object(C.jsx)("p",{children:Object(C.jsxs)("a",{href:"#",onClick:function(){return window.open(e.url,"_blank")},children:[" ",e.name]})},t)}))}),Object(C.jsxs)(j.a,{container:!0,justify:"center",children:[Object(C.jsx)("video",{display:"flex",ref:q,width:"50%",autoPlay:!0,muted:!0}),Y&&Y.map((function(e,t){return Object(C.jsx)(F,{stream:e},t)}))]})]}):Object(C.jsx)(C.Fragment,{})})},R=n(156),T=n(157),G=n(14),L=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,324)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),o(e),i(e),a(e)}))},z=Object(R.a)();console.table(z);a.a.render(Object(C.jsx)(o.a.StrictMode,{children:Object(C.jsx)(T.a,{children:Object(C.jsx)(G.c,{children:"edge-chromium"===z.name?Object(C.jsx)(w.a,{severity:"error",style:{textAlign:"center"},children:"\u0e43\u0e0a\u0e49\u0e44\u0e21\u0e48\u0e44\u0e14\u0e49\u0e19\u0e30 \u0e43\u0e2b\u0e49\u0e44\u0e1b\u0e43\u0e0a\u0e49 firefox \u0e2b\u0e23\u0e37\u0e2d chrome \u0e41\u0e17\u0e19 "}):Object(C.jsx)(G.a,{path:"/",exact:!0,component:function(){return Object(C.jsx)(E,{})}})})})}),document.getElementById("root")),L()}},[[278,1,2]]]);
//# sourceMappingURL=main.6ee53657.chunk.js.map