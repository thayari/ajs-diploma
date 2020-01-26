!function(e){var t={};function s(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(a,r,function(t){return e[t]}.bind(null,r));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=1)}([function(e,t,s){},function(e,t,s){"use strict";s.r(t);s(0);function a(e,t){let s=[];for(let e=8;e<t*(t-1);e+=t)s.push(e);let a=[];for(let e=7;e<t*(t-1);e+=t)a.push(e);return 0===e?"top-left":e<t-1?"top":e===t-1?"top-right":-1!==s.indexOf(e)?"left":-1!==a.indexOf(e)?"right":e===t*(t-1)?"bottom-left":e===t*t-1?"bottom-right":e>t*(t-1)?"bottom":"center"}class r{constructor(){this.boardSize=8,this.container=null,this.boardEl=null,this.cells=[],this.cellClickListeners=[],this.cellEnterListeners=[],this.cellLeaveListeners=[],this.newGameListeners=[],this.saveGameListeners=[],this.loadGameListeners=[]}bindToDOM(e){if(!(e instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=e}drawUi(e){this.checkBinding(),this.container.innerHTML='\n      <div class="controls">\n        <button data-id="action-restart" class="btn">New Game</button>\n        <button data-id="action-save" class="btn">Save Game</button>\n        <button data-id="action-load" class="btn">Load Game</button>\n      </div>\n      <div class="board-container">\n        <div data-id="board" class="board"></div>\n      </div>\n    ',this.newGameEl=this.container.querySelector("[data-id=action-restart]"),this.saveGameEl=this.container.querySelector("[data-id=action-save]"),this.loadGameEl=this.container.querySelector("[data-id=action-load]"),this.newGameEl.addEventListener("click",e=>this.onNewGameClick(e)),this.saveGameEl.addEventListener("click",e=>this.onSaveGameClick(e)),this.loadGameEl.addEventListener("click",e=>this.onLoadGameClick(e)),this.boardEl=this.container.querySelector("[data-id=board]"),this.boardEl.classList.add(e);for(let e=0;e<this.boardSize**2;e+=1){const t=document.createElement("div");t.classList.add("cell","map-tile",`map-tile-${a(e,this.boardSize)}`),t.addEventListener("mouseenter",e=>this.onCellEnter(e)),t.addEventListener("mouseleave",e=>this.onCellLeave(e)),t.addEventListener("click",e=>this.onCellClick(e)),this.boardEl.appendChild(t)}this.cells=Array.from(this.boardEl.children)}redrawPositions(e){for(const e of this.cells)e.innerHTML="";for(const s of e){const e=this.boardEl.children[s.position],a=document.createElement("div");a.classList.add("character",s.character.type);const r=document.createElement("div");r.classList.add("health-level");const i=document.createElement("div");i.classList.add("health-level-indicator",`health-level-indicator-${t=s.character.health,t<15?"critical":t<50?"normal":"high"}`),i.style.width=`${s.character.health}%`,r.appendChild(i),a.appendChild(r),e.appendChild(a)}var t}addCellEnterListener(e){this.cellEnterListeners.push(e)}addCellLeaveListener(e){this.cellLeaveListeners.push(e)}addCellClickListener(e){this.cellClickListeners.push(e)}addNewGameListener(e){this.newGameListeners.push(e)}addSaveGameListener(e){this.saveGameListeners.push(e)}addLoadGameListener(e){this.loadGameListeners.push(e)}onCellEnter(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellEnterListeners.forEach(e=>e.call(null,t))}onCellLeave(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellLeaveListeners.forEach(e=>e.call(null,t))}onCellClick(e){const t=this.cells.indexOf(e.currentTarget);this.cellClickListeners.forEach(e=>e.call(null,t))}onNewGameClick(e){e.preventDefault(),this.newGameListeners.forEach(e=>e.call(null))}onSaveGameClick(e){e.preventDefault(),this.saveGameListeners.forEach(e=>e.call(null))}onLoadGameClick(e){e.preventDefault(),this.loadGameListeners.forEach(e=>e.call(null))}static showError(e){alert(e)}static showMessage(e){alert(e)}selectCell(e,t="yellow"){this.deselectCell(e),this.cells[e].classList.add("selected",`selected-${t}`)}deselectCell(e){const t=this.cells[e];t.classList.remove(...Array.from(t.classList).filter(e=>e.startsWith("selected")))}showCellTooltip(e,t){this.cells[t].title=e}hideCellTooltip(e){this.cells[e].title=""}showDamage(e,t){return new Promise(s=>{const a=this.cells[e],r=document.createElement("span");r.textContent=t,r.classList.add("damage"),a.appendChild(r),r.addEventListener("animationend",()=>{a.removeChild(r),s()})})}setCursor(e){this.boardEl.style.cursor=e}checkBinding(){if(null===this.container)throw new Error("GamePlay not bind to DOM")}}class n{constructor(e,t="generic"){this.level=e,this.attack=0,this.defence=0,this.health=50,this.type=t}levelUp(){this.level+=1,this.attack=Math.round(Math.max(this.attack,this.attack*(1.8-(100-this.health)/100))),this.defence=Math.round(Math.max(this.defence,this.defence*(1.8-(100-this.health)/100))),this.health=10*this.level+80,this.health>100&&(this.health=100)}}class l{constructor(e,t){if(!(e instanceof n))throw new Error("character must be instance of Character or its children");if("number"!=typeof t)throw new Error("position must be a number");this.character=e,this.position=t}}function o(e,t){let s=Math.floor(Math.random()*e.length),a=Math.floor(Math.random()*t+1);const[r,n]=function(e){let t=[],s=[];for(let s=0;s<e*e;s+=e)t.push(s);for(let s=1;s<e*e;s+=e)t.push(s);for(let t=e-1;t<e*e;t+=e)s.push(t);for(let t=e-2;t<e*e;t+=e)s.push(t);return[t,s]}(8),o=new e[s](1);if(a>1)for(i=0;i<a-1;i++)o.levelUp();let h=[];h="Bowman"===o.type||"Magician"===o.type||"Swordsman"===o.type?r:n;let c=h[Math.floor(Math.random()*h.length)];return new l(o,c)}function h(e,t,s){const a=[];for(let r=0;r<s;r++){const s=o(e,t);a.push(s)}return a}class c{constructor(e){this.boardSize=e,this.boardIndexes=this.makeIndexes(),this.boardArray=this.makeArray()}makeIndexes(){const e=[];for(let t=0;t<this.boardSize**2;t++)e.push(t);return e}makeArray(){let e=[];for(let t=0;t<this.boardIndexes.length;t+=this.boardSize)e.push(this.boardIndexes.slice(t,t+this.boardSize));return e}coordinates(e){let t=0;return 0!=e&&(t=this.boardArray.findIndex(t=>t.find(t=>t===e))),[this.boardArray[t].findIndex(t=>t===e),t]}calculateArea(e,t){const s=[],[a,r]=this.coordinates(t);for(let t=r-e;t<=r+e;t++)if(t>=0&&t<this.boardSize)for(let r=a-e;r<=a+e;r++)r>=0&&r<this.boardSize&&s.push(this.boardArray[t][r]);return s.splice(s.indexOf(t),1),s}calculateAreaMove(e,t){let s=[];const[a,r]=this.coordinates(t);for(let t=r-e;t<=r+e;t++)t>=0&&t<this.boardSize&&s.push(this.boardArray[t][a]);for(let t=a-e;t<=a+e;t++)t>=0&&t<this.boardSize&&s.push(this.boardArray[r][t]);for(let t=0;t<=2*e;t++){let i=r-e+t;i>=0&&i<this.boardSize&&(s.push(this.boardArray[i][a-e+t]),s.push(this.boardArray[i][a+e-t]))}return s=s.filter(e=>void 0!==e),s=[...new Set(s)],s}}class d extends n{constructor(e){super(e,"Bowman"),this.attack=25,this.defence=25,this.health=100,this.distanceAttack=2,this.distanceMove=2}}class u extends n{constructor(e){super(e,"Daemon"),this.attack=10,this.defence=40,this.health=100,this.distanceAttack=4,this.distanceMove=1}}class m extends n{constructor(e){super(e,"Swordsman"),this.attack=40,this.defence=10,this.health=100,this.distanceAttack=1,this.distanceMove=4}}class f extends n{constructor(e){super(e,"Undead"),this.attack=25,this.defence=25,this.health=100,this.distanceAttack=1,this.distanceMove=4}}class C extends n{constructor(e){super(e,"Vampire"),this.attack=40,this.defence=10,this.health=100,this.distanceAttack=2,this.distanceMove=2}}class p{constructor(e,t){this.gamePlay=e,this.board=new c(this.gamePlay.boardSize),this.stateService=t,this.onCellEnter=this.onCellEnter.bind(this),this.onCellLeave=this.onCellLeave.bind(this),this.onCellClick=this.onCellClick.bind(this),this.playerChars=[],this.enemyChars=[],this.allChars=this.playerChars.concat(this.enemyChars),this.currentChar=null}startNewGame(){return this.playerChars=h([m,d],1,2),this.enemyChars=h([u,f,C],1,2),this.allChars=this.playerChars.concat(this.enemyChars),this.allChars}init(){this.gamePlay.drawUi("prairie"),this.addListeners(),this.gamePlay.redrawPositions(this.startNewGame())}addListeners(){this.gamePlay.addCellEnterListener(this.onCellEnter),this.gamePlay.addCellLeaveListener(this.onCellLeave),this.gamePlay.addCellClickListener(this.onCellClick)}static checkChar(e,t=[]){for(let s of t)if(e.classList.contains(s))return!0}defineCurrentChar(e){this.currentChar=this.playerChars.filter(t=>t.position===e)[0],this.currentChar.areaMove=this.board.calculateAreaMove(this.currentChar.character.distanceMove,this.currentChar.position),this.currentChar.areaAttack=this.board.calculateArea(this.currentChar.character.distanceAttack,this.currentChar.position)}onCellClick(e){const t=event.target,s=t&&p.checkChar(t,["Bowman","Swordsman","Magician"]);if(p.checkChar(t,["Undead","Zombie","Daemon"])&&r.showError("This is an enemy character!"),this.gamePlay.boardEl.querySelector(".selected-yellow")){const t=this.gamePlay.boardEl.querySelector(".selected-yellow"),a=this.gamePlay.cells.indexOf(t);this.gamePlay.deselectCell(a),s&&(this.gamePlay.selectCell(e),this.defineCurrentChar(e))}else s?(this.gamePlay.selectCell(e),this.defineCurrentChar(e)):-1!==this.currentChar.areaMove.indexOf(e)&&this.moveChar(e)}onCellEnter(e){const t=event.target.querySelector(".character");if(t){const s=this.allChars.filter(t=>t.position===e)[0].character,a=`🎖️ ${s.level} ⚔ ${s.attack} 🛡️ ${s.defence} ♥️ ${s.health}`;this.gamePlay.showCellTooltip(a,e),p.checkChar(t,["Bowman","Swordsman","Magician"])?this.gamePlay.setCursor("pointer"):null!==this.currentChar&&-1!==this.currentChar.areaAttack.indexOf(e)?(this.gamePlay.setCursor("crosshair"),this.gamePlay.selectCell(e,"red")):this.gamePlay.setCursor("not-allowed")}else null!==this.currentChar&&-1!==this.currentChar.areaMove.indexOf(e)?(this.gamePlay.setCursor("pointer"),this.gamePlay.selectCell(e,"green")):this.gamePlay.setCursor("not-allowed")}onCellLeave(e){this.gamePlay.hideCellTooltip(e),this.gamePlay.setCursor("auto"),(event.target.classList.contains("selected-green")||event.target.classList.contains("selected-red"))&&this.gamePlay.deselectCell(e)}moveChar(e){this.currentChar.position=e,this.gamePlay.redrawPositions(this.allChars),this.defineCurrentChar(e)}}const v=new r;v.bindToDOM(document.querySelector("#game-container"));const y=new class{constructor(e){this.storage=e}save(e){this.storage.setItem("state",JSON.stringify(e))}load(){try{return JSON.parse(this.storage.getItem("state"))}catch(e){throw new Error("Invalid state")}}}(localStorage);new p(v,y).init()}]);