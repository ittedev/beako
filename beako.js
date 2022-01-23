var c=Symbol("Beako"),f=Symbol("Reactive"),k=Symbol("Array"),d=Symbol("Beako-lock");function x(e,t,n){if(!e[d]){if(!(c in e)){let r=()=>{e[c][f][1].forEach(a=>a())};if(e[c]={[f]:[["bio",r],new Set]},Array.isArray(e)){let a=e[c][k]=e.slice(),o=i=>(r(),i),s=i=>(C(e),r(),i);Object.defineProperties(e,{unshift:{get(){return(...i)=>s(Array.prototype.unshift.call(a,...i))}},push:{get(){return(...i)=>s(Array.prototype.push.call(a,...i))}},splice:{get(){return(i,l,...u)=>s(l===void 0?Array.prototype.splice.call(a,i,a.length-i):Array.prototype.splice.apply(a,[i,l,...u]))}},pop:{get(){return()=>s(Array.prototype.pop.call(a))}},shift:{get(){return()=>s(Array.prototype.shift.call(a))}},sort:{get(){return i=>o(i===void 0?Array.prototype.sort.call(a):Array.prototype.sort.call(a,i))}},reverse:{get(){return()=>o(Array.prototype.reverse.call(a))}},copyWithin:{get(){return(i,l,u)=>o(Array.prototype.copyWithin.call(a,i,l!==void 0?l:0,u!==void 0?u:a.length))}}})}}if(t!==void 0)if(typeof t!="number"&&isNaN(t)){if(t in e[c]||(e[c][t]=[e[t],new Set],Object.defineProperty(e,t,{get(){return this[c][t][0]},set(r){e[c][f][1].forEach(a=>C(r,a)),ye(this[c][t],r)}})),n){for(let r of e[c][t][1])if(r[1]===n[1])return;e[c][t][1].add(n)}}else{let r=Object.getOwnPropertyDescriptor(e,t);(!r||"value"in r)&&t in e[c][k]&&Object.defineProperty(e,t,{get(){return this[c][k][t]},set(a){e[c][f][1].forEach(s=>C(a,s));let o=this[c][k][t];this[c][k][t]=a,o!==a&&e[c][f][0][1]()},configurable:!0,enumerable:!0})}}}function ye(e,t){let n=e[0];e[0]=t,n!==t&&e[1].forEach(r=>{switch(r[0]){case"bio":r[1]();break;case"bom":e[1].delete(r);case"spy":r[1](t,n);break}})}function C(e,t,n){if(typeof e=="object"&&e!==null&&(Object.getPrototypeOf(e)===Object.prototype||Array.isArray(e))){let r=e;if(!r[d])if(x(r),n===void 0){let a=r[c][f][1];typeof t=="function"&&a.add(t);for(let o in r){x(r,o,r[c][f][0]);let s=r[o];typeof s=="object"&&s!==null&&(a.size?a.forEach(i=>{(!(c in s)||!s[c][f][1].has(i))&&C(s,i)}):c in s||C(s))}if(Array.isArray(r)){let o=r[c][k].length;if(r.length<o)for(let s=r.length;s<o;s++)x(r,s);r.length=o}}else{let a=typeof n=="function"?["spy",n]:n;Array.isArray(t)?t.forEach(o=>x(r,o,a)):x(r,t,a)}}return e}async function ge(e,t){if(!e[d]){let n=Array.isArray(t)?t:[t],r=await Promise.all(n.map(a=>e[a]===void 0?new Promise(o=>{x(e,a,["bom",o])}):e[a]));return n.reduce((a,o,s)=>(a[o]=r[s],a),{})}return{}}function j(e,t,n){if(t!==void 0)c in e&&t in e[c]&&(n?e[c][t][1].forEach(r=>{r[1]===n&&e[c][t][1].delete(r)}):e[c][t][1].clear());else{for(let r in e[c])Object.defineProperty(e,r,{enumerable:!0,configurable:!0,writable:!0,value:e[c][r][0]}),delete e[c][r];Array.isArray(e)&&(delete e.push,delete e.sort,delete e.splice),delete e[c]}}function V(e,t,n){if(typeof e=="object"&&e!==null){let r=e;if(!r[d])if(n===void 0)if(t){let a=t;r[c]&&r[c][f][1].delete(a);for(let o in r)V(r[o],a)}else{for(let a in r)V(r[a]);j(r)}else Array.isArray(t)?t.forEach(a=>j(r,a,n)):j(r,t,n)}return e}function P(e,t){if(typeof e=="object"&&e!==null){let n=e;if(!n[d]){c in n&&n[c][f][1].add(t);for(let r in n)P(n[r],t)}}return e}function _(e){return e[d]=!0,e}function be(e){return delete e[d],e}var Q="destroy",X="patch",v=Object.seal({get destroy(){return Q},set destroy(e){if(typeof e=="string"&&e!=="")Q=e;else throw Error("Event type must be string")},get patch(){return X},set patch(e){if(typeof e=="string"&&e!=="")X=e;else throw Error("Event type must be string")}});function E(e){let t={node:e};return Y(t),t}function ke(e){let t={tag:e.tagName.toLowerCase(),node:e};return xe(t),Y(t),t}function xe(e){if(e.node.hasAttributes()){let t={};e.node.getAttributeNames().forEach(n=>{if(n.startsWith("on"))return;let r=e.node.getAttribute(n);switch(n){case"class":case"part":return e[n]=r.split(/\s+/);case"style":case"is":return e[n]=r;default:return t[n]=r}}),Object.keys(t).length&&(e.props=t)}}function Y(e){if(e.node.hasChildNodes()){let t=e.node.childNodes;e.children=[];for(let n=0;n<t.length;n++)switch(t[n].nodeType){case 1:if(t[n].tagName==="SCRIPT")break;e.children.push(ke(t[n]));break;case 3:e.children.push(t[n].data);break}}}function H(e){let t={};if("tag"in e){let n=t,r=e;if(n.tag=r.tag,"is"in r&&(n.is=r.tag),r.class&&(n.class=r.class.slice()),r.part&&(n.part=r.part.slice()),"style"in r&&(n.style=r.style),r.props&&(n.props={...r.props}),r.on){n.on={};for(let a in r.on)n.on[a]=r.on[a].slice()}}return e.children&&(t.children=e.children.map(n=>typeof n=="object"?H(n):n)),"node"in e&&(t.node=e.node),t}function A(e){e.children?.forEach(t=>typeof t=="object"&&A(t)),e.node.dispatchEvent(new CustomEvent(v.destroy,{bubbles:!1,detail:{ve:e}}))}function I(e,t){return te(e,t),e.node.dispatchEvent(new CustomEvent(v.patch,{bubbles:!0,composed:!0,detail:{tree:H(e)}})),e}function B(e,t){return(e.tag!==t.tag||e.is!==t.is||t.new)&&(e=t.is?{tag:t.tag,is:t.is,node:document.createElement(t.tag,{is:t.is})}:{tag:t.tag,node:document.createElement(t.tag)}),Ee(e,t),we(e,t),Ce(e,t),ve(e,t),Ae(e,t),te(e,t),Ve(e,t),"key"in t?e.key=t.key:delete e.key,e}function Ee(e,t){let n=(e.class||[]).join(" "),r=(t.class||[]).join(" ");n!==r&&(e.node.className=r),r.length?e.class=(t.class||[]).slice():delete e.class}function we(e,t){let n=e.part||[],r=t.part||[],a=r.filter(s=>!n.includes(s));a.length&&e.node.part.add(...a);let o=n.filter(s=>!r.includes(s));o.length&&e.node.part.remove(...o),r.length?e.part=r.slice():delete e.part}function Ce(e,t){if(e.node instanceof HTMLElement){let n=e.style||"",r=t.style||"";n!=r&&(e.node.style.cssText=r,r!=""?e.style=r:delete e.style)}}function ve(e,t){let n=e.props||{},r=t.props||{},a=Object.keys(n),o=Object.keys(r);o.filter(s=>!a.includes(s)||n[s]!==r[s]).forEach(s=>e.node.setAttribute(s,r[s])),a.filter(s=>!o.includes(s)).forEach(s=>e.node.removeAttribute(s)),o.length?e.props={...r}:delete e.props}function Ae(e,t){let n=e.on||{},r=t.on||{},a=Object.keys(n),o=Object.keys(r);o.filter(s=>!a.includes(s)).forEach(s=>{r[s].forEach(i=>{e.node.addEventListener(s,i)})}),a.filter(s=>!o.includes(s)).forEach(s=>{n[s].forEach(i=>{e.node.removeEventListener(s,i)})}),o.filter(s=>a.includes(s)).forEach(s=>{let i=r[s],l=n[s];i.filter(u=>!l.includes(u)).forEach(u=>e.node.addEventListener(s,u)),l.filter(u=>!i.includes(u)).forEach(u=>e.node.removeEventListener(s,u))}),o.length?e.on=o.reduce((s,i)=>(s[i]=[...r[i]],s),{}):delete e.on}function Ve(e,t){if(Object.prototype.isPrototypeOf.call(HTMLInputElement.prototype,e.node)){let n=e.node;n.value!==t.props?.value&&(t.props&&"value"in t.props?n.value!==(t.props?.value).toString()&&(n.value=t.props.value):e.node.value!==""&&(e.node.value="")),!n.checked&&t.props&&"checked"in t.props?n.checked=!0:n.checked&&!(t.props&&"checked"in t.props)&&(n.checked=!1)}if(Object.prototype.isPrototypeOf.call(HTMLOptionElement.prototype,e.node)){let n=e.node;!n.selected&&t.props&&"selected"in t.props?n.selected=!0:n.selected&&!(t.props&&"selected"in t.props)&&(n.selected=!1)}}var ee=class{constructor(t){this.index=0;this.stock=new Map,this.parent=t,this.node=t.node.firstChild,this.children=t.children||[]}get isEnd(){return this.index>=this.children.length}get vNode(){return this.children[this.index]}next(t=1){typeof this.children[this.index]=="number"?this.index+=t:this.node&&(this.index+=t,this.node=this.node.nextSibling)}prev(){typeof this.children[this.index]=="number"?this.index--:this.node?(this.index--,this.node=this.node.previousSibling):(this.node=this.parent.node.lastChild,this.node&&this.index--)}add(t){let n=typeof t=="string"?document.createTextNode(t):t.node,r=this.node;return this.node=this.parent.node.insertBefore(n,this.node||null),this.next(r?0:1),t}replace(t){if(typeof t=="string"&&this.node?.nodeType===3)this.node.data!==t&&(this.node.data=t);else{let n=typeof t=="string"?document.createTextNode(t):t.node;this.node!==n&&(typeof this.vNode=="object"&&("key"in this.vNode?this.stock.set(this.vNode.key,this.vNode):this.node?.nodeType===1&&A(this.vNode)),this.parent.node.replaceChild(n,this.node),this.node=n)}return this.next(),t}remove(){typeof this.vNode=="object"&&("key"in this.vNode&&this.stock.set(this.vNode.key,this.vNode),this.node?.nodeType===1&&A(this.vNode));let t=this.node;this.node=t?.nextSibling||null,this.parent.node.removeChild(t)}removeAll(){if(this.node)for(let t=this.node;t!==null;t=t.nextSibling)this.parent.node.removeChild(t);for(;!this.isEnd;)typeof this.vNode=="object"&&A(this.vNode),this.index++}has(t){return this.stock.has(t)}addFromKey(t,n){let r=this.stock.get(t);return this.stock.delete(t),this.add(B(r,n))}clear(){this.stock.forEach(t=>A(t)),this.stock.clear()}search(t){if(this.isEnd)return!1;let n=t();if(typeof n=="boolean")return n;{this.next();let r=this.search(t);return this.prev(),r&&(this.remove(),this.index++),r}}};function te(e,t){let n=t.children||[],r=new ee(e),a=n.filter(i=>typeof i=="number").reverse(),o=a.pop(),s=n.map(i=>{switch(typeof i){case"string":return!r.isEnd&&typeof r.vNode=="string"?r.replace(i):r.add(i);case"object":{if("key"in i){if(r.has(i.key))return r.addFromKey(i.key,i);if(typeof r.vNode=="object"&&r.search(()=>{if(typeof r.vNode=="object"&&i.key===r.vNode.key)return!0;if(typeof r.vNode=="number"&&o!=null&&r.vNode===o)return!1}))return r.replace(B(r.vNode,i))}if(typeof r.vNode=="object"){let l="key"in r.vNode?{tag:i.tag,node:document.createElement(i.tag)}:r.vNode;return r.replace(B(l,i))}else return r.add(B({tag:i.tag,node:document.createElement(i.tag)},i))}case"number":{let l=r.search(()=>{if(typeof r.vNode=="number"&&i===r.vNode)return!0});return o=a.pop(),l&&r.next(),r.clear(),i}}});r.removeAll(),s.length?e.children=s:delete e.children}function ne(e,t){for(let n of e.children||[])if(typeof n=="object"){if(t(n))return n;{let r=ne(n,t);if(r)return r}}return null}function re(e,t){e.children?.forEach(n=>{typeof n=="object"&&(t(n),re(n,t))})}var F=class{constructor(t,n,r=0,a=null){this.text=t;this.field=n;this.index=r;this.token=a}_next(t){let n=["",""];for(this.index=t;this.index<this.text.length;this.index++){let r=ae(this.field,n[1]+this.text[this.index]);if(r==="other")return n;n[0]=r,n[1]=n[1]+this.text[this.index]}return n}skip(){let t="";if(!this.token)for(let n=this.index;n<this.text.length;n++)if(ae(this.field,this.text[n])==="other")t+=this.text[n];else if(this.token=this._next(n),this.token&&this.token[0]==="partial")t+=this.token[1],this.token=null;else return t;return t}nextType(){return this.skip(),this.token?this.token[0]:""}pop(){this.skip();let t=this.token;return this.token=null,t||null}expand(t,n){let r=this.field;this.field=t,n(),this.token&&(this.index-=this.token[1].length,this.token=null),this.field=r}};function ae(e,t){switch(e){case"script":switch(t){case"+":case"-":return"multi";case"void":case"typeof":case"~":case"!":return"unary";case"/":case"*":case"%":case"**":case"in":case"instanceof":case"<":case">":case"<=":case">=":case"==":case"!=":case"===":case"!==":case"<<":case">>":case">>>":case"&":case"|":case"^":case"&&":case"||":case"??":return"binary";case"=":case"*=":case"**=":case"/=":case"%=":case"+=":case"-=":case"<<=":case">>=":case">>>=":case"&=":case"^=":case"|=":case"&&=":case"||=":case"??=":return"assign";case"++":case"--":return"crement";case"false":case"true":return"boolean";case"null":case"undefined":case".":case"?.":case"[":case"]":case"{":case"}":case"(":case")":case"...":case"?":case":":case",":case"'":case'"':case"`":return t}switch(!0){case/^\/\/.*$/.test(t):return"lineComment";case/^[_\$a-zA-Z][_\$a-zA-Z0-9]*$/.test(t):return"word";case/^\d+\.?\d*$|^\.?\d+$/.test(t):return"number"}break;case"template":switch(t){case"$":return"partial";case"${":return t;case"}":return t;case"`":return"`";case"\r":case`
`:case`\r
`:return"other"}case"singleString":case"doubleString":switch(t){case"\\":return"partial";case"\r":case`
`:case`\r
`:return"return";case`\\\r
`:return"escape";case"'":if(e==="singleString")return t;break;case'"':if(e==="doubleString")return t;break}switch(!0){case/^\\(x|u)$/.test(t):return"partial";case/^\\.$/.test(t):case/^\\[0-7]{3}$/.test(t):case/^\\u[0-9a-fA-F]{4}$/.test(t):case/^\\u\{[0-9a-fA-F]{1,6}\}$/.test(t):case/^\\x[0-9a-fA-F]{2}$/.test(t):return"escape"}break;case"text":switch(t){case"{":case"}":return"partial";case"{{":case"}}":return t}break}return"other"}function G(e){let t=[];for(t.push(e.skip());e.nextType();)e.nextType()==="{{"?(e.pop(),e.expand("script",()=>{t.push(h(e))}),T(e.pop(),"}}"),t.push(e.skip())):e.pop();let n=t.filter(r=>r!=="");return n.length===1&&typeof n[0]=="string"?n[0]:{type:"join",values:n,separator:""}}function h(e){return Le(e)}function Le(e){let t=Re(e);if(e.nextType()==="assign"){if(t.type!=="get")throw Error("The left operand is not variable");let n=e.pop()[1],r=h(e);return{type:"assign",operator:n,left:t.value,right:r}}else return t}function Re(e){let t=oe(e);for(;e.nextType()==="?";){e.pop();let n=h(e);T(e.pop(),":");let r=oe(e);t={type:"if",condition:t,truthy:n,falsy:r}}return t}function oe(e){let t=new Array;for(t.push(K(e));e.nextType()==="multi"||e.nextType()==="binary";)t.push(e.pop()[1]),t.push(K(e));for(;t.length>1;)for(let n=0;n+1<t.length;n+=2)if(n+3>=t.length||se(t[n+1])>se(t[n+3])){let r={type:"binary",operator:t[n+1],left:t[n],right:t[n+2]};t.splice(n,3,r)}return typeof t[0]=="string"?{type:"variable",name:t[0]}:t[0]}function se(e){switch(e){default:return 0;case"||":case"??":return 4;case"&&":return 5;case"|":return 6;case"^":return 7;case"&":return 8;case"==":case"!=":case"===":case"!==":return 9;case"in":case"instanceof":case"<":case">":case"<=":case">=":return 10;case"<<":case">>":case">>>":return 11;case"+":case"-":return 12;case"*":case"/":case"%":return 13;case"**":return 14}}function K(e){switch(e.nextType()){case"multi":case"unary":return{type:"unary",operator:e.pop()[1],operand:K(e)};default:return Oe(e)}}function Oe(e){let t=Pe(e);for(;;){switch(e.nextType()){case"(":{e.pop();let n=[];for(;e.nextType()!==")"&&(n.push(h(e)),e.nextType()===",");)e.pop();T(e.pop(),")"),t={type:"function",name:t,params:n};continue}case".":{e.pop();let n=e.pop();T(n,"word"),t={type:"get",value:{type:"hash",object:t,key:{type:"literal",value:n[1]}}};continue}case"[":{e.pop();let n=h(e);T(e.pop(),"]"),t={type:"get",value:{type:"hash",object:t,key:n}};continue}}break}return t}function Pe(e){let t=e.pop();switch(t[0]){case"word":return{type:"get",value:{type:"variable",name:t[1]}};case"number":return{type:"literal",value:Number(t[1])};case"boolean":return{type:"literal",value:t[1]==="true"};case"undefined":return{type:"literal",value:void 0};case"null":return{type:"literal",value:null};case'"':return J(e,"doubleString",t[0]);case"'":return J(e,"singleString",t[0]);case"`":return J(e,"template",t[0]);case"(":{let n=h(e);return T(e.pop(),")"),n}case"[":{let n=[];for(;e.nextType()!=="]";)if(n.push(h(e)),e.nextType()===",")e.pop();else if(e.nextType()==="]"){e.pop();break}else throw Error("']' is required");return{type:"array",values:n}}case"{":{let n=[];for(;e.nextType()!=="}";){let r=Array(2),a=e.pop();if(a[0]==="word"?r[0]={type:"literal",value:a[1]}:a[0]==="["&&(r[0]=h(e),T(e.pop(),"]")),a[0]==="word"&&(e.nextType()===","||e.nextType()==="}")?r[1]={type:"get",value:{type:"variable",name:a[1]}}:(T(e.pop(),":"),r[1]=h(e)),n.push(r),e.nextType()===",")e.pop();else if(e.nextType()==="}"){e.pop();break}else throw Error("'}' is required")}return{type:"object",entries:n}}default:throw new Error(JSON.stringify(t))}}function J(e,t,n){let r=[""],a=0;return e.expand(t,()=>{e:for(;;){r[a]+=e.skip();let o=e.pop();switch(o[0]){case n:break e;case"return":throw Error();case"escape":r[a]+=_e(o[1]);continue;case"${":e.expand("script",()=>{r.push(h(e))}),T(e.pop(),"}"),r.push(e.skip()),a+=2}}}),a===0?{type:"literal",value:r[0]}:{type:"join",values:r.filter(o=>o!==""),separator:""}}function T(e,t,n=""){if(!e||e[0]!==t)throw Error(n)}function _e(e){switch(e){case"\\n":return`
`;case"\\r":return"\r";case"\\v":return"\v";case"\\t":return"	";case"\\b":return"\b";case"\\f":return"\f"}switch(!0){case/^\\[0-7]{3}$/.test(e):return String.fromCodePoint(parseInt(e.slice(1),8));case/^\\u[0-9a-fA-F]{4}$/.test(e):case/^\\x[0-9a-fA-F]{2}$/.test(e):return String.fromCodePoint(parseInt(e.slice(2),16));case/^\\u\{[0-9a-fA-F]{1,6}\}$/.test(e):return String.fromCodePoint(parseInt(e.slice(3,-1),16))}return e.slice(1)}function L(e,t,n=e.length-1){for(let r=n;r>=0;r--)if(t in e[r])return[e[r][t],r];return[void 0,-1]}var M=class{constructor(t,n,r,a,o){this._key=t;this._value=n;this._index=r;this._entries=a;this._stack=o}get key(){return this._key}get value(){return this._value}get index(){return this._index}get size(){return this._entries.length}get isFirst(){return this._index===0}get isLast(){return this._index===this._entries.length-1}get parent(){return L(this._stack,"loop")[0]}};var Fe=new DOMParser;function m(e,t="tree"){switch(t){case"tree":if(typeof e=="string"){let n=Fe.parseFromString(e,"text/html");return{type:"tree",children:S(n.head).concat(S(n.body))}}else return e.nodeType===11?{type:"tree",children:S(e)}:me(e);case"text":return G(new F(e,t));case"script":return h(new F(e,t))}}var ie=class{constructor(t){this.node=t}isSkippable(t){for(let n=this.node;n;n=n.nextSibling)switch(n.nodeType){default:return!1;case 1:return n.hasAttribute(t);case 3:if(!/^\s*$/.test(n.data))return!1}return!1}skip(){for(;;){if(this.node.nodeType===1)return this;this.node=this.node.nextSibling}}pop(){let t=this.node;do this.node=this.node?this.node.nextSibling:null;while(this.node&&this.node.nodeType===1&&this.node.tagName==="SCRIPT");return t}};function S(e){let t=e.firstChild;for(;t&&t.nodeType===1&&t.tagName==="SCRIPT";)t=t.nextSibling;let n=new ie(e.firstChild),r=[];for(;n.node;)r.push(Se(n));return r}function Se(e){switch(e.node.nodeType){case 3:return m(e.pop().data,"text");case 1:return pe(e);default:return""}}function Ne(e){return pe(e)}function pe(e){let t=e.node;if(t.hasAttribute("@for")){let n=t.getAttribute("@each")||void 0,r=m(t.getAttribute("@for"),"script");return{type:"for",each:n,array:r,value:ce(e)}}else return ce(e)}function ce(e){let t=e.node;if(t.hasAttribute("@if")){let n=m(t.getAttribute("@if"),"script"),r=le(t);e.pop();let a=e.isSkippable("@else")?Ne(e.skip()):void 0;return{type:"if",condition:n,truthy:r,falsy:a}}else return le(e.pop())}function le(e){if(e.hasAttribute("@expand")){let t=m(e.getAttribute("@expand"),"script"),n=ue(e);return{type:"expand",template:t,default:n}}else return ue(e)}function ue(e){if(e.tagName.toLowerCase()==="group"){let t={type:"group"};return e.hasAttributes()&&e.getAttributeNames().forEach(n=>{n.match(/^@(if|else|for|each|expand)$/)||n.match(/^@.*$/)&&(t.props||(t.props={}),t.props[n]=e.getAttribute(n))}),e.hasChildNodes()&&(t.children=S(e)),t}else return me(e)}function me(e){let t={type:"element",tag:e.tagName.toLowerCase()};{let n=[];if(e.getAttributeNames().forEach(r=>{let a=e.getAttribute(r);switch(r){case"is":{r in t||(t.is=a);return}case"class":case"part":return(t[r]??(t[r]=[])).push(a.split(/\s+/));case"style":return n.push(a);case"is:":return t.is=m(a,"script");case"class:":case"part:":{let o=r.slice(0,-1);return(t[o]??(t[o]=[])).push({type:"flags",value:m(a,"script")})}case"style:":return n.push(m(a,"script"))}{let o=r.match(/^on(?<type>.+?):?$/);if(o?.groups){let s=o.groups.type,i={type:"handler",value:m(a,"script")};return((t.on??(t.on={}))[s]??(t.on[s]=[])).push(i)}}{let o=r.match(/^(?<name>.+):$/);if(o?.groups)return(t.props??(t.props={}))[o.groups.name]=m(a,"script")}if(!r.match(/^(?<name>.+)\*$/)?.groups&&!r.match(/^@(if|else|for|each|expand)$/)&&!(r in(t.props??(t.props={}))))return t.props[r]=a}),n.length&&(n.length===1&&typeof n[0]=="string"?t.style=n[0]:t.style={type:"join",values:n.filter(r=>r!==""),separator:";"}),t.props){for(let r in t.props){let a=r.match(/^(?<name>.+)&$/);if(a?.groups){let o=a.groups.name;(t.bools??(t.bools={}))[o]=m(t.props[r],"script"),delete t.props[o],delete t.props[r],delete t.props[o+":"]}}Object.keys(t.props).length||delete t.props}}return e.hasChildNodes()&&(t.children=S(e)),t}function je(e){return e.raw[0]}function R(e){return typeof e=="object"&&"type"in e}function fe(e,t){switch(e){case"void":return;case"typeof":return typeof t;case"+":return+t;case"-":return-t;case"~":return~t;case"!":return!t;default:throw Error(e+" does not exist")}}function D(e,t){switch(e){case"&&":return!!t;case"||":return!t;case"??":return t==null;default:return!0}}function U(e,t,n){switch(e){case"+":return t+n;case"-":return t-n;case"/":return t/n;case"*":return t*n;case"%":return t%n;case"**":return t**n;case"in":return t in n;case"instanceof":return t instanceof n;case"<":return t<n;case">":return t>n;case"<=":return t<=n;case">=":return t>=n;case"==":return t==n;case"!=":return t!=n;case"===":return t===n;case"!==":return t!==n;case"<<":return t<<n;case">>":return t>>n;case">>>":return t>>>n;case"&":return t&n;case"|":return t|n;case"^":return t^n;case"&&":return t&&n;case"||":return t||n;case"??":return t??n;default:throw Error(e+" does not exist")}}function p(e,t=[],n={}){return O[e.type](e,t,n)}var O={literal:(e,t,n)=>e.value,array:(e,t,n)=>e.values.map(r=>p(r,t,n)),object:(e,t,n)=>e.entries.map(r=>r.map(a=>p(a,t,n))).reduce((r,[a,o])=>(r[a]=o,r),{}),variable:(e,t,n)=>{let[,r]=L(t,e.name);if(r>=0)return[t[r],e.name]},unary:(e,t,n)=>fe(e.operator,p(e.operand,t,n)),binary:(e,t,n)=>{let r=p(e.left,t,n);return D(e.operator,r)?U(e.operator,r,p(e.right,t,n)):r},assign:(e,t,n)=>{let r=p(e.left,t,n);if(!r)throw Error(e.left?e.left.name:"key is not defined");let[a,o]=r,s=p(e.right,t,n);if(e.operator.length>1){let i=e.operator.slice(0,-1);return D(i,a[o])?a[o]=U(i,a[o],s):a[o]}else return a[o]=s},function:(e,t,n)=>{if(e.name.type==="get"&&e.name.value.type==="hash"){let r=p(e.name.value,t,n);if(!r)throw Error(p(e.name.value.key,t,n)+" is not defined");let a=r[0][r[1]];if(typeof a=="function")return a.apply(r[0],e.params.map(o=>p(o,t,n)))}else{let r=p(e.name,t,n);if(typeof r=="function")return r(...e.params.map(a=>p(a,t,n)))}throw Error(e.name.toString()+" is not a function")},hash:(e,t,n)=>[p(e.object,t,n),p(e.key,t,n)],get:(e,t,n)=>{let r=p(e.value,t,n);return r&&r[0][r[1]]},join:(e,t,n)=>e.values.reduce((r,a,o)=>{if(R(a)){let s=p(a,t,n);return r+(o?e.separator:"")+(typeof s=="object"?JSON.stringify(s):s)}else return r+(o?e.separator:"")+a},""),flags:(e,t,n)=>{let r=p(e.value,t,n);if(typeof r=="string")return r.split(/\s+/);if(typeof r=="object"){if(Array.isArray(r))return r;if(r)return Object.keys(r).filter(a=>r[a])}return[]},if:(e,t,n)=>p(e.condition,t,n)?p(e.truthy,t,n):e.falsy?p(e.falsy,t,n):null,for:(e,t,n)=>{let r=p(e.array,t,n),a;if(typeof r=="object"&&r!==null)if(Symbol.iterator in r)if("entries"in r)a=[...r.entries()];else{let o=0;a=[];for(let s of r)a.push([o++,s])}else a=Object.entries(r);else a=[[0,r]];return a.flatMap(([o,s],i)=>{let l=new M(o,s,i,a,t);return q(p(e.value,t.concat([e.each?{[e.each]:s,loop:l}:{loop:l}]),n))})},element:(e,t,n)=>{let r=O.tree(e,t,n);return r.tag=e.tag,e.is&&(r.is=typeof e.is=="string"?e.is:p(e.is,t,n)),z(e,t,n,r),r},tree:(e,t,n)=>{let r=(e.children||[])?.flatMap(a=>typeof a=="string"?[a]:q(p(a,t,n)));return r.length?{children:r}:{}},expand:(e,t,n)=>{let r=p(e.template,t,n);return R(r)?(r.type==="tree"&&(r.type="group"),p(r,t,n)):p(e.default,t,n)},group:(e,t,n)=>e.children?e.children.flatMap(r=>q(R(r)?p(r,t,n):r)):[],handler:(e,t,n)=>{n.handler||(n.handler=new Map),n.handler.has(e)||n.handler.set(e,[]);let r=n.handler.get(e);for(let o of r)if(de(o[0],t))return o[1];let a=o=>p(e.value,[...t,{event:o}],n);return r.push([t,a]),a}};function z(e,t,n,r){if(e.style&&(r.style=typeof e.style=="string"?e.style:p(e.style,t,n)),e.bools)for(let a in e.bools){let o=e.bools[a],s=typeof o=="string"?o:p(o,t,n);s&&((r.props??(r.props={}))[a]=s)}if(e.props){r.props||(r.props={});for(let a in e.props)if(!a.startsWith("@")){let o=e.props[a];r.props[a]=typeof o=="string"?o:p(o,t,n)}}if(e.class&&e.class.forEach(a=>r.class=(r.class||[]).concat(Array.isArray(a)?a:p(a,t,n))),e.part&&e.part.forEach(a=>r.part=(r.part||[]).concat(Array.isArray(a)?a:p(a,t,n))),e.on){r.on||(r.on={});for(let a in e.on)r.on[a]=e.on[a].map(o=>p(o,t,n))}}function de(e,t,n=e.length-1,r=t.length-1){let[a,o]=L(e,"loop",n),[s,i]=L(t,"loop",r);return!a&&!s?!0:!a||!s?!1:a.index===s.index&&a.key===s.key&&a.value===s.value&&de(e,t,o-1,i-1)}function q(e){return e==null?[]:Array.isArray(e)?e:[e]}var W=_({alert,console,Object,Number,Math,Date,Array,JSON,String,isNaN,isFinite,location,history,navigator,setTimeout,setInterval});var y=class{constructor(t,n,r){this._cache={};this._props={};this._component=t,this._host=n,this._tree=r,this._patch=this._patch.bind(this),this._component.options.mode==="closed"&&this.root.addEventListener(v.patch,o=>o.stopPropagation());let a=typeof this._component.data=="function"?this._component.data(this):this._component.data;this._constructor=(async()=>{let o=await a,s=o?Array.isArray(o)?o:[o]:[];this._stack=[W,this._props,...s],P(s,this._patch),this._patch(),s.forEach(i=>{if(typeof i=="object"&&i!==null){for(let l in i)if(typeof i[l]=="function"&&isNaN(l)&&!(l in this._host)){let u=i[l].bind(this);Object.defineProperty(this._host,l,{get(){return u}})}}})})().then()}setProp(t,n){switch(t){case"is":case"class":case"part":case"style":return;default:{let r=this._props[t];r!==n&&(V(r,this._patch),this._props[t]=n,P(this._props[t],this._patch),this._patch())}}}_unwatch(){V(this._stack,this._patch)}get component(){return this._component}get host(){return this._host}get root(){return this._tree.node}get props(){return this._props}get patch(){return this._patch}get whenConstructed(){return()=>this._constructor}_patch(){if(this._stack&&this._tree&&this._component.template){let t=p(this._component.template,this._stack,this._cache);I(this._tree,t)}}};function w(e){return typeof e=="object"&&e.template&&e.data&&e.options}var Z="beako-entity",g=class extends HTMLElement{constructor(){super()}setProp(t,n){this.entity?.setProp(t,n)}static getComponent(){}loadProps(){this.hasAttributes()&&this.getAttributeNames().forEach(t=>{this.setProp(t,this.getAttribute(t))})}whenConstructed(){return this.entity?.whenConstructed()||null}get attributes(){return He(super.attributes,this.setProp)}setAttribute(t,n){this.setProp(t,n),super.setAttribute(t,n)}getAttributeNode(t){let n=super.getAttributeNode(t);return n&&Te(n,this.setProp)}removeAttribute(t){return this.setProp(t,void 0),super.removeAttribute(t)}removeAttributeNode(t){return this.setProp(t.name,void 0),super.removeAttributeNode(t)}},he=class extends g{constructor(){super()}setProp(t,n){if(t==="component")switch(typeof n){case"string":{let r=customElements.get(n);if(r&&g.isPrototypeOf(r)){let a=r.getComponent();if(a){let o=E(this.attachShadow({mode:a.options.mode,delegatesFocus:a.options.delegatesFocus}));this.entity=new y(a,this,o)}}else throw Error(n+" is not a component.");break}case"object":if(w(n)){let r=E(this.attachShadow({mode:n.options.mode,delegatesFocus:n.options.delegatesFocus}));this.entity=new y(n,this,r)}else throw Error("The object is not a component.");break}super.setProp(t,n)}};customElements.define(Z,he);function Te(e,t){return new Proxy(e,{set(n,r,a){if(t(r,a),r==="value")return n.value=a}})}function He(e,t){return new Proxy(e,{get:function(n,r){return r==="length"?n[r]:Te(n[r],t)}})}function $(e){switch(e.tag){case"html":case"base":case"head":case"link":case"meta":case"style":case"title":case"body":case"address":case"article":case"aside":case"footer":case"header":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":case"main":case"nav":case"section":case"blockquote":case"dd":case"div":case"dl":case"dt":case"figcaption":case"figure":case"hr":case"li":case"ol":case"p":case"pre":case"ul":case"a":case"abbr":case"b":case"bdi":case"bdo":case"br":case"cite":case"code":case"data":case"dfn":case"em":case"i":case"kbd":case"mark":case"q":case"rp":case"rt":case"ruby":case"s":case"samp":case"small":case"span":case"strong":case"sub":case"sup":case"time":case"u":case"var":case"wbr":case"area":case"audio":case"img":case"map":case"track":case"video":case"embed":case"iframe":case"object":case"param":case"picture":case"portal":case"source":case"svg":case"math":case"canvas":case"noscript":case"script":case"del":case"ins":case"caption":case"col":case"colgroup":case"table":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":case"button":case"datalist":case"fieldset":case"form":case"input":case"label":case"legend":case"meter":case"optgroup":case"option":case"output":case"progress":case"select":case"textarea":case"details":case"dialog":case"menu":case"summary":case"slot":case"template":return!0}return!1}function b(e){if(R(e))switch(e.type){case"element":(!$(e)||"is"in e)&&(e.type="custom");case"tree":e.children?.forEach(b);break;case"if":{b(e.truthy),b(e.falsy);break}case"for":{b(e.value);break}}return e}O.evaluation=(e,t,n)=>p(e.template,e.stack?e.stack.concat(t):t,n);O.custom=(e,t,n)=>{let r={tag:e.tag};e.is&&(r.is=typeof e.is=="string"?e.is:p(e.is,t,n));let a;if(e.isForce)a=!0;else if($(e)){let o=customElements.get(r.is);a=o!==void 0&&Object.prototype.isPrototypeOf.call(g,o)}else{let o;for(let s=t.length-1;s>=0;s--)if(e.tag in t[s]){o=t[s][e.tag];break}if(w(o))r.tag=Z,r.props={component:o},a=!0;else{let s=customElements.get(e.tag);a=s!==void 0&&Object.prototype.isPrototypeOf.call(g,s)}}if(a){let o=[],s=[],i=(e.children||[])?.flatMap(l=>{if(typeof l!="string"){let u=l;if(u.props){if(u.props["@as"])return s.push([u.props["@as"],u]),[];if(u.props.slot)return[p(l,t,n)]}}return o.push(l),[]});return o.length&&s.push(["content",{type:"group",children:o}]),s.length&&(r.props||(r.props={}),s.forEach(([l,u])=>{r.props[l]={type:"evaluation",template:u,stack:t}})),i.length&&(r.children=i),z(e,t,n,r),e.cache&&e.cache!==r.props?.component&&(r.new=!0),r.props?.component?e.cache=r.props.component:delete e.cache,r}else return O.element(e,t,n)};function N(e,t=[]){return _({template:b(typeof e=="string"?m(e):e),data:typeof t=="function"||Array.isArray(t)?t:[t],options:{mode:"open",delegatesFocus:!0}})}function Be(e,t,n=[]){let r=w(t)?t:N(t,n);if(r.options.localeOnly)throw Error("This componet is local only.");customElements.define(e,class extends g{constructor(){super();let a=E(this.attachShadow({mode:r.options.mode,delegatesFocus:r.options.delegatesFocus}));if(this.entity=new y(r,this,a),this.innerHTML){let o=p(b(m(this)));for(let s in o.props)this.setProp(s,o.props[s])}else this.loadProps()}static getComponent(){return r}})}function Me(e,t,n=[]){let r=typeof e=="string"?document.querySelector(e):e,a=w(t)?t:N(t,n);if(a.options.localeOnly)throw Error("This componet is local only.");let o=E(r.attachShadow({mode:a.options.mode,delegatesFocus:a.options.delegatesFocus})),s=new y(a,r,o),i=m(r);i.type="custom",i.isForce=!0;let l=p(i);for(let u in l.props)s.setProp(u,l.props[u])}function $e(e,t={}){return e.options=Object.freeze({mode:"closed",delegatesFocus:!0,...t}),Object.freeze(e)}export{g as ComponentElement,y as Entity,F as Lexer,M as Loop,W as builtin,H as clone,N as compact,Be as define,A as destroy,p as evaluate,v as eventTypes,h as expression,b as extend,ne as find,Me as hack,je as html,G as innerText,E as load,_ as lock,m as parse,I as patch,P as reach,ge as receive,$e as seal,re as trace,be as unlock,V as unwatch,C as watch};
