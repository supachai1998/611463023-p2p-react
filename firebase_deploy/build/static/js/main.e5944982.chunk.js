(this["webpackJsonpreact-simple"]=this["webpackJsonpreact-simple"]||[]).push([[0],{61:function(e,t,n){},62:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=62},68:function(e,t,n){"use strict";n.r(t);var c=n(0),o=n.n(c),i=n(10),a=n.n(i),r=(n(61),n(28)),s=n(14),l=n(47),d=n(97),u=n(100),f=n(101),j=n(106),b=n(107),m=n(103),O=n(104),g=n(105),h=n(109),p=n(38),x=n.n(p),y=n(4),v=function(e){var t=e.stream,n=Object(c.useRef)();return Object(c.useEffect)((function(){n.current.srcObject=t}),[]),Object(y.jsx)("video",{id:t.id,ref:n,width:"50%",autoPlay:!0,display:"flex"})},w=Object(l.a)({typography:{fontFamily:["-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(",")}}),U=new x.a({initiator:!0,trickle:!1,secure:!0}),k=function(){var e=Object(c.useState)(U),t=Object(s.a)(e,2),n=t[0],o=t[1],i=Object(c.useState)(""),a=Object(s.a)(i,2),l=a[0],p=a[1],k=Object(c.useState)(),F=Object(s.a)(k,2),S=F[0],C=F[1],M=Object(c.useState)(),I=Object(s.a)(M,2),E=I[0],R=I[1],D=Object(c.useState)(),L=Object(s.a)(D,2),z=L[0],A=L[1],B=Object(c.useState)([]),T=Object(s.a)(B,2),J=T[0],P=T[1],_=Object(c.useRef)(),G=Object(c.useState)([]),N=Object(s.a)(G,2),W=N[0],H=N[1],K=Object(c.useState)(""),V=Object(s.a)(K,2),q=V[0],Q=V[1];Object(c.useEffect)((function(){n.on("open",(function(e){p(e)})),n.on("error",(function(e){alert(e),C(null),R(null)})),n.on("connection",(function(e){C(e),console.log(":N:---\x3e> peer connection"),console.log(e),e.on("open",(function(){var t="".concat(n.id," is Joined");e.send({type:"chat",data:t,from:n.id})})),e.on("data",(function(t){if(void 0===E&&R(t.from),"chat"===t.type)P((function(e){return[].concat(Object(r.a)(e),[{from:t.from,msg:t.data}])})),A(2);else if("file"===t.type&&(A(3),console.log(t),t.filename)){var n=new Uint8Array(t.data),c=new Blob([n],{type:"image/jpeg"}),o=URL.createObjectURL(c);console.log(o),Q(o),window.open(o,"_blank"),o&&e.send({type:"connect",success:!0})}"connect"===t.type&&t.success&&(console.log("success"),e.send({type:"connect",success:!0}))})),e.on("error",(function(e){C(null),R(null)}))})),n.on("disconnect",(function(){C(),console.log("disconnect")})),n.on("call",(function(e){(navigator.getUserMedia||navigator.webkitGetUserMedia.getUserMedia||navigator.mozGetUserMedia.getUserMedia||navigator.mediaDevices.getUserMedia)({video:{width:window.innerWidth/2,height:window.innerHeight/2},audio:!0},(function(t){_.current.srcObject=t,e.answer(t),e.on("stream",(function(t){X.push(t);var n=X.filter((function(e,t){return t===X.findIndex((function(t){return t.id===e.id}))}));H(n),C(e)})),e.on("error",(function(e){alert(e),t.getTracks().forEach((function(e){return e.stop()}))}))}),(function(e){console.error("Failed to get local stream",e)}))}))}),[n]);var X=[],Y=function(){n.disconnect(),n.destroy();var e=new x.a(l,{initiator:!0,trickle:!1,secure:!0});o(e),A(),C(),H([]),X=[],_.current.srcObject=null},Z=function(e){if(1===e)(navigator.getUserMedia||navigator.webkitGetUserMedia.getUserMedia||navigator.mozGetUserMedia.getUserMedia||navigator.mediaDevices.getUserMedia)({video:{width:window.innerWidth/2,height:window.innerHeight/2},audio:!0},(function(e){var t=n.call(E,e);console.log(" caller => ",t,e),_.current.srcObject=e,t.on("stream",(function(e){X.push(e);var n=X.filter((function(e,t){return t===X.findIndex((function(t){return t.id===e.id}))}));H(n),C(t)})),t.on("error",(function(t){alert(t),e.getTracks().forEach((function(e){return e.stop()}))}))}),(function(e){return alert("\u0e44\u0e21\u0e48\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e40\u0e1b\u0e34\u0e14\u0e01\u0e25\u0e49\u0e2d\u0e07\u0e44\u0e14\u0e49")}));else if(2===e){var t=n.connect(E);console.log("<<---:E: peer connection"),console.log(t),t.on("open",(function(){var e="".concat(n.id," is Joined");t.send({type:"chat",data:e,from:n.id})})),C(t),t.on("data",(function(e){if(void 0===E&&R(e.from),"chat"===e.type)P((function(t){return[].concat(Object(r.a)(t),[{from:e.from,msg:e.data}])})),A(2);else if("file"===e.type&&(A(3),console.log(e),e.filename)){var n=new Uint8Array(e.data),c=new Blob([n],{type:"image/jpeg"}),o=URL.createObjectURL(c);console.log(o),Q(o),window.open(o,"_blank"),o&&t.send({type:"connect",success:!0})}})),t.on("error",(function(e){C(null),R(null)}))}else if(3===e){var c=n.connect(E);console.log("<<---:E: peer connection"),console.log(c),c.on("open",(function(){var e="".concat(n.id," is Joined");c.send({type:"file",data:e,from:n.id})})),C(c),c.on("data",(function(e){"file"===e.type&&P((function(t){return[].concat(Object(r.a)(t),[{from:e.from,msg:e.data}])}))})),c.on("error",(function(e){C(null),R(null)})),A(3)}else alert("fail to connect")},$=Object(c.useState)(""),ee=Object(s.a)($,2),te=ee[0],ne=ee[1],ce=Object(c.useState)(),oe=Object(s.a)(ce,2),ie=oe[0],ae=oe[1],re=Object(c.useState)(!0),se=Object(s.a)(re,2),le=se[0],de=se[1];return Object(y.jsx)(y.Fragment,{children:n?Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(m.a,{theme:w,maxWidth:"sm",children:Object(y.jsxs)(O.a,{children:[Object(y.jsx)(g.a,{display:"flex",children:Object(y.jsx)(h.a,{title:"\u0e01\u0e14\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e04\u0e31\u0e14\u0e25\u0e2d\u0e01",children:Object(y.jsxs)(f.a,{onClick:function(){try{navigator.clipboard.writeText(l)}catch(e){console.log("ERROR : \u0e44\u0e21\u0e48\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e43\u0e0a\u0e49\u0e07\u0e32\u0e19\u0e04\u0e25\u0e34\u0e01\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e04\u0e31\u0e14\u0e25\u0e2d\u0e01\u0e44\u0e14\u0e49 \n \u0e43\u0e2b\u0e49\u0e1c\u0e39\u0e49\u0e43\u0e0a\u0e49\u0e04\u0e25\u0e38\u0e21\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e04\u0e31\u0e14\u0e25\u0e2d\u0e01\u0e41\u0e17\u0e19 \n")}},children:["ID : ",l," "]})})}),S?Object(y.jsx)(u.a,{style:{width:"90%",justifyContent:"flex-end"},children:Object(y.jsx)(b.a,{variant:"contained",size:"small",justify:"space-between",onClick:function(){return Y()},children:"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a"})}):Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("hr",{}),Object(y.jsxs)(d.a,{container:!0,p:"2",children:[Object(y.jsx)(d.a,{Item:!0,xs:10,children:Object(y.jsx)(j.a,{type:"text",label:"ID \u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19 ",onChange:function(e){return R(e.target.value)}})}),Object(y.jsx)(d.a,{Item:!0,xs:3,children:Object(y.jsx)(b.a,{variant:"contained",size:"small",onClick:function(){console.log("open camera"),Z(1)},disabled:!E,children:"\u0e01\u0e25\u0e49\u0e2d\u0e07"})}),Object(y.jsx)(d.a,{Item:!0,xs:3,children:Object(y.jsx)(b.a,{variant:"contained",size:"small",onClick:function(){return Z(2)},disabled:!E,children:"\u0e41\u0e0a\u0e17"})}),Object(y.jsx)(d.a,{Item:!0,xs:3,children:Object(y.jsx)(b.a,{variant:"contained",size:"small",onClick:function(){return Z(3)},disabled:!E,children:"\u0e44\u0e1f\u0e25\u0e4c"})})]})]})]})}),Object(y.jsx)(m.a,{theme:w,maxWidth:"sm",mt:2,children:Object(y.jsx)(d.a,{container:!0,justify:"center",children:2===z?Object(y.jsx)(y.Fragment,{children:Object(y.jsxs)(y.Fragment,{children:[J.map((function(e,t){return Object(y.jsx)(d.a,{Item:!0,xs:12,children:Object(y.jsx)(u.a,{style:{width:"90%",justifyContent:e.from===n.id?"flex-end":"flex-start"},children:Object(y.jsx)(f.a,{color:e.from===n.id?"primary":"textPrimary",children:e.msg})})},t+e.from+e.msg)})),Object(y.jsx)(j.a,{type:"text",label:"\u0e43\u0e2a\u0e48\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21",defaultValue:te,onChange:function(e){return ne(e.target.value)},onKeyDown:function(e){if("Enter"==e.key){var t=te,c=n.id;try{S.send({type:"chat",data:t,from:c})}catch(e){alert(e.message),Y()}P((function(e){return[].concat(Object(r.a)(e),[{from:c,msg:te}])})),e.target.value=""}}})]})}):3===z?Object(y.jsx)(y.Fragment,{children:Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("input",{type:"file",accept:"image/*",onChange:function(e){return function(e){ae(e.target.files[0]),de(!1)}(e)}}),Object(y.jsx)(b.a,{variant:"outlined",color:"primary",disabled:le,onClick:function(){return function(){var e=new FileReader,t=ie.slice(0,10485760);e.readAsArrayBuffer(t),e.onload=function(t){var c=e.result;S.send({type:"file",data:c,filename:ie.name,from:n.id})}}()},children:"Upload"})]})}):Object(y.jsx)(y.Fragment,{})})}),Object(y.jsxs)(d.a,{container:!0,justify:"center",children:[Object(y.jsx)("image",{src:q,onClick:function(){return window.open(q,"_blank")}}),Object(y.jsx)("video",{display:"flex",ref:_,width:"50%",autoPlay:!0,muted:!0}),W&&W.map((function(e,t){return Object(y.jsx)(v,{stream:e},t)}))]})]}):Object(y.jsx)(y.Fragment,{})})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,110)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),o(e),i(e),a(e)}))};a.a.render(Object(y.jsx)(o.a.StrictMode,{children:Object(y.jsx)(k,{})}),document.getElementById("root")),F()}},[[68,1,2]]]);
//# sourceMappingURL=main.e5944982.chunk.js.map