const u=Symbol("Beako"),y=Symbol("Beako-lock");function se(e,t){const s=e.value;e.value=t,s!==t&&e.arms.forEach(n=>{switch(n[0]){case"bio":n[1]();break;case"bom":e.arms.delete(n);case"spy":n[1](t,s);break}})}function g(e,t,s){if(!e[y]&&(u in e||(e[u]={}),t!==void 0&&(t in e[u]||(e[u][t]={value:e[t],arms:new Set},Object.defineProperty(e,t,{get(){return this[u][t].value},set(n){se(this[u][t],n)}})),s))){for(const n of e[u][t].arms)if(n[1]===s[1])return;e[u][t].arms.add(s)}}function C(e,t,s){if(typeof e=="object"&&e!==null){const n=e;if(!n[y])if(g(n),s===void 0){const r=t?typeof t=="function"?["bio",t]:t:void 0;for(const i in n)g(n,i,r);if(Array.isArray(n))return n;for(const i in n){const o=[...n[u][i].arms].filter(c=>c[0]==="bio");o.length?o.forEach(c=>C(n[i],c)):C(n[i])}}else{const r=typeof s=="function"?["spy",s]:s;Array.isArray(t)?t.forEach(i=>g(n,i,r)):g(n,t,r)}}return e}async function ne(e,t){if(!e[y]){const s=Array.isArray(t)?t:[t],n=await Promise.all(s.map(r=>e[r]===void 0?new Promise(i=>{g(e,r,["bom",i])}):e[r]));return s.reduce((r,i,o)=>(r[i]=n[o],r),{})}return{}}function w(e,t,s){if(t!==void 0)u in e&&t in e[u]&&(s?e[u][t].arms.forEach(n=>{n[1]===s&&e[u][t].arms.delete(n)}):e[u][t].arms.clear(),e[u][t].arms.size||(Object.defineProperty(e,t,{enumerable:!0,configurable:!0,writable:!0,value:e[u][t].value}),delete e[u][t]));else{for(const n in e[u])w(e,n);delete e[u]}}function L(e,t,s){if(typeof e=="object"&&e!==null){const n=e;if(s===void 0)if(t){const r=t;for(const i in n)w(n,i,r),L(n[i],r)}else{for(const r in n)L(n[r]);w(n)}else Array.isArray(t)?t.forEach(r=>w(n,r,s)):w(n,t,s)}return e}function T(e,t){const s=typeof t=="function"?["bio",t]:t;if(typeof e=="object"&&e!==null){const n=e;if(!n[y]){if(u in n)for(const r in n[u])g(n,r,s);for(const r in n)T(n[r],s)}}return e}function v(e){return e[y]=!0,e}function re(e){return delete e[y],e}export{C as watch};export{ne as receive};export{L as unwatch};export{T as reach};export{v as lock};export{re as unlock};function $(e){const t={node:e};return q(t),t}function ie(e){const t={tag:e.tagName.toLowerCase(),node:e};return oe(t),q(t),t}function oe(e){if(e.node.hasAttributes()){const t={};e.node.getAttributeNames().forEach(s=>{if(s.startsWith("on"))return;const n=e.node.getAttribute(s);switch(s){case"class":case"part":return e[s]=n.split(/\s+/);case"style":case"is":return e[s]=n;default:return t[s]=n}}),Object.keys(t).length&&(e.props=t)}}function q(e){if(e.node.hasChildNodes()){const t=e.node.childNodes;e.children=[];for(let s=0;s<t.length;s++)switch(t[s].nodeType){case 3:e.children.push(t[s].data);break;case 1:e.children.push(ie(t[s]));break}}}function z(e,t){return B(e,t),e}function A(e,t){return e.tag!==t.tag||e.is!==t.is?A(t.is?{tag:t.tag,is:t.is,node:document.createElement(t.tag,{is:t.is})}:{tag:t.tag,node:document.createElement(t.tag)},t):(ce(e,t),ae(e,t),ue(e,t),pe(e,t),fe(e,t),B(e,t),"key"in t?e.key=t.key:delete e.key,e)}function ce(e,t){const s=e.class||[],n=t.class||[],r=n.filter(o=>!s.includes(o));r.length&&e.node.classList.add(...r);const i=s.filter(o=>!n.includes(o));i.length&&e.node.classList.remove(...i),n.length?e.class=n.slice():delete e.class}function ae(e,t){const s=e.part||[],n=t.part||[],r=n.filter(o=>!s.includes(o));r.length&&e.node.part.add(...r);const i=s.filter(o=>!n.includes(o));i.length&&e.node.part.remove(...i),n.length?e.part=n.slice():delete e.part}function ue(e,t){if(e.node instanceof HTMLElement){const s=e.style||"",n=t.style||"";s!=n&&(e.node.style.cssText=n,n!=""?e.style=n:delete e.style)}}function pe(e,t){const s=e.props||{},n=t.props||{},r=Object.keys(s),i=Object.keys(n);i.filter(o=>!r.includes(o)||s[o]!==n[o]).forEach(o=>e.node.setAttribute(o,n[o])),r.filter(o=>!i.includes(o)).forEach(o=>e.node.removeAttribute(o)),i.length?e.props={...n}:delete e.props}function fe(e,t){const s=e.on||{},n=t.on||{},r=Object.keys(s),i=Object.keys(n);i.filter(o=>!r.includes(o)).forEach(o=>{n[o].forEach(c=>{e.node.addEventListener(o,c)})}),r.filter(o=>!i.includes(o)).forEach(o=>{s[o].forEach(c=>{e.node.removeEventListener(o,c)})}),i.filter(o=>r.includes(o)).forEach(o=>{const c=n[o],p=s[o];c.filter(l=>!p.includes(l)).forEach(l=>e.node.addEventListener(o,l)),p.filter(l=>!c.includes(l)).forEach(l=>e.node.removeEventListener(o,l))})}class he{index=0;node;parent;children;stock;constructor(t){this.stock=new Map,this.parent=t,this.node=t.node.firstChild,this.children=t.children||[]}get isEnd(){return this.index>=this.children.length}get ve(){return this.children[this.index]}next(){typeof this.children[this.index]=="number"?this.index++:this.node&&(this.index++,this.node=this.node.nextSibling)}prev(){typeof this.children[this.index]=="number"?this.index--:this.node?(this.index--,this.node=this.node.previousSibling):(this.node=this.parent.node.lastChild,this.node&&this.index--)}add(t){const s=typeof t=="string"?document.createTextNode(t):t.node;return this.node=this.parent.node.insertBefore(s,this.node||null),this.next(),t}replace(t){if(typeof t=="string"&&this.node?.nodeType===3)this.node.data!==t&&(this.node.data=t);else{const s=typeof t=="string"?document.createTextNode(t):t.node;this.node!==s&&(typeof this.ve=="object"&&"key"in this.ve&&this.stock.set(this.ve.key,this.ve),this.parent.node.replaceChild(s,this.node),this.node=s)}return this.next(),t}remove(){typeof this.ve=="object"&&"key"in this.ve&&this.stock.set(this.ve.key,this.ve);const t=this.node;this.node=t?.nextSibling||null,this.parent.node.removeChild(t)}removeAll(){if(this.node)for(let t=this.node;t!==null;t=t.nextSibling)this.parent.node.removeChild(t)}has(t){return this.stock.has(t)}addFromKey(t,s){const n=this.stock.get(t);return this.stock.delete(t),this.add(A(n,s))}clear(){this.stock.clear()}search(t){if(this.isEnd)return!1;const s=t();if(typeof s=="boolean")return s;{this.next();const n=this.search(t);return this.prev(),n&&(this.remove(),this.index++),n}}}function B(e,t){const s=t.children||[],n=new he(e),r=s.filter(c=>typeof c=="number").reverse();let i=r.pop();const o=s.map(c=>{switch(typeof c){case"string":return!n.isEnd&&typeof n.ve=="string"?n.replace(c):n.add(c);case"object":{if("key"in c){if(n.has(c.key))return n.addFromKey(c.key,c);if(typeof n.ve=="object"&&n.search(()=>{if(typeof n.ve=="object"&&c.key===n.ve.key)return!0;if(typeof n.ve=="number"&&i!=null&&n.ve===i)return!1}))return n.replace(A(n.ve,c))}if(typeof n.ve=="object"){const p="key"in n.ve?{tag:c.tag,node:document.createElement(c.tag)}:n.ve;return n.replace(A(p,c))}else return n.add(A({tag:c.tag,node:document.createElement(c.tag)},c))}case"number":{const p=n.search(()=>{if(typeof n.ve=="number"&&c===n.ve)return!0});return i=r.pop(),p&&n.next(),n.clear(),c}}});n.removeAll(),o.length?e.children=o:delete e.children}export{$ as load};export{z as patch};function D(e,t){switch(e){case"script":switch(t){case"+":case"-":return"multi";case"void":case"typeof":case"~":case"!":return"unary";case"/":case"*":case"%":case"**":case"in":case"instanceof":case"<":case">":case"<=":case">=":case"==":case"!=":case"===":case"!==":case"<<":case">>":case">>>":case"&":case"|":case"^":case"&&":case"||":case"??":return"binary";case"=":case"*=":case"**=":case"/=":case"%=":case"+=":case"-=":case"<<=":case">>=":case">>>=":case"&=":case"^=":case"|=":case"&&=":case"||=":case"??=":return"assign";case"++":case"--":return"crement";case"false":case"true":return"boolean";case"null":case"undefined":case".":case"?.":case"[":case"]":case"{":case"}":case"(":case")":case"...":case"?":case":":case",":case"'":case'"':case"`":return t}switch(!0){case/^\/\/.*$/.test(t):return"lineComment";case/^[_\$a-zA-Z][_\$a-zA-Z0-9]*$/.test(t):return"word";case/^\d+\.?\d*$|^\.?\d+$/.test(t):return"number"}break;case"template":switch(t){case"$":return"partial";case"${":return t;case"}":return t;case"`":return"`";case"\r":case`
`:case`\r
`:return"other"}case"singleString":case"doubleString":switch(t){case"\\":return"partial";case"\r":case`
`:case`\r
`:return"return";case`\\\r
`:return"escape";case"'":if(e==="singleString")return t;break;case'"':if(e==="doubleString")return t;break}switch(!0){case/^\\(x|u)$/.test(t):return"partial";case/^\\.$/.test(t):return"escape"}break;case"text":switch(t){case"{":case"}":return"partial";case"{{":case"}}":return t}break}return"other"}class M{text;field;index;token;constructor(t,s,n=0,r=null){this.text=t,this.field=s,this.index=n,this.token=r}_next(t){const s=["",""];for(this.index=t;this.index<this.text.length;this.index++){const n=D(this.field,s[1]+this.text[this.index]);if(n==="other")return s;s[0]=n,s[1]=s[1]+this.text[this.index]}return s}skip(){let t="";if(!this.token)for(let s=this.index;s<this.text.length;s++)if(D(this.field,this.text[s])==="other")t+=this.text[s];else if(this.token=this._next(s),this.token&&this.token[0]==="partial")t+=this.token[1],this.token=null;else return t;return t}nextType(){return this.skip(),this.token?this.token[0]:""}pop(){this.skip();const t=this.token;return this.token=null,t||null}expand(t,s){const n=this.field;this.field=t,s(),this.token&&(this.index-=this.token[1].length,this.token=null),this.field=n}}function h(e,t,s=""){if(!e||e[0]!==t)throw Error(s)}function I(e){const t=[];for(t.push(e.skip());e.nextType();)e.nextType()==="{{"?(e.pop(),e.expand("script",()=>{t.push(f(e))}),h(e.pop(),"}}"),t.push(e.skip())):e.pop();const s=t.filter(n=>n!=="");return s.length===1&&typeof s[0]=="string"?s[0]:{type:"join",values:s,separator:""}}function f(e){return de(e)}function de(e){const t=le(e);if(e.nextType()==="assign"){if(t.type!=="get")throw Error("The left operand is not variable");const s=e.pop()[1],n=f(e);return{type:"assign",operator:s,left:t.value,right:n}}else return t}function le(e){let t=J(e);for(;e.nextType()==="?";){e.pop();const s=f(e);h(e.pop(),":");const n=J(e);t={type:"if",condition:t,truthy:s,falsy:n}}return t}function J(e){const t=new Array;for(t.push(O(e));e.nextType()==="multi"||e.nextType()==="binary";)t.push(e.pop()[1]),t.push(O(e));for(;t.length>1;)for(let s=0;s+1<t.length;s+=2)if(s+3>=t.length||H(t[s+1])>H(t[s+3])){const n={type:"binary",operator:t[s+1],left:t[s],right:t[s+2]};t.splice(s,3,n)}return typeof t[0]=="string"?{type:"variable",name:t[0]}:t[0]}function H(e){switch(e){default:return 0;case"||":case"??":return 4;case"&&":return 5;case"|":return 6;case"^":return 7;case"&":return 8;case"==":case"!=":case"===":case"!==":return 9;case"in":case"instanceof":case"<":case">":case"<=":case">=":return 10;case"<<":case">>":case">>>":return 11;case"+":case"-":return 12;case"*":case"/":case"%":return 13;case"**":return 14}}function O(e){switch(e.nextType()){case"multi":case"unary":return{type:"unary",operator:e.pop()[1],operand:O(e)};default:return ye(e)}}function ye(e){let t=ge(e);for(;;){switch(e.nextType()){case"(":{e.pop();const s=[];for(;e.nextType()!==")"&&(s.push(f(e)),e.nextType()===",");)e.pop();h(e.pop(),")"),t={type:"function",name:t,params:s};continue}case".":{e.pop();const s=e.pop();h(s,"word"),t={type:"get",value:{type:"hash",object:t,key:{type:"literal",value:s[1]}}};continue}case"[":{e.pop();const s=f(e);h(e.pop(),"]"),t={type:"get",value:{type:"hash",object:t,key:s}};continue}}break}return t}function ge(e){const t=e.pop();switch(t[0]){case"word":return{type:"get",value:{type:"variable",name:t[1]}};case"number":return{type:"literal",value:Number(t[1])};case"boolean":return{type:"literal",value:t[1]==="true"};case"undefined":return{type:"literal",value:void 0};case"null":return{type:"literal",value:null};case'"':return j(e,"doubleString",t[0]);case"'":return j(e,"singleString",t[0]);case"`":return j(e,"template",t[0]);case"(":{const s=f(e);return h(e.pop(),")"),s}case"[":{const s=[];for(;e.nextType()!=="]";)if(s.push(f(e)),e.nextType()===",")e.pop();else if(e.nextType()==="]"){e.pop();break}else throw Error("']' is required");return{type:"array",values:s}}case"{":{const s=[];for(;e.nextType()!=="}";){const n=Array(2),r=e.pop();if(r[0]==="word"?n[0]={type:"literal",value:r[1]}:r[0]==="["&&(n[0]=f(e),h(e.pop(),"]")),h(e.pop(),":"),n[1]=f(e),s.push(n),e.nextType()===",")e.pop();else if(e.nextType()==="}"){e.pop();break}else throw Error("'}' is required")}return{type:"object",entries:s}}default:throw new Error(JSON.stringify(t))}}function j(e,t,s){const n=[""];let r=0;return e.expand(t,()=>{e:for(;;){n[r]+=e.skip();const i=e.pop();switch(i[0]){case s:break e;case"return":throw Error();case"escape":n[r]+=i[1];continue;case"${":e.expand("script",()=>{n.push(f(e))}),h(e.pop(),"}"),n.push(e.skip()),r+=2}}}),r===0?{type:"literal",value:n[0]}:{type:"join",values:n.filter(i=>i!==""),separator:""}}function P(e,t,s=e.length-1){for(let n=s;n>=0;n--)if(t in e[n])return[e[n][t],n];return[void 0,-1]}class Z{_key;_value;_index;_entries;_stack;constructor(t,s,n,r,i){this._key=t,this._value=s,this._index=n,this._entries=r,this._stack=i}get key(){return this._key}get value(){return this._value}get index(){return this._index}get size(){return this._entries.length}get isFirst(){return this._index===0}get isLast(){return this._index===this._entries.length-1}get parent(){return P(this._stack,"loop")[0]}}const be=new DOMParser;function d(e,t="tree"){switch(t){case"tree":if(typeof e=="string"){const s=be.parseFromString(e,"text/html");return{type:"tree",children:E(s.head).concat(E(s.body))}}else{const s=e.content;return{type:"tree",children:E(s)}}case"text":return I(new M(e,t));case"script":return f(new M(e,t))}}class me{node;constructor(t){this.node=t}hasAttribute(t){return!!(this.node&&this.node.nodeType===1&&this.node.hasAttribute(t))}pop(){const t=this.node;return this.node=this.node?this.node.nextSibling:null,t}}function E(e){const t=new me(e.firstChild),s=[];for(;t.node;)s.push(we(t));return s}function we(e){switch(e.node.nodeType){case 3:return d(e.pop().data,"text");case 1:return G(e);default:return""}}function Ae(e){return G(e)}function G(e){const t=e.node;if(t.hasAttribute("@for")){const s=t.getAttribute("@each")||void 0,n=d(t.getAttribute("@for"),"script");return{type:"for",each:s,array:n,value:U(e)}}else return U(e)}function U(e){const t=e.node;if(t.hasAttribute("@if")){const s=d(t.getAttribute("@if"),"script"),n=W(t);e.pop();const r=e.hasAttribute("@else")?Ae(e):void 0;return{type:"if",condition:s,truthy:n,falsy:r}}else return W(e.pop())}function W(e){if(e.hasAttribute("@expand")){const t=d(e.getAttribute("@expand"),"script"),s=Q(e);return{type:"expand",template:t,default:s}}else return Q(e)}function Q(e){if(e.tagName.toLowerCase()==="group"){const t={type:"group"};return e.hasAttributes()&&e.getAttributeNames().forEach(s=>{s.match(/^@(if|else|for|each|expand)$/)||s.match(/^@.*$/)&&(t.props||(t.props={}),t.props[s]=e.getAttribute(s))}),e.hasChildNodes()&&(t.children=E(e)),t}else return Ee(e)}function Ee(e){const t={type:"element",tag:e.tagName.toLowerCase()};if(e.hasAttributes()){const s=[];e.getAttributeNames().forEach(n=>{const r=e.getAttribute(n);switch(n){case"is":{n in t||(t.is=r);return}case"class":case"part":return n in t||(t[n]=[]),t[n].push(r.split(/\s+/));case"style":return s.push(r)}{const i=n.match(/^(?<name>.+)(\+.*)$/);if(i?.groups){const o=i.groups.name,c=d(r,"script");switch(o){case"is":return t.is=c;case"class":case"part":return o in t||(t[o]=[]),t[o].push({type:"flags",value:c});case"style":return s.push(c)}}}{const i=n.match(/^(?<name>.+):$/);if(i?.groups)return t.props||(t.props={}),t.props[i.groups.name]=d(r,"script")}if(n.match(/^(?<name>.+)\*$/)?.groups,!n.match(/^@(if|else|for|each|expand)$/)&&(t.props||(t.props={}),!(n in t.props)))return t.props[n]=r}),s.length&&(s.length===1&&typeof s[0]=="string"?t.style=s[0]:t.style={type:"join",values:s.filter(n=>n!==""),separator:";"})}return e.hasChildNodes()&&(t.children=E(e)),t}function N(e){return typeof e=="object"&&"type"in e}function xe(e,t){switch(e){case"void":return;case"typeof":return typeof t;case"+":return+t;case"-":return-t;case"~":return~t;case"!":return!t;default:throw Error(e+" does not exist")}}function R(e,t,s){switch(e){case"+":return t+s;case"-":return t-s;case"/":return t/s;case"*":return t*s;case"%":return t%s;case"**":return t**s;case"in":return t in s;case"instanceof":return t instanceof s;case"<":return t<s;case">":return t>s;case"<=":return t<=s;case">=":return t>=s;case"==":return t==s;case"!=":return t!=s;case"===":return t===s;case"!==":return t!==s;case"<<":return t<<s;case">>":return t>>s;case">>>":return t>>>s;case"&":return t&s;case"|":return t|s;case"^":return t^s;case"&&":return t&&s;case"||":return t||s;case"??":return t??s;default:throw Error(e+" does not exist")}}function a(e,t=[]){return x[e.type](e,t)}const x={literal:(e,t)=>e.value,array:(e,t)=>e.values.map(s=>a(s,t)),object:(e,t)=>e.entries.map(s=>s.map(n=>a(n,t))).reduce((s,[n,r])=>(s[n]=r,s),{}),variable:(e,t)=>{const[,s]=P(t,e.name);if(s>=0)return[t[s],e.name]},unary:(e,t)=>xe(e.operator,a(e.operand,t)),binary:(e,t)=>R(e.operator,a(e.left,t),a(e.right,t)),assign:(e,t)=>{const s=a(e.left,t);if(!s)throw Error(e.left?e.left.name:"key is not defined");const[n,r]=s,i=a(e.right,t);return n[r]=e.operator.length>1?R(e.operator.slice(0,-1),n[r],i):i},function:(e,t)=>{const s=a(e.name,t);if(typeof s=="function")return s(...e.params.map(n=>a(n,t)));throw Error(e.name.toString()+" is not a function")},hash:(e,t)=>[a(e.object,t),a(e.key,t)],get:(e,t)=>{const s=a(e.value,t);return s&&s[0][s[1]]},join:(e,t)=>e.values.reduce((s,n,r)=>{if(N(n)){const i=a(n,t);return s+(r?e.separator:"")+(typeof i=="object"?JSON.stringify(i):i)}else return s+(r?e.separator:"")+n},""),flags:(e,t)=>{const s=a(e.value,t);if(typeof s=="string")return s.split(/\s+/);if(typeof s=="object"){if(Array.isArray(s))return s;if(s)return Object.keys(s).filter(n=>s[n])}return[]},if:(e,t)=>a(e.condition,t)?a(e.truthy,t):e.falsy?a(e.falsy,t):null,for:(e,t)=>{const s=a(e.array,t);let n;if(typeof s=="object"&&s!==null)if(Symbol.iterator in s)if("entries"in s)n=[...s.entries()];else{let r=0;n=[];for(const i of s)n.push([r++,i])}else n=Object.entries(s);else n=[[0,s]];return n.flatMap(([r,i],o)=>{const c=new Z(r,i,o,n,t);return F(a(e.value,t.concat([e.each?{[e.each]:i,loop:c}:{loop:c}])))})},element:(e,t)=>{const s=x.tree(e,t);return s.tag=e.tag,e.is&&(s.is=typeof e.is=="string"?e.is:a(e.is,t)),X(e,t,s),s},tree:(e,t)=>{const s=(e.children||[])?.flatMap(n=>typeof n=="string"?[n]:F(a(n,t)));return s.length?{children:s}:{}},expand:(e,t)=>{const s=a(e.template,t);return N(s)?(s.type==="tree"&&(s.type="group"),a(s,t)):a(e.default,t)},group:(e,t)=>e.children?e.children.flatMap(s=>F(N(s)?a(s,t):s)):[],listener:(e,t)=>{e.cache||(e.cache=[]);for(const n of e.cache)if(Y(n[0],t))return n[1];const s=()=>a(e.value,t);return e.cache.push([t,s]),s}};function X(e,t,s){if(e.style&&(s.style=typeof e.style=="string"?e.style:a(e.style,t)),e.props){s.props||(s.props={});for(const n in e.props){const r=e.props[n];s.props[n]=typeof r=="string"?r:a(r,t)}}if(e.class&&e.class.forEach(n=>s.class=(s.class||[]).concat(Array.isArray(n)?n:a(n,t))),e.part&&e.part.forEach(n=>s.part=(s.part||[]).concat(Array.isArray(n)?n:a(n,t))),e.on){s.on||(s.on={});for(const n in e.on)s.on[n]=e.on[n].map(r=>a(r,t))}}function Y(e,t,s=e.length-1,n=t.length-1){const[r,i]=P(e,"loop",s),[o,c]=P(t,"loop",n);return!r&&!o?!0:!r||!o?!1:r.index===o.index&&r.key===o.key&&r.value===o.value&&Y(e,t,i,c)}function F(e){return e==null?[]:Array.isArray(e)?e:[e]}export{M as Lexer};export{I as innerText,f as expression};export{Z as Loop};export{d as parse};export{a as evaluate};const _=v({console,Object,Number,Math,Date,Array,JSON,String,isNaN,isFinite,location});class k{stack;_component;_el;_tree;_props={};_patch=()=>{if(this.stack&&this._tree&&this._component.template){const t=a(this._component.template,this.stack);z(this._tree,t)}};constructor(t,s,n){this._component=t,this._el=s,this._tree=n,typeof this._component.stack=="function"?(async()=>{const r=await t.stack(this);this.stack=r?Array.isArray(r)?[_,this._props,...r]:[_,this._props,r]:[_],T(r,this._patch),this._patch()})().then():(this.stack=[_,this._props,...this._component.stack],T(this._component.stack,this._patch),this._patch())}setProp(t,s){switch(t){case"is":case"class":case"part":case"style":return;default:{const n=this._props[t];this._props[t]=s,n!==s&&this._patch()}}}get component(){return this._component}get el(){return this._el}get root(){return this._tree.node}get props(){return this._props}get patch(){return this._patch}}function S(e){return typeof e=="object"&&e.template&&e.stack}const V="beako-entity";function ee(e,t){return new Proxy(e,{set(s,n,r){if(t(n,r),n==="value")return s.value=r}})}function _e(e,t){return new Proxy(e,{get:function(s,n){return n==="length"?s[n]:ee(s[n],t)}})}class b extends HTMLElement{tree;entity;constructor(){super();this.tree=$(this.attachShadow({mode:"open"}))}static get observedAttributes(){return["class","part","style"]}setProp(t,s){this.entity?.setProp(t,s)}static getComponent(){}loadProps(){this.hasAttributes()&&this.getAttributeNames().forEach(t=>{this.setProp(t,this.getAttribute(t))})}get attributes(){return _e(super.attributes,this.setProp)}setAttribute(t,s){this.setProp(t,s),super.setAttribute(t,s)}attributeChangedCallback(t,s,n){}getAttributeNode(t){const s=super.getAttributeNode(t);return s&&ee(s,this.setProp)}removeAttribute(t){return this.setProp(t,void 0),super.removeAttribute(t)}removeAttributeNode(t){return this.setProp(t.name,void 0),super.removeAttributeNode(t)}}class ke extends b{constructor(){super()}setProp(t,s){if(t==="component")switch(typeof s){case"string":{const n=customElements.get(s);if(n&&b.isPrototypeOf(n)){const r=n.getComponent();r&&(this.entity=new k(r,this,this.tree))}break}case"object":S(s)&&(this.entity=new k(s,this,this.tree));break}super.setProp(t,s)}}customElements.define(V,ke),x.evaluation=(e,t)=>a(e.template,e.stack?e.stack.concat(t):t),x.custom=(e,t)=>{const s={tag:e.tag};e.is&&(s.is=typeof e.is=="string"?e.is:a(e.is,t));let n;if(te(e))n=customElements.get(s.is)instanceof b;else{let r;for(let i=t.length-1;i>=0;i--)if(e.tag in t[i]){r=t[i][e.tag];break}S(r)?(s.tag=V,s.props={component:r},n=!0):n=customElements.get(e.tag)instanceof b}if(n){const r=[],i=[],o=(e.children||[])?.flatMap(c=>{if(typeof c!="string"){const p=c;if(p.props){if(p.props["@as"])return i.push([p.props["@as"],p]),delete p.props["@as"],[];if(p.props.slot)return[a(c,t)]}}return r.push(c),[]});return r.length&&i.push(["content",{type:"group",children:r}]),i.length&&(s.props||(s.props={}),i.forEach(([c,p])=>{s.props[c]={type:"evaluation",template:p,stack:t}})),o.length&&(s.children=o),X(e,t,s),s}else return x.element(e,t)};function m(e){if(N(e))switch(e.type){case"element":(!te(e)||"is"in e)&&(e.type="custom");case"tree":e.children?.forEach(m);break;case"if":{m(e.truthy),m(e.falsy);break}case"for":{m(e.value);break}}return e}function te(e){switch(e.tag){case"html":case"base":case"head":case"link":case"meta":case"style":case"title":case"body":case"address":case"article":case"aside":case"footer":case"header":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":case"main":case"nav":case"section":case"blockquote":case"dd":case"div":case"dl":case"dt":case"figcaption":case"figure":case"hr":case"li":case"ol":case"p":case"pre":case"ul":case"a":case"abbr":case"b":case"bdi":case"bdo":case"br":case"cite":case"code":case"data":case"dfn":case"em":case"i":case"kbd":case"mark":case"q":case"rp":case"rt":case"ruby":case"s":case"samp":case"small":case"span":case"strong":case"sub":case"sup":case"time":case"u":case"var":case"wbr":case"area":case"audio":case"img":case"map":case"track":case"video":case"embed":case"iframe":case"object":case"param":case"picture":case"portal":case"source":case"svg":case"math":case"canvas":case"noscript":case"script":case"del":case"ins":case"caption":case"col":case"colgroup":case"table":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":case"button":case"datalist":case"fieldset":case"form":case"input":case"label":case"legend":case"meter":case"optgroup":case"option":case"output":case"progress":case"select":case"textarea":case"details":case"dialog":case"menu":case"summary":case"slot":case"template":return!0}return!1}function K(e,t=[]){return v({template:m(typeof e=="string"?d(e):e),stack:typeof t=="function"||Array.isArray(t)?t:[t]})}function Te(e,t,s=[]){const n=S(t)?t:K(t,s);customElements.define(e,class extends b{constructor(){super();this.entity=new k(n,this,this.tree),this.loadProps()}static getComponent(){return n}})}function Pe(e,t,s=[]){const n=typeof e=="string"?document.querySelector(e):e.nodeType===9?e.body:e,r=$(n.attachShadow({mode:"open"})),i=S(t)?t:K(t,s);new k(i,n,r)}export{_ as builtin,k as Entity};export{b as ComponentElement};export{m as extend};export{K as compact};export{Te as define};export{Pe as hack};
