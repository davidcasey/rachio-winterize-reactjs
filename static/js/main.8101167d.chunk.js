(this["webpackJsonprachio-winterize-reactjs"]=this["webpackJsonprachio-winterize-reactjs"]||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(7),i=n.n(a),o=(n(12),n(13),n(6)),s=n(2),u=n(3),l=n.n(u),b=n(5),j="https://api.rach.io/1/public",d=function(){var e=Object(b.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(j,"/person/info"),{method:"GET",cache:"no-cache",credentials:"include",headers:{Authorization:"Bearer ".concat(t)}});case 2:if((n=e.sent).ok){e.next=5;break}return e.abrupt("return",new Error("Error getting person entity: ".concat(n.status)));case 5:return e.abrupt("return",n.json());case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),h=function(){var e=Object(b.a)(l.a.mark((function e(t,n){var c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(j,"/person/").concat(n),{method:"GET",cache:"no-cache",credentials:"include",headers:{Authorization:"Bearer ".concat(t)}});case 2:if((c=e.sent).ok){e.next=5;break}return e.abrupt("return",new Error("Error getting device info: ".concat(c.status)));case 5:return e.next=7,c.json();case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),p=n(0),f=function(e){var t=e.initialToken,n=e.onTokenSuccess,r=Object(c.useState)(t||""),a=Object(s.a)(r,2),i=a[0],o=a[1],u=Object(c.useState)(!1),l=Object(s.a)(u,2),b=l[0],j=l[1];return Object(p.jsxs)("div",{className:"container",children:[Object(p.jsxs)("label",{htmlFor:"api-token",children:["API Token ",Object(p.jsx)("a",{href:"https://rachio.readme.io/docs/authentication",className:"locate-token",target:"_blank",rel:"noreferrer",children:"Locate your token"})]}),Object(p.jsx)("input",{id:"api-token",type:"text",className:b?"invalid":"",value:i,onChange:function(e){o(e.target.value)}}),Object(p.jsx)("button",{type:"button",id:"fetch-api",onClick:function(){d(i).then((function(e){var t=e.id;if(t)return j(!1),void n({token:i,id:t,fullName:""});j(!0)}))},children:"Fetch"}),b&&Object(p.jsx)("p",{className:"invalid",children:"Invalid token"}),Object(p.jsx)("p",{className:"disclaimer",children:"Your Rachio API token is never stored on our server and only used for the duration of your session. Accessing the site over a public network is not recommended."})]})},O=function(e){var t=e.id,n=e.label,r=e.initialValue,a=Object(c.useState)(r),i=Object(s.a)(a,2),o=i[0],u=i[1];return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("label",{htmlFor:t,children:n}),Object(p.jsx)("input",{id:t,type:"number",min:"1",max:"600",value:o,onChange:function(e){u(parseFloat(e.target.value))}})," seconds"]})},m=function(e){var t=e.id,n=e.label,r=e.initialValue,a=Object(c.useState)(r),i=Object(s.a)(a,2),o=i[0],u=i[1];return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("label",{htmlFor:t,children:n}),Object(p.jsx)("input",{id:t,type:"number",min:"1",max:"5",value:o,onChange:function(e){u(parseFloat(e.target.value))}})," cycles"]})};var v=function(){var e=Object(c.useState)({}),t=Object(s.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)({}),i=Object(s.a)(a,2),u=i[0],l=i[1],b=Object(c.useState)(10),j=Object(s.a)(b,2),d=j[0],v=j[1],x=Object(c.useState)(10),g=Object(s.a)(x,2),k=g[0],w=g[1],y=Object(c.useState)(1),N=Object(s.a)(y,2),C=N[0],S=N[1];return Object(p.jsxs)("div",{className:"App",children:[Object(p.jsx)("header",{className:"App-header",children:Object(p.jsx)(f,{initialToken:"761e1ee9-6391-4821-b31e-056c03e1b316",onTokenSuccess:function(e){h(e.token,e.id).then((function(t){r(Object(o.a)(Object(o.a)({},e),{},{fullName:t.fullName}));var n=t.devices.map((function(e){return{name:e.name,id:e.id,latitude:e.latitude,longitude:e.longitude,zones:e.zones.filter((function(e){return e.enabled})).sort((function(e,t){return e.zoneNumber-t.zoneNumber}))}}));l(n)}))}})}),Object(p.jsxs)("main",{children:[Object(p.jsx)("div",{className:"row",children:Object(p.jsx)(O,{id:"time-to-blow",label:"Time to blow out each zone",initialValue:d,onInputChange:v})}),Object(p.jsx)("div",{className:"row",children:Object(p.jsx)(O,{id:"time-to-recover",label:"Time for air compressor recovery",initialValue:k,onInputChange:w})}),Object(p.jsx)("div",{className:"row",children:Object(p.jsx)(m,{id:"time-to-recover",label:"Cycles to run",initialValue:C,onInputChange:S})}),Object(p.jsx)("button",{type:"button",id:"run-winterize",onClick:function(){console.log("ENTITY",n),console.log("DEVICES",u)},children:"Winterize"}),Object(p.jsx)("button",{type:"button",id:"cancel-winterize",onClick:function(){},children:"Cancel"})]})]})},x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))};i.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(v,{})}),document.getElementById("root")),x()}},[[16,1,2]]]);
//# sourceMappingURL=main.8101167d.chunk.js.map