var l=Symbol.for("Beako Dictionary"),y=Symbol.for("Beako Reactive"),v=Symbol.for("Beako Array"),g=Symbol.for("Beako Lock");function k(t,e,n){if(typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Array.isArray(t))){let r=t;if(!r[g])if(R(r),n===void 0){let a=r[l][y][1];typeof e=="function"&&a.add(e);for(let o in r){R(r,o,r[l][y][0]);let s=r[o];typeof s=="object"&&s!==null&&(a.size?a.forEach(i=>{(!(l in s)||!s[l][y][1].has(i))&&k(s,i)}):l in s||k(s))}if(Array.isArray(r)){let o=r[l][v].length;if(r.length<o)for(let s=r.length;s<o;s++)R(r,s);r.length=o}}else{let a=typeof n=="function"?["spy",n]:n;Array.isArray(e)?e.forEach(o=>R(r,o,a)):R(r,e,a)}}return t}function R(t,e,n){if(!t[g]){if(!(l in t)){let r=()=>{t[l][y][1].forEach(a=>a())};if(t[l]={[y]:[["bio",r],new Set]},Array.isArray(t)){let a=t[l][v]=t.slice(),o=i=>(r(),i),s=i=>(k(t),r(),i);Object.defineProperties(t,{unshift:{get(){return(...i)=>s(Array.prototype.unshift.call(a,...i))}},push:{get(){return(...i)=>s(Array.prototype.push.call(a,...i))}},splice:{get(){return(i,m,...c)=>s(m===void 0?Array.prototype.splice.call(a,i,a.length-i):Array.prototype.splice.apply(a,[i,m,...c]))}},pop:{get(){return()=>s(Array.prototype.pop.call(a))}},shift:{get(){return()=>s(Array.prototype.shift.call(a))}},sort:{get(){return i=>o(i===void 0?Array.prototype.sort.call(a):Array.prototype.sort.call(a,i))}},reverse:{get(){return()=>o(Array.prototype.reverse.call(a))}},copyWithin:{get(){return(i,m,c)=>o(Array.prototype.copyWithin.call(a,i,m!==void 0?m:0,c!==void 0?c:a.length))}}})}}if(e!==void 0)if(!Array.isArray(t)||typeof e!="number"&&isNaN(e)){if(e in t[l]||(t[l][e]=[t[e],new Set],Object.defineProperty(t,e,{get(){return this[l][e][0]},set(r){t[l][y][1].forEach(a=>k(r,a)),He(this[l][e],r)}})),n){for(let r of t[l][e][1])if(r[1]===n[1])return;t[l][e][1].add(n)}}else{let r=Object.getOwnPropertyDescriptor(t,e);(!r||"value"in r)&&e in t[l][v]&&Object.defineProperty(t,e,{get(){return this[l][v][e]},set(a){t[l][y][1].forEach(s=>k(a,s));let o=this[l][v][e];this[l][v][e]=a,o!==a&&t[l][y][0][1]()},configurable:!0,enumerable:!0})}}}function He(t,e){let n=t[0];t[0]=e,n!==e&&t[1].forEach(r=>{switch(r[0]){case"bio":r[1]();break;case"bom":t[1].delete(r);case"spy":r[1](e,n);break}})}async function Ie(t,e){if(!t[g]){let n=Array.isArray(e)?e:[e],r=await Promise.all(n.map(a=>t[a]===void 0?new Promise(o=>{R(t,a,["bom",o])}):t[a]));return n.reduce((a,o,s)=>(a[o]=r[s],a),{})}return{}}function b(t,e,n){if(typeof t=="object"&&t!==null){let r=t;if(!r[g])if(n===void 0)if(e){let a=e;r[l]&&r[l][y][1].delete(a);for(let o in r)b(r[o],a)}else{for(let a in r)b(r[a]);re(r)}else Array.isArray(e)?e.forEach(a=>re(r,a,n)):re(r,e,n)}return t}function re(t,e,n){if(e!==void 0)l in t&&e in t[l]&&(n?t[l][e][1].forEach(r=>{r[1]===n&&t[l][e][1].delete(r)}):t[l][e][1].clear());else{for(let r in t[l])Object.defineProperty(t,r,{enumerable:!0,configurable:!0,writable:!0,value:t[l][r][0]}),delete t[l][r];Array.isArray(t)&&(delete t.push,delete t.sort,delete t.splice),delete t[l]}}function H(t,e){if(typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Array.isArray(t))){let n=t;if(!n[g]){l in n&&n[l][y][1].add(e);for(let r in n)H(n[r],e)}}return t}function I(t){return t[g]=!0,t}function Ne(t){return delete t[g],t}var D=Symbol.for("Beako Event Types");var de="destroy",he="patch";D in window||Object.defineProperty(window,D,{value:Object.seal({get destroy(){return de},set destroy(t){if(typeof t=="string"&&t!=="")de=t;else throw Error("Event type must be string")},get patch(){return he},set patch(t){if(typeof t=="string"&&t!=="")he=t;else throw Error("Event type must be string")}})});var C=window[D];function A(t){let e={el:t};return Te(e),e}function je(t){let e={tag:t.tagName.toLowerCase(),el:t};return Be(e),Te(e),e}function Be(t){if(t.el.hasAttributes()){let e={};t.el.getAttributeNames().forEach(n=>{if(n.startsWith("on"))return;let r=t.el.getAttribute(n);switch(n){case"class":case"part":return t[n]=r.split(/\s+/);case"style":case"is":return t[n]=r;default:return e[n]=r}}),Object.keys(e).length&&(t.props=e)}}function Te(t){if(t.el.hasChildNodes()){let e=t.el.childNodes;t.children=[];for(let n=0;n<e.length;n++)switch(e[n].nodeType){case 1:if(e[n].tagName==="SCRIPT")break;t.children.push(je(e[n]));break;case 3:t.children.push(e[n].data);break}}}function _(t){if(!t.invalid?.children&&t.el instanceof Node){t.children?.forEach(n=>typeof n=="object"&&_(n));let e=t.el;for(;e.firstChild;)e.removeChild(e.firstChild)}t.insert||t.el.dispatchEvent(new CustomEvent(C.destroy,{bubbles:!1})),t.invalid?.on||q(t,{}),!t.invalid?.props&&t.el instanceof Element&&(z(t,{}),J(t,{}),K(t,{}),W(t,{}),Z(t,{}))}function N(t,e){return se(t,e),t.el.dispatchEvent(new CustomEvent(C.patch,{bubbles:!0,composed:!0})),t}function ae(t,e){return(!t||t.tag!==e.tag||t.is!==e.is||e.new)&&(t=e.is?{tag:e.tag,is:e.is,el:document.createElement(e.tag,{is:e.is})}:{tag:e.tag,el:document.createElement(e.tag)}),z(t,e),J(t,e),K(t,e),W(t,e),Z(t,e),q(t,e),se(t,e),"key"in e?t.key=e.key:delete t.key,t}function ye(t,e){return(!t||t.el!==e.el)&&(t={el:e.el},"insert"in e&&(t.insert=e.insert),"invalid"in e&&(t.invalid={...e.invalid})),!t.invalid?.props&&t.el instanceof Element&&(z(t,e),J(t,e),K(t,e),W(t,e),Z(t,e)),t.invalid?.on||q(t,e),!t.invalid?.children&&t.el instanceof Node&&se(t,e),t}function z(t,e){let n=(t.class||[]).join(" "),r=(e.class||[]).join(" ");n!==r&&(t.el.className=r),r.length?t.class=(e.class||[]).slice():delete t.class}function J(t,e){let n=t.part||[],r=e.part||[],a=r.filter(s=>!n.includes(s));a.length&&t.el.part.add(...a);let o=n.filter(s=>!r.includes(s));o.length&&t.el.part.remove(...o),r.length?t.part=r.slice():delete t.part}function K(t,e){if(t.el instanceof HTMLElement){let n=t.style||"",r=e.style||"";n!=r&&(t.el.style.cssText=r,r!=""?t.style=r:delete t.style)}}function W(t,e){let n=t.props||{},r=e.props||{},a=Object.keys(n),o=Object.keys(r);o.filter(s=>!a.includes(s)||n[s]!==r[s]).forEach(s=>t.el.setAttribute(s,r[s])),a.filter(s=>!o.includes(s)).forEach(s=>t.el.removeAttribute(s)),o.length?t.props={...r}:delete t.props}function q(t,e){let n=t.on||{},r=e.on||{},a=Object.keys(n),o=Object.keys(r);o.filter(s=>!a.includes(s)).forEach(s=>{r[s].forEach(i=>{t.el.addEventListener(s,i)})}),a.filter(s=>!o.includes(s)).forEach(s=>{n[s].forEach(i=>{t.el.removeEventListener(s,i)})}),o.filter(s=>a.includes(s)).forEach(s=>{let i=r[s],m=n[s];i.filter(c=>!m.includes(c)).forEach(c=>t.el.addEventListener(s,c)),m.filter(c=>!i.includes(c)).forEach(c=>t.el.removeEventListener(s,c))}),o.length?t.on=o.reduce((s,i)=>(s[i]=[...r[i]],s),{}):delete t.on}function Z(t,e){if(Object.prototype.isPrototypeOf.call(HTMLInputElement.prototype,t.el)){let n=t.el;n.value!==e.props?.value&&(e.props&&"value"in e.props?n.value!==(e.props?.value).toString()&&(n.value=e.props.value):t.el.value!==""&&(t.el.value="")),!n.checked&&e.props&&"checked"in e.props?n.checked=!0:n.checked&&!(e.props&&"checked"in e.props)&&(n.checked=!1)}if(Object.prototype.isPrototypeOf.call(HTMLOptionElement.prototype,t.el)){let n=t.el;!n.selected&&e.props&&"selected"in e.props?n.selected=!0:n.selected&&!(e.props&&"selected"in e.props)&&(n.selected=!1)}}var ge=class{constructor(){this.stock=new Map}has(e){return this.stock.get(e)?.length}push(e,n){this.stock.has(e)?this.stock.get(e).push(n):this.stock.set(e,[n])}shift(e){return this.stock.get(e).shift()}};function se(t,e){let n=t.children||[],r=e.children||[];if(n.length===0&&r.length===0||n.length===0&&t.el.hasChildNodes())return;let a=n.length===0&&r.length>1?new DocumentFragment:t.el,o=new ge,s=0,i=a.firstChild,m=r.filter(u=>typeof u=="number").reverse(),c=m.pop(),h=u=>{let f=ae(null,u);return a.insertBefore(f.el,i||null),f},w=u=>{let f=ae(n[s],u);return f!==n[s]&&(_(n[s]),a.replaceChild(f.el,n[s].el)),i=f.el.nextSibling,s++,f},ne=(u=!1)=>{if(typeof n[s]!="number"){if(typeof n[s]=="object"){if(i!==n[s].el){_(n[s++]);return}u&&"key"in n[s]?o.push(n[s].key,n[s]):_(n[s])}let f=i;i=f.nextSibling,a.removeChild(f)}s++},fe=r.map(u=>{switch(typeof u){case"string":return typeof n[s]=="string"?(i.data!==u&&(i.data=u),i=i.nextSibling,s++):a.insertBefore(document.createTextNode(u),i||null),u;case"object":{if("el"in u)if(typeof n[s]=="object"&&u.el===n[s].el){let f=ye(n[s],u);return f.el===i&&f.el instanceof Element&&f.el.getRootNode()===i.getRootNode()&&(i=i.nextSibling),s++,f}else{let f=ye(null,u);return f.el instanceof Element&&f.el.parentNode===null&&a.insertBefore(f.el,i||null),f}if("key"in u)if(o.has(u.key)){let f=ae(o.shift(u.key),u);return a.insertBefore(f.el,i||null),f}else{for(;s<n.length&&n[s]!==c;){if(typeof n[s]=="object"&&u.key===n[s].key)return w(u);ne(!0)}return h(u)}else return typeof n[s]=="object"&&!("el"in u)&&!("key"in n[s])?w(u):h(u)}case"number":{for(;s<n.length&&n[s]!==u;)ne();return s++,c=m.pop(),o.stock.forEach(f=>f.forEach(Me=>_(Me))),o.stock.clear(),u}}});for(;s<n.length;)ne();fe.length?t.children=fe:delete t.children,n.length===0&&r.length>1&&t.el.append(a)}function T(t,e,n=t.length-1){for(let r=n;r>=0;r--)if(e in t[r])return[t[r][e],r];return[void 0,-1]}var U=class{constructor(e,n,r,a,o){this._key=e;this._value=n;this._index=r;this._entries=a;this._stack=o}get key(){return this._key}get value(){return this._value}get index(){return this._index}get size(){return this._entries.length}get isFirst(){return this._index===0}get isLast(){return this._index===this._entries.length-1}get parent(){return T(this._stack,"loop")[0]}toJSON(){return{key:this._key,value:this._value,_index:this._index,size:this._entries.length,isFirst:this._index===0,isLast:this._index===this._entries.length-1}}};var Q=Symbol.for("Beako Ref");function O(t){return typeof t=="object"&&t!==null&&typeof t.type=="string"}function oe(t){return typeof t=="object"&&t!==null&&t[Q]===!0}function S(t){return"tag"in t}var P=class{constructor(e,n,r=0,a=null){this.text=e;this.field=n;this.index=r;this.token=a}_next(e){let n=["",""];for(this.index=e;this.index<this.text.length;this.index++){let r=ke(this.field,n[1]+this.text[this.index]);if(r==="other")return n;n[0]=r,n[1]=n[1]+this.text[this.index]}return n}skip(){let e="";if(!this.token)for(let n=this.index;n<this.text.length;n++)if(ke(this.field,this.text[n])==="other")e+=this.text[n];else if(this.token=this._next(n),this.token&&this.token[0]==="partial")e+=this.token[1],this.token=null;else return e;return e}nextIs(e){return this.skip(),this.token?e?this.token[0]===e:this.token[0]:!1}pop(){this.skip();let e=this.token;return this.token=null,e||null}expand(e,n){let r=this.field;this.field=e,n(),this.token&&(this.index-=this.token[1].length,this.token=null),this.field=r}must(e){let n=this.pop();if(!n||n[0]!==e)throw Error(e+" is required.");return n}};function ke(t,e){switch(t){case"html":switch(e){case">":case"<!--":case"/":return e;case"<":case"</":case"<!":case"<!-":return"partial"}switch(!0){case/^\/\/.*$/.test(e):return"//";case/^<[_\-a-zA-Z][_\-a-zA-Z0-9]*$/.test(e):return"start";case/^<\/[_\-a-zA-Z][_\-a-zA-Z0-9]*$/.test(e):return"end"}break;case"attr":switch(e){case"@if":case"@else":case"@for":case"@each":return"@";case"=":case":=":case"&=":case"*=":return"assign";case">":case"/":case"'":case'"':return e;case":":case"&":case"*":return"partial"}switch(!0){case/^on[_\$\-a-zA-Z0-9]+$/.test(e):return"on";case/^[_\$\-@a-zA-Z0-9]+$/.test(e):return"name"}break;case"comment":switch(e){case"-->":return e;case"-":case"--":return"partial"}break;case"script":switch(e){case"+":case"-":return"multi";case"void":case"typeof":case"~":case"!":return"unary";case"/":case"*":case"%":case"**":case"in":case"instanceof":case"<":case">":case"<=":case">=":case"==":case"!=":case"===":case"!==":case"<<":case">>":case">>>":case"&":case"|":case"^":case"&&":case"||":case"??":return"binary";case"=":case"*=":case"**=":case"/=":case"%=":case"+=":case"-=":case"<<=":case">>=":case">>>=":case"&=":case"^=":case"|=":case"&&=":case"||=":case"??=":return"assign";case"++":case"--":return"crement";case"false":case"true":return"boolean";case"null":case"undefined":case".":case"?.":case"[":case"]":case"{":case"}":case"(":case")":case"...":case"?":case":":case",":case"'":case'"':case"`":return e}switch(!0){case/^\/\/.*$/.test(e):return"//";case/^[_\$a-zA-Z][_\$a-zA-Z0-9]*$/.test(e):return"word";case/^\d+\.?\d*$|^\.?\d+$/.test(e):return"number"}break;case"template":switch(e){case"$":return"partial";case"${":return e;case"}":return e;case"`":return"`";case"\r":case`
`:case`\r
`:return"other"}case"single":case"double":switch(e){case"\\":return"partial";case"\r":case`
`:case`\r
`:return"return";case`\\\r
`:return"escape";case"'":if(t==="single")return e;break;case'"':if(t==="double")return e;break}switch(!0){case/^\\u[0-9a-fA-F]{0,3}$/.test(e):case/^\\x[0-9a-fA-F]{0,1}$/.test(e):case/^\\u\{(0?[0-9a-fA-F]{0,5}|10[0-9a-fA-F]{0,4})$/.test(e):return"partial";case/^\\.$/.test(e):case/^\\u[0-9a-fA-F]{4}$/.test(e):case/^\\u\{(0?[0-9a-fA-F]{1,5}|10[0-9a-fA-F]{1,4})\}$/.test(e):case/^\\x[0-9a-fA-F]{2}$/.test(e):return"escape"}break;case"text":switch(e){case"{":case"}":return"partial";case"{{":case"}}":return e}break}return"other"}function X(t){switch(t){case"\\n":return`
`;case"\\r":return"\r";case"\\v":return"\v";case"\\t":return"	";case"\\b":return"\b";case"\\f":return"\f"}switch(!0){case/^\\u[0-9a-fA-F]{4}$/.test(t):case/^\\x[0-9a-fA-F]{2}$/.test(t):return String.fromCodePoint(parseInt(t.slice(2),16));case/^\\u\{(0?[0-9a-fA-F]{1,5}|10[0-9a-fA-F]{1,4})\}$/.test(t):return String.fromCodePoint(parseInt(t.slice(3,-1),16))}return t.slice(1)}function d(t){let e=typeof t=="string"?new P(t,"script"):t;return $e(e)}function $e(t){let e=Ge(t);if(t.nextIs("assign")){if(e.type!=="get")throw Error("The left operand is not variable");let n=t.pop()[1],r=d(t);return{type:"assign",operator:n,left:e.value,right:r}}else return e}function Ge(t){let e=be(t);for(;t.nextIs("?");){t.pop();let n=d(t);t.must(":");let r=be(t);e={type:"if",condition:e,truthy:n,falsy:r}}return e}function be(t){let e=new Array;for(e.push(Y(t));t.nextIs("multi")||t.nextIs("binary");)e.push(t.pop()[1]),e.push(Y(t));for(;e.length>1;)for(let n=0;n+1<e.length;n+=2)if(n+3>=e.length||Ee(e[n+1])>Ee(e[n+3])){let r={type:"binary",operator:e[n+1],left:e[n],right:e[n+2]};e.splice(n,3,r)}return typeof e[0]=="string"?{type:"variable",name:e[0]}:e[0]}function Ee(t){switch(t){default:return 0;case"||":case"??":return 4;case"&&":return 5;case"|":return 6;case"^":return 7;case"&":return 8;case"==":case"!=":case"===":case"!==":return 9;case"in":case"instanceof":case"<":case">":case"<=":case">=":return 10;case"<<":case">>":case">>>":return 11;case"+":case"-":return 12;case"*":case"/":case"%":return 13;case"**":return 14}}function Y(t){switch(t.nextIs()){case"multi":case"unary":return{type:"unary",operator:t.pop()[1],operand:Y(t)};case"crement":return{type:"assign",operator:t.pop()[1].charAt(0)+"=",left:Y(t).value,right:{type:"literal",value:1}};default:return De(t)}}function De(t){let e=ze(t);return t.nextIs("crement")?{type:"assign",operator:t.pop()[1].charAt(0)+"=",left:e.value,right:{type:"literal",value:1},prevalue:!0}:e}function ze(t){let e=Je(t);for(;;){switch(t.nextIs()){case"(":{t.pop();let n=[];for(;!t.nextIs(")")&&(n.push(d(t)),t.nextIs(","));)t.pop();t.must(")"),e={type:"function",name:e,params:n};continue}case".":{t.pop();let n=t.must("word");e={type:"get",value:{type:"hash",object:e,key:{type:"literal",value:n[1]}}};continue}case"[":{t.pop();let n=d(t);t.must("]"),e={type:"get",value:{type:"hash",object:e,key:n}};continue}}break}return e}function Je(t){let e=t.pop();switch(e[0]){case"word":return{type:"get",value:{type:"variable",name:e[1]}};case"number":return{type:"literal",value:Number(e[1])};case"boolean":return{type:"literal",value:e[1]==="true"};case"undefined":return{type:"literal",value:void 0};case"null":return{type:"literal",value:null};case'"':return j(t,"double",e[0]);case"'":return j(t,"single",e[0]);case"`":return j(t,"template",e[0]);case"(":{let n=d(t);return t.must(")"),n}case"[":{let n=[];for(;!t.nextIs("]");)if(n.push(d(t)),t.nextIs(","))t.pop();else if(t.nextIs("]")){t.pop();break}else throw Error("']' is required");return{type:"array",values:n}}case"{":{let n=[];for(;!t.nextIs("}");){let r=Array(2),a=t.pop();if(a[0]==="word"?r[0]={type:"literal",value:a[1]}:a[0]==='"'?r[0]=j(t,"double",a[0]):a[0]==="'"?r[0]=j(t,"single",a[0]):a[0]==="["&&(r[0]=d(t),t.must("]")),a[0]==="word"&&(t.nextIs(",")||t.nextIs("}"))?r[1]={type:"get",value:{type:"variable",name:a[1]}}:(t.must(":"),r[1]=d(t)),n.push(r),t.nextIs(","))t.pop();else if(t.nextIs("}")){t.pop();break}else throw Error("'}' is required")}return{type:"object",entries:n}}default:throw new Error(e[0]+" is invalid")}}function j(t,e,n){let r=[""],a=0;return t.expand(e,()=>{e:for(;;){r[a]+=t.skip();let o=t.pop();switch(o[0]){case n:break e;case"return":throw Error("Newline cannot be used");case"escape":r[a]+=X(o[1]);continue;case"${":t.expand("script",()=>{r.push(d(t))}),t.must("}"),r.push(t.skip()),a+=2}}}),a===0?{type:"literal",value:r[0]}:{type:"join",values:r.filter(o=>o!==""),separator:""}}function F(t){switch(t){case"html":case"base":case"head":case"link":case"meta":case"style":case"title":case"body":case"address":case"article":case"aside":case"footer":case"header":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":case"main":case"nav":case"section":case"blockquote":case"dd":case"div":case"dl":case"dt":case"figcaption":case"figure":case"hr":case"li":case"ol":case"p":case"pre":case"ul":case"a":case"abbr":case"b":case"bdi":case"bdo":case"br":case"cite":case"code":case"data":case"dfn":case"em":case"i":case"kbd":case"mark":case"q":case"rp":case"rt":case"ruby":case"s":case"samp":case"small":case"span":case"strong":case"sub":case"sup":case"time":case"u":case"var":case"wbr":case"area":case"audio":case"img":case"map":case"track":case"video":case"embed":case"iframe":case"object":case"param":case"picture":case"portal":case"source":case"svg":case"math":case"canvas":case"noscript":case"script":case"del":case"ins":case"caption":case"col":case"colgroup":case"table":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":case"button":case"datalist":case"fieldset":case"form":case"input":case"label":case"legend":case"meter":case"optgroup":case"option":case"output":case"progress":case"select":case"textarea":case"details":case"dialog":case"menu":case"summary":case"slot":case"template":return!0}return!1}function xe(t){switch(t){case"br":case"hr":case"img":case"input":case"meta":case"area":case"base":case"col":case"embed":case"keygen":case"link":case"param":case"source":return!0}return!1}function ee(t){let e=typeof t=="string"?new P(t,"html"):t,n={text:e.skip()};for(;e.nextIs("<!--");)e.pop(),e.expand("comment",()=>e.must("-->")),n.text+=e.skip();if(e.nextIs("start")){let r=Ke(e);r&&(S(r)?n.next=r:(n.text=r.text,r.next&&(n.next=r.next)))}return n.text?n:n.next?n.next:void 0}function Ke(t){let e={tag:t.pop()[1].slice(1).toLocaleLowerCase()},n=We(t);if(n.length&&(e.attrs=n),t.nextIs("/"))t.pop(),t.must(">");else if(xe(e.tag))t.must(">");else{t.must(">");let a=ee(t);if(a&&(e.child=a),t.must("end")[1].slice(2)!==e.tag)throw Error("end is required.");t.must(">")}let r=ee(t);return r&&(e.next=r),e.tag==="script"&&e.next?e.next:e}function We(t){let e=[];return t.expand("attr",()=>{for(t.skip();t.nextIs()&&!t.nextIs(">");){let n=new Array(3);if(t.nextIs("name"))if(n[0]=t.pop()[1],t.nextIs("assign"))n[1]=t.must("assign")[1];else if(t.nextIs("name")||t.nextIs(">")||t.nextIs("/"))n[1]="=",n[2]=n[0];else throw Error("assign is required.");else{if(t.nextIs("on"))n[0]=t.pop()[1],n[1]="on";else if(t.nextIs("@"))n[0]=t.pop()[1],n[1]="@";else break;if(n[0]==="@else")n[2]=n[0];else if(t.must("assign")[1]!=="=")throw Error("= is required.")}n[2]===void 0&&(t.nextIs('"')?n[2]=we(t,"double",t.pop()[0]):t.nextIs("'")&&(n[2]=we(t,"single",t.pop()[0]))),e.push(n),t.skip()}}),e}function we(t,e,n){let r="";return t.expand(e,()=>{e:for(;;){r+=t.skip();let a=t.pop();switch(a[0]){case n:break e;case"return":throw Error("Newline cannot be used");case"escape":r+=X(a[1]);continue}}}),r}function B(t){let e=ee(t),n=e?pe(e):[];return n.length?{type:"tree",children:n}:{type:"tree"}}var Le=class{constructor(e){this.node=e}isSkippable(e){for(let n=this.node;n;n=n.next){if(S(n))return le(n,e);if(!/^\s*$/.test(n.text))return!1}return!1}skip(){for(;;){if(S(this.node))return this;this.node=this.node.next}}pop(){let e=this.node;return this.node=this.node?.next,e}};function pe(t){let e=new Le(t),n=[];for(;e.node;){let r=qe(e);r!==void 0&&n.push(r)}return n}function qe(t){if(!t.node)t.pop();else return S(t.node)?ve(t):Qe(new P(t.pop().text,"text"))}function Ze(t){return ve(t)}function ve(t){let e=t.node;if(le(e,"@for")){let n=ie(e,"@each")||void 0,r=d(ie(e,"@for"));return{type:"for",each:n,array:r,value:Ce(t)}}else return Ce(t)}function Ce(t){let e=t.node;if(le(e,"@if")){let n=d(ie(e,"@if")),r=Ae(e);t.pop();let a={type:"if",condition:n,truthy:r};return t.isSkippable("@else")&&(a.falsy=Ze(t.skip())),a}else return Ae(t.pop())}function Ae(t){if(t.tag==="group"){let e={type:"group"};if(t.attrs?.forEach(([n,,r])=>{n.match(/^@(if|else|for|each)$/)||n.match(/^@.*$/)&&(e.props||(e.props={}),e.props[n]=r)}),t.child){let n=pe(t.child);n.length&&(e.children=n)}return e}else return Ue(t)}function Ue(t){let e={type:"element",tag:t.tag};{let n=[];t.attrs?.forEach(([r,a,o])=>{switch(a){case"=":{switch(r){case"is":{r in e||(e.is=o);return}case"class":case"part":return(e[r]??(e[r]=[])).push(o.split(/\s+/));case"style":return n.push(o)}return r in(e.props??(e.props={}))?void 0:e.props[r]=o}case":=":{switch(r){case"is":return e.is=d(o);case"class":case"part":return(e[r]??(e[r]=[])).push({type:"flags",value:d(o)});case"style":return n.push(d(o))}return(e.props??(e.props={}))[r]=d(o)}case"*=":{let s=d(o);return O(s)&&s.type==="get"&&(s=s.value),(e.props??(e.props={}))[r]=s}case"on":{let s=r.slice(2),i={type:"handler",value:d(o)};return((e.on??(e.on={}))[s]??(e.on[s]=[])).push(i)}}}),n.length&&(n.length===1&&typeof n[0]=="string"?e.style=n[0]:e.style={type:"join",values:n.filter(r=>r!==""),separator:";"}),t.attrs?.forEach(([r,a,o])=>{a==="&="&&((e.bools??(e.bools={}))[r]=d(o),e.props&&(delete e.props[r],Object.keys(e.props).length||delete e.props))})}if(t.child){let n=pe(t.child);n.length&&(e.children=n)}return(!F(e.tag)||e.is)&&(e.type="custom"),e}function le(t,e){return t.attrs?.some(n=>n[0]===e)}function ie(t,e){let n=t.attrs?.find(r=>r[0]===e);return n?n[2]:""}function Qe(t){let e=[];for(e.push(t.skip());t.nextIs();)t.nextIs("{{")?(t.pop(),t.expand("script",()=>{e.push({type:"draw",value:d(t)})}),t.must("}}"),e.push(t.skip())):t.pop();return e.length===1&&typeof e[0]=="string"?e[0]:{type:"flat",values:e}}var ce=new Array,p=function(t,e=[],n={}){let r=t;switch(r.type){case"literal":return r.value;case"array":return r.values.map(a=>p(a,e,n));case"object":return Object.fromEntries(r.entries.map(a=>a.map(o=>p(o,e))));case"variable":{let[,a]=T(e,r.name);return a>=0?{record:e[a],key:r.name,[Q]:!0}:void 0}case"unary":return Ye(r.operator,p(r.operand,e,n));case"binary":{let a=p(r.left,e,n);return Re(r.operator,a)?_e(r.operator,a,p(r.right,e,n)):a}case"assign":{let a=p(r.left,e,n);if(!a)throw Error(r.left?r.left.name:"key is not defined");let{record:o,key:s}=a,i=o[s],m=p(r.right,e,n);if(r.operator.length>1){let c=r.operator.slice(0,-1);Re(c,i)&&(o[s]=_e(c,i,m))}else o[s]=m;return r.prevalue?i:o[s]}case"function":{if(r.name.type==="get"&&r.name.value.type==="hash"){let a=p(r.name.value,e,n);if(!a)throw Error(p(r.name.value.key,e,n)+" is not defined");let o=a.record[a.key];if(typeof o=="function")return o.apply(a.record,r.params.map(s=>p(s,e,n)))}else{let a=p(r.name,e,n);if(typeof a=="function")return a(...r.params.map(o=>p(o,e,n)))}throw Error(r.name.toString()+" is not a function")}case"hash":return{record:p(r.object,e,n),key:p(r.key,e,n),[Q]:!0};case"get":{let a=p(r.value,e,n);return a&&a.record[a.key]}case"flat":{let a=r.values.flatMap(o=>typeof o=="string"?[o]:ue(p(o,e,n))).filter(o=>o!=="").reduce((o,s)=>{let i=o.length;return i&&typeof s=="string"&&typeof o[i-1]=="string"?o[i-1]+=s:o.push(s),o},[]);return a.length===1&&typeof a[0]=="string"?a[0]:a}case"draw":{let a=p(r.value,e,n);if(typeof a=="object")if(O(a))if(a.type==="tree"){a.type="group";let o=p(a,e,n);return a.type="tree",o}else return p(a,e,n);else return Object.getPrototypeOf(a)===Object.prototype?JSON.stringify(a):"";else return a==null?"":a+""}case"join":return r.values.reduce((a,o,s)=>{if(O(o)){let i=p(o,e,n);return a+(s?r.separator:"")+(typeof i=="object"?"":i)}else return a+(s?r.separator:"")+o},"");case"flags":{let a=p(r.value,e,n);if(typeof a=="string")return a.split(/\s+/);if(typeof a=="object"){if(Array.isArray(a))return a;if(a)return Object.keys(a).filter(o=>a[o])}return[]}case"if":return p(r.condition,e,n)?p(r.truthy,e,n):r.falsy?p(r.falsy,e,n):null;case"for":{let a=p(r.array,e,n),o;if(typeof a=="object"&&a!==null)if(Symbol.iterator in a)if("entries"in a)o=[...a.entries()];else{let s=0;o=[];for(let i of a)o.push([s++,i])}else o=Object.entries(a);else o=[[0,a]];return o.flatMap(([s,i],m)=>{let c=new U(s,i,m,o,e),h=ue(p(r.value,e.concat([r.each?{[r.each]:i,loop:c}:{loop:c}]),n)).filter(w=>typeof w!="number");return typeof c.value=="object"&&h.filter(w=>typeof w=="object").forEach(w=>w.key=c.value),h})}case"tree":{let a=te(r,e,n);return a.length?{children:a}:{}}case"custom":{let a=ce.find(o=>o.match(r,e,n))?.exec(r,e,n);if(a)return a}case"element":{let a=te(r,e,n),s=a.length?{children:a}:{};return s.tag=r.tag,r.is&&(s.is=typeof r.is=="string"?r.is:p(r.is,e,n)),M(r,e,n,s),s}case"group":return te(r,e,n);case"handler":{n.handler||(n.handler=new WeakMap),n.handler.has(r)||n.handler.set(r,[]);let a=n.handler.get(r);for(let s of a)if(Pe(s[0],e))return s[1];let o=s=>p(r.value,[...e,{event:s}],n);return a.push([e,o]),o}case"evaluation":return p(r.template,r.stack?r.stack.concat(e):e,n);default:return ce.find(a=>a.match(t,e,n))?.exec(t,e,n)}};p.plugin=t=>{ce.unshift(t)};var Xe={match(t,e,n){if(t.type==="custom"){let r=t;if(!F(r.tag))return r.tag==="window"||T(e,r.tag)[0]instanceof EventTarget}return!1},exec(t,e,n){let r=t;if(t.tag==="window"){let s={el:window,invalid:{props:!0,children:!0}};return M(r,e,n,s),s}let a=T(e,r.tag)[0],o={el:a};return M(r,e,n,o),(a instanceof Element||a instanceof DocumentFragment||a instanceof ShadowRoot)&&r.children&&r.children.length?o.children=te(r,e,n):o.invalid={children:!0},o}};p.plugin(Xe);function te(t,e,n){let r=t.children||[],a=0;r.length&&((n.groups??(n.groups=[new WeakMap,0]))[0].has(t)?a=n.groups[0].get(t):(a=n.groups[1]=n.groups[1]+r.length,n.groups[0].set(t,a)));let o=r.flatMap((s,i)=>{if(O(s)){let m=ue(p(s,e,n));switch(s.type){case"if":case"for":case"group":m.push(a-i)}return m}else return[s]});return typeof o[o.length-1]=="number"&&o.pop(),o}function M(t,e,n,r){if(t.style&&(r.style=typeof t.style=="string"?t.style:p(t.style,e,n)),t.bools){for(let a in t.bools)if(!a.startsWith("@")){let o=t.bools[a],s=typeof o=="string"?o:p(o,e,n);s&&((r.props??(r.props={}))[a]=s)}}if(t.props){r.props||(r.props={});for(let a in t.props)if(!a.startsWith("@")){let o=t.props[a];r.props[a]=typeof o=="string"?o:p(o,e,n)}}if(t.class&&t.class.forEach(a=>r.class=(r.class||[]).concat(Array.isArray(a)?a:p(a,e,n))),t.part&&t.part.forEach(a=>r.part=(r.part||[]).concat(Array.isArray(a)?a:p(a,e,n))),t.on){r.on||(r.on={});for(let a in t.on)r.on[a]=t.on[a].map(o=>p(o,e,n))}}function Pe(t,e,n=t.length-1,r=e.length-1){let[a,o]=T(t,"loop",n),[s,i]=T(e,"loop",r);return!a&&!s?!0:!a||!s?!1:a.index===s.index&&a.key===s.key&&a.value===s.value&&Pe(t,e,o-1,i-1)}function ue(t){return t==null?[]:Array.isArray(t)?t:[t]}function Ye(t,e){switch(t){case"void":return;case"typeof":return typeof e;case"+":return+e;case"-":return-e;case"~":return~e;case"!":return!e;default:throw Error(t+" does not exist")}}function Re(t,e){switch(t){case"&&":return!!e;case"||":return!e;case"??":return e==null;default:return!0}}function _e(t,e,n){switch(t){case"+":return e+n;case"-":return e-n;case"/":return e/n;case"*":return e*n;case"%":return e%n;case"**":return e**n;case"in":return e in n;case"instanceof":return e instanceof n;case"<":return e<n;case">":return e>n;case"<=":return e<=n;case">=":return e>=n;case"==":return e==n;case"!=":return e!=n;case"===":return e===n;case"!==":return e!==n;case"<<":return e<<n;case">>":return e>>n;case">>>":return e>>>n;case"&":return e&n;case"|":return e|n;case"^":return e^n;case"&&":return e&&n;case"||":return e||n;case"??":return e??n;default:throw Error(t+" does not exist")}}var me=I({alert,console,Object,Number,Math,Date,Array,JSON,String,isNaN,isFinite,location,history,navigator,setTimeout,setInterval});var $=Symbol.for("Beako Special");function E(t){return typeof t=="object"&&t!==null&&(t.template||t.patcher)&&t.data&&t.options}var x=class{constructor(e,n,r){this._props={};this._refs={};let a=r.el;this._component=e,this._template=e.template,this._patcher=e.patcher,this._host=n,this._tree=r,this._patch=this._patch.bind(this),this._cache={[$]:[n,a]},this._component.options.mode==="closed"&&a.addEventListener(C.patch,s=>s.stopPropagation()),n.addEventListener(C.destroy,()=>{this._patch({type:"tree"})});let o=typeof this._component.data=="function"?this._component.data(this):this._component.data;this._running=(async()=>{let s=await o,i=s?Array.isArray(s)?s:[s]:[];this._stack=[me,{host:n,root:a},k(this._props),...i],H(this._stack,this._patch),this._patch(),i.forEach(m=>{if(typeof m=="object"&&m!==null){for(let c in m)if(typeof m[c]=="function"&&isNaN(c)&&!(c in this._host)){let h=m[c].bind(this);Object.defineProperty(this._host,c,{get(){return h}})}}})})().then()}setProp(e,n){switch(e){case"is":case"class":case"part":case"style":return;default:{let r=this._props[e];if(r!==n){if(e in this._refs){let a=this._refs[e][0];if(oe(n)&&n.record===a.record)return;b(this._props,e,this._refs[e][1]),b(a.record,a.key,this._refs[e][2]),delete this._refs[e]}if(b(r,this._patch),oe(n)){let a=s=>{n.record[n.key]=s},o=s=>{this._props[e]=s};this._refs[e]=[n,a,o],k(this._props,e,a),k(n.record,n.key,o),this._props[e]=n.record[n.key]}else this._props[e]=n;r===void 0&&k(this._props,e,this._patch),H(this._props,this._patch),this._patch()}}}}_unwatch(){for(let e in this._refs){let n=this._refs[e][0];b(this._props,e,this._refs[e][1]),b(n.record,n.key,this._refs[e][2])}b(this._stack,this._patch)}get component(){return this._component}get host(){return this._host}get root(){return this._tree.el}get props(){return this._props}get patch(){return this._patch}get whenRunning(){return()=>this._running}_patch(e){if(e&&(typeof e=="function"?(this._patcher=e,this._template=void 0):(this._patcher=void 0,this._template=typeof e=="string"?B(e):e)),this._stack)if(this._patcher){let n=this._patcher(this._stack);N(this._tree,n)}else this._template?N(this._tree,p(this._template,this._stack,this._cache)):this._tree&&this._component.template&&N(this._tree,p(this._component.template,this._stack,this._cache))}toJSON(){return{component:this._component,props:this._props,tree:this._tree}}};var V="beako-element";function et(t){if(typeof t=="string")return document.createElement(t);{let e=document.createElement(V);return e.setAttribute("component",t),e}}var L=class extends HTMLElement{constructor(){super()}setProp(e,n){this._entity?.setProp(e,n)}static getComponent(){}loadProps(){this.hasAttributes()&&this.getAttributeNames().forEach(e=>{this.setProp(e,this.getAttribute(e))})}whenRunning(){return this._entity?this._entity.whenRunning():new Promise(e=>{this._run=e})}_setEntity(e){this._entity=e,this._run&&this._entity.whenRunning().then(this._run)}get entity(){return this._entity}get attributes(){return tt(super.attributes,this.setProp)}setAttribute(e,n){this.setProp(e,n),super.setAttribute(e,n)}getAttributeNode(e){let n=super.getAttributeNode(e);return n&&Oe(n,this.setProp)}removeAttribute(e){return this.setProp(e,void 0),super.removeAttribute(e)}removeAttributeNode(e){return this.setProp(e.name,void 0),super.removeAttributeNode(e)}toJSON(){return{entity:this._entity}}},Ve=class extends L{constructor(){super()}setProp(e,n){if(e==="component")switch(typeof n){case"string":{let r=customElements.get(n);if(r&&L.isPrototypeOf(r)){let a=r.getComponent();if(a){let o=A(this.attachShadow(a.options));this._setEntity(new x(a,this,o))}}else throw Error(n+" is not a component.");break}case"object":if(E(n)){let r=A(this.attachShadow(n.options));this._setEntity(new x(n,this,r))}else if(n!==null)throw Error("The object is not a component.");break}super.setProp(e,n)}};customElements.define(V,Ve);function Oe(t,e){return new Proxy(t,{set(n,r,a){if(e(r,a),r==="value")return n.value=a}})}function tt(t,e){return new Proxy(t,{get:function(n,r){return r==="length"?n[r]:Oe(n[r],e)}})}var Se={match(t,e,n){if(t.type==="custom"){if(t.tag===V||t.tag==="element")return!0;let r=t,a=T(e,r.tag)[0];if(typeof a=="object"&&a!==null&&(E(a)||"default"in a&&a[Symbol.toStringTag]==="Module"&&E(a.default)))return!0;{let o=customElements.get(r.tag);return o!==void 0&&Object.prototype.isPrototypeOf.call(L,o)}}return!1},exec(t,e,n){let r=t,a={tag:V},o;r.tag!==V&&r.tag!=="element"&&(o=T(e,r.tag)[0],o?(a.props??(a.props={})).component=o:a.tag=r.tag);let s=[],i=[],m=(r.children||[])?.flatMap(c=>{if(typeof c!="string"){let h=c;if(h.props){if(h.props["@as"])return i.push([h.props["@as"],h]),[];if(h.props.slot)return[p(c,e,n)]}}return s.push(c),[]});return s.length&&i.push(["content",{type:"group",children:s}]),i.length&&(a.props||(a.props={}),i.forEach(([c,h])=>{a.props[c]={type:"evaluation",template:h,stack:e}})),m.length&&(a.children=m),M(r,e,n,a),(r.tag===V||r.tag==="element")&&(o=a.props?.component,(a.props??(a.props={})).component=o),typeof o=="object"&&o!==null&&"default"in o&&o[Symbol.toStringTag]==="Module"&&E(o.default)&&(o=o.default,(a.props??(a.props={})).component=o),r.cache!==o&&(a.new=!0),r.cache=o,a}},Fe={match(t,e,n){if(t.type==="custom"&&$ in n&&!F(t.tag)){let r=T(e,t.tag)[0];return n[$].some(a=>a===r)}return!1},exec(t,e,n){let a={el:T(e,t.tag)[0]||ShadowRoot,invalid:{props:!0,children:!0}};return M(t,e,n,a),a}};p.plugin(Se);p.plugin(Fe);function G(t,e=[]){let n={data:typeof e=="function"||Array.isArray(e)?e:[e],options:{mode:"open"}};return typeof t=="function"?n.patcher=t:n.template=typeof t=="string"?B(t):t,I(n)}function nt(t,e,n=[]){let r=E(e)?e:G(e,n);if(r.options.localeOnly)throw Error("This componet is local only.");customElements.define(t,class extends L{constructor(){super();let a=A(this.attachShadow(r.options));this._setEntity(new x(r,this,a)),this.innerHTML?(this.entity.setProp("content",this.innerHTML),this.hasAttributes()&&this.getAttributeNames().forEach(o=>{this.entity.setProp(o,this.getAttribute(o))})):this.loadProps()}static getComponent(){return r}})}function rt(t,e,n=[]){let r=typeof t=="string"?document.querySelector(t):t,a=E(e)?e:G(e,n);if(a.options.localeOnly)throw Error("This componet is local only.");let o=A(r.attachShadow(a.options)),s=new x(a,r,o);r.innerHTML&&s.setProp("content",r.innerHTML),r.hasAttributes()&&r.getAttributeNames().forEach(i=>{s.setProp(i,r.getAttribute(i))})}function at(t,e={}){return t.options=Object.freeze({mode:"closed",...e}),Object.freeze(t)}export{L as ComponentElement,x as Entity,U as Loop,me as builtin,G as compact,nt as define,_ as destroy,et as elementize,p as evaluate,C as eventTypes,d as expression,A as load,I as lock,rt as mount,B as parse,N as patch,T as pickup,H as reach,Ie as receive,at as seal,Ne as unlock,b as unwatch,k as watch};
