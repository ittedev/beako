const u=Symbol("Beako"),l=Symbol("Reactive"),b=Symbol("Array"),m=Symbol("Beako-lock");function A(e,t,s){if(typeof e=="object"&&e!==null&&(Object.getPrototypeOf(e)===Object.prototype||Array.isArray(e))){const n=e;if(!n[m])if(w(n),s===void 0){const r=n[u][l][1];typeof t=="function"&&r.add(t);for(const i in n){w(n,i,n[u][l][0]);const o=n[i];typeof o=="object"&&o!==null&&(r.size?r.forEach(c=>{(!(u in o)||!o[u][l][1].has(c))&&A(o,c)}):u in o||A(o))}if(Array.isArray(n)){const i=n[u][b].length;if(n.length<i)for(let o=n.length;o<i;o++)w(n,o);n.length=i}}else{const r=typeof s=="function"?["spy",s]:s;Array.isArray(t)?t.forEach(i=>w(n,i,r)):w(n,t,r)}}return e}function w(e,t,s){if(!e[m]){if(!(u in e)){const n=()=>{e[u][l][1].forEach(r=>r())};if(e[u]={[l]:[["bio",n],new Set]},Array.isArray(e)){const r=e[u][b]=e.slice(),i=c=>(n(),c),o=c=>(A(e),n(),c);Object.defineProperties(e,{unshift:{get(){return(...c)=>o(Array.prototype.unshift.call(r,...c))}},push:{get(){return(...c)=>o(Array.prototype.push.call(r,...c))}},splice:{get(){return(c,p,...f)=>o(p===void 0?Array.prototype.splice.call(r,c,r.length-c):Array.prototype.splice.apply(r,[c,p,...f]))}},pop:{get(){return()=>o(Array.prototype.pop.call(r))}},shift:{get(){return()=>o(Array.prototype.shift.call(r))}},sort:{get(){return c=>i(c===void 0?Array.prototype.sort.call(r):Array.prototype.sort.call(r,c))}},reverse:{get(){return()=>i(Array.prototype.reverse.call(r))}},copyWithin:{get(){return(c,p,f)=>i(Array.prototype.copyWithin.call(r,c,p!==void 0?p:0,f!==void 0?f:r.length))}}})}}if(t!==void 0)if(typeof t!="number"&&isNaN(t)){if(t in e[u]||(e[u][t]=[e[t],new Set],Object.defineProperty(e,t,{get(){return this[u][t][0]},set(n){e[u][l][1].forEach(r=>A(n,r)),ie(this[u][t],n)}})),s){for(const n of e[u][t][1])if(n[1]===s[1])return;e[u][t][1].add(s)}}else{const n=Object.getOwnPropertyDescriptor(e,t);(!n||"value"in n)&&t in e[u][b]&&Object.defineProperty(e,t,{get(){return this[u][b][t]},set(r){e[u][l][1].forEach(o=>A(r,o));const i=this[u][b][t];this[u][b][t]=r,i!==r&&e[u][l][0][1]()},configurable:!0,enumerable:!0})}}}function ie(e,t){const s=e[0];e[0]=t,s!==t&&e[1].forEach(n=>{switch(n[0]){case"bio":n[1]();break;case"bom":e[1].delete(n);case"spy":n[1](t,s);break}})}async function oe(e,t){if(!e[m]){const s=Array.isArray(t)?t:[t],n=await Promise.all(s.map(r=>e[r]===void 0?new Promise(i=>{w(e,r,["bom",i])}):e[r]));return s.reduce((r,i,o)=>(r[i]=n[o],r),{})}return{}}function v(e,t,s){if(t!==void 0)u in e&&t in e[u]&&(s?e[u][t][1].forEach(n=>{n[1]===s&&e[u][t][1].delete(n)}):e[u][t][1].clear());else{for(const n in e[u])Object.defineProperty(e,n,{enumerable:!0,configurable:!0,writable:!0,value:e[u][n][0]}),delete e[u][n];Array.isArray(e)&&(delete e.push,delete e.sort,delete e.splice),delete e[u]}}function L(e,t,s){if(typeof e=="object"&&e!==null){const n=e;if(s===void 0)if(t){const r=t;n[u][l][1].delete(r);for(const i in n)L(n[i],r)}else{for(const r in n)L(n[r]);v(n)}else Array.isArray(t)?t.forEach(r=>v(n,r,s)):v(n,t,s)}return e}function S(e,t){if(typeof e=="object"&&e!==null){const s=e;if(!s[m]){u in s&&s[u][l][1].add(t);for(const n in s)S(s[n],t)}}return e}function $(e){return e[m]=!0,e}function ce(e){return delete e[m],e}export{A as watch};export{oe as receive};export{L as unwatch};export{S as reach};export{$ as lock};export{ce as unlock};function M(e){const t={node:e};return H(t),t}function ae(e){const t={tag:e.tagName.toLowerCase(),node:e};return ue(t),H(t),t}function ue(e){if(e.node.hasAttributes()){const t={};e.node.getAttributeNames().forEach(s=>{if(s.startsWith("on"))return;const n=e.node.getAttribute(s);switch(s){case"class":case"part":return e[s]=n.split(/\s+/);case"style":case"is":return e[s]=n;default:return t[s]=n}}),Object.keys(t).length&&(e.props=t)}}function H(e){if(e.node.hasChildNodes()){const t=e.node.childNodes;e.children=[];for(let s=0;s<t.length;s++)switch(t[s].nodeType){case 1:if(t[s].tagName==="SCRIPT")break;e.children.push(ae(t[s]));break;case 3:e.children.push(t[s].data);break}}}function z(e,t){return B(e,t),e}function k(e,t){return e.tag!==t.tag||e.is!==t.is?k(t.is?{tag:t.tag,is:t.is,node:document.createElement(t.tag,{is:t.is})}:{tag:t.tag,node:document.createElement(t.tag)},t):(pe(e,t),fe(e,t),he(e,t),de(e,t),le(e,t),B(e,t),ye(e,t),"key"in t?e.key=t.key:delete e.key,e)}function pe(e,t){const s=(e.class||[]).join(" "),n=(t.class||[]).join(" ");s!==n&&(e.node.className=n),n.length?e.class=(t.class||[]).slice():delete e.class}function fe(e,t){const s=e.part||[],n=t.part||[],r=n.filter(o=>!s.includes(o));r.length&&e.node.part.add(...r);const i=s.filter(o=>!n.includes(o));i.length&&e.node.part.remove(...i),n.length?e.part=n.slice():delete e.part}function he(e,t){if(e.node instanceof HTMLElement){const s=e.style||"",n=t.style||"";s!=n&&(e.node.style.cssText=n,n!=""?e.style=n:delete e.style)}}function de(e,t){const s=e.props||{},n=t.props||{},r=Object.keys(s),i=Object.keys(n);i.filter(o=>!r.includes(o)||s[o]!==n[o]).forEach(o=>e.node.setAttribute(o,n[o])),r.filter(o=>!i.includes(o)).forEach(o=>e.node.removeAttribute(o)),i.length?e.props={...n}:delete e.props}function le(e,t){const s=e.on||{},n=t.on||{},r=Object.keys(s),i=Object.keys(n);i.filter(o=>!r.includes(o)).forEach(o=>{n[o].forEach(c=>{e.node.addEventListener(o,c)})}),r.filter(o=>!i.includes(o)).forEach(o=>{s[o].forEach(c=>{e.node.removeEventListener(o,c)})}),i.filter(o=>r.includes(o)).forEach(o=>{const c=n[o],p=s[o];c.filter(f=>!p.includes(f)).forEach(f=>e.node.addEventListener(o,f)),p.filter(f=>!c.includes(f)).forEach(f=>e.node.removeEventListener(o,f))}),i.length?e.on=i.reduce((o,c)=>(o[c]=[...n[c]],o),{}):delete e.on}function ye(e,t){if(Object.prototype.isPrototypeOf.call(HTMLInputElement.prototype,e.node)){const s=e.node;s.value!==t.props?.value&&(t.props&&"value"in t.props?s.value!==t.props?.value.toString()&&(s.value=t.props.value):e.node.value!==""&&(e.node.value="")),!s.checked&&t.props&&"checked"in t.props?s.checked=!0:s.checked&&!(t.props&&"checked"in t.props)&&(s.checked=!1)}if(Object.prototype.isPrototypeOf.call(HTMLOptionElement.prototype,e.node)){const s=e.node;!s.selected&&t.props&&"selected"in t.props?s.selected=!0:s.selected&&!(t.props&&"selected"in t.props)&&(s.selected=!1)}}class ge{index=0;node;parent;children;stock;constructor(t){this.stock=new Map,this.parent=t,this.node=t.node.firstChild,this.children=t.children||[]}get isEnd(){return this.index>=this.children.length}get ve(){return this.children[this.index]}next(t=1){typeof this.children[this.index]=="number"?this.index+=t:this.node&&(this.index+=t,this.node=this.node.nextSibling)}prev(){typeof this.children[this.index]=="number"?this.index--:this.node?(this.index--,this.node=this.node.previousSibling):(this.node=this.parent.node.lastChild,this.node&&this.index--)}add(t){const s=typeof t=="string"?document.createTextNode(t):t.node,n=this.node;return this.node=this.parent.node.insertBefore(s,this.node||null),this.next(n?0:1),t}replace(t){if(typeof t=="string"&&this.node?.nodeType===3)this.node.data!==t&&(this.node.data=t);else{const s=typeof t=="string"?document.createTextNode(t):t.node;this.node!==s&&(typeof this.ve=="object"&&"key"in this.ve&&this.stock.set(this.ve.key,this.ve),this.parent.node.replaceChild(s,this.node),this.node=s)}return this.next(),t}remove(){typeof this.ve=="object"&&"key"in this.ve&&this.stock.set(this.ve.key,this.ve);const t=this.node;this.node=t?.nextSibling||null,this.parent.node.removeChild(t)}removeAll(){if(this.node)for(let t=this.node;t!==null;t=t.nextSibling)this.parent.node.removeChild(t)}has(t){return this.stock.has(t)}addFromKey(t,s){const n=this.stock.get(t);return this.stock.delete(t),this.add(k(n,s))}clear(){this.stock.clear()}search(t){if(this.isEnd)return!1;const s=t();if(typeof s=="boolean")return s;{this.next();const n=this.search(t);return this.prev(),n&&(this.remove(),this.index++),n}}}function B(e,t){const s=t.children||[],n=new ge(e),r=s.filter(c=>typeof c=="number").reverse();let i=r.pop();const o=s.map(c=>{switch(typeof c){case"string":return!n.isEnd&&typeof n.ve=="string"?n.replace(c):n.add(c);case"object":{if("key"in c){if(n.has(c.key))return n.addFromKey(c.key,c);if(typeof n.ve=="object"&&n.search(()=>{if(typeof n.ve=="object"&&c.key===n.ve.key)return!0;if(typeof n.ve=="number"&&i!=null&&n.ve===i)return!1}))return n.replace(k(n.ve,c))}if(typeof n.ve=="object"){const p="key"in n.ve?{tag:c.tag,node:document.createElement(c.tag)}:n.ve;return n.replace(k(p,c))}else return n.add(k({tag:c.tag,node:document.createElement(c.tag)},c))}case"number":{const p=n.search(()=>{if(typeof n.ve=="number"&&c===n.ve)return!0});return i=r.pop(),p&&n.next(),n.clear(),c}}});n.removeAll(),o.length?e.children=o:delete e.children}export{M as load};export{z as patch};class j{text;field;index;token;constructor(t,s,n=0,r=null){this.text=t,this.field=s,this.index=n,this.token=r}_next(t){const s=["",""];for(this.index=t;this.index<this.text.length;this.index++){const n=D(this.field,s[1]+this.text[this.index]);if(n==="other")return s;s[0]=n,s[1]=s[1]+this.text[this.index]}return s}skip(){let t="";if(!this.token)for(let s=this.index;s<this.text.length;s++)if(D(this.field,this.text[s])==="other")t+=this.text[s];else if(this.token=this._next(s),this.token&&this.token[0]==="partial")t+=this.token[1],this.token=null;else return t;return t}nextType(){return this.skip(),this.token?this.token[0]:""}pop(){this.skip();const t=this.token;return this.token=null,t||null}expand(t,s){const n=this.field;this.field=t,s(),this.token&&(this.index-=this.token[1].length,this.token=null),this.field=n}}function D(e,t){switch(e){case"script":switch(t){case"+":case"-":return"multi";case"void":case"typeof":case"~":case"!":return"unary";case"/":case"*":case"%":case"**":case"in":case"instanceof":case"<":case">":case"<=":case">=":case"==":case"!=":case"===":case"!==":case"<<":case">>":case">>>":case"&":case"|":case"^":case"&&":case"||":case"??":return"binary";case"=":case"*=":case"**=":case"/=":case"%=":case"+=":case"-=":case"<<=":case">>=":case">>>=":case"&=":case"^=":case"|=":case"&&=":case"||=":case"??=":return"assign";case"++":case"--":return"crement";case"false":case"true":return"boolean";case"null":case"undefined":case".":case"?.":case"[":case"]":case"{":case"}":case"(":case")":case"...":case"?":case":":case",":case"'":case'"':case"`":return t}switch(!0){case/^\/\/.*$/.test(t):return"lineComment";case/^[_\$a-zA-Z][_\$a-zA-Z0-9]*$/.test(t):return"word";case/^\d+\.?\d*$|^\.?\d+$/.test(t):return"number"}break;case"template":switch(t){case"$":return"partial";case"${":return t;case"}":return t;case"`":return"`";case"\r":case`
`:case`\r
`:return"other"}case"singleString":case"doubleString":switch(t){case"\\":return"partial";case"\r":case`
`:case`\r
`:return"return";case`\\\r
`:return"escape";case"'":if(e==="singleString")return t;break;case'"':if(e==="doubleString")return t;break}switch(!0){case/^\\(x|u)$/.test(t):return"partial";case/^\\.$/.test(t):return"escape"}break;case"text":switch(t){case"{":case"}":return"partial";case"{{":case"}}":return t}break}return"other"}function R(e){const t=[];for(t.push(e.skip());e.nextType();)e.nextType()==="{{"?(e.pop(),e.expand("script",()=>{t.push(d(e))}),y(e.pop(),"}}"),t.push(e.skip())):e.pop();const s=t.filter(n=>n!=="");return s.length===1&&typeof s[0]=="string"?s[0]:{type:"join",values:s,separator:""}}function d(e){return be(e)}function be(e){const t=me(e);if(e.nextType()==="assign"){if(t.type!=="get")throw Error("The left operand is not variable");const s=e.pop()[1],n=d(e);return{type:"assign",operator:s,left:t.value,right:n}}else return t}function me(e){let t=W(e);for(;e.nextType()==="?";){e.pop();const s=d(e);y(e.pop(),":");const n=W(e);t={type:"if",condition:t,truthy:s,falsy:n}}return t}function W(e){const t=new Array;for(t.push(F(e));e.nextType()==="multi"||e.nextType()==="binary";)t.push(e.pop()[1]),t.push(F(e));for(;t.length>1;)for(let s=0;s+1<t.length;s+=2)if(s+3>=t.length||J(t[s+1])>J(t[s+3])){const n={type:"binary",operator:t[s+1],left:t[s],right:t[s+2]};t.splice(s,3,n)}return typeof t[0]=="string"?{type:"variable",name:t[0]}:t[0]}function J(e){switch(e){default:return 0;case"||":case"??":return 4;case"&&":return 5;case"|":return 6;case"^":return 7;case"&":return 8;case"==":case"!=":case"===":case"!==":return 9;case"in":case"instanceof":case"<":case">":case"<=":case">=":return 10;case"<<":case">>":case">>>":return 11;case"+":case"-":return 12;case"*":case"/":case"%":return 13;case"**":return 14}}function F(e){switch(e.nextType()){case"multi":case"unary":return{type:"unary",operator:e.pop()[1],operand:F(e)};default:return Ae(e)}}function Ae(e){let t=we(e);for(;;){switch(e.nextType()){case"(":{e.pop();const s=[];for(;e.nextType()!==")"&&(s.push(d(e)),e.nextType()===",");)e.pop();y(e.pop(),")"),t={type:"function",name:t,params:s};continue}case".":{e.pop();const s=e.pop();y(s,"word"),t={type:"get",value:{type:"hash",object:t,key:{type:"literal",value:s[1]}}};continue}case"[":{e.pop();const s=d(e);y(e.pop(),"]"),t={type:"get",value:{type:"hash",object:t,key:s}};continue}}break}return t}function we(e){const t=e.pop();switch(t[0]){case"word":return{type:"get",value:{type:"variable",name:t[1]}};case"number":return{type:"literal",value:Number(t[1])};case"boolean":return{type:"literal",value:t[1]==="true"};case"undefined":return{type:"literal",value:void 0};case"null":return{type:"literal",value:null};case'"':return K(e,"doubleString",t[0]);case"'":return K(e,"singleString",t[0]);case"`":return K(e,"template",t[0]);case"(":{const s=d(e);return y(e.pop(),")"),s}case"[":{const s=[];for(;e.nextType()!=="]";)if(s.push(d(e)),e.nextType()===",")e.pop();else if(e.nextType()==="]"){e.pop();break}else throw Error("']' is required");return{type:"array",values:s}}case"{":{const s=[];for(;e.nextType()!=="}";){const n=Array(2),r=e.pop();if(r[0]==="word"?n[0]={type:"literal",value:r[1]}:r[0]==="["&&(n[0]=d(e),y(e.pop(),"]")),y(e.pop(),":"),n[1]=d(e),s.push(n),e.nextType()===",")e.pop();else if(e.nextType()==="}"){e.pop();break}else throw Error("'}' is required")}return{type:"object",entries:s}}default:throw new Error(JSON.stringify(t))}}function K(e,t,s){const n=[""];let r=0;return e.expand(t,()=>{e:for(;;){n[r]+=e.skip();const i=e.pop();switch(i[0]){case s:break e;case"return":throw Error();case"escape":n[r]+=i[1];continue;case"${":e.expand("script",()=>{n.push(d(e))}),y(e.pop(),"}"),n.push(e.skip()),r+=2}}}),r===0?{type:"literal",value:n[0]}:{type:"join",values:n.filter(i=>i!==""),separator:""}}function y(e,t,s=""){if(!e||e[0]!==t)throw Error(s)}function N(e,t,s=e.length-1){for(let n=s;n>=0;n--)if(t in e[n])return[e[n][t],n];return[void 0,-1]}class Z{_key;_value;_index;_entries;_stack;constructor(t,s,n,r,i){this._key=t,this._value=s,this._index=n,this._entries=r,this._stack=i}get key(){return this._key}get value(){return this._value}get index(){return this._index}get size(){return this._entries.length}get isFirst(){return this._index===0}get isLast(){return this._index===this._entries.length-1}get parent(){return N(this._stack,"loop")[0]}}const Ee=new DOMParser;function h(e,t="tree"){switch(t){case"tree":if(typeof e=="string"){const s=Ee.parseFromString(e,"text/html");return{type:"tree",children:x(s.head).concat(x(s.body))}}else return e.nodeType===11?{type:"tree",children:x(e)}:Y(e);case"text":return R(new j(e,t));case"script":return d(new j(e,t))}}class ke{node;constructor(t){this.node=t}isSkippable(t){for(let s=this.node;s;s=s.nextSibling)switch(s.nodeType){default:return!1;case 1:return s.hasAttribute(t);case 3:if(!/^\s*$/.test(s.data))return!1}return!1}skip(){for(;;){if(this.node.nodeType===1)return this;this.node=this.node.nextSibling}}pop(){const t=this.node;do this.node=this.node?this.node.nextSibling:null;while(this.node&&this.node.nodeType===1&&this.node.tagName==="SCRIPT");return t}}function x(e){let t=e.firstChild;for(;t&&t.nodeType===1&&t.tagName==="SCRIPT";)t=t.nextSibling;const s=new ke(e.firstChild),n=[];for(;s.node;)n.push(xe(s));return n}function xe(e){switch(e.node.nodeType){case 3:return h(e.pop().data,"text");case 1:return G(e);default:return""}}function _e(e){return G(e)}function G(e){const t=e.node;if(t.hasAttribute("@for")){const s=t.getAttribute("@each")||void 0,n=h(t.getAttribute("@for"),"script");return{type:"for",each:s,array:n,value:U(e)}}else return U(e)}function U(e){const t=e.node;if(t.hasAttribute("@if")){const s=h(t.getAttribute("@if"),"script"),n=Q(t);e.pop();const r=e.isSkippable("@else")?_e(e.skip()):void 0;return{type:"if",condition:s,truthy:n,falsy:r}}else return Q(e.pop())}function Q(e){if(e.hasAttribute("@expand")){const t=h(e.getAttribute("@expand"),"script"),s=X(e);return{type:"expand",template:t,default:s}}else return X(e)}function X(e){if(e.tagName.toLowerCase()==="group"){const t={type:"group"};return e.hasAttributes()&&e.getAttributeNames().forEach(s=>{s.match(/^@(if|else|for|each|expand)$/)||s.match(/^@.*$/)&&(t.props||(t.props={}),t.props[s]=e.getAttribute(s))}),e.hasChildNodes()&&(t.children=x(e)),t}else return Y(e)}function Y(e){const t={type:"element",tag:e.tagName.toLowerCase()};if(e.hasAttributes()){const s=[];if(e.getAttributeNames().forEach(n=>{const r=e.getAttribute(n);switch(n){case"is":{n in t||(t.is=r);return}case"class":case"part":return(t[n]??(t[n]=[])).push(r.split(/\s+/));case"style":return s.push(r);case"is:":return t.is=h(r,"script");case"class:":case"part:":{const i=n.slice(0,-1);return(t[i]??(t[i]=[])).push({type:"flags",value:h(r,"script")})}case"style:":return s.push(h(r,"script"))}{const i=n.match(/^on(?<type>.+?):?$/);if(i?.groups){const o=i.groups.type,c={type:"handler",value:h(r,"script")};return((t.on??(t.on={}))[o]??(t.on[o]=[])).push(c)}}{const i=n.match(/^(?<name>.+):$/);if(i?.groups)return(t.props??(t.props={}))[i.groups.name]=h(r,"script")}if(!n.match(/^(?<name>.+)\*$/)?.groups&&!n.match(/^@(if|else|for|each|expand)$/)&&!(n in(t.props??(t.props={}))))return t.props[n]=r}),s.length&&(s.length===1&&typeof s[0]=="string"?t.style=s[0]:t.style={type:"join",values:s.filter(n=>n!==""),separator:";"}),t.props){for(const n in t.props){const r=n.match(/^(?<name>.+)&$/);if(r?.groups){const i=r.groups.name;(t.bools??(t.bools={}))[i]=h(t.props[n],"script"),delete t.props[i],delete t.props[n],delete t.props[i+":"]}}Object.keys(t.props).length||delete t.props}}return e.hasChildNodes()&&(t.children=x(e)),t}function C(e){return typeof e=="object"&&"type"in e}function Pe(e,t){switch(e){case"void":return;case"typeof":return typeof t;case"+":return+t;case"-":return-t;case"~":return~t;case"!":return!t;default:throw Error(e+" does not exist")}}function V(e,t,s){switch(e){case"+":return t+s;case"-":return t-s;case"/":return t/s;case"*":return t*s;case"%":return t%s;case"**":return t**s;case"in":return t in s;case"instanceof":return t instanceof s;case"<":return t<s;case">":return t>s;case"<=":return t<=s;case">=":return t>=s;case"==":return t==s;case"!=":return t!=s;case"===":return t===s;case"!==":return t!==s;case"<<":return t<<s;case">>":return t>>s;case">>>":return t>>>s;case"&":return t&s;case"|":return t|s;case"^":return t^s;case"&&":return t&&s;case"||":return t||s;case"??":return t??s;default:throw Error(e+" does not exist")}}function a(e,t=[]){return _[e.type](e,t)}const _={literal:(e,t)=>e.value,array:(e,t)=>e.values.map(s=>a(s,t)),object:(e,t)=>e.entries.map(s=>s.map(n=>a(n,t))).reduce((s,[n,r])=>(s[n]=r,s),{}),variable:(e,t)=>{const[,s]=N(t,e.name);if(s>=0)return[t[s],e.name]},unary:(e,t)=>Pe(e.operator,a(e.operand,t)),binary:(e,t)=>V(e.operator,a(e.left,t),a(e.right,t)),assign:(e,t)=>{const s=a(e.left,t);if(!s)throw Error(e.left?e.left.name:"key is not defined");const[n,r]=s,i=a(e.right,t);return n[r]=e.operator.length>1?V(e.operator.slice(0,-1),n[r],i):i},function:(e,t)=>{if(e.name.type==="get"&&e.name.value.type==="hash"){const s=a(e.name.value,t);if(!s)throw Error(a(e.name.value.key)+" is not defined");const n=s[0][s[1]];if(typeof n=="function")return n.apply(s[0],e.params.map(r=>a(r,t)))}else{const s=a(e.name,t);if(typeof s=="function")return s(...e.params.map(n=>a(n,t)))}throw Error(e.name.toString()+" is not a function")},hash:(e,t)=>[a(e.object,t),a(e.key,t)],get:(e,t)=>{const s=a(e.value,t);return s&&s[0][s[1]]},join:(e,t)=>e.values.reduce((s,n,r)=>{if(C(n)){const i=a(n,t);return s+(r?e.separator:"")+(typeof i=="object"?JSON.stringify(i):i)}else return s+(r?e.separator:"")+n},""),flags:(e,t)=>{const s=a(e.value,t);if(typeof s=="string")return s.split(/\s+/);if(typeof s=="object"){if(Array.isArray(s))return s;if(s)return Object.keys(s).filter(n=>s[n])}return[]},if:(e,t)=>a(e.condition,t)?a(e.truthy,t):e.falsy?a(e.falsy,t):null,for:(e,t)=>{const s=a(e.array,t);let n;if(typeof s=="object"&&s!==null)if(Symbol.iterator in s)if("entries"in s)n=[...s.entries()];else{let r=0;n=[];for(const i of s)n.push([r++,i])}else n=Object.entries(s);else n=[[0,s]];return n.flatMap(([r,i],o)=>{const c=new Z(r,i,o,n,t);return I(a(e.value,t.concat([e.each?{[e.each]:i,loop:c}:{loop:c}])))})},element:(e,t)=>{const s=_.tree(e,t);return s.tag=e.tag,e.is&&(s.is=typeof e.is=="string"?e.is:a(e.is,t)),ee(e,t,s),s},tree:(e,t)=>{const s=(e.children||[])?.flatMap(n=>typeof n=="string"?[n]:I(a(n,t)));return s.length?{children:s}:{}},expand:(e,t)=>{const s=a(e.template,t);return C(s)?(s.type==="tree"&&(s.type="group"),a(s,t)):a(e.default,t)},group:(e,t)=>e.children?e.children.flatMap(s=>I(C(s)?a(s,t):s)):[],handler:(e,t)=>{e.cache||(e.cache=[]);for(const n of e.cache)if(te(n[0],t))return n[1];const s=n=>a(e.value,[...t,{event:n}]);return e.cache.push([t,s]),s}};function ee(e,t,s){if(e.style&&(s.style=typeof e.style=="string"?e.style:a(e.style,t)),e.bools)for(const n in e.bools){const r=e.bools[n],i=typeof r=="string"?r:a(r,t);i&&((s.props??(s.props={}))[n]=i)}if(e.props){s.props||(s.props={});for(const n in e.props)if(!n.startsWith("@")){const r=e.props[n];s.props[n]=typeof r=="string"?r:a(r,t)}}if(e.class&&e.class.forEach(n=>s.class=(s.class||[]).concat(Array.isArray(n)?n:a(n,t))),e.part&&e.part.forEach(n=>s.part=(s.part||[]).concat(Array.isArray(n)?n:a(n,t))),e.on){s.on||(s.on={});for(const n in e.on)s.on[n]=e.on[n].map(r=>a(r,t))}}function te(e,t,s=e.length-1,n=t.length-1){const[r,i]=N(e,"loop",s),[o,c]=N(t,"loop",n);return!r&&!o?!0:!r||!o?!1:r.index===o.index&&r.key===o.key&&r.value===o.value&&te(e,t,i-1,c-1)}function I(e){return e==null?[]:Array.isArray(e)?e:[e]}export{j as Lexer};export{R as innerText,d as expression};export{Z as Loop};export{h as parse};export{a as evaluate};const P=$({console,Object,Number,Math,Date,Array,JSON,String,isNaN,isFinite,location,alert});class T{stack;_component;_el;_tree;_props={};_patch=()=>{if(this.stack&&this._tree&&this._component.template){const t=a(this._component.template,this.stack);z(this._tree,t)}};constructor(t,s,n){this._component=t,this._el=s,this._tree=n,typeof this._component.stack=="function"?(async()=>{const r=await t.stack(this);this.stack=r?Array.isArray(r)?[P,this._props,...r]:[P,this._props,r]:[P],S(r,this._patch),this._patch()})().then():(this.stack=[P,this._props,...this._component.stack],S(this._component.stack,this._patch),this._patch())}setProp(t,s){switch(t){case"is":case"class":case"part":case"style":return;default:{const n=this._props[t];this._props[t]=s,n!==s&&this._patch()}}}get component(){return this._component}get el(){return this._el}get root(){return this._tree.node}get props(){return this._props}get patch(){return this._patch}}function O(e){return typeof e=="object"&&e.template&&e.stack}const se="beako-entity";class E extends HTMLElement{tree;entity;constructor(){super();this.tree=M(this.attachShadow({mode:"open"}))}static get observedAttributes(){return["class","part","style"]}setProp(t,s){this.entity?.setProp(t,s)}static getComponent(){}loadProps(){this.hasAttributes()&&this.getAttributeNames().forEach(t=>{this.setProp(t,this.getAttribute(t))})}get attributes(){return Se(super.attributes,this.setProp)}setAttribute(t,s){this.setProp(t,s),super.setAttribute(t,s)}attributeChangedCallback(t,s,n){}getAttributeNode(t){const s=super.getAttributeNode(t);return s&&ne(s,this.setProp)}removeAttribute(t){return this.setProp(t,void 0),super.removeAttribute(t)}removeAttributeNode(t){return this.setProp(t.name,void 0),super.removeAttributeNode(t)}}class Te extends E{constructor(){super()}setProp(t,s){if(t==="component")switch(typeof s){case"string":{const n=customElements.get(s);if(n&&E.isPrototypeOf(n)){const r=n.getComponent();r&&(this.entity=new T(r,this,this.tree))}break}case"object":O(s)&&(this.entity=new T(s,this,this.tree));break}super.setProp(t,s)}}customElements.define(se,Te);function ne(e,t){return new Proxy(e,{set(s,n,r){if(t(n,r),n==="value")return s.value=r}})}function Se(e,t){return new Proxy(e,{get:function(s,n){return n==="length"?s[n]:ne(s[n],t)}})}function g(e){if(C(e))switch(e.type){case"element":(!re(e)||"is"in e)&&(e.type="custom");case"tree":e.children?.forEach(g);break;case"if":{g(e.truthy),g(e.falsy);break}case"for":{g(e.value);break}}return e}function re(e){switch(e.tag){case"html":case"base":case"head":case"link":case"meta":case"style":case"title":case"body":case"address":case"article":case"aside":case"footer":case"header":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":case"main":case"nav":case"section":case"blockquote":case"dd":case"div":case"dl":case"dt":case"figcaption":case"figure":case"hr":case"li":case"ol":case"p":case"pre":case"ul":case"a":case"abbr":case"b":case"bdi":case"bdo":case"br":case"cite":case"code":case"data":case"dfn":case"em":case"i":case"kbd":case"mark":case"q":case"rp":case"rt":case"ruby":case"s":case"samp":case"small":case"span":case"strong":case"sub":case"sup":case"time":case"u":case"var":case"wbr":case"area":case"audio":case"img":case"map":case"track":case"video":case"embed":case"iframe":case"object":case"param":case"picture":case"portal":case"source":case"svg":case"math":case"canvas":case"noscript":case"script":case"del":case"ins":case"caption":case"col":case"colgroup":case"table":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":case"button":case"datalist":case"fieldset":case"form":case"input":case"label":case"legend":case"meter":case"optgroup":case"option":case"output":case"progress":case"select":case"textarea":case"details":case"dialog":case"menu":case"summary":case"slot":case"template":return!0}return!1}_.evaluation=(e,t)=>a(e.template,e.stack?e.stack.concat(t):t),_.custom=(e,t)=>{const s={tag:e.tag};e.is&&(s.is=typeof e.is=="string"?e.is:a(e.is,t));let n;if(e.isForce)n=!0;else if(re(e)){const r=customElements.get(s.is);n=r!==void 0&&Object.prototype.isPrototypeOf.call(E,r)}else{let r;for(let i=t.length-1;i>=0;i--)if(e.tag in t[i]){r=t[i][e.tag];break}if(O(r))s.tag=se,s.props={component:r},n=!0;else{const i=customElements.get(e.tag);n=i!==void 0&&Object.prototype.isPrototypeOf.call(E,i)}}if(n){const r=[],i=[],o=(e.children||[])?.flatMap(c=>{if(typeof c!="string"){const p=c;if(p.props){if(p.props["@as"])return i.push([p.props["@as"],p]),[];if(p.props.slot)return[a(c,t)]}}return r.push(c),[]});return r.length&&i.push(["content",{type:"group",children:r}]),i.length&&(s.props||(s.props={}),i.forEach(([c,p])=>{s.props[c]={type:"evaluation",template:p,stack:t}})),o.length&&(s.children=o),ee(e,t,s),s}else return _.element(e,t)};function q(e,t=[]){return $({template:g(typeof e=="string"?h(e):e),stack:typeof t=="function"||Array.isArray(t)?t:[t]})}function Ne(e,t,s=[]){const n=O(t)?t:q(t,s);customElements.define(e,class extends E{constructor(){super();if(this.entity=new T(n,this,this.tree),this.innerHTML){const r=a(g(h(this)));for(const i in r.props)this.setProp(i,r.props[i])}else this.loadProps()}static getComponent(){return n}})}function Ce(e,t,s=[]){const n=typeof e=="string"?document.querySelector(e):e,r=M(n.attachShadow({mode:"open"})),i=O(t)?t:q(t,s),o=new T(i,n,r),c=h(n);c.type="custom",c.isForce=!0;const p=a(c);for(const f in p.props)o.setProp(f,p.props[f])}export{P as builtin};export{T as Entity};export{E as ComponentElement};export{g as extend};export{q as compact};export{Ne as define};export{Ce as hack};
