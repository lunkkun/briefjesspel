(function(e){function t(t){for(var n,i,s=t[0],c=t[1],u=t[2],d=0,m=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&m.push(a[i][0]),a[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);l&&l(t);while(m.length)m.shift()();return o.push.apply(o,u||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,s=1;s<r.length;s++){var c=r[s];0!==a[c]&&(n=!1)}n&&(o.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},a={app:0},o=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var l=c;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"56d7":function(e,t,r){"use strict";r.r(t);r("99af"),r("2ca0"),r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=r("b408"),o=r.n(a),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[e.isLoaded?r("div",[e.gameStarted?r("Game"):e.gameCreated?r("Setup"):r("Home")],1):r("SpinnerLoader",{attrs:{color:"#54f1d2"}})],1)},s=[],c=r("2f62"),u=r("d1ad"),l=r.n(u),d=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e._v(" Komt binnenkort! ")])},m=[],p={name:"Game",components:{},computed:Object(c["d"])({})},f=p,y=r("2877"),v=Object(y["a"])(f,d,m,!1,null,"0f3730a9",null),P=v.exports,h=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("button",{on:{click:e.newGame}},[e._v("Start nieuw spel")])])},b=[],g={name:"Home",methods:Object(c["b"])(["newGame"])},w=g,O=Object(y["a"])(w,h,b,!1,null,"c699d00a",null),S=O.exports,N=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.shareableLink&&e.isMaster?r("div",[e._v(" "+e._s(e.shareableLink)+" ")]):e._e(),e._playerName?!e._entriesPerPlayer&&e.isMaster?r("div",[r("label",{attrs:{for:"entriesPerPlayer"}},[e._v("Aantal briefjes per speler:")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.entriesPerPlayer,expression:"entriesPerPlayer"}],attrs:{id:"entriesPerPlayer",type:"number",min:"1",max:"10"},domProps:{value:e.entriesPerPlayer},on:{input:function(t){t.target.composing||(e.entriesPerPlayer=t.target.value)}}}),r("button",{on:{click:function(t){return e.setEntriesPerPlayer(e.entriesPerPlayer)}}},[e._v("Verder")])]):e.canStart&&e.isMaster?r("div",[r("button",{on:{click:e.startGame}},[e._v("Start")])]):r("div",[e._v(" Wachten tot het spel kan beginnen... ")]):r("div",[r("label",{attrs:{for:"playerName"}},[e._v("Vul je naam in:")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.playerName,expression:"playerName"}],attrs:{id:"playerName",type:"text"},domProps:{value:e.playerName},on:{input:function(t){t.target.composing||(e.playerName=t.target.value)}}}),r("button",{on:{click:function(t){return e.setPlayerName(e.playerName)}}},[e._v("Verder")])])])},_=[],E=r("5530"),j={name:"Setup",data:function(){return{playerName:"",entriesPerPlayer:4}},computed:Object(E["a"])({},Object(c["d"])({canStart:function(e){return e.game.canStart},_playerName:function(e){return e.game.playerName},_entriesPerPlayer:function(e){return e.game.entriesPerPlayer}}),{},Object(c["c"])(["isMaster","shareableLink"])),methods:Object(c["b"])(["setPlayerName","setEntriesPerPlayer","startGame"])},C=j,x=Object(y["a"])(C,N,_,!1,null,"8d185128",null),k=x.exports,T={name:"App",components:{SpinnerLoader:l.a,Game:P,Home:S,Setup:k},computed:Object(c["d"])({isLoaded:function(e){return e.game.isLoaded},gameCreated:function(e){return e.game.isCreated},gameStarted:function(e){return e.game.isStarted}})},R=T,L=(r("5c0b"),Object(y["a"])(R,i,s,!1,null,null,null)),G=L.exports,I=(r("96cf"),r("1da1")),M={state:{isConnected:!1,reconnectError:!1},mutations:{SOCKET_ONOPEN:function(e,t){n["a"].prototype.$socket=t.currentTarget,e.isConnected=!0},SOCKET_ONCLOSE:function(e,t){e.isConnected=!1},SOCKET_ONERROR:function(e,t){console.error(e,t)},SOCKET_ONMESSAGE:function(e,t){console.info(t)},SOCKET_RECONNECT:function(e,t){console.debug(e,t)},SOCKET_RECONNECT_ERROR:function(e){e.reconnectError=!0}},actions:{sendMessage:function(e,t){return Object(I["a"])(regeneratorRuntime.mark((function r(){var a,o,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(a=e.state,o=t.action,i=t.data,a.isConnected){r.next=4;break}throw new Error("Not connected; could not send message "+o);case 4:n["a"].prototype.$socket.send(JSON.stringify({action:o,data:i}));case 5:case"end":return r.stop()}}),r)})))()}}};r("7db0");function K(e,t){return{action:e,data:t,type:"sendMessage"}}var A={state:{userId:null,isLoaded:!1,isCreated:!1,path:null,players:[],teams:[],master:null,playerName:null,teamId:null,teamName:null,entriesPerPlayer:null,canStart:!1,isStarted:!1,isFinished:!1,turnTime:null,scorePerEntry:1,roundStarted:!1,activePlayer:null,turnStarted:!1,turnTimeLeft:null,activeEntry:null},getters:{isMaster:function(e){return e.master===e.userId},masterName:function(e){return e.players.find((function(t){return t.id===e.master}))},shareableLink:function(e){return"".concat(window.location.protocol,"//").concat(window.location.host,"/").concat(e.path)}},mutations:{load:function(e,t){var r=t.userId,n=t.game;e.userId=r,n&&(e.path=n.path,e.players=n.players,e.teams=n.teams,e.master=n.master,e.playerName=n.playerName,e.teamId=n.teamId,e.teamName=n.teamName,e.entriesPerPlayer=n.entriesPerPlayer,e.canStart=n.canStart,e.isStarted=n.isStarted,e.isFinished=n.isFinished,e.turnTime=n.turnTime,e.scorePerEntry=n.scorePerEntry,e.roundStarted=n.roundStarted,e.activePlayer=n.activePlayer,e.teamIsActive=n.teamIsActive,e.playerIsActive=n.playerIsActive,e.turnStarted=n.turnStarted,e.turnTimeLeft=n.turnTimeLeft,e.isCreated=!0),e.isLoaded=!0},setPath:function(e,t){e.path=t},addPlayer:function(e,t){e.players.push(t)},setPlayerName:function(e,t){e.playerName=t},setEntriesPerPlayer:function(e,t){e.entriesPerPlayer=t},setCanStart:function(e,t){e.canStart=t}},actions:{newGame:function(e){return Object(I["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.state,e.commit,n=e.dispatch,t.next=3,n(K("newGame"));case 3:r.master=r.userId,r.isCreated=!0;case 5:case"end":return t.stop()}}),t)})))()},setPlayerName:function(e,t){return Object(I["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return e.state,n=e.commit,a=e.dispatch,r.next=3,a(K("setPlayerName",t));case 3:n("setPlayerName",t);case 4:case"end":return r.stop()}}),r)})))()},setEntriesPerPlayer:function(e,t){return Object(I["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=e.commit,a=e.dispatch,r.next=3,a(K("setEntriesPerPlayer",t));case 3:n("setEntriesPerPlayer",t);case 4:case"end":return r.stop()}}),r)})))()},startGame:function(e){return Object(I["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:r=e.dispatch,r(K("startGame"));case 2:case"end":return t.stop()}}),t)})))()}}};n["a"].use(c["a"]);var $=new c["a"].Store({modules:{socket:M,game:A}}),H="https:"===window.location.protocol?"wss":"ws",J="".concat(H,"://").concat(window.location.host,"/ws/");n["a"].use(o.a,J,{store:$,reconnection:!0,passToStoreHandler:function(e,t){if(e.startsWith("SOCKET_")){var r=e.toUpperCase(),n=t;if(t.data){var a=JSON.parse(t.data);r=a.mutation,n=a.data}this.store.commit(r,n)}}}),n["a"].config.productionTip=!1,new n["a"]({store:$,render:function(e){return e(G)}}).$mount("#app")},"5c0b":function(e,t,r){"use strict";var n=r("9c0c"),a=r.n(n);a.a},"9c0c":function(e,t,r){}});
//# sourceMappingURL=app.e59b603f.js.map