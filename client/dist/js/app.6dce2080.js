(function(e){function t(t){for(var r,s,o=t[0],u=t[1],c=t[2],m=0,d=[];m<o.length;m++)s=o[m],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&d.push(a[s][0]),a[s]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);l&&l(t);while(d.length)d.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==a[u]&&(r=!1)}r&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={app:0},i=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var l=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0006":function(e,t,n){"use strict";var r=n("02f7"),a=n.n(r);a.a},"02f7":function(e,t,n){},"170b":function(e,t,n){},"17a0":function(e,t,n){},"1d49":function(e,t,n){"use strict";var r=n("17a0"),a=n.n(r);a.a},"1dcc":function(e,t,n){},"21a6":function(e,t,n){"use strict";var r=n("170b"),a=n.n(r);a.a},"56d7":function(e,t,n){"use strict";n.r(t);n("99af"),n("2ca0"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=n("b408"),i=n.n(a),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("HelpButton"),e.showHelp?n("Help"):e.isLoaded?n("div",[e.gameStarted?n("Game"):e.gameCreated?n("Setup"):n("Home")],1):n("HomeCube",[n("SpinnerLoader",{staticClass:"centerHome",attrs:{color:"#344558"}})],1)],1)},o=[],u=n("2f62"),c=n("d1ad"),l=n.n(c),m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{on:{click:e.toggleHelp}},[n("div",{staticClass:"infoCorner"}),n("div",{staticClass:"infoCornerBottomLeft"})])},d=[],p={name:"HelpButton",methods:Object(u["d"])(["toggleHelp"])},f=p,v=(n("21a6"),n("2877")),y=Object(v["a"])(f,m,d,!1,null,"33a5cc7e",null),h=y.exports,g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"homeCubeDropShadow"}),n("div",{staticClass:"homeCube"},[e._t("default")],2)])},b=[],T={name:"HomeCube"},w=T,P=(n("0006"),Object(v["a"])(w,g,b,!1,null,"edab2782",null)),x=P.exports,O=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" Komt binnenkort! ")])},C=[],j={name:"Game",components:{},computed:Object(u["e"])({})},_=j,S=Object(v["a"])(_,O,C,!1,null,"e09064d6",null),N=S.exports,R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("HomeCube",[n("div",{staticClass:"generalFont helpText"},[e._v(" Dit is een online tool ter ondersteuning om het briefjesspel via Skype te kunnen spelen! ")])])},E=[],k={name:"Help",components:{HomeCube:x}},F=k,I=(n("5d53"),Object(v["a"])(F,R,E,!1,null,"34825f1a",null)),B=I.exports,H=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("HomeCube",[n("button",{staticClass:"centerHome generalFont nieuwSpel transparentButton",on:{click:e.newGame}},[e._v("NIEUW SPEL")])])},L=[],G={name:"Home",components:{HomeCube:x},methods:Object(u["b"])(["newGame"])},z=G,M=(n("ee07"),Object(v["a"])(z,H,L,!1,null,"4bbea606",null)),A=M.exports,$=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("HomeCube",[e.shareableLink&&e.isMaster?n("div",{staticClass:"generalFont spelLink linkPosition"},[e._v(e._s(e.shareableLink))]):e._e(),n("br"),n("br"),e.playerNameSet?!e.entriesPerPlayerSet&&e.isMaster?n("div",[n("label",{staticClass:"generalFont spelOpzetBriefjes labelPosition",attrs:{for:"entriesPerPlayer"}},[e._v("Aantal briefjes per speler:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.entriesPerPlayer,expression:"entriesPerPlayer"},{name:"focus",rawName:"v-focus"}],staticClass:"generalFont spelOpzetNaam centerTextInput",staticStyle:{color:"#688980"},attrs:{id:"entriesPerPlayer",type:"number",min:"1",max:"9"},domProps:{value:e.entriesPerPlayer},on:{input:function(t){t.target.composing||(e.entriesPerPlayer=t.target.value)}}}),n("button",{staticClass:"generalFont spelOpzetNaam transparentButton nextButton",on:{click:function(t){return e.setEntriesPerPlayer(e.entriesPerPlayer)}}},[e._v("»")])]):e.enoughEntries?!e.teamsConfirmed&&e.isMaster?n("SetupTeams"):!e.turnTimeSet&&e.isMaster?n("div",[n("label",{staticClass:"generalFont spelOpzetBriefjes labelPosition",attrs:{for:"turnTime"}},[e._v("Aantal seconde per beurt:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.turnTime,expression:"turnTime"},{name:"focus",rawName:"v-focus"}],staticClass:"generalFont spelOpzetNaam centerTextInput",staticStyle:{color:"#688980"},attrs:{id:"turnTime",type:"number",min:"5",step:"5"},domProps:{value:e.turnTime},on:{input:function(t){t.target.composing||(e.turnTime=t.target.value)}}}),n("button",{staticClass:"generalFont spelOpzetNaam transparentButton nextButton",on:{click:function(t){return e.setTurnTime(e.turnTime)}}},[e._v("»")])]):e.canStart&&e.isMaster?n("div",[n("button",{staticClass:"generalFont spelOpzetNaam centerTextInput",on:{click:e.startGame}},[e._v("Start")])]):e.canStart?n("div",{staticClass:"generalFont spelOpzetBriefjes centerTextInput"},[e._v(" Wachten tot het spel begint... ")]):n("div",{staticClass:"generalFont spelOpzetBriefjes centerTextInput"},[e._v(" Wachten tot het spel kan beginnen... ")]):n("div",[n("label",{staticClass:"generalFont spelOpzetBriefjes labelPosition",attrs:{for:"entry"}},[e._v(" Vul "),e.firstEntryAdded?n("span",[e._v("nog ")]):e._e(),e._v("een briefje in: ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.entry,expression:"entry"},{name:"focus",rawName:"v-focus"}],staticClass:"generalFont spelOpzetNaam centerTextInput",staticStyle:{color:"#688980"},attrs:{id:"entry",type:"text"},domProps:{value:e.entry},on:{input:function(t){t.target.composing||(e.entry=t.target.value)}}}),n("button",{staticClass:"generalFont spelOpzetNaam transparentButton nextButton",on:{click:function(t){return e.pushEntry()}}},[e._v("»")])]):n("div",[n("label",{staticClass:"generalFont spelOpzetBriefjes labelPosition",attrs:{for:"playerName"}},[e._v("Vul je naam in:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.playerName,expression:"playerName"},{name:"focus",rawName:"v-focus"}],staticClass:"generalFont spelOpzetNaam centerTextInput",staticStyle:{color:"#688980"},attrs:{id:"playerName",type:"text"},domProps:{value:e.playerName},on:{input:function(t){t.target.composing||(e.playerName=t.target.value)}}}),n("button",{staticClass:"generalFont spelOpzetNaam transparentButton nextButton",on:{click:function(t){return e.setPlayerName(e.playerName)}}},[e._v("»")])])],1)},K=[],q=n("5530"),J=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.editing?n("div",[n("h4",{staticClass:"generalFont teamLabel teamName"},[e._v("Spelers "+e._s(e.teams[e.editing].name)+":")]),n("ul",{staticClass:"teamList"},e._l(e.players,(function(t){return n("li",{key:t.id,staticClass:"teamItem"},[n("div",{staticClass:"generalFont teamItemName"},[e._v(" "+e._s(t.name)+" "),t.teamId?n("span",[e._v("("+e._s(e.teams[t.teamId].name)+")")]):e._e()]),t.teamId===e.editing?n("div",{staticClass:"listButton"},[n("button",{staticClass:"generalFont transparentButton",on:{click:function(n){return e.removePlayerFromTeam({id:t.id,teamId:e.editing})}}},[e._v("X")])]):n("div",{staticClass:"listButton"},[n("button",{staticClass:"generalFont transparentButton",on:{click:function(n){return e.addPlayerToTeam({id:t.id,teamId:e.editing})}}},[e._v("V")])])])})),0),n("div",[n("button",{staticClass:"generalFont transparentButton nextButton",on:{click:function(t){return e.stopEditing()}}},[e._v("»")])])]):n("div",[n("div",[n("label",{staticClass:"generalFont teamLabel teamName",attrs:{for:"teamName"}},[e._v("Voeg team toe:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.teamName,expression:"teamName"},{name:"focus",rawName:"v-focus"}],staticClass:"generalFont teamNameInput teamName",staticStyle:{color:"#688980"},attrs:{id:"teamName",type:"text"},domProps:{value:e.teamName},on:{input:function(t){t.target.composing||(e.teamName=t.target.value)}}}),n("button",{staticClass:"generalFont transparentButton teamNameButton teamName",on:{click:function(t){return e.confirmAddTeam()}}},[e._v("»")])]),n("ul",{staticClass:"teamList"},e._l(e.teams,(function(t){return n("li",{key:t.id,staticClass:"teamItem"},[n("div",{staticClass:"generalFont teamItemName"},[e._v(" "+e._s(t.name)+" ("+e._s(e.playersForTeam(t.id).length)+" spelers) ")]),n("div",{staticClass:"listButton"},[n("button",{staticClass:"generalFont transparentButton",on:{click:function(n){return e.removeTeam(t.id)}}},[e._v("X")])]),n("div",{staticClass:"listButton"},[n("button",{staticClass:"generalFont transparentButton",on:{click:function(n){return e.editTeam(t.id)}}},[e._v("»")])])])})),0),e.allPlayersAssigned?n("div",[n("button",{staticClass:"generalFont transparentButton nextButton",on:{click:function(t){return e.confirmTeams()}}},[e._v("»")])]):e._e()])])},V=[],W=n("2909"),D={name:"SetupTeams",components:{},data:function(){return{teamName:"",editing:null}},computed:Object(q["a"])({},Object(u["e"])({teams:function(e){return e.game.teams}}),{},Object(u["c"])(["allPlayersAssigned","playersForTeam","playersNotInTeam"]),{players:function(){return[].concat(Object(W["a"])(this.playersForTeam(this.editing)),Object(W["a"])(this.playersNotInTeam(this.editing)))}}),methods:Object(q["a"])({confirmAddTeam:function(){this.addTeam(this.teamName),this.teamName=""},editTeam:function(e){this.editing=e},stopEditing:function(){this.editing=null}},Object(u["d"])(["confirmTeams"]),{},Object(u["b"])(["addTeam","addPlayerToTeam","removePlayerFromTeam","removeTeam"]))},U=D,X=(n("dec9"),Object(v["a"])(U,J,V,!1,null,"eddadab0",null)),Q=X.exports,Y={name:"Setup",components:{HomeCube:x,SetupTeams:Q},data:function(){return{playerName:"",entriesPerPlayer:4,entry:"",firstEntryAdded:!1,turnTime:60}},computed:Object(q["a"])({},Object(u["e"])({teamsConfirmed:function(e){return e.game.teamsConfirmed}}),{},Object(u["c"])(["isMaster","shareableLink","playerNameSet","entriesPerPlayerSet","enoughEntries","turnTimeSet","canStart"])),methods:Object(q["a"])({pushEntry:function(){this.addEntry(this.entry),this.entry="",this.firstEntryAdded=!0}},Object(u["b"])(["setPlayerName","setEntriesPerPlayer","startGame","addEntry","setTurnTime"]))},Z=Y,ee=(n("1d49"),Object(v["a"])(Z,$,K,!1,null,"048647ab",null)),te=ee.exports,ne={name:"App",components:{SpinnerLoader:l.a,HelpButton:h,HomeCube:x,Game:N,Help:B,Home:A,Setup:te},computed:Object(u["e"])({isLoaded:function(e){return e.isLoaded},showHelp:function(e){return e.showHelp},gameCreated:function(e){return e.game.isCreated},gameStarted:function(e){return e.game.isStarted}})},re=ne,ae=(n("5c0b"),Object(v["a"])(re,s,o,!1,null,null,null)),ie=ae.exports,se=(n("4160"),n("d3b7"),n("159b"),n("ddb0"),n("96cf"),n("1da1")),oe={state:{isConnected:!1,reconnectError:!1},mutations:{SOCKET_ONOPEN:function(e,t){r["a"].prototype.$socket=t.currentTarget,e.isConnected=!0},SOCKET_ONCLOSE:function(e,t){e.isConnected=!1},SOCKET_ONERROR:function(e,t){console.error(e,t)},SOCKET_ONMESSAGE:function(e,t){console.info(t)},SOCKET_RECONNECT:function(e,t){console.debug(e,t)},SOCKET_RECONNECT_ERROR:function(e){e.reconnectError=!0}},actions:{sendMessage:function(e,t){return Object(se["a"])(regeneratorRuntime.mark((function n(){var a,i,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a=e.state,i=t.messageType,s=t.payload,a.isConnected){n.next=4;break}throw new Error("Not connected; could not send message "+i);case 4:r["a"].prototype.$socket.send(JSON.stringify({type:i,payload:s}));case 5:case"end":return n.stop()}}),n)})))()}}},ue=(n("a623"),n("4de4"),n("b0c0"),n("07ac"),function(e,t){return{messageType:e,payload:t,type:"sendMessage"}}),ce=function(){return"Capone Light"},le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=window.location.protocol,n=window.location.host;return"localhost:8080"===n&&(n="localhost:4000"),"".concat(t,"//").concat(n,"/").concat(e)},me={state:{isCreated:!1,path:null,players:{},teams:{},master:null,entriesPerPlayer:0,teamsConfirmed:!1,isStarted:!1,isFinished:!1,turnTime:0,scorePerEntry:1,roundStarted:!1,roundFinished:!1,activeTeam:null,activePlayer:null,nextTeam:null,nextPlayer:null,turnStarted:!1,turnFinished:!1,activeEntry:null,turnTimeLeft:0,scoreThisTurn:0,player:{id:null,name:null,teamId:null,isReady:!1},font:null,entries:[]},getters:{isMaster:function(e){return e.master===e.player.id},master:function(e){return e.players[e.master]},shareableLink:function(e){return e.path?le(e.path):null},playerNameSet:function(e){return!!e.player.name},entriesPerPlayerSet:function(e){return!!e.entriesPerPlayer},enoughEntries:function(e){return e.entries.length>=e.entriesPerPlayer},turnTimeSet:function(e){return!!e.turnTime},team:function(e){return e.teams[e.player.teamId]},players:function(e){return Object.values(e.players).filter((function(e){return e.name}))},playersForTeam:function(e){return function(t){return Object.values(e.players).filter((function(e){return e.teamId===t}))}},playersNotInTeam:function(e){return function(t){return Object.values(e.players).filter((function(e){return e.teamId!==t}))}},allPlayersReady:function(e){return Object.values(e.players).every((function(e){return e.isReady}))},allPlayersAssigned:function(e){return Object.values(e.players).every((function(e){return e.teamId}))},canStart:function(e,t){return t.allPlayersReady&&t.allPlayersAssigned},myTurn:function(e){return e.activePlayer===e.player.id}},mutations:{addPlayer:function(e,t){r["a"].set(e.players,t.id,t)},setPlayerName:function(e,t){var n=t.id,r=t.name,a=e.players[n];a&&(a.name=r)},removePlayer:function(e,t){r["a"].delete(this.players,t)},updateMaster:function(e,t){e.master=t},setEntriesPerPlayer:function(e,t){e.entriesPerPlayer=t},setPlayerReady:function(e,t){var n=e.players[t];n&&(n.isReady=!0)},addTeam:function(e,t){r["a"].set(e.teams,t.id,t)},addPlayerToTeam:function(e,t){var n=t.id,r=t.teamId,a=e.players[n];a&&(a.teamId=r)},removePlayerFromTeam:function(e,t){var n=t.id,r=t.teamId,a=e.players[n];a&&a.teamId===r&&(a.teamId=null)},removeTeam:function(e,t){r["a"].delete(e.teams,t),Object.values(e.players).forEach((function(e){e.teamId===t&&(e.teamId=null)}))},confirmTeams:function(e){e.teamsConfirmed=!0},setTurnTime:function(e,t){e.turnTime=t},startGame:function(e){e.isStarted=!0},startRound:function(e,t){var n=t.activeTeam,r=t.activePlayer,a=t.nextTeam,i=t.nextPlayer;e.activeTeam=n,e.activePlayer=r,e.nextTeam=a,e.nextPlayer=i,e.turnTimeLeft=e.turnTime,e.roundStarted=!0},startTurn:function(e){e.turnStarted=!0},nextEntry:function(e,t){e.activeEntry=t},updateTeamScore:function(e,t){var n=t.id,r=t.score,a=t.scoreThisRound,i=t.scoreThisTurn;e.scoreThisTurn=i;var s=e.teams[n];s&&(s.score=r,s.scoreThisRound=a)},finishTurn:function(e){e.turnFinished=!0},nextTurn:function(e,t){var n=t.activeTeam,r=t.activePlayer,a=t.nextTeam,i=t.nextPlayer;e.activeTeam=n,e.activePlayer=r,e.nextTeam=a,e.nextPlayer=i,e.turnStarted=!1,e.turnFinished=!1,e.turnTimeLeft=e.turnTime,e.scoreThisTurn=0},finishRound:function(e){e.roundFinished=!0},nextRound:function(e){e.roundStarted=!1,e.roundFinished=!1,Object.values(e.teams).forEach((function(e){e.scoreThisRound=0}))},finishGame:function(e){e.isFinished=!0},setName:function(e,t){e.player.name=t},setFont:function(e,t){e.font=t},addEntry:function(e,t){e.entries.push(t)}},actions:{newGame:function(e){return Object(se["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.dispatch,n(ue("newGame"));case 2:case"end":return t.stop()}}),t)})))()},setPlayerName:function(e,t){return Object(se["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=e.commit,a=e.dispatch,!t){n.next=6;break}return n.next=4,a(ue("setPlayerName",t));case 4:r("setName",t),a("setFont",ce());case 6:case"end":return n.stop()}}),n)})))()},removePlayer:function(e,t){return Object(se["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,a=e.dispatch,n.next=3,a(ue("removePlayer",t));case 3:r("removePlayer",t);case 4:case"end":return n.stop()}}),n)})))()},leaveGame:function(e){return Object(se["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.dispatch,n(ue("leaveGame"));case 2:case"end":return t.stop()}}),t)})))()},stayInCurrentGame:function(e){return Object(se["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.dispatch,r=e.commit,t.next=3,n(ue("stayInCurrentGame"));case 3:r("stayInCurrentGame");case 4:case"end":return t.stop()}}),t)})))()},setFont:function(e,t){return Object(se["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=e.commit,a=e.dispatch,!t){n.next=5;break}return n.next=4,a(ue("setFont",t));case 4:r("setFont",t);case 5:case"end":return n.stop()}}),n)})))()},setEntriesPerPlayer:function(e,t){return Object(se["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=e.commit,a=e.dispatch,!t){n.next=5;break}return n.next=4,a(ue("setEntriesPerPlayer",t));case 4:r("setEntriesPerPlayer",t);case 5:case"end":return n.stop()}}),n)})))()},addEntry:function(e,t){return Object(se["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=e.commit,a=e.dispatch,!t){n.next=5;break}return n.next=4,a(ue("addEntry",t));case 4:r("addEntry",t);case 5:case"end":return n.stop()}}),n)})))()},addTeam:function(e,t){return Object(se["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r=e.dispatch,t&&r(ue("addTeam",t));case 2:case"end":return n.stop()}}),n)})))()},addPlayerToTeam:function(e,t){return Object(se["a"])(regeneratorRuntime.mark((function n(){var r,a,i,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=e.commit,a=e.dispatch,i=t.id,s=t.teamId,!i||!s){n.next=6;break}return n.next=5,a(ue("addPlayerToTeam",{id:i,teamId:s}));case 5:r("addPlayerToTeam",{id:i,teamId:s});case 6:case"end":return n.stop()}}),n)})))()},removePlayerFromTeam:function(e,t){return Object(se["a"])(regeneratorRuntime.mark((function n(){var r,a,i,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=e.commit,a=e.dispatch,i=t.id,s=t.teamId,!i||!s){n.next=6;break}return n.next=5,a(ue("removePlayerFromTeam",{id:i,teamId:s}));case 5:r("removePlayerFromTeam",{id:i,teamId:s});case 6:case"end":return n.stop()}}),n)})))()},removeTeam:function(e,t){return Object(se["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,a=e.dispatch,n.next=3,a(ue("removeTeam",t));case 3:r("removeTeam",t);case 4:case"end":return n.stop()}}),n)})))()},setTurnTime:function(e,t){return Object(se["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=e.commit,a=e.dispatch,!t){n.next=5;break}return n.next=4,a(ue("setTurnTime",t));case 4:r("setTurnTime",t);case 5:case"end":return n.stop()}}),n)})))()},startGame:function(e){return Object(se["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.dispatch,n(ue("startGame"));case 2:case"end":return t.stop()}}),t)})))()},startRound:function(e){return Object(se["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.dispatch,n(ue("startRound"));case 2:case"end":return t.stop()}}),t)})))()},startTurn:function(e){return Object(se["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.dispatch,n(ue("startTurn"));case 2:case"end":return t.stop()}}),t)})))()},nextEntry:function(e){return Object(se["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.dispatch,n(ue("nextEntry"));case 2:case"end":return t.stop()}}),t)})))()},nextTurn:function(e){return Object(se["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.dispatch,n(ue("nextTurn"));case 2:case"end":return t.stop()}}),t)})))()},nextRound:function(e){return Object(se["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.dispatch,n(ue("nextRound"));case 2:case"end":return t.stop()}}),t)})))()},finishGame:function(e){return Object(se["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.dispatch,n(ue("finishGame"));case 2:case"end":return t.stop()}}),t)})))()},newGameFromCurrent:function(e){return Object(se["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.dispatch,n(ue("newGameFromCurrent"));case 2:case"end":return t.stop()}}),t)})))()}}};r["a"].use(u["a"]);var de=new u["a"].Store({state:{isLoaded:!1,showHelp:!1,requestToLeave:!1},mutations:{load:function(e,t){var n=t.userId,a=t.game;a?(e.game.path=a.path,window.location.href!==le(a.path)&&window.history.pushState(null,"","/"+a.path),a.players.forEach((function(t){r["a"].set(e.game.players,t.id,t)})),a.teams.forEach((function(t){r["a"].set(e.game.teams,t.id,t)})),e.game.master=a.master,e.game.entriesPerPlayer=a.entriesPerPlayer,e.game.teamsConfirmed=a.isStarted,e.game.isStarted=a.isStarted,e.game.isFinished=a.isFinished,e.game.turnTime=a.turnTime,e.game.scorePerEntry=a.scorePerEntry,e.game.roundStarted=a.roundStarted,e.game.roundFinished=a.roundFinished,e.game.activeTeam=a.activeTeam,e.game.activePlayer=a.activePlayer,e.game.nextTeam=a.nextTeam,e.game.nextPlayer=a.nextPlayer,e.game.turnStarted=a.turnStarted,e.game.turnFinished=a.turnFinished,e.game.activeEntry=a.activeEntry,e.game.turnTimeLeft=a.turnTimeLeft,e.game.scoreThisTurn=a.scoreThisTurn,e.game.player=e.game.players[n],e.game.font=a.font,e.game.entries=a.entries,e.game.isCreated=!0):e.game.player.id=n,e.isLoaded=!0},requestToLeave:function(e){e.requestToLeave=!0},leaveGame:function(){window.location.href="/"},redirectToGame:function(e,t){window.location.href="/"+t},stayInCurrentGame:function(e){e.requestToLeave=!1},toggleHelp:function(e){e.showHelp=!e.showHelp}},modules:{socket:oe,game:me}}),pe="https:"===window.location.protocol?"wss":"ws",fe="".concat(pe,"://").concat(window.location.host,"/ws/");r["a"].use(i.a,fe,{store:de,reconnection:!0,passToStoreHandler:function(e,t){if(e.startsWith("SOCKET_")){var n=e.toUpperCase(),r=t;if(t.data){var a=JSON.parse(t.data);n=a.type,r=a.payload}this.store.commit(n,r)}}}),r["a"].directive("focus",{inserted:function(e){e.focus()}}),r["a"].config.productionTip=!1,new r["a"]({store:de,render:function(e){return e(ie)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("9c0c"),a=n.n(r);a.a},"5d53":function(e,t,n){"use strict";var r=n("7af7"),a=n.n(r);a.a},"7af7":function(e,t,n){},"9c0c":function(e,t,n){},dec9:function(e,t,n){"use strict";var r=n("1dcc"),a=n.n(r);a.a},ee07:function(e,t,n){"use strict";var r=n("f470"),a=n.n(r);a.a},f470:function(e,t,n){}});
//# sourceMappingURL=app.6dce2080.js.map