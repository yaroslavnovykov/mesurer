(()=>{var Ct,L,zn,pr,Te,Nn,On,Fn,en,Et,et,Un,rn,tn,nn,mr,St={},Tt=[],hr=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,At=Array.isArray;function we(e,t){for(var n in t)e[n]=t[n];return e}function ln(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function d(e,t,n){var o,r,i,s={};for(i in t)i=="key"?o=t[i]:i=="ref"?r=t[i]:s[i]=t[i];if(arguments.length>2&&(s.children=arguments.length>3?Ct.call(arguments,2):n),typeof e=="function"&&e.defaultProps!=null)for(i in e.defaultProps)s[i]===void 0&&(s[i]=e.defaultProps[i]);return kt(e,s,o,r,null)}function kt(e,t,n,o,r){var i={type:e,props:t,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:r??++zn,__i:-1,__u:0};return r==null&&L.vnode!=null&&L.vnode(i),i}function I(e){return e.children}function Rt(e,t){this.props=e,this.context=t}function Ue(e,t){if(t==null)return e.__?Ue(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type=="function"?Ue(e):null}function _r(e){if(e.__P&&e.__d){var t=e.__v,n=t.__e,o=[],r=[],i=we({},t);i.__v=t.__v+1,L.vnode&&L.vnode(i),sn(e.__P,i,t,e.__n,e.__P.namespaceURI,32&t.__u?[n]:null,o,n??Ue(t),!!(32&t.__u),r),i.__v=t.__v,i.__.__k[i.__i]=i,Xn(o,i,r),t.__e=t.__=null,i.__e!=n&&Bn(i)}}function Bn(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(t){if(t!=null&&t.__e!=null)return e.__e=e.__c.base=t.__e}),Bn(e)}function Hn(e){(!e.__d&&(e.__d=!0)&&Te.push(e)&&!It.__r++||Nn!=L.debounceRendering)&&((Nn=L.debounceRendering)||On)(It)}function It(){try{for(var e,t=1;Te.length;)Te.length>t&&Te.sort(Fn),e=Te.shift(),t=Te.length,_r(e)}finally{Te.length=It.__r=0}}function Vn(e,t,n,o,r,i,s,c,f,u,m){var l,g,x,w,A,S,E,M=o&&o.__k||Tt,T=t.length;for(f=gr(n,t,M,f,T),l=0;l<T;l++)(x=n.__k[l])!=null&&(g=x.__i!=-1&&M[x.__i]||St,x.__i=l,S=sn(e,x,g,r,i,s,c,f,u,m),w=x.__e,x.ref&&g.ref!=x.ref&&(g.ref&&cn(g.ref,null,x),m.push(x.ref,x.__c||w,x)),A==null&&w!=null&&(A=w),(E=!!(4&x.__u))||g.__k===x.__k?(f=Wn(x,f,e,E),E&&g.__e&&(g.__e=null)):typeof x.type=="function"&&S!==void 0?f=S:w&&(f=w.nextSibling),x.__u&=-7);return n.__e=A,f}function gr(e,t,n,o,r){var i,s,c,f,u,m=n.length,l=m,g=0;for(e.__k=new Array(r),i=0;i<r;i++)(s=t[i])!=null&&typeof s!="boolean"&&typeof s!="function"?(typeof s=="string"||typeof s=="number"||typeof s=="bigint"||s.constructor==String?s=e.__k[i]=kt(null,s,null,null,null):At(s)?s=e.__k[i]=kt(I,{children:s},null,null,null):s.constructor===void 0&&s.__b>0?s=e.__k[i]=kt(s.type,s.props,s.key,s.ref?s.ref:null,s.__v):e.__k[i]=s,f=i+g,s.__=e,s.__b=e.__b+1,c=null,(u=s.__i=yr(s,n,f,l))!=-1&&(l--,(c=n[u])&&(c.__u|=2)),c==null||c.__v==null?(u==-1&&(r>m?g--:r<m&&g++),typeof s.type!="function"&&(s.__u|=4)):u!=f&&(u==f-1?g--:u==f+1?g++:(u>f?g--:g++,s.__u|=4))):e.__k[i]=null;if(l)for(i=0;i<m;i++)(c=n[i])!=null&&(2&c.__u)==0&&(c.__e==o&&(o=Ue(c)),Kn(c,c));return o}function Wn(e,t,n,o){var r,i;if(typeof e.type=="function"){for(r=e.__k,i=0;r&&i<r.length;i++)r[i]&&(r[i].__=e,t=Wn(r[i],t,n,o));return t}e.__e!=t&&(o&&(t&&e.type&&!t.parentNode&&(t=Ue(e)),n.insertBefore(e.__e,t||null)),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function yr(e,t,n,o){var r,i,s,c=e.key,f=e.type,u=t[n],m=u!=null&&(2&u.__u)==0;if(u===null&&c==null||m&&c==u.key&&f==u.type)return n;if(o>(m?1:0)){for(r=n-1,i=n+1;r>=0||i<t.length;)if((u=t[s=r>=0?r--:i++])!=null&&(2&u.__u)==0&&c==u.key&&f==u.type)return s}return-1}function Ln(e,t,n){t[0]=="-"?e.setProperty(t,n??""):e[t]=n==null?"":typeof n!="number"||hr.test(t)?n:n+"px"}function Mt(e,t,n,o,r){var i,s;e:if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof o=="string"&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||Ln(e.style,t,"");if(n)for(t in n)o&&n[t]==o[t]||Ln(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")i=t!=(t=t.replace(Un,"$1")),s=t.toLowerCase(),t=s in e||t=="onFocusOut"||t=="onFocusIn"?s.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?o?n[et]=o[et]:(n[et]=rn,e.addEventListener(t,i?nn:tn,i)):e.removeEventListener(t,i?nn:tn,i);else{if(r=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n))}}function $n(e){return function(t){if(this.l){var n=this.l[t.type+e];if(t[Et]==null)t[Et]=rn++;else if(t[Et]<n[et])return;return n(L.event?L.event(t):t)}}}function sn(e,t,n,o,r,i,s,c,f,u){var m,l,g,x,w,A,S,E,M,T,$,y,H,N,j,O=t.type;if(t.constructor!==void 0)return null;128&n.__u&&(f=!!(32&n.__u),i=[c=t.__e=n.__e]),(m=L.__b)&&m(t);e:if(typeof O=="function")try{if(E=t.props,M=O.prototype&&O.prototype.render,T=(m=O.contextType)&&o[m.__c],$=m?T?T.props.value:m.__:o,n.__c?S=(l=t.__c=n.__c).__=l.__E:(M?t.__c=l=new O(E,$):(t.__c=l=new Rt(E,$),l.constructor=O,l.render=br),T&&T.sub(l),l.state||(l.state={}),l.__n=o,g=l.__d=!0,l.__h=[],l._sb=[]),M&&l.__s==null&&(l.__s=l.state),M&&O.getDerivedStateFromProps!=null&&(l.__s==l.state&&(l.__s=we({},l.__s)),we(l.__s,O.getDerivedStateFromProps(E,l.__s))),x=l.props,w=l.state,l.__v=t,g)M&&O.getDerivedStateFromProps==null&&l.componentWillMount!=null&&l.componentWillMount(),M&&l.componentDidMount!=null&&l.__h.push(l.componentDidMount);else{if(M&&O.getDerivedStateFromProps==null&&E!==x&&l.componentWillReceiveProps!=null&&l.componentWillReceiveProps(E,$),t.__v==n.__v||!l.__e&&l.shouldComponentUpdate!=null&&l.shouldComponentUpdate(E,l.__s,$)===!1){t.__v!=n.__v&&(l.props=E,l.state=l.__s,l.__d=!1),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(K){K&&(K.__=t)}),Tt.push.apply(l.__h,l._sb),l._sb=[],l.__h.length&&s.push(l);break e}l.componentWillUpdate!=null&&l.componentWillUpdate(E,l.__s,$),M&&l.componentDidUpdate!=null&&l.__h.push(function(){l.componentDidUpdate(x,w,A)})}if(l.context=$,l.props=E,l.__P=e,l.__e=!1,y=L.__r,H=0,M)l.state=l.__s,l.__d=!1,y&&y(t),m=l.render(l.props,l.state,l.context),Tt.push.apply(l.__h,l._sb),l._sb=[];else do l.__d=!1,y&&y(t),m=l.render(l.props,l.state,l.context),l.state=l.__s;while(l.__d&&++H<25);l.state=l.__s,l.getChildContext!=null&&(o=we(we({},o),l.getChildContext())),M&&!g&&l.getSnapshotBeforeUpdate!=null&&(A=l.getSnapshotBeforeUpdate(x,w)),N=m!=null&&m.type===I&&m.key==null?Yn(m.props.children):m,c=Vn(e,At(N)?N:[N],t,n,o,r,i,s,c,f,u),l.base=t.__e,t.__u&=-161,l.__h.length&&s.push(l),S&&(l.__E=l.__=null)}catch(K){if(t.__v=null,f||i!=null)if(K.then){for(t.__u|=f?160:128;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;i[i.indexOf(c)]=null,t.__e=c}else{for(j=i.length;j--;)ln(i[j]);on(t)}else t.__e=n.__e,t.__k=n.__k,K.then||on(t);L.__e(K,t,n)}else i==null&&t.__v==n.__v?(t.__k=n.__k,t.__e=n.__e):c=t.__e=xr(n.__e,t,n,o,r,i,s,f,u);return(m=L.diffed)&&m(t),128&t.__u?void 0:c}function on(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(on))}function Xn(e,t,n){for(var o=0;o<n.length;o++)cn(n[o],n[++o],n[++o]);L.__c&&L.__c(t,e),e.some(function(r){try{e=r.__h,r.__h=[],e.some(function(i){i.call(r)})}catch(i){L.__e(i,r.__v)}})}function Yn(e){return typeof e!="object"||e==null||e.__b>0?e:At(e)?e.map(Yn):we({},e)}function xr(e,t,n,o,r,i,s,c,f){var u,m,l,g,x,w,A,S=n.props||St,E=t.props,M=t.type;if(M=="svg"?r="http://www.w3.org/2000/svg":M=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),i!=null){for(u=0;u<i.length;u++)if((x=i[u])&&"setAttribute"in x==!!M&&(M?x.localName==M:x.nodeType==3)){e=x,i[u]=null;break}}if(e==null){if(M==null)return document.createTextNode(E);e=document.createElementNS(r,M,E.is&&E),c&&(L.__m&&L.__m(t,i),c=!1),i=null}if(M==null)S===E||c&&e.data==E||(e.data=E);else{if(i=i&&Ct.call(e.childNodes),!c&&i!=null)for(S={},u=0;u<e.attributes.length;u++)S[(x=e.attributes[u]).name]=x.value;for(u in S)x=S[u],u=="dangerouslySetInnerHTML"?l=x:u=="children"||u in E||u=="value"&&"defaultValue"in E||u=="checked"&&"defaultChecked"in E||Mt(e,u,null,x,r);for(u in E)x=E[u],u=="children"?g=x:u=="dangerouslySetInnerHTML"?m=x:u=="value"?w=x:u=="checked"?A=x:c&&typeof x!="function"||S[u]===x||Mt(e,u,x,S[u],r);if(m)c||l&&(m.__html==l.__html||m.__html==e.innerHTML)||(e.innerHTML=m.__html),t.__k=[];else if(l&&(e.innerHTML=""),Vn(t.type=="template"?e.content:e,At(g)?g:[g],t,n,o,M=="foreignObject"?"http://www.w3.org/1999/xhtml":r,i,s,i?i[0]:n.__k&&Ue(n,0),c,f),i!=null)for(u=i.length;u--;)ln(i[u]);c||(u="value",M=="progress"&&w==null?e.removeAttribute("value"):w!=null&&(w!==e[u]||M=="progress"&&!w||M=="option"&&w!=S[u])&&Mt(e,u,w,S[u],r),u="checked",A!=null&&A!=e[u]&&Mt(e,u,A,S[u],r))}return e}function cn(e,t,n){try{if(typeof e=="function"){var o=typeof e.__u=="function";o&&e.__u(),o&&t==null||(e.__u=e(t))}else e.current=t}catch(r){L.__e(r,n)}}function Kn(e,t,n){var o,r;if(L.unmount&&L.unmount(e),(o=e.ref)&&(o.current&&o.current!=e.__e||cn(o,null,t)),(o=e.__c)!=null){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(i){L.__e(i,t)}o.base=o.__P=null}if(o=e.__k)for(r=0;r<o.length;r++)o[r]&&Kn(o[r],t,n||typeof e.type!="function");n||ln(e.__e),e.__c=e.__=e.__e=void 0}function br(e,t,n){return this.constructor(e,n)}function qn(e,t,n){var o,r,i,s;t==document&&(t=document.documentElement),L.__&&L.__(e,t),r=(o=typeof n=="function")?null:n&&n.__k||t.__k,i=[],s=[],sn(t,e=(!o&&n||t).__k=d(I,null,[e]),r||St,St,t.namespaceURI,!o&&n?[n]:r?null:t.firstChild?Ct.call(t.childNodes):null,i,!o&&n?n:r?r.__e:t.firstChild,o,s),Xn(i,e,s)}Ct=Tt.slice,L={__e:function(e,t,n,o){for(var r,i,s;t=t.__;)if((r=t.__c)&&!r.__)try{if((i=r.constructor)&&i.getDerivedStateFromError!=null&&(r.setState(i.getDerivedStateFromError(e)),s=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(e,o||{}),s=r.__d),s)return r.__E=r}catch(c){e=c}throw e}},zn=0,pr=function(e){return e!=null&&e.constructor===void 0},Rt.prototype.setState=function(e,t){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=we({},this.state),typeof e=="function"&&(e=e(we({},n),this.props)),e&&we(n,e),e!=null&&this.__v&&(t&&this._sb.push(t),Hn(this))},Rt.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Hn(this))},Rt.prototype.render=I,Te=[],On=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Fn=function(e,t){return e.__v.__b-t.__v.__b},It.__r=0,en=Math.random().toString(8),Et="__d"+en,et="__a"+en,Un=/(PointerCapture)$|Capture$/i,rn=0,tn=$n(!1),nn=$n(!0),mr=0;var Be,U,an,jn,tt=0,ro=[],V=L,Zn=V.__b,Jn=V.__r,Qn=V.diffed,eo=V.__c,to=V.unmount,no=V.__;function Pt(e,t){V.__h&&V.__h(U,e,tt||t),tt=0;var n=U.__H||(U.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function C(e){return tt=1,vr(lo,e)}function vr(e,t,n){var o=Pt(Be++,2);if(o.t=e,!o.__c&&(o.__=[n?n(t):lo(void 0,t),function(c){var f=o.__N?o.__N[0]:o.__[0],u=o.t(f,c);f!==u&&(o.__N=[u,o.__[1]],o.__c.setState({}))}],o.__c=U,!U.__f)){var r=function(c,f,u){if(!o.__c.__H)return!0;var m=o.__c.__H.__.filter(function(g){return g.__c});if(m.every(function(g){return!g.__N}))return!i||i.call(this,c,f,u);var l=o.__c.props!==c;return m.some(function(g){if(g.__N){var x=g.__[0];g.__=g.__N,g.__N=void 0,x!==g.__[0]&&(l=!0)}}),i&&i.call(this,c,f,u)||l};U.__f=!0;var i=U.shouldComponentUpdate,s=U.componentWillUpdate;U.componentWillUpdate=function(c,f,u){if(this.__e){var m=i;i=void 0,r(c,f,u),i=m}s&&s.call(this,c,f,u)},U.shouldComponentUpdate=r}return o.__N||o.__}function W(e,t){var n=Pt(Be++,3);!V.__s&&dn(n.__H,t)&&(n.__=e,n.u=t,U.__H.__h.push(n))}function io(e,t){var n=Pt(Be++,4);!V.__s&&dn(n.__H,t)&&(n.__=e,n.u=t,U.__h.push(n))}function G(e){return tt=5,J(function(){return{current:e}},[])}function J(e,t){var n=Pt(Be++,7);return dn(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function R(e,t){return tt=8,J(function(){return e},t)}function wr(){for(var e;e=ro.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(Dt),t.__h.some(un),t.__h=[]}catch(n){t.__h=[],V.__e(n,e.__v)}}}V.__b=function(e){U=null,Zn&&Zn(e)},V.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),no&&no(e,t)},V.__r=function(e){Jn&&Jn(e),Be=0;var t=(U=e.__c).__H;t&&(an===U?(t.__h=[],U.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(t.__h.some(Dt),t.__h.some(un),t.__h=[],Be=0)),an=U},V.diffed=function(e){Qn&&Qn(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(ro.push(t)!==1&&jn===V.requestAnimationFrame||((jn=V.requestAnimationFrame)||Mr)(wr)),t.__H.__.some(function(n){n.u&&(n.__H=n.u),n.u=void 0})),an=U=null},V.__c=function(e,t){t.some(function(n){try{n.__h.some(Dt),n.__h=n.__h.filter(function(o){return!o.__||un(o)})}catch(o){t.some(function(r){r.__h&&(r.__h=[])}),t=[],V.__e(o,n.__v)}}),eo&&eo(e,t)},V.unmount=function(e){to&&to(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.some(function(o){try{Dt(o)}catch(r){t=r}}),n.__H=void 0,t&&V.__e(t,n.__v))};var oo=typeof requestAnimationFrame=="function";function Mr(e){var t,n=function(){clearTimeout(o),oo&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,35);oo&&(t=requestAnimationFrame(n))}function Dt(e){var t=U,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),U=t}function un(e){var t=U;e.__c=e.__(),U=t}function dn(e,t){return!e||e.length!==t.length||t.some(function(n,o){return n!==e[o]})}function lo(e,t){return typeof t=="function"?t(e):t}var de=()=>({width:typeof window>"u"?1:window.innerWidth||1,height:typeof window>"u"?1:window.innerHeight||1}),ge=(e,t=de())=>({left:e.left/t.width,top:e.top/t.height,width:e.width/t.width,height:e.height/t.height}),nt=(e,t=de())=>({left:e.left*t.width,top:e.top*t.height,width:e.width*t.width,height:e.height*t.height}),so=(e,t)=>{let n=Math.min(e.x,t.x),o=Math.min(e.y,t.y),r=Math.abs(e.x-t.x),i=Math.abs(e.y-t.y);return{left:n,top:o,width:r,height:i}},ot=(e,t,n)=>Math.max(t,Math.min(n,e)),co=(e,t)=>e.left<t.left+t.width&&e.left+e.width>t.left&&e.top<t.top+t.height&&e.top+e.height>t.top,Me=e=>e.width*e.height,fn=(e,t)=>{let n=Math.max(e.left,t.left),o=Math.max(e.top,t.top),r=Math.min(e.left+e.width,t.left+t.width),i=Math.min(e.top+e.height,t.top+t.height),s=Math.max(0,r-n),c=Math.max(0,i-o);return s*c},Ie=(e,t,n=.25)=>Math.abs(e.left-t.left)<n&&Math.abs(e.top-t.top)<n&&Math.abs(e.width-t.width)<n&&Math.abs(e.height-t.height)<n,ao=(e,t)=>{let n=t.left+t.width,o=t.top+t.height,r=e.x<t.left?t.left-e.x:e.x>n?e.x-n:0,i=e.y<t.top?t.top-e.y:e.y>o?e.y-o:0;return Math.hypot(r,i)};var me=e=>Math.round(e);var Ge=()=>typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`${Date.now()}-${Math.random()}`;var Ve=(e,t,n,o)=>{let r=de(),i=ge(e,r),s=ge(t,r),c=e.left+e.width,f=e.top+e.height,u=t.left+t.width,m=t.top+t.height,l=e.left+e.width/2,g=e.top+e.height/2,x=null,w=null,A=[],S=c<=t.left||u<=e.left,E=f<=t.top||m<=e.top;if(S){let T=c<=t.left,$=T?c:u,y=T?t.left:e.left,H=g;x={x1:$,x2:y,y:H,value:Math.abs(y-$)};let N=T?t.left:u;H<t.top?A.push({x1:N,y1:H,x2:N,y2:t.top}):H>m&&A.push({x1:N,y1:H,x2:N,y2:m})}if(E){let T=f<=t.top,$=T?f:m,y=T?t.top:e.top,H=l;w={y1:$,y2:y,x:H,value:Math.abs(y-$)};let N=T?t.top:m;H<t.left?A.push({x1:H,y1:N,x2:t.left,y2:N}):H>u&&A.push({x1:H,y1:N,x2:u,y2:N})}let M=A.map(T=>({x1:ot(T.x1,0,window.innerWidth),y1:ot(T.y1,0,window.innerHeight),x2:ot(T.x2,0,window.innerWidth),y2:ot(T.y2,0,window.innerHeight)})).filter(T=>Math.abs(T.x1-T.x2)>.5||Math.abs(T.y1-T.y2)>.5);return{id:Ge(),rectA:e,rectB:t,normalizedRectA:i,normalizedRectB:s,elementRefA:n||null,elementRefB:o||null,horizontal:x,vertical:w,connectors:M}},uo=(e,t=de())=>{let n=e.normalizedRectA??ge(e.rectA),o=e.normalizedRectB??ge(e.rectB),r=e.rectA,i=e.rectB;return e.elementRefA&&document.contains(e.elementRefA)?r=e.elementRefA.getBoundingClientRect():r=nt(n,t),e.elementRefB&&document.contains(e.elementRefB)?i=e.elementRefB.getBoundingClientRect():i=nt(o,t),{...Ve(r,i,e.elementRefA,e.elementRefB),id:e.id}};var Er=e=>{let t=e.tagName.toLowerCase(),n=e.id?`#${e.id}`:"",o=e.className?`.${e.className.toString().split(" ")[0]}`:"";return`${t}${n}${o}`},Ce=e=>Number.parseFloat(e)||0,ce=e=>{let t=e.getBoundingClientRect();return{left:t.left,top:t.top,width:t.width,height:t.height}},fo=-1,pn=new Map,Nt=e=>{let t=rt();t!==fo&&(fo=t,pn.clear());let n=pn.get(e);if(n)return n;let o=ce(e);return pn.set(e,o),o},Gt=[],po=-1,rt=()=>typeof performance>"u"?0:Math.floor(performance.now()/16),Ht=()=>{let e=rt();return e===po&&Gt.length>0||(po=e,Gt=Array.from(document.querySelectorAll("body *")).filter(t=>t instanceof HTMLElement)),Gt},We=e=>{let t=e.getBoundingClientRect(),n=window.getComputedStyle(e),o={top:Ce(n.paddingTop),right:Ce(n.paddingRight),bottom:Ce(n.paddingBottom),left:Ce(n.paddingLeft)},r={top:Ce(n.marginTop),right:Ce(n.marginRight),bottom:Ce(n.marginBottom),left:Ce(n.marginLeft)},i={left:t.left+o.left,top:t.top+o.top,width:Math.max(0,t.width-o.left-o.right),height:Math.max(0,t.height-o.top-o.bottom)},s={left:t.left-r.left,top:t.top-r.top,width:t.width+r.left+r.right,height:t.height+r.top+r.bottom};return{id:Ge(),rect:{left:t.left,top:t.top,width:t.width,height:t.height},paddingRect:i,marginRect:s,padding:o,margin:r,label:Er(e),elementRef:e}},mn=(e,t=de())=>{let n=e.rect;return e.elementRef&&document.contains(e.elementRef)?n=ce(e.elementRef):e.normalizedRect&&(n=nt(e.normalizedRect,t)),{...e,rect:n,normalizedRect:ge(n,t),originRect:void 0}};var mo=(e,t,n,o)=>Math.min(t,o)-Math.max(e,n)>0,hn=(e,t=1)=>{let n=e.map(()=>({top:!0,right:!0,bottom:!0,left:!0}));for(let o=0;o<e.length;o+=1){let r=e[o],i=r.left+r.width,s=r.top+r.height;for(let c=o+1;c<e.length;c+=1){let f=e[c],u=f.left+f.width,m=f.top+f.height,l=mo(r.left,i,f.left,u),g=mo(r.top,s,f.top,m);Math.abs(i-f.left)<=t&&g&&(n[o].right=!1,n[c].left=!1),Math.abs(r.left-u)<=t&&g&&(n[o].left=!1,n[c].right=!1),Math.abs(s-f.top)<=t&&l&&(n[o].bottom=!1,n[c].top=!1),Math.abs(r.top-m)<=t&&l&&(n[o].top=!1,n[c].bottom=!1)}}return n};var Xe=e=>{let t=de();return e.orientation==="vertical"?{left:e.position,top:0,width:1,height:t.height}:{left:0,top:e.position,width:t.width,height:1}},ho=(e,t)=>e.orientation==="vertical"?Math.abs(e.position-t.x):Math.abs(e.position-t.y),Lt=e=>{let{orientation:t,point:n,snapGuidesEnabled:o,overlayNode:r,guides:i}=e;if(!o)return t==="vertical"?n.x:n.y;let s=Ht(),c=t==="vertical"?n.x:n.y,f=11;for(let u of s){if(!(u instanceof HTMLElement)||r&&r.contains(u)||u===document.body||u===document.documentElement)continue;let m=Nt(u);if(m.width<=2||m.height<=2)continue;if(t==="vertical"){if(n.x<m.left-10||n.x>m.left+m.width+10)continue}else if(n.y<m.top-10||n.y>m.top+m.height+10)continue;(t==="vertical"?[m.left,m.left+m.width,m.left+m.width/2]:[m.top,m.top+m.height,m.top+m.height/2]).forEach(g=>{let x=Math.abs(t==="vertical"?g-n.x:g-n.y);x>10||x<f&&(c=g,f=x)})}return i.forEach(u=>{if(u.id===e.draggingGuideId)return;let m=u.position,l=Math.abs(t==="vertical"?m-n.x:m-n.y);l>10||l<f&&(c=m,f=l)}),f<=10?c:t==="vertical"?n.x:n.y};var _o=(e,t)=>{if(!e||t.length===0)return null;let n=null,o=11;for(let r of t){let i=ho(r,e);i>10||i<o&&(n=r,o=i)}return n},go=(e,t)=>{if(t.length===0)return null;let n=t[t.length-1];return e.find(o=>o.id===n)??null},yo=e=>{if(!e.altPressed||!e.primarySelectedMeasurement)return null;let t=e.selectedGuide?null:e.primarySelectedMeasurement.elementRef??e.selectedElementRef??null,n=e.selectedGuide?{rect:Xe(e.selectedGuide),guideId:e.selectedGuide.id}:t?{rect:e.primarySelectedMeasurement.rect,element:t}:null,o=e.hoverGuide?{rect:Xe(e.hoverGuide),guideId:e.hoverGuide.id}:e.hoverElement?{rect:ce(e.hoverElement),element:e.hoverElement}:null;return!n||!o||n.element&&o.element&&(n.element===o.element||n.element.contains(o.element)||o.element.contains(n.element))||n.guideId&&o.guideId&&n.guideId===o.guideId?null:Ve(n.rect,o.rect,n.element??null,o.element??null)},xo=e=>{if(!e.altPressed||!e.primarySelectedMeasurement||e.optionPairOverlay||e.selectedGuideIds.length>0)return null;let t=e.selectedElement?.parentElement??null;e.selectedElement&&e.hoverElement&&e.hoverElement!==e.selectedElement&&e.hoverElement.contains(e.selectedElement)&&(t=e.hoverElement);let n=t&&t!==document.body&&t!==document.documentElement?ce(t):{left:0,top:0,width:window.innerWidth,height:window.innerHeight},o=e.primarySelectedMeasurement.rect,r=o.left+o.width,i=o.top+o.height,s=o.left+o.width/2,c=o.top+o.height/2,f=n.left+n.width,u=n.top+n.height,m=Math.max(n.left,Math.min(s,f)),l=Math.max(n.top,Math.min(c,u));return{top:{y1:n.top,y2:o.top,x:m,value:Math.max(0,o.top-n.top)},bottom:{y1:i,y2:u,x:m,value:Math.max(0,u-i)},left:{x1:n.left,x2:o.left,y:l,value:Math.max(0,o.left-n.left)},right:{x1:r,x2:f,y:l,value:Math.max(0,f-r)}}};var bo=(e,t)=>{let n=t.map(({element:r,rect:i})=>{let s=fn(e,i),c=Math.max(1,Me(i));return{element:r,rect:i,overlapArea:s,elementCoverage:s/c}}).filter(({overlapArea:r,elementCoverage:i})=>r<=0?!1:i>=.45),o=n.filter((r,i)=>!n.some((s,c)=>{if(i===c)return!1;let f=Me(r.rect),u=Me(s.rect);return f>u*1.6&&r.rect.left<=s.rect.left&&r.rect.top<=s.rect.top&&r.rect.left+r.rect.width>=s.rect.left+s.rect.width&&r.rect.top+r.rect.height>=s.rect.top+s.rect.height&&r.elementCoverage<.92}));return(o.length>0?o:n).sort((r,i)=>Me(r.rect)-Me(i.rect)).map(({element:r})=>r)},vo=(e,t,n)=>{let o=Math.max(1,Me(e)),r=n.map(({element:i,rect:s})=>{let c=fn(e,s),f=Math.max(1,Me(s)),u=c/f,m=f/o,l=1-Math.min(1,Math.abs(Math.log(m))/2),g=t.x>=s.left&&t.x<=s.left+s.width&&t.y>=s.top&&t.y<=s.top+s.height,x=f>o*4&&u<.9?.25:0,w=u*.55+l*.35+(g?.2:0)-x;return{element:i,rect:s,coverage:u,score:w}}).filter(({rect:i,coverage:s})=>i.width<8||i.height<8?!1:s>=.15);return r.length===0?null:(r.sort((i,s)=>s.score-i.score),r[0].element)},wo=(e,t)=>{let n=t.filter(({rect:o})=>o.width>=8&&o.height>=8).map(({element:o,rect:r})=>{let i=Math.max(1,Me(r)),s=e.x>=r.left&&e.x<=r.left+r.width&&e.y>=r.top&&e.y<=r.top+r.height,f=1/(1+ao(e,r)),u=1/(1+Math.log(i)),m=(s?2:0)+f*.9+u*.35;return{element:o,score:m}});return n.length===0?null:(n.sort((o,r)=>r.score-o.score),n[0].element)};var Ye=(e,t)=>{let n=t?.getRootNode?.()?.host;if(t){let r=t.style.pointerEvents;t.style.pointerEvents="none";let i,s;n&&(i=n.style.pointerEvents,s=n.style.visibility,n.style.pointerEvents="none",n.style.visibility="hidden");let c=document.elementsFromPoint(e.x,e.y);t.style.pointerEvents=r,n&&(n.style.pointerEvents=i,n.style.visibility=s);for(let f of c){if(!(f instanceof HTMLElement)||t.contains(f)||n&&(f===n||n.contains(f))||f===document.body||f===document.documentElement)continue;let u=f.getBoundingClientRect();if(!(u.width<=2||u.height<=2))return f}return null}let o=document.elementsFromPoint(e.x,e.y);for(let r of o){if(!(r instanceof HTMLElement)||r===document.body||r===document.documentElement)continue;let i=r.getBoundingClientRect();if(!(i.width<=2||i.height<=2))return r}return null};var _n=(e,t,n)=>{if(!n)return Ye(e,t);let o={left:e.x-20,top:e.y-20,width:40,height:40},r=To(o,t);return wo(e,r)??vo(o,e,r)??Ye(e,t)};var Eo=-1,ko="",Ro=[],So=null,To=(e,t)=>{let n=rt(),o=`${Math.round(e.left)}:${Math.round(e.top)}:${Math.round(e.width)}:${Math.round(e.height)}`;if(n===Eo&&ko===o&&So===t)return Ro;let r=t?.getRootNode?.()?.host,i=e.left-1,s=e.top-1,c=e.left+e.width+1,f=e.top+e.height+1,m=Ht().map(l=>({element:l,rect:Nt(l)})).filter(({element:l,rect:g})=>t&&t.contains(l)||r&&(l===r||r.contains(l))||l===document.body||l===document.documentElement||g.width<8||g.height<8||g.left>c||g.top>f||g.left+g.width<i||g.top+g.height<s?!1:co(e,g));return Eo=n,ko=o,So=t,Ro=m,m},Ir=e=>`${Math.round(e.left)}:${Math.round(e.top)}:${Math.round(e.width)}:${Math.round(e.height)}`,Cr=(e,t,n)=>{let o=rt(),r=Ir(e);if(n.key===r&&n.overlayNode===t&&n.frame===o)return n.entries;let i=To(e,t);return n.key=r,n.overlayNode=t,n.frame=o,n.entries=i,i},Io=(e,t,n)=>{let o=Cr(e,t,n);return o.length===0?[]:bo(e,o)};var Co=(e,t)=>e.length>0?e[e.length-1]:t,gn=e=>{let t=e.selectedMeasurements.map(o=>{let r=o.elementRef;if(!r||!document.contains(r))return null;let i=ce(r);return{measurement:o,element:r,rect:i,area:i.width*i.height}}).filter(o=>o!==null).sort((o,r)=>o.area-r.area);if(t.length===0)return null;let n=document.elementsFromPoint(e.point.x,e.point.y);for(let o of n)if(o instanceof HTMLElement&&!(e.overlayNode&&e.overlayNode.contains(o))){for(let r of t)if(r.element===o||r.element.contains(o))return r.measurement}for(let o of t){let{rect:r}=o;if(e.point.x>=r.left&&e.point.x<=r.left+r.width&&e.point.y>=r.top&&e.point.y<=r.top+r.height)return o.measurement}return null};function ae({children:e,className:t="",style:n}){return d("div",{class:`measure-tag ${t}`,style:n},e)}var Ao=e=>Math.round(e);function Do({measurement:e,transitionMs:t,labelOffset:n,edgeVisibility:o}){let[r,i]=C(e.originRect??e.rect);W(()=>{if(!e.originRect)return;let m=requestAnimationFrame(()=>{i(e.rect)});return()=>cancelAnimationFrame(m)},[e]);let s=o??{top:!0,right:!0,bottom:!0,left:!0},c=e.originRect?r:e.rect,f="color-mix(in oklch, oklch(0.62 0.18 255) 80%, transparent)";return d("div",{class:"pe-none"},d("div",{class:"abs",style:{left:c.left+"px",top:c.top+"px",width:c.width+"px",height:c.height+"px",backgroundColor:"color-mix(in oklch, oklch(0.62 0.18 255) 8%, transparent)",transition:e.originRect?`left ${t}ms ease, top ${t}ms ease, width ${t}ms ease, height ${t}ms ease`:void 0}},s.top?d("div",{class:"edge-top",style:{backgroundColor:f}}):null,s.right?d("div",{class:"edge-right",style:{backgroundColor:f}}):null,s.bottom?d("div",{class:"edge-bottom",style:{backgroundColor:f}}):null,s.left?d("div",{class:"edge-left",style:{backgroundColor:f}}):null),d(ae,{className:"bg-dark translate-x-center",style:{left:c.left+c.width/2+"px",top:c.top+c.height+n+"px",transition:e.originRect?`left ${t}ms ease, top ${t}ms ease`:void 0}},Ao(c.width)," x ",Ao(c.height)))}var Po=e=>Math.round(e);function Go({measurement:e,transitionMs:t,labelOffset:n,edgeVisibility:o}){let[r,i]=C(e.originRect??e.rect);W(()=>{if(!e.originRect)return;let m=requestAnimationFrame(()=>{i(e.rect)});return()=>cancelAnimationFrame(m)},[e]);let s=o??{top:!0,right:!0,bottom:!0,left:!0},c=e.originRect?r:e.rect,f="color-mix(in oklch, oklch(0.62 0.18 255) 80%, transparent)";return d("div",{class:"pe-none"},d("div",{class:"abs",style:{left:c.left+"px",top:c.top+"px",width:c.width+"px",height:c.height+"px",backgroundColor:"color-mix(in oklch, oklch(0.62 0.18 255) 8%, transparent)",transition:e.originRect?`left ${t}ms ease, top ${t}ms ease, width ${t}ms ease, height ${t}ms ease`:void 0}},s.top?d("div",{class:"edge-top",style:{backgroundColor:f}}):null,s.right?d("div",{class:"edge-right",style:{backgroundColor:f}}):null,s.bottom?d("div",{class:"edge-bottom",style:{backgroundColor:f}}):null,s.left?d("div",{class:"edge-left",style:{backgroundColor:f}}):null),d(ae,{className:"bg-dark translate-x-center",style:{left:c.left+c.width/2+"px",top:c.top+c.height+n+"px",transition:e.originRect?`left ${t}ms ease, top ${t}ms ease`:void 0}},Po(c.width)," x ",Po(c.height)))}function $t({distance:e,labelOffset:t,onRemove:n}){return d("div",{class:n?"pe-auto":"pe-none",onClick:n?o=>{o.stopPropagation(),n(e.id)}:void 0},d("div",{class:"distance-rect",style:{left:e.rectA.left+"px",top:e.rectA.top+"px",width:e.rectA.width+"px",height:e.rectA.height+"px"}}),d("div",{class:"distance-rect",style:{left:e.rectB.left+"px",top:e.rectB.top+"px",width:e.rectB.width+"px",height:e.rectB.height+"px"}}),e.connectors.map((o,r)=>Math.abs(o.x1-o.x2)<1?d("div",{key:`${e.id}-connector-${r}`,class:"distance-connector-v",style:{left:o.x1+"px",top:Math.min(o.y1,o.y2)+"px",height:Math.abs(o.y2-o.y1)+"px"}}):d("div",{key:`${e.id}-connector-${r}`,class:"distance-connector-h",style:{left:Math.min(o.x1,o.x2)+"px",top:o.y1+"px",width:Math.abs(o.x2-o.x1)+"px"}})),e.horizontal&&e.horizontal.value>0?d(I,null,d("div",{class:"distance-line-h",style:{left:Math.min(e.horizontal.x1,e.horizontal.x2)+"px",width:Math.abs(e.horizontal.x2-e.horizontal.x1)+"px",top:e.horizontal.y+"px"}}),d(ae,{className:"bg-dark translate-x-center",style:{left:(e.horizontal.x1+e.horizontal.x2)/2+"px",top:e.horizontal.y+t+"px"}},me(e.horizontal.value))):null,e.vertical&&e.vertical.value>0?d(I,null,d("div",{class:"distance-line-v",style:{top:Math.min(e.vertical.y1,e.vertical.y2)+"px",height:Math.abs(e.vertical.y2-e.vertical.y1)+"px",left:e.vertical.x+"px"}}),d(ae,{className:"bg-dark translate-y-center",style:{left:e.vertical.x+t+"px",top:(e.vertical.y1+e.vertical.y2)/2+"px"}},me(e.vertical.value))):null)}function No({enabled:e,toolMode:t,guidesEnabled:n,altPressed:o,isDragging:r,displayedMeasurements:i,measurementEdgeVisibility:s,activeRect:c,activeWidth:f,activeHeight:u,fillColor:m,outlineColor:l,hoverRectToShow:g,hoverEdgeVisibility:x,guidePreview:w,guideColorPreview:A,displayedSelectedMeasurements:S,selectedEdgeVisibility:E,heldDistances:M,optionPairOverlay:T,guideDistanceOverlay:$,optionContainerLines:y,guides:H,hoverGuide:N,draggingGuideId:j,selectedGuideIds:O,guideColorActive:K,guideColorHover:Ee,guideColorDefault:xe,onPointerDown:ie,onPointerMove:P,onPointerUp:X,onPointerLeave:z,onRemoveHeldDistance:k,onGuidePointerDown:Y,onGuidePointerUp:Ae,onGuidePointerCancel:ke}){return d("div",{class:`overlay-area ${e&&t!=="none"?`active ${n?N||j?"cursor-default":"cursor-crosshair":"cursor-default"}`:""}`,onPointerDown:ie,onPointerMove:P,onPointerUp:X,onPointerLeave:z},n?null:i.map((D,le)=>d(Do,{key:D.id,measurement:D,transitionMs:140,labelOffset:2,edgeVisibility:s[le]})),!n&&c&&r?d(I,null,d("div",{class:"pe-none abs",style:{left:c.left+"px",top:c.top+"px",width:c.width+"px",height:c.height+"px",backgroundColor:m}},d("div",{class:"edge-top",style:{backgroundColor:l}}),d("div",{class:"edge-right",style:{backgroundColor:l}}),d("div",{class:"edge-bottom",style:{backgroundColor:l}}),d("div",{class:"edge-left",style:{backgroundColor:l}})),d(ae,{className:"bg-dark translate-x-center",style:{left:c.left+c.width/2+"px",top:c.top+c.height+2+"px"}},f," x ",u)):null,!n&&g?d("div",{class:"pe-none abs",style:{left:g.left+"px",top:g.top+"px",width:g.width+"px",height:g.height+"px",backgroundColor:m}},x?.top?d("div",{class:"edge-top",style:{backgroundColor:l}}):null,x?.right?d("div",{class:"edge-right",style:{backgroundColor:l}}):null,x?.bottom?d("div",{class:"edge-bottom",style:{backgroundColor:l}}):null,x?.left?d("div",{class:"edge-left",style:{backgroundColor:l}}):null):null,n&&w?d("div",{class:"guide-preview",style:w.orientation==="vertical"?{left:w.position-14/2+"px",top:"0",width:14+"px",height:"100%"}:{top:w.position-14/2+"px",left:"0",height:14+"px",width:"100%"}},d("div",{class:"guide-preview-stroke",style:w.orientation==="vertical"?{left:14/2-1+"px",top:"0",width:"2px",height:"100%",backgroundColor:A}:{top:14/2-1+"px",left:"0",height:"2px",width:"100%",backgroundColor:A}})):null,n?null:S.map((D,le)=>d(Go,{key:D.id,measurement:D,transitionMs:140,labelOffset:2,edgeVisibility:E[le]})),M.map(D=>d($t,{key:`held-${D.id}`,distance:D,labelOffset:2,onRemove:k})),!n&&o&&T?d($t,{key:`option-${T.id}`,distance:T,labelOffset:2}):null,n&&o&&$?d($t,{key:`guide-preview-${$.id}`,distance:$,labelOffset:2}):null,!n&&o&&y?d(I,null,y.top.value>0?d(I,null,d("div",{class:"container-line-v",style:{top:y.top.y1+"px",height:y.top.y2-y.top.y1+"px",left:y.top.x+"px"}}),d(ae,{className:"bg-dark translate-y-center",style:{left:y.top.x+2+"px",top:(y.top.y1+y.top.y2)/2+"px"}},me(y.top.value))):null,y.bottom.value>0?d(I,null,d("div",{class:"container-line-v",style:{top:y.bottom.y1+"px",height:y.bottom.y2-y.bottom.y1+"px",left:y.bottom.x+"px"}}),d(ae,{className:"bg-dark translate-y-center",style:{left:y.bottom.x+2+"px",top:(y.bottom.y1+y.bottom.y2)/2+"px"}},me(y.bottom.value))):null,y.left.value>0?d(I,null,d("div",{class:"container-line-h",style:{left:y.left.x1+"px",width:y.left.x2-y.left.x1+"px",top:y.left.y+"px"}}),d(ae,{className:"bg-dark translate-x-center",style:{left:(y.left.x1+y.left.x2)/2+"px",top:y.left.y+2+"px"}},me(y.left.value))):null,y.right.value>0?d(I,null,d("div",{class:"container-line-h",style:{left:y.right.x1+"px",width:y.right.x2-y.right.x1+"px",top:y.right.y+"px"}}),d(ae,{className:"bg-dark translate-x-center",style:{left:(y.right.x1+y.right.x2)/2+"px",top:y.right.y+2+"px"}},me(y.right.value))):null):null,H.map(D=>{let le=O.includes(D.id),Z=N?.id===D.id,be=le||Z?2:1,Q=le?K:Z?Ee:xe;return d("div",{key:D.id,class:"guide-hitbox",style:D.orientation==="vertical"?{left:D.position-14/2+"px",top:"0",width:14+"px",height:"100%"}:{top:D.position-14/2+"px",left:"0",height:14+"px",width:"100%"},onPointerDown:ee=>Y(D,ee),onPointerUp:ee=>Ae(D,ee),onPointerCancel:ee=>ke(D,ee)},d("div",{class:"guide-stroke",style:D.orientation==="vertical"?{left:14/2-1+"px",top:"0",width:be+"px",height:"100%",backgroundColor:Q}:{top:14/2-1+"px",left:"0",height:be+"px",width:"100%",backgroundColor:Q}}))}))}var lt=({size:e=24,className:t="",...n})=>d("svg",{xmlns:"http://www.w3.org/2000/svg",width:e,height:e,viewBox:"0 0 256 256",fill:"currentColor",class:`icon ${t}`,...n}),Ho=({size:e=20,className:t="",...n})=>d(lt,{size:e,className:t,...n},d("path",{d:"M166.59,134.1a1.91,1.91,0,0,1-.55-1.79,2,2,0,0,1,1.08-1.42l46.25-17.76.24-.1A14,14,0,0,0,212.38,87L52.29,34.7A13.95,13.95,0,0,0,34.7,52.29L87,212.38a13.82,13.82,0,0,0,12.6,9.6c.23,0,.46,0,.69,0A13.84,13.84,0,0,0,113,213.61a2.44,2.44,0,0,0,.1-.24l17.76-46.25a2,2,0,0,1,3.21-.53l51.31,51.31a14,14,0,0,0,19.8,0l12.69-12.69a14,14,0,0,0,0-19.8Zm42.82,62.63-12.68,12.68a2,2,0,0,1-2.83,0L142.59,158.1a14,14,0,0,0-22.74,4.32,2.44,2.44,0,0,0-.1.24L102,208.91a2,2,0,0,1-3.61-.26L46.11,48.57a1.87,1.87,0,0,1,.47-2A1.92,1.92,0,0,1,47.93,46a2.22,2.22,0,0,1,.64.1L208.65,98.38a2,2,0,0,1,.26,3.61l-46.25,17.76-.24.1a14,14,0,0,0-4.32,22.74h0l51.31,51.31A2,2,0,0,1,209.41,196.73Z"})),Lo=({size:e=20,className:t="",...n})=>d(lt,{size:e,className:t,...n},d("path",{d:"M233.91,74.79,181.22,22.1a14,14,0,0,0-19.8,0L22.09,161.41a14,14,0,0,0,0,19.8L74.78,233.9a14,14,0,0,0,19.8,0L233.91,94.59A14,14,0,0,0,233.91,74.79ZM225.42,86.1,86.1,225.41h0a2,2,0,0,1-2.83,0L30.58,172.73a2,2,0,0,1,0-2.83L64,136.48l27.76,27.76a6,6,0,1,0,8.48-8.48L72.48,128,96,104.48l27.76,27.76a6,6,0,0,0,8.48-8.48L104.48,96,128,72.49l27.76,27.75a6,6,0,0,0,8.48-8.48L136.49,64,169.9,30.59a2,2,0,0,1,2.83,0l52.69,52.68A2,2,0,0,1,225.42,86.1Z"})),$o=({size:e=8,className:t="",...n})=>d(lt,{size:e,className:t,...n},d("path",{d:"M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"})),yn=({size:e=12,className:t="",...n})=>d(lt,{size:e,className:t,...n},d("path",{d:"M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"})),xn=({size:e=12,className:t="",...n})=>d(lt,{size:e,className:t,...n},d("path",{d:"M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z"}));var Ar=800,zo=6;function Oo({id:e,active:t,label:n,shortcut:o,onClick:r,tooltipVisible:i,tooltipSide:s,onTooltipEnter:c,onTooltipLeave:f,children:u}){return d("div",{class:"toolbar-btn-wrap",onMouseEnter:()=>c(e),onMouseLeave:()=>f(e)},d("button",{type:"button","aria-label":`${n} (${o})`,title:`${n} (${o})`,class:`toolbar-btn ${t?"active":""}`,onClick:r},u),d("span",{class:`tooltip ${s==="top"?"side-top":"side-bottom"} ${i?"visible":""}`},n," ",d("kbd",null,o)))}function Dr(){let[e,t]=C(null),n=G(null),o=G(!1),r=R(()=>{n.current!==null&&(window.clearTimeout(n.current),n.current=null)},[]),i=R(f=>{if(r(),o.current){t(f);return}n.current=window.setTimeout(()=>{t(f),o.current=!0,n.current=null},Ar)},[r]),s=R(f=>{r(),t(u=>u===f?null:u)},[r]),c=R(()=>{r(),t(null),o.current=!1},[r]);return W(()=>()=>{r()},[r]),{visibleTooltipId:e,onTooltipEnter:i,onTooltipLeave:s,onToolbarLeave:c}}function Pr(e){let[t,n]=C(e),o=G(!1),r=G(null),i=G({active:!1,didDrag:!1,pointerId:-1,startX:0,startY:0,originX:0,originY:0,width:0,height:0}),s=R(f=>{if(f.button!==0)return;r.current&&(r.current(),r.current=null);let u=i.current;u.active=!1,u.didDrag=!1,u.pointerId=f.pointerId,u.startX=f.clientX,u.startY=f.clientY,u.originX=t.x,u.originY=t.y;let m=f.currentTarget.getBoundingClientRect();u.width=m.width,u.height=m.height;let l=x=>{let w=i.current;if(w.pointerId!==x.pointerId)return;let A=x.clientX-w.startX,S=x.clientY-w.startY;if(w.active||(w.active=Math.abs(A)>zo||Math.abs(S)>zo),!w.active)return;w.didDrag=!0;let E=Math.max(8,window.innerWidth-w.width-8),M=Math.max(8,window.innerHeight-w.height-8);n({x:Math.min(E,Math.max(8,w.originX+A)),y:Math.min(M,Math.max(8,w.originY+S))})},g=x=>{let w=i.current;w.pointerId!==x.pointerId&&w.pointerId!==-1||(o.current=w.didDrag,w.active=!1,w.didDrag=!1,w.pointerId=-1,window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",g),window.removeEventListener("pointercancel",g),r.current=null)};window.addEventListener("pointermove",l),window.addEventListener("pointerup",g),window.addEventListener("pointercancel",g),r.current=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",g),window.removeEventListener("pointercancel",g)}},[t.x,t.y]),c=R(f=>{o.current&&(f.preventDefault(),f.stopPropagation(),o.current=!1)},[]);return{position:t,onPointerDown:s,onClickCapture:c}}function Fo({toolbarRef:e,toolMode:t,setEnabled:n,setToolMode:o,guideOrientation:r,setGuideOrientation:i,onInteract:s}){let{position:c,onPointerDown:f,onClickCapture:u}=Pr({x:16,y:16}),{visibleTooltipId:m,onTooltipEnter:l,onTooltipLeave:g,onToolbarLeave:x}=Dr(),[w,A]=C(!1),S=G(null),E=G(null),[M,T]=C(0),[$,y]=C("right"),H=typeof window>"u"?0:window.innerHeight||0,N=c.y<56,j=H>0&&c.y>H-56,O=N&&!j?"bottom":"top",K=j?"top":"bottom",Ee=R(()=>{n(!0),o(P=>P==="select"?"none":"select"),s()},[s,n,o]),xe=R(()=>{n(!0),o(P=>P==="guides"?"none":"guides"),s()},[s,n,o]),ie=R(P=>{n(!0),o("guides"),i(P),s(),A(!1)},[s,n,i,o]);return io(()=>{if(!w)return;let P=requestAnimationFrame(()=>{let k=S.current?.querySelector("[role='menu']");k&&k.focus();let Y=E.current;if(!Y)return;let Ae=Y.getBoundingClientRect();if(Ae.left<8){y("left");return}Ae.right>window.innerWidth-8&&y("right")}),X=k=>{S.current&&(S.current.contains(k.target)||A(!1))},z=()=>{let k=E.current;if(!k)return;let Y=k.getBoundingClientRect();if(Y.left<8){y("left");return}Y.right>window.innerWidth-8&&y("right")};return window.addEventListener("pointerdown",X),window.addEventListener("resize",z),()=>{cancelAnimationFrame(P),window.removeEventListener("pointerdown",X),window.removeEventListener("resize",z)}},[w,r]),d("div",{ref:e,class:"toolbar",style:{left:c.x+"px",top:c.y+"px"},onPointerDown:P=>{s(),f(P)},onClickCapture:u,onMouseLeave:x},d(Oo,{id:"select",active:t==="select",label:"Select",shortcut:"S",onClick:Ee,tooltipVisible:m==="select",tooltipSide:O,onTooltipEnter:l,onTooltipLeave:g},d(Ho,{size:20})),d(Oo,{id:"guides",active:t==="guides",label:"Guides",shortcut:"G",onClick:xe,tooltipVisible:m==="guides",tooltipSide:O,onTooltipEnter:l,onTooltipLeave:g},d(Lo,{size:20,className:r==="vertical"?"rotate-135":"rotate-45"})),d("div",{class:"guide-menu-wrap",ref:S,onMouseEnter:()=>l("guide-menu"),onMouseLeave:()=>g("guide-menu")},d("button",{type:"button","aria-label":"Guide orientation menu",title:"Guide orientation",class:`guide-caret-btn ${w?"open":""}`,onClick:()=>{s(),A(P=>(P||T(r==="horizontal"?0:1),!P))}},d($o,{size:8})),d("span",{class:`tooltip ${O==="top"?"side-top":"side-bottom"} ${m==="guide-menu"&&!w?"visible":""}`},"Orientation Guide"),w?d("div",{class:`guide-menu-panel ${K==="bottom"?"side-bottom":"side-top"} ${$==="left"?"align-left":"align-right"}`,ref:E,role:"menu",tabIndex:0,onKeyDown:P=>{let X=P.key.toLowerCase();P.key==="ArrowDown"&&(P.preventDefault(),T(z=>(z+1)%2)),P.key==="ArrowUp"&&(P.preventDefault(),T(z=>(z+1)%2)),P.key==="Enter"&&(P.preventDefault(),ie(M===0?"horizontal":"vertical")),X==="h"&&(P.preventDefault(),ie("horizontal")),X==="v"&&(P.preventDefault(),ie("vertical")),P.key==="Escape"&&(P.preventDefault(),A(!1))}},d("button",{type:"button",class:`guide-menu-item ${M===0||r==="horizontal"?"active":""}`,onClick:()=>ie("horizontal")},d(yn,{size:12,className:`check ${r==="horizontal"?"visible":""}`}),d(xn,{size:12}),d("span",{class:"flex-1"},"Horizontal"),d("span",null,"H")),d("button",{type:"button",class:`guide-menu-item ${M===1||r==="vertical"?"active":""}`,onClick:()=>ie("vertical")},d(yn,{size:12,className:`check ${r==="vertical"?"visible":""}`}),d(xn,{size:12,className:"rotate-90"}),d("span",{class:"flex-1"},"Vertical"),d("span",null,"V"))):null))}function Uo({onToggle:e}){let t=G(null),n=G(null),o=G(null),r=G(null),i=G(null),s=G(null),[c,f]=C(!0),[u,m]=C(!1),[l,g]=C("select"),x=!1,w=!1,A=!0,S=l==="guides",E=!0,M=!0,T="oklch(0.62 0.18 255)",$="oklch(0.63 0.26 29.23)",[y,H]=C(null),[N,j]=C(null),[O,K]=C(!1),[Ee,xe]=C(null),[ie,P]=C([]),[X,z]=C(null),[k,Y]=C([]),[Ae,ke]=C(null),[st,De]=C([]),[D,le]=C([]),[Z,be]=C(null),[Q,ee]=C([]),[ct,Ne]=C(!0),[He,Ke]=C(null),[ve,bn]=C("vertical"),[at,Ft]=C(null),[vn,Ut]=C(null),[ut,Wo]=C(null),[dt,Xo]=C(null),te=R(a=>{n.current=a,Xo(a)},[]),ue=R(a=>{o.current=a,Wo(a)},[]),ne=R(()=>{r.current=null,Ft(null)},[]),ft=G(null),Bt=G(null),_e=R(()=>{ft.current!==null&&(window.clearTimeout(ft.current),ft.current=null),Bt.current=null},[]),pt=R((a,p)=>{_e(),Bt.current=a,ft.current=window.setTimeout(()=>{Bt.current===a&&p(a)},220)},[_e]),Re=G([]),Le=G([]),mt=G(null),Vt=50,$e=R(()=>({enabled:c,toolMode:l,guideOrientation:ve,measurements:[...ie],activeMeasurement:Ee,selectedMeasurements:[...k],selectedMeasurement:X,heldDistances:[...st],guides:[...D],selectedGuideIds:[...Q],draggingGuideId:Z}),[Ee,Z,c,ve,D,st,ie,Q,X,k,l]),wn=R(a=>{let p=_=>`${Math.round(_.left)}:${Math.round(_.top)}:${Math.round(_.width)}:${Math.round(_.height)}`;return[a.enabled?"1":"0",a.toolMode,a.guideOrientation,a.measurements.map(_=>`${_.id}@${p(_.rect)}`).join(","),a.activeMeasurement?`${a.activeMeasurement.id}@${p(a.activeMeasurement.rect)}`:"",a.selectedMeasurements.map(_=>`${_.id}@${p(_.rect)}`).join(","),a.selectedMeasurement?`${a.selectedMeasurement.id}@${p(a.selectedMeasurement.rect)}`:"",a.heldDistances.map(_=>_.id).join(","),a.guides.map(_=>`${_.id}:${_.position}`).join(","),a.selectedGuideIds.join(","),a.draggingGuideId??""].join("|")},[]),oe=R(()=>{let a=$e(),p=wn(a);mt.current!==p&&(Re.current.push(a),Le.current=[],mt.current=p,Re.current.length>Vt&&Re.current.shift())},[$e,wn]),ht=R(a=>{f(a.enabled),g(a.toolMode),bn(a.guideOrientation),P(a.measurements),xe(a.activeMeasurement),Y(a.selectedMeasurements),z(a.selectedMeasurement),De(a.heldDistances),le(a.guides),ee(a.selectedGuideIds),be(a.draggingGuideId),H(null),j(null),K(!1),Ke(null),ke(null),ue(null),ne();let p=a.selectedMeasurement?.elementRef??a.selectedMeasurements[a.selectedMeasurements.length-1]?.elementRef??null;te(p)},[ne,ue,te]),Mn=R(()=>{let a=Re.current.pop();if(!a)return;let p=$e();Le.current.push(p),Le.current.length>Vt&&Le.current.shift(),mt.current=null,ht(a)},[$e,ht]),En=R(()=>{let a=Le.current.pop();a&&(Re.current.push($e()),Re.current.length>Vt&&Re.current.shift(),mt.current=null,ht(a))},[$e,ht]),_t=R(a=>{g(p=>{let _=typeof a=="function"?a(p):a;return _===p?p:(oe(),_)})},[oe]),gt=R(a=>{bn(p=>{let _=typeof a=="function"?a(p):a;return _===p?p:(oe(),_)})},[oe]),Wt=R(a=>{f(p=>{let _=typeof a=="function"?a(p):a;return _===p?p:(oe(),_)})},[oe]),ze=R(()=>{let a=!1;return()=>{a||(oe(),a=!0)}},[oe]);W(()=>{let a=p=>{if((p.metaKey||p.ctrlKey)&&p.key.toLowerCase()==="z"){if(p.shiftKey){if(Le.current.length===0)return;p.preventDefault(),En();return}Re.current.length!==0&&(p.preventDefault(),Mn())}};return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[En,Mn]);let kn=R(()=>{oe(),_e(),H(null),j(null),K(!1),xe(null),P([]),z(null),Y([]),ne(),te(null),ke(null),ue(null),le([]),ee([]),De([])},[_e,ne,oe,ue,te]),Rn=R(()=>Q.length===0?!1:(oe(),le(a=>a.filter(p=>!Q.includes(p.id))),ee([]),!0),[oe,Q]);W(()=>{let a=_=>{if(_.key==="Escape"){kn(),e&&e(!1);return}_.key.toLowerCase()==="m"&&Wt(h=>!h);let v=_.key.toLowerCase();c&&(l!=="none"||ct)&&(v==="s"&&(_t(h=>h==="select"?"none":"select"),Ne(!0)),v==="g"&&(_t(h=>h==="guides"?"none":"guides"),Ne(!0)),v==="h"&&(gt("horizontal"),Ne(!0)),v==="v"&&(gt("vertical"),Ne(!0))),_.key==="Alt"&&m(!0),(_.key==="Backspace"||_.key==="Delete")&&Rn()&&_.preventDefault()},p=_=>{_.key==="Alt"&&m(!1)};return window.addEventListener("keydown",a),window.addEventListener("keyup",p),()=>{window.removeEventListener("keydown",a),window.removeEventListener("keyup",p)}},[kn,c,e,Rn,Wt,gt,_t,l,ct]),W(()=>{let a=null,p={current:de()},_=()=>{a&&cancelAnimationFrame(a),a=requestAnimationFrame(()=>{let v=de(),b=p.current;if(P(h=>h.map(F=>mn(F,v))),xe(h=>h&&mn(h,v)),De(h=>h.map(F=>uo(F,v))),n.current&&z(We(n.current)),b.width>0&&b.height>0){let h=v.width/b.width,F=v.height/b.height;le(q=>q.map(pe=>pe.orientation==="vertical"?{...pe,position:pe.position*h}:{...pe,position:pe.position*F}))}p.current=v})};return window.addEventListener("resize",_),()=>{a&&cancelAnimationFrame(a),window.removeEventListener("resize",_)}},[]),W(()=>{if(!c)return;let a=null,p=()=>{P(b=>b.map(h=>{if(!h.elementRef||!document.contains(h.elementRef))return h;let F=ce(h.elementRef);return Ie(F,h.rect)?h:{...h,rect:F,normalizedRect:ge(F),originRect:void 0}})),xe(b=>{if(!b?.elementRef||!document.contains(b.elementRef))return b;let h=ce(b.elementRef);return Ie(h,b.rect)?b:{...b,rect:h,normalizedRect:ge(h),originRect:void 0}}),De(b=>b.map(h=>{let F=h.elementRefA&&document.contains(h.elementRefA),q=h.elementRefB&&document.contains(h.elementRefB);if(!F&&!q)return h;let pe=F?ce(h.elementRefA):h.rectA,wt=q?ce(h.elementRefB):h.rectB;return Ie(pe,h.rectA)&&Ie(wt,h.rectB)?h:{...Ve(pe,wt,h.elementRefA,h.elementRefB),id:h.id}}));let _=n.current;_&&document.contains(_)&&z(b=>{let h=We(_);return b&&Ie(b.rect,h.rect)?b:h}),Y(b=>b.map(h=>{if(!h.elementRef||!document.contains(h.elementRef))return h;let F=We(h.elementRef);return Ie(F.rect,h.rect)?h:{...F,id:h.id}}));let v=o.current;if(v&&document.contains(v)){let b=ce(v);ke(h=>h&&Ie(h,b)?h:b)}a=requestAnimationFrame(p)};return a=requestAnimationFrame(p),()=>{a&&cancelAnimationFrame(a)}},[c]),W(()=>{if(!ct||l!=="none")return;let a=p=>{let _=i.current;_&&_.contains(p.target)||Ne(!1)};return window.addEventListener("pointerdown",a),()=>window.removeEventListener("pointerdown",a)},[ct,l]),W(()=>{if(!(!!at||!!X?.originRect||k.some(p=>!!p.originRect))){s.current!==null&&(window.clearTimeout(s.current),s.current=null);return}s.current===null&&(s.current=window.setTimeout(()=>{s.current=null,Ft(p=>p&&null),z(p=>{if(!p?.originRect)return p;let{originRect:_,...v}=p;return v}),Y(p=>{let _=!1,v=p.map(b=>{if(!b.originRect)return b;_=!0;let{originRect:h,...F}=b;return F});return _?v:p})},140))},[at,X,k]),W(()=>()=>{s.current!==null&&window.clearTimeout(s.current)},[]);let Xt=x||w&&ie.length>0?ie:Ee?[Ee]:[],qe=J(()=>!y||!N?null:{left:Math.min(y.x,N.x),top:Math.min(y.y,N.y),width:Math.abs(N.x-y.x),height:Math.abs(N.y-y.y)},[N,y]),Yo=qe?me(qe.width):0,Ko=qe?me(qe.height):0,yt=J(()=>{if(k.length<=1)return null;let a=k.map(q=>q.rect),p=1/0,_=1/0,v=-1/0,b=-1/0;a.forEach(q=>{p=Math.min(p,q.left),_=Math.min(_,q.top),v=Math.max(v,q.left+q.width),b=Math.max(b,q.top+q.height)});let h={left:p,top:_,width:v-p,height:b-_};return{...k[k.length-1],id:`group-${k.map(q=>q.id).join("|")}`,rect:h,paddingRect:h,marginRect:h,originRect:at??void 0}},[k,at]),Yt=J(()=>yt?[yt]:k.length>0?k:X?[X]:[],[yt,X,k]),Sn=J(()=>go(D,Q),[D,Q]),Kt=J(()=>_o(vn,D),[D,vn]),qo=J(()=>Co(k,X),[X,k]),xt=yt??qo,Oe=J(()=>yo({altPressed:u,primarySelectedMeasurement:xt,selectedGuide:Sn,hoverGuide:Kt,hoverElement:ut,selectedElementRef:dt}),[u,xt,ut,Kt,dt,Sn]),jo=J(()=>xo({altPressed:u,primarySelectedMeasurement:xt,optionPairOverlay:Oe,selectedGuideIds:Q,selectedElement:dt,hoverElement:ut}),[u,xt,ut,Oe,dt,Q]),Zo=J(()=>{if(!u||!S||!He)return null;let a={id:"preview",orientation:He.orientation,position:He.position},p=D.filter(v=>v.orientation===He.orientation);if(p.length===0)return null;let _=p.reduce((v,b)=>{let h=Math.abs(b.position-a.position);return v?h<v.distance?{guide:b,distance:h}:v:{guide:b,distance:h}},null);return _?Ve(Xe(a),Xe(_.guide)):null},[u,He,D,S]),{outlineColor:Jo,fillColor:Qo,guideColorActive:er,guideColorHover:tr,guideColorDefault:nr,guideColorPreview:or}=J(()=>({outlineColor:`color-mix(in oklch, ${T} 80%, transparent)`,fillColor:`color-mix(in oklch, ${T} 8%, transparent)`,guideColorActive:`color-mix(in oklch, ${$} 100%, transparent)`,guideColorHover:`color-mix(in oklch, ${$} 90%, transparent)`,guideColorDefault:`color-mix(in oklch, ${$} 70%, transparent)`,guideColorPreview:`color-mix(in oklch, ${$} 50%, transparent)`}),[$,T]),qt=J(()=>Yt.map(a=>a.rect),[Yt]),Tn=M&&Ae&&k.length<=1?Ae:null,rr=J(()=>hn(qt),[qt]).slice(0,qt.length),ir=Tn?{top:!0,right:!0,bottom:!0,left:!0}:null,lr=J(()=>hn(Xt.map(a=>a.rect)),[Xt]),je=G(null),In=G(null),Cn=G({key:"",entries:[],overlayNode:null,frame:-1}),jt=G(!1),bt=G(null),An=G(S),vt=G(D),Zt=G(A),Ze=G(Z),Jt=G(ve);W(()=>{An.current=S},[S]),W(()=>{vt.current=D},[D]),W(()=>{Zt.current=A},[A]),W(()=>{Jt.current=ve},[ve]),W(()=>{Ze.current=Z},[Z]),W(()=>()=>{je.current&&cancelAnimationFrame(je.current)},[]);let Dn=R(a=>{let p=Ye(a,t.current);if(p){let _=p.getBoundingClientRect();ke({left:_.left,top:_.top,width:_.width,height:_.height}),ue(p)}else ke(null),ue(null)},[ue]),Pn=R(a=>{let p=Ye(a,t.current);ue(p)},[ue]),sr=R(a=>{let p=ze(),_=i.current;if(_&&_.contains(a.target)||!c||a.button!==0||l==="none")return;ne();let v={x:a.clientX,y:a.clientY};if(jt.current=a.shiftKey,bt.current=a.shiftKey?gn({point:v,selectedMeasurements:k,overlayNode:t.current})?.elementRef??null:null,Cn.current.key="",u&&Oe){p(),De(b=>[...b,{...Oe,id:Ge()}]);return}if(S){p();let b=Lt({orientation:ve,point:v,snapGuidesEnabled:A,overlayNode:t.current,guides:D,draggingGuideId:Z}),h=Ge();ee([]),le(F=>[...F,{id:h,orientation:ve,position:b}]),ee([h]),pt(h,be),a.currentTarget.setPointerCapture(a.pointerId);return}Q.length>0&&(p(),ee([])),H(v),j(v),K(!1),a.currentTarget.setPointerCapture(a.pointerId)},[u,ne,ze,Z,c,ve,D,S,Oe,pt,Q.length,k,A,l]),cr=R(a=>{let p=i.current;if(p&&p.contains(a.target)||!c)return;if(l==="none"){M&&(ke(null),ue(null)),Ut(null),Ke(null);return}let _={x:a.clientX,y:a.clientY};if(a.altKey!==u&&m(a.altKey),In.current=_,je.current||(je.current=requestAnimationFrame(()=>{let v=In.current;if(v&&!Ze.current&&(M?Dn(v):Pn(v)),v&&vt.current.length>0?Ut(v):Ut(null),An.current&&v&&!Ze.current){let b=Lt({orientation:Jt.current,point:v,snapGuidesEnabled:Zt.current,overlayNode:t.current,guides:vt.current,draggingGuideId:Ze.current});Ke({orientation:Jt.current,position:b})}else Ke(null);je.current=null})),Z&&le(v=>v.map(b=>b.id===Z?{...b,position:Lt({orientation:b.orientation,point:_,snapGuidesEnabled:Zt.current,overlayNode:t.current,guides:vt.current,draggingGuideId:Ze.current})}:b)),!!y&&(j(_),!O)){let v=Math.abs(_.x-y.x),b=Math.abs(_.y-y.y),h=jt.current?12:4;(v>h||b>h)&&K(!0)}},[u,Z,c,M,O,ue,y,l,Pn,Dn]),ar=R(a=>{let p=ze(),_=i.current;if(_&&_.contains(a.target)||!c)return;if(_e(),l==="none"){H(null),j(null),K(!1);return}let v={x:a.clientX,y:a.clientY},b=()=>{H(null),j(null),K(!1),jt.current=!1,bt.current=null},h=()=>{xe(null),P([])};if(a.currentTarget.hasPointerCapture(a.pointerId)&&a.currentTarget.releasePointerCapture(a.pointerId),Z&&be(null),!y||!N){b();return}let F=Math.abs(v.x-y.x),q=Math.abs(v.y-y.y),pe=12,wt=a.shiftKey&&F<=pe&&q<=pe;if(O&&!wt){let B=so(y,v);r.current=B,Ft(B);let se=Io(B,t.current,Cn.current),re=se.length===k.length&&se.every((Se,Qe)=>k[Qe]?.elementRef===Se),Pe=se[se.length-1]??null,Qt=(X?.elementRef??null)!==Pe;if(se.length>0)if(re){if(Qt){p(),te(Pe);let Se=k.find(Qe=>Qe.elementRef===Pe);Se&&z(Se)}}else{p();let Se=se.map(Qe=>({...We(Qe),originRect:B}));Y(Se),te(Pe),z(Se[Se.length-1])}else(k.length>0||X)&&(p(),te(null),z(null),Y([]),ne());h(),b();return}let Je=bt.current?k.find(B=>B.elementRef===bt.current)??null:gn({point:v,selectedMeasurements:k,overlayNode:t.current});if(a.shiftKey&&Je){p();let B=k.filter(re=>re.elementRef!==Je.elementRef);Y(B),ne();let se=B.length>0?B[B.length-1]:null;te(se?.elementRef??null),z(se),h(),b();return}if(!M&&!a.shiftKey&&Je){p();let B=k.filter(re=>re.elementRef!==Je.elementRef);Y(B),ne();let se=B.length>0?B[B.length-1]:null;te(se?.elementRef??null),z(se),h(),b();return}let Fe=a.shiftKey?Ye(v,t.current)??_n(v,t.current,E):_n(v,t.current,E);if(Fe){let B=We(Fe);if(h(),a.shiftKey){if(k.some(re=>re.elementRef===Fe)){p();let re=k.filter(Qt=>Qt.elementRef!==Fe);Y(re),ne();let Pe=re.length>0?re[re.length-1]:null;te(Pe?.elementRef??null),z(Pe)}else p(),Y(re=>[...re,B]),te(Fe),z(B),ne();h(),b();return}te(Fe),p(),Y([B]),z(B),ne()}else{if(a.shiftKey){h(),b();return}p(),te(null),z(null),Y([]),ne()}b()},[_e,ne,ze,Z,c,N,M,O,X,k,ue,te,E,y,l]),ur=R(()=>{_e(),H(null),j(null),K(!1),be(null),Ke(null)},[_e]),dr=R(a=>{oe(),De(p=>p.filter(_=>_.id!==a))},[oe]),fr=R((a,p)=>{let _=ze();if(c){if(p.stopPropagation(),p.shiftKey){_(),ee(v=>v.includes(a.id)?v.filter(b=>b!==a.id):[...v,a.id]);return}_(),ee([a.id]),pt(a.id,be),p.currentTarget.setPointerCapture(p.pointerId)}},[ze,c,pt]),Gn=R((a,p)=>{p.stopPropagation(),_e(),be(_=>_===a.id?null:_),p.currentTarget.hasPointerCapture(p.pointerId)&&p.currentTarget.releasePointerCapture(p.pointerId)},[_e]);return W(()=>{let a=p=>{p.type==="MESURER_TOGGLE"&&e&&e()};if(typeof chrome<"u"&&chrome.runtime&&chrome.runtime.onMessage)return chrome.runtime.onMessage.addListener(a),()=>chrome.runtime.onMessage.removeListener(a)},[e]),d("div",{ref:t,class:"mesurer-root"},d(No,{enabled:c,toolMode:l,guidesEnabled:S,altPressed:u,isDragging:O,displayedMeasurements:Xt,measurementEdgeVisibility:lr,activeRect:qe,activeWidth:Yo,activeHeight:Ko,fillColor:Qo,outlineColor:Jo,hoverRectToShow:Tn,hoverEdgeVisibility:ir,guidePreview:He,guideColorPreview:or,displayedSelectedMeasurements:Yt,selectedEdgeVisibility:rr,heldDistances:st,optionPairOverlay:Oe,guideDistanceOverlay:Zo,optionContainerLines:jo,guides:D,hoverGuide:Kt,draggingGuideId:Z,selectedGuideIds:Q,guideColorActive:er,guideColorHover:tr,guideColorDefault:nr,onPointerDown:sr,onPointerMove:cr,onPointerUp:ar,onPointerLeave:ur,onRemoveHeldDistance:dr,onGuidePointerDown:fr,onGuidePointerUp:Gn,onGuidePointerCancel:Gn}),d(Fo,{toolbarRef:i,toolMode:l,setEnabled:Wt,setToolMode:_t,guideOrientation:ve,setGuideOrientation:gt,onInteract:()=>Ne(!0)}))}var Bo=`/* Mesurer Extension Styles \u2014 scoped inside Shadow DOM */

:host {
  all: initial;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --color-ink-50: #f8fafc;
  --color-ink-200: #e2e8f0;
  --color-ink-500: #64748b;
  --color-ink-700: #334155;
  --color-ink-900: #0f172a;
  --color-blue: #2563eb;
  --color-accent: #0d99ff;
  --spacing: 0.25rem;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Layout */
.mesurer-root {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.overlay-area {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 150ms ease;
}

.overlay-area.active {
  pointer-events: auto;
  opacity: 1;
}

.overlay-area.cursor-default { cursor: default; }
.overlay-area.cursor-crosshair { cursor: crosshair; }

/* Absolute positioning helper */
.abs {
  position: absolute;
}

/* Pointer events */
.pe-none { pointer-events: none; }
.pe-auto { pointer-events: auto; }

/* Measurement boxes */
.measurement-box {
  pointer-events: none;
}

.edge-top {
  position: absolute;
  left: 0;
  top: 0;
  height: 1px;
  width: 100%;
}

.edge-right {
  position: absolute;
  right: 0;
  top: 0;
  width: 1px;
  height: 100%;
}

.edge-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1px;
  width: 100%;
}

.edge-left {
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  height: 100%;
}

/* Measure tag (label) */
.measure-tag {
  pointer-events: none;
  position: absolute;
  border-radius: 0.25rem;
  padding: 0.125rem 0.25rem;
  font-size: 10px;
  line-height: 1.4;
  color: var(--color-ink-50);
  font-variant-numeric: tabular-nums;
  user-select: none;
  white-space: nowrap;
}

.measure-tag.bg-dark {
  background-color: color-mix(in oklab, var(--color-ink-900) 90%, transparent);
}

.measure-tag.translate-x-center {
  transform: translateX(-50%);
}

.measure-tag.translate-y-center {
  transform: translateY(-50%);
}

/* Distance overlay */
.distance-rect {
  position: absolute;
  border-radius: 0.25rem;
  border: 1px solid color-mix(in oklab, #2563eb 70%, transparent);
}

.distance-connector-v {
  position: absolute;
  border-left: 1px dashed color-mix(in oklab, #2563eb 70%, transparent);
}

.distance-connector-h {
  position: absolute;
  border-top: 1px dashed color-mix(in oklab, #2563eb 70%, transparent);
}

.distance-line-h {
  position: absolute;
  height: 1px;
  background-color: #2563eb;
}

.distance-line-v {
  position: absolute;
  width: 1px;
  background-color: #2563eb;
}

.container-line-h {
  position: absolute;
  height: 1px;
  background-color: #2563eb;
}

.container-line-v {
  position: absolute;
  width: 1px;
  background-color: #2563eb;
}

/* Guide lines */
.guide-hitbox {
  position: absolute;
}

.guide-stroke {
  position: absolute;
}

/* Guide preview */
.guide-preview {
  position: absolute;
  pointer-events: none;
}

.guide-preview-stroke {
  position: absolute;
}

/* Toolbar */
.toolbar {
  pointer-events: auto;
  position: absolute;
  z-index: 90;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 12px;
  background: #fff;
  padding: 0.25rem;
  outline: 1px solid transparent;
  box-shadow:
    0px 0px 0.5px rgba(0, 0, 0, 0.18),
    0px 3px 8px rgba(0, 0, 0, 0.1),
    0px 1px 3px rgba(0, 0, 0, 0.1);
}

.toolbar-btn {
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  color: #000;
  transition: background-color 150ms;
}

.toolbar-btn:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.toolbar-btn.active {
  background-color: #0d99ff;
  color: #fff;
}

.toolbar-btn.active:hover {
  background-color: #0d99ff;
}

/* Tooltip */
.toolbar-btn-wrap {
  position: relative;
}

.tooltip {
  pointer-events: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  border-radius: 0.25rem;
  background: #000;
  padding: 0.25rem 0.5rem;
  font-size: 11px;
  color: #fff;
  user-select: none;
  transition: opacity 150ms;
  opacity: 0;
  z-index: 100;
}

.tooltip.visible {
  opacity: 1;
}

.tooltip.side-top {
  bottom: 100%;
  margin-bottom: 0.5rem;
}

.tooltip.side-bottom {
  top: 100%;
  margin-top: 0.5rem;
}

.tooltip kbd {
  color: rgba(255, 255, 255, 0.6);
}

/* Guide orientation menu */
.guide-menu-wrap {
  position: relative;
  display: flex;
  align-items: stretch;
  margin-left: -0.25rem;
}

.guide-caret-btn {
  display: flex;
  height: 2rem;
  width: 1rem;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  color: #000;
  transition: background-color 150ms;
}

.guide-caret-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.guide-caret-btn.open {
  background-color: rgba(0, 0, 0, 0.1);
}

.guide-menu-panel {
  position: absolute;
  z-index: 70;
  width: 11rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-ink-200);
  background: #fff;
  padding: 0.25rem;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.08);
  outline: none;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.guide-menu-panel.side-bottom {
  top: 100%;
  margin-top: 0.5rem;
}

.guide-menu-panel.side-top {
  bottom: 100%;
  margin-bottom: 0.5rem;
}

.guide-menu-panel.align-left {
  left: 0;
}

.guide-menu-panel.align-right {
  right: 0;
}

.guide-menu-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  padding: 0.375rem 0.5rem;
  text-align: left;
  font-size: 12px;
  border: none;
  outline: none;
  cursor: pointer;
  color: var(--color-ink-700);
  background: transparent;
  transition: background-color 100ms, color 100ms;
}

.guide-menu-item:hover,
.guide-menu-item.active {
  background-color: #0d99ff;
  color: #fff;
}

.guide-menu-item .flex-1 {
  flex: 1;
}

.guide-menu-item .check {
  opacity: 0;
}

.guide-menu-item .check.visible {
  opacity: 1;
}

/* SVG icons */
.icon {
  display: block;
  fill: currentColor;
}

.rotate-45 { transform: rotate(45deg); }
.rotate-90 { transform: rotate(90deg); }
.rotate-135 { transform: rotate(135deg); }
`;var Ot="mesurer-ext-root";function Vo(){if(document.getElementById(Ot)){let s=document.getElementById(Ot),c=s.style.display!=="none";s.style.display=c?"none":"",c||s.__mesurer_toggle?.();return}let e=document.createElement("div");e.id=Ot,e.style.cssText="all: initial; position: fixed; top: 0; left: 0; width: 0; height: 0; z-index: 2147483647; pointer-events: none;",document.documentElement.appendChild(e);let t=e.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent=Bo,t.appendChild(n);let o=document.createElement("div");t.appendChild(o);let r=!0;function i(){let[s,c]=C(!0),f=R(u=>{if(u===!1){c(!1),e.style.display="none",r=!1;return}c(m=>{let l=!m;return l||(e.style.display="none",r=!1),l})},[]);return e.__mesurer_toggle=()=>{r?f():(e.style.display="",r=!0,c(!0))},s?d(Uo,{onToggle:f,shadowHost:e}):null}qn(d(i,null),o)}typeof chrome<"u"&&chrome.runtime&&chrome.runtime.onMessage&&chrome.runtime.onMessage.addListener(e=>{if(e.type==="MESURER_TOGGLE"){let t=document.getElementById(Ot);t&&t.__mesurer_toggle?t.__mesurer_toggle():Vo()}});Vo();})();
