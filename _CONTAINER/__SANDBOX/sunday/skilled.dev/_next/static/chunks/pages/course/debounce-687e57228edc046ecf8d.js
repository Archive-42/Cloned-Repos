_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[63],{AgfK:function(e,a,t){"use strict";var n=t("q1tI"),c=t("tGWw");a.a=function(){return Object(n.useContext)(c.a)}},DsFX:function(e,a,t){"use strict";var n=t("q1tI"),c=t("mmnh"),o=t("F/Gw"),s=t("MFo5"),r=t("vOnD"),p=t("gWsq"),m=r.e.h2.withConfig({componentId:"sc-1qn1mt-0"})(["font-weight:600;"]),i=r.e.p.withConfig({componentId:"sc-1qn1mt-1"})(["margin-top:10px;"]),u=r.e.div.withConfig({componentId:"sc-1qn1mt-2"})(["margin-top:20px;width:100%;"]),l=r.e.a.withConfig({componentId:"sc-1qn1mt-3"})(["",";color:",";background-color:",";width:100%;font-weight:600;padding:1em;display:flex;align-items:center;justify-content:center;transition:background-color 0.2s ease;font-size:1em;&:hover{background-color:",";}"],p.s,(function(e){return e.theme.color.textPrimary}),(function(e){return e.theme.color.cta}),(function(e){return e.theme.color.ctaHover})),d=function(e){var a=e.isOpen,t=e.onClose;return n.createElement(c.a,{titleText:"Authentication modal",onExit:t,mounted:a,focusDialog:!0,verticallyCenter:!0,width:o.a.Medium},n.createElement(s.b,null,n.createElement(m,null,"\ud83d\udd25 Upgrade for Access"),n.createElement(i,null,"This lesson requires a Pro account. Upgrade now to get full course access and learn how to master the coding interview and land your next software engineering job."),n.createElement(u,null,n.createElement(l,{href:"/pricing?from=upgrade_modal"},"View Upgrade Options"))))};a.a=d},Jpar:function(e,a,t){"use strict";var n=t("q1tI"),c=t("iD9/");a.a=function(e,a){var t=function(e){return a?function(e,a){return a.options.includes(e)?e:a.default}(e,a):e},o=function(a){return e[t(a)||a]};return function(){return n.createElement(c.a,{code:o,getLanguageUsed:t})}}},N3Ux:function(e,a,t){"use strict";var n=t("wx14"),c=t("q1tI"),o=t("nOHt"),s=t("yFXI"),r=t("tU6S"),p=t("ODXe"),m=t("toes"),i=t("DsFX"),u=t("0WSZ"),l=t("uqmq"),d=t("vOnD"),N=t("gWsq"),b=d.e.div.withConfig({componentId:"sc-1x2q5r1-0"})([""]),j=d.e.div.withConfig({componentId:"sc-1x2q5r1-1"})(["display:none;"]),O=Object(d.e)(N.j).withConfig({componentId:"sc-1x2q5r1-2"})(["padding:16px 64px;"]),k=function(e){var a=e.introduction,t=e.solution,n=e.data,o=c.useState(!1),s=Object(p.a)(o,2),r=s[0],d=s[1],N=c.useState(!1),k=Object(p.a)(N,2),f=k[0],h=k[1],w=c.useState(!1),g=Object(p.a)(w,2),v=g[0],y=g[1],x=null===n||void 0===n?void 0:n.users_by_pk,T=null===n||void 0===n?void 0:n.lessons[0],C=c.useCallback((function(){Object(u.c)(T,x)?d(!0):x?y(!0):h(!0)}),[x,T]);return c.createElement(c.Fragment,null,c.createElement(b,null,c.createElement(c.Fragment,null,a),!r&&c.createElement(l.c,null,c.createElement(O,{hoverable:!0,onClick:C},"Show Solution")),r?c.createElement(c.Fragment,null,t):c.createElement(j,null,t)),c.createElement(m.a,{isOpen:f,onClose:function(){return h(!1)}}),c.createElement(i.a,{isOpen:v,onClose:function(){return y(!1)}}))};a.a=function(e){var a=c.useContext(s.a),t=Object(o.useRouter)().query.slug;if(a&&t){var p=Object(r.f)({variables:{slug:t,userId:a}}),m=p.data,i=p.loading,u=p.error;return c.createElement(k,Object(n.a)({loading:i,error:u,data:m},e))}return c.createElement(k,Object(n.a)({loading:!1},e))}},OKDF:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/course/debounce",function(){return t("xUrE")}])},"iD9/":function(e,a,t){"use strict";var n=t("q1tI"),c=t("gWsq"),o=t("AgfK"),s=function(e){var a=e.code,t=Object(o.a)().language;return n.createElement(c.h,null,a(t))};a.a=s},jDXR:function(e,a,t){"use strict";var n=t("q1tI"),c=function(e){var a=e.children;return n.createElement("h2",null,a)};a.a=c},jkan:function(e,a,t){"use strict";var n=t("q1tI"),c=t("vOnD"),o=t("uqmq"),s=t("5nwr"),r=Object(c.e)(o.b).withConfig({componentId:"sc-1u1nk7e-0"})(["display:flex;justify-content:center;align-items:center;flex-direction:column;"]),p=c.e.img.withConfig({componentId:"sc-1u1nk7e-1"})(["border-radius:6px;max-width:",";","{max-width:100% !important;}"],(function(e){var a=e.maxWidth;return a?"".concat(a," !important"):"100%"}),Object(s.b)()),m=c.e.div.withConfig({componentId:"sc-1u1nk7e-2"})(["margin-top:4px;font-size:12px;color:",";text-align:center;width:100%;a,a:hover,a:visited{color:",";text-decoration:underline;}"],(function(e){return e.theme.color.textSecondary}),(function(e){return e.theme.color.textSecondary})),i=function(){return n.createElement("span",null,"Credit:"," ",n.createElement("a",{href:"https://visualgo.net/",target:"_blank",rel:"noopener noreferrer"},"VisuAlgo"))},u=function(e){var a=e.src,t=e.credit,c=e.isVisuAlgo,o=e.maxWidth;return n.createElement(r,null,n.createElement(p,{maxWidth:o,src:a}),!!t&&n.createElement(m,null,t),!!c&&n.createElement(m,null,n.createElement(i,null)))};a.a=u},uqmq:function(e,a,t){"use strict";t.d(a,"b",(function(){return s})),t.d(a,"c",(function(){return r})),t.d(a,"a",(function(){return p}));var n=t("vOnD"),c=t("gWsq"),o=t("SOUA"),s=Object(n.e)(c.h).withConfig({componentId:"sc-16wjbcj-0"})(["margin-top:","px;"],o.a),r=Object(n.e)(s).withConfig({componentId:"sc-16wjbcj-1"})(["display:flex;justify-content:center;align-items:center;"]),p=n.e.div.withConfig({componentId:"sc-16wjbcj-2"})(["margin-top:","px;"],o.a)},xUrE:function(e,a,t){"use strict";t.r(a),t.d(a,"__N_SSG",(function(){return z}));var n=t("wx14"),c=t("q1tI"),o=t("NoRJ"),s=t("Qovc"),r=t("ekJs"),p={segments:[{name:"Introduction",startTimeSeconds:0,endTimeSeconds:8},{name:"Overview of a Debounce",startTimeSeconds:8,endTimeSeconds:77},{name:"Question Prompt",startTimeSeconds:77,endTimeSeconds:176},{name:"Solution Breakdown",startTimeSeconds:176,endTimeSeconds:484},{name:"Code Walkthrough",startTimeSeconds:484,endTimeSeconds:830}]},m=t("Ff2n"),i=t("7ljp"),u=t("N3Ux"),l=t("YFqc"),d=t.n(l),N=t("jkan"),b=t("93Pr"),j=t("uk0T"),O=t("rePB"),k=t("Utoj"),f=t("Jpar"),h={};function w(e){var a=e.components,t=Object(m.a)(e,["components"]);return Object(i.a)("wrapper",Object(n.a)({},h,t,{components:a,mdxType:"MDXLayout"}),Object(i.a)("pre",{className:"language-javascript"},Object(i.a)("code",{parentName:"pre",className:"language-javascript"},Object(i.a)("span",{parentName:"code",className:"token keyword"},"const")," ",Object(i.a)("span",{parentName:"code",className:"token constant"},"WAIT_TIME")," ",Object(i.a)("span",{parentName:"code",className:"token operator"},"=")," ",Object(i.a)("span",{parentName:"code",className:"token number"},"5000"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";")," ",Object(i.a)("span",{parentName:"code",className:"token comment"},"// 5 seconds"),"\n",Object(i.a)("span",{parentName:"code",className:"token keyword"},"const")," debouncedEventListiner ",Object(i.a)("span",{parentName:"code",className:"token operator"},"=")," ",Object(i.a)("span",{parentName:"code",className:"token function"},"debounce"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token punctuation"},")")," ",Object(i.a)("span",{parentName:"code",className:"token arrow operator"},"=>")," ",Object(i.a)("span",{parentName:"code",className:"token console class-name"},"console"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"."),Object(i.a)("span",{parentName:"code",className:"token method function property-access"},"log"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token string"},"'I executed'"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},",")," ",Object(i.a)("span",{parentName:"code",className:"token constant"},"WAIT_TIME"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n\n",Object(i.a)("span",{parentName:"code",className:"token comment"},"// time = 0"),"\n",Object(i.a)("span",{parentName:"code",className:"token function"},"debouncedEventListiner"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n",Object(i.a)("span",{parentName:"code",className:"token comment"},"// wait 2 seconds (time = 2)"),"\n",Object(i.a)("span",{parentName:"code",className:"token function"},"debouncedEventListiner"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n",Object(i.a)("span",{parentName:"code",className:"token comment"},"// wait 2 seconds (time = 4)"),"\n",Object(i.a)("span",{parentName:"code",className:"token function"},"debouncedEventListiner"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n",Object(i.a)("span",{parentName:"code",className:"token comment"},"// wait 2 seconds (time = 6)"),"\n",Object(i.a)("span",{parentName:"code",className:"token function"},"debouncedEventListiner"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n",Object(i.a)("span",{parentName:"code",className:"token comment"},"// do nothing for 5 seconds (time = 11)"),"\n\n",Object(i.a)("span",{parentName:"code",className:"token comment"},"// Executes at time = 11 because previous executions reset it"),"\nexecutes callback at                      ",Object(i.a)("span",{parentName:"code",className:"token operator"},"|"),"\ntime                     ",Object(i.a)("span",{parentName:"code",className:"token number"},"0"),"     ",Object(i.a)("span",{parentName:"code",className:"token number"},"5"),"     ",Object(i.a)("span",{parentName:"code",className:"token number"},"10"),"   ",Object(i.a)("span",{parentName:"code",className:"token number"},"11"),"\n")))}w.isMDXComponent=!0;var g=Object(O.a)({},k.a.Javascript,c.createElement(w,null)),v=Object(f.a)(g,{default:k.a.Javascript,options:[k.a.Javascript]}),y={};function x(e){var a=e.components,t=Object(m.a)(e,["components"]);return Object(i.a)("wrapper",Object(n.a)({},y,t,{components:a,mdxType:"MDXLayout"}),Object(i.a)(b.b,{mdxType:"Section"},Object(i.a)("p",null,"Have you noticed that when you type into a search input, there will be a delay before the typeahead results appear.\nThis functionality is frequently controlled by a pattern called a debounce (it could also be a throttle function that has a similar outcome).\nThe debounce function delays the processing of the ",Object(i.a)("inlineCode",{parentName:"p"},"keyup")," event until the user has stopped typing for a predetermined amount of time."),Object(i.a)(N.a,{src:"/images/debounce-real.gif",maxWidth:"320px",mdxType:"Image"}),Object(i.a)("p",null,"This prevents your UI code from needing to process every event and also drastically reduces the number of API calls sent to your server.\nProcessing every character as it's entered could harm performance and add unnecessary load to your backend."),Object(i.a)("p",null,"Let's see a more obvious example and compare it to what we would expect without debouncing."),Object(i.a)(N.a,{src:"/images/debounce-typing.gif",mdxType:"Image"}),Object(i.a)("p",null,"Implementing a debounce from scratch is a common interview question.\nIt tests your understanding of intermediate and advanced JavaScript concepts such as async programming, callbacks, scope, and closures.\nIt is also a practical solution used in real-world applications to improve performance and demonstrates that you understand the tools to write good code for real users."),Object(i.a)("p",null,"A debounce is a cousin of the ",Object(i.a)(d.a,{href:"/".concat(j.b.Course,"/throttle"),passHref:!0,mdxType:"Link"},Object(i.a)("a",null,"throttle")),", and they both improve the performance of web applications. However, they are used in different cases.\nA debounce is utilized when you only care about the final state. For example, waiting until a user stops typing to fetch typeahead search results.\nA throttle is best used when you want to handle all intermediate states but at a controlled rate. For example, track the screen width as a user resizes the window and rearrange page content while it changes instead of waiting until the user has finished."),Object(i.a)("p",null,Object(i.a)("strong",{parentName:"p"},"Write a function ",Object(i.a)("inlineCode",{parentName:"strong"},"debounce")," that takes a callback function and a ",Object(i.a)("inlineCode",{parentName:"strong"},"wait")," time and prevents the callback from executing until the ",Object(i.a)("inlineCode",{parentName:"strong"},"wait")," time elapses.")),Object(i.a)(v,{mdxType:"InputOutput"}),Object(i.a)("p",null,"Anytime the debounce function is called, it should restart the timer and only execute the callback once the ",Object(i.a)("inlineCode",{parentName:"p"},"wait")," completely elapses."),Object(i.a)(N.a,{src:"/images/debounce-block.gif",mdxType:"Image"})))}x.isMDXComponent=!0;t("jDXR");var T={};function C(e){var a=e.components,t=Object(m.a)(e,["components"]);return Object(i.a)("wrapper",Object(n.a)({},T,t,{components:a,mdxType:"MDXLayout"}),Object(i.a)("pre",{className:"language-javascript"},Object(i.a)("code",{parentName:"pre",className:"language-javascript"},Object(i.a)("span",{parentName:"code",className:"token keyword"},"const")," ",Object(i.a)("span",{parentName:"code",className:"token function-variable function"},"debounce")," ",Object(i.a)("span",{parentName:"code",className:"token operator"},"=")," ",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token parameter"},"func",Object(i.a)("span",{parentName:"span",className:"token punctuation"},",")," wait"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},")")," ",Object(i.a)("span",{parentName:"code",className:"token arrow operator"},"=>")," ",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"{"),"\n  ",Object(i.a)("span",{parentName:"code",className:"token keyword"},"let")," timeout",Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n\n  ",Object(i.a)("span",{parentName:"code",className:"token keyword"},"return")," ",Object(i.a)("span",{parentName:"code",className:"token keyword"},"function")," ",Object(i.a)("span",{parentName:"code",className:"token function"},"executedFunction"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token parameter"},Object(i.a)("span",{parentName:"span",className:"token spread operator"},"..."),"args"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},")")," ",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"{"),"\n    ",Object(i.a)("span",{parentName:"code",className:"token keyword"},"const")," ",Object(i.a)("span",{parentName:"code",className:"token function-variable function"},"later")," ",Object(i.a)("span",{parentName:"code",className:"token operator"},"=")," ",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token punctuation"},")")," ",Object(i.a)("span",{parentName:"code",className:"token arrow operator"},"=>")," ",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"{"),"\n      ",Object(i.a)("span",{parentName:"code",className:"token function"},"clearTimeout"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),"timeout",Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n      ",Object(i.a)("span",{parentName:"code",className:"token function"},"func"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token spread operator"},"..."),"args",Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n    ",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"}"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n\n    ",Object(i.a)("span",{parentName:"code",className:"token function"},"clearTimeout"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),"timeout",Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n    timeout ",Object(i.a)("span",{parentName:"code",className:"token operator"},"=")," ",Object(i.a)("span",{parentName:"code",className:"token function"},"setTimeout"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),"later",Object(i.a)("span",{parentName:"code",className:"token punctuation"},",")," wait",Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n  ",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"}"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"}"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n")))}C.isMDXComponent=!0;var E=Object(O.a)({},k.a.Javascript,c.createElement(C,null)),I=Object(f.a)(E,{default:k.a.Javascript,options:[k.a.Javascript]}),D={};function q(e){var a=e.components,t=Object(m.a)(e,["components"]);return Object(i.a)("wrapper",Object(n.a)({},D,t,{components:a,mdxType:"MDXLayout"}),Object(i.a)("pre",{className:"language-javascript"},Object(i.a)("code",{parentName:"pre",className:"language-javascript"},Object(i.a)("span",{parentName:"code",className:"token keyword"},"var")," returnedFunction ",Object(i.a)("span",{parentName:"code",className:"token operator"},"=")," ",Object(i.a)("span",{parentName:"code",className:"token function"},"debounce"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token keyword"},"function"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token punctuation"},")")," ",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"{"),"\n  ",Object(i.a)("span",{parentName:"code",className:"token comment"},"// All the taxing stuff you do"),"\n",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"}"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},",")," ",Object(i.a)("span",{parentName:"code",className:"token number"},"250"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n\n",Object(i.a)("span",{parentName:"code",className:"token dom variable"},"window"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"."),Object(i.a)("span",{parentName:"code",className:"token method function property-access"},"addEventListener"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token string"},"'resize'"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},",")," returnedFunction",Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n")))}q.isMDXComponent=!0;var S=Object(O.a)({},k.a.Javascript,c.createElement(q,null)),F=Object(f.a)(S,{default:k.a.Javascript,options:[k.a.Javascript]}),X={};function _(e){var a=e.components,t=Object(m.a)(e,["components"]);return Object(i.a)("wrapper",Object(n.a)({},X,t,{components:a,mdxType:"MDXLayout"}),Object(i.a)("pre",{className:"language-javascript"},Object(i.a)("code",{parentName:"pre",className:"language-javascript"},Object(i.a)("span",{parentName:"code",className:"token comment"},"// Returns a function, that as long as it continues to be invoked, will not"),"\n",Object(i.a)("span",{parentName:"code",className:"token comment"},"// be triggered. The function will be called after it stops being executed for"),"\n",Object(i.a)("span",{parentName:"code",className:"token comment"},"// `wait` milliseconds."),"\n",Object(i.a)("span",{parentName:"code",className:"token keyword"},"const")," ",Object(i.a)("span",{parentName:"code",className:"token function-variable function"},"debounce")," ",Object(i.a)("span",{parentName:"code",className:"token operator"},"=")," ",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token parameter"},"func",Object(i.a)("span",{parentName:"span",className:"token punctuation"},",")," wait"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},")")," ",Object(i.a)("span",{parentName:"code",className:"token arrow operator"},"=>")," ",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"{"),"\n  ",Object(i.a)("span",{parentName:"code",className:"token keyword"},"let")," timeout",Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n\n  ",Object(i.a)("span",{parentName:"code",className:"token comment"},"// This is the function that is returned and will be executed many times"),"\n  ",Object(i.a)("span",{parentName:"code",className:"token comment"},"// We spread (...args) to capture any number of parameters we want to pass"),"\n  ",Object(i.a)("span",{parentName:"code",className:"token keyword"},"return")," ",Object(i.a)("span",{parentName:"code",className:"token keyword"},"function")," ",Object(i.a)("span",{parentName:"code",className:"token function"},"executedFunction"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token parameter"},Object(i.a)("span",{parentName:"span",className:"token spread operator"},"..."),"args"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},")")," ",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"{"),"\n\n    ",Object(i.a)("span",{parentName:"code",className:"token comment"},"// The callback function to be executed after"),"\n    ",Object(i.a)("span",{parentName:"code",className:"token comment"},"// the debounce time has elapsed"),"\n    ",Object(i.a)("span",{parentName:"code",className:"token keyword"},"const")," ",Object(i.a)("span",{parentName:"code",className:"token function-variable function"},"later")," ",Object(i.a)("span",{parentName:"code",className:"token operator"},"=")," ",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token punctuation"},")")," ",Object(i.a)("span",{parentName:"code",className:"token arrow operator"},"=>")," ",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"{"),"\n      ",Object(i.a)("span",{parentName:"code",className:"token comment"},"// clear the timeout to indicate the debounce ended"),"\n      ",Object(i.a)("span",{parentName:"code",className:"token comment"},"// and make sure it is all cleaned up"),"\n      ",Object(i.a)("span",{parentName:"code",className:"token function"},"clearTimeout"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),"timeout",Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n\n      ",Object(i.a)("span",{parentName:"code",className:"token comment"},"// Execute the callback"),"\n      ",Object(i.a)("span",{parentName:"code",className:"token function"},"func"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(i.a)("span",{parentName:"code",className:"token spread operator"},"..."),"args",Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n    ",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"}"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n\n    ",Object(i.a)("span",{parentName:"code",className:"token comment"},"// This will reset the waiting every function execution."),"\n    ",Object(i.a)("span",{parentName:"code",className:"token comment"},"// This is the step that prevents the function from"),"\n    ",Object(i.a)("span",{parentName:"code",className:"token comment"},"// being executed because it will never reach the"),"\n    ",Object(i.a)("span",{parentName:"code",className:"token comment"},"// inside of the previous setTimeout"),"\n    ",Object(i.a)("span",{parentName:"code",className:"token function"},"clearTimeout"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),"timeout",Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n\n    ",Object(i.a)("span",{parentName:"code",className:"token comment"},"// Restart the debounce waiting period."),"\n    ",Object(i.a)("span",{parentName:"code",className:"token comment"},"// setTimeout returns a truthy value"),"\n    timeout ",Object(i.a)("span",{parentName:"code",className:"token operator"},"=")," ",Object(i.a)("span",{parentName:"code",className:"token function"},"setTimeout"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},"("),"later",Object(i.a)("span",{parentName:"code",className:"token punctuation"},",")," wait",Object(i.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n  ",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"}"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n",Object(i.a)("span",{parentName:"code",className:"token punctuation"},"}"),Object(i.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n")))}_.isMDXComponent=!0;var A=Object(O.a)({},k.a.Javascript,c.createElement(_,null)),J=Object(f.a)(A,{default:k.a.Javascript,options:[k.a.Javascript]}),M={};function L(e){var a=e.components,t=Object(m.a)(e,["components"]);return Object(i.a)("wrapper",Object(n.a)({},M,t,{components:a,mdxType:"MDXLayout"}),Object(i.a)(b.b,{mdxType:"Section"},Object(i.a)("p",null,"Let's dive in and see what a debounce looks like:"),Object(i.a)(I,{mdxType:"DebounceSolution"}),Object(i.a)("p",null,"A debounce is a higher-order function, which is a function that returns another function (named ",Object(i.a)("inlineCode",{parentName:"p"},"executedFunction")," here for clarity).\nThis is done to form a closure around the ",Object(i.a)("inlineCode",{parentName:"p"},"func")," and ",Object(i.a)("inlineCode",{parentName:"p"},"wait")," function parameters and the ",Object(i.a)("inlineCode",{parentName:"p"},"timeout")," variable so that their values are preserved.\nThe following is a definition of each variable:"),Object(i.a)("ul",null,Object(i.a)("li",{parentName:"ul"},Object(i.a)("inlineCode",{parentName:"li"},"func"),": The function that you want to execute after the debounce time"),Object(i.a)("li",{parentName:"ul"},Object(i.a)("inlineCode",{parentName:"li"},"wait"),": The amount of time you want the debounce function to wait after the last received action before executing ",Object(i.a)("inlineCode",{parentName:"li"},"func"),". For our typeahead example, it would be the amount of time to wait after the last key press."),Object(i.a)("li",{parentName:"ul"},Object(i.a)("inlineCode",{parentName:"li"},"timeout"),": The value used to indicate a running debounce.")),Object(i.a)("p",null,"We can use a debounce by doing:"),Object(i.a)(F,{mdxType:"DebounceUsage"}),Object(i.a)("p",null,"Since debounce returns a function, the ",Object(i.a)("inlineCode",{parentName:"p"},"executedFunction")," from the first example and the ",Object(i.a)("inlineCode",{parentName:"p"},"returnedFunction")," function from the second example are the same function. Every time the window is resized, it will execute ",Object(i.a)("inlineCode",{parentName:"p"},"executedFunction"),"/",Object(i.a)("inlineCode",{parentName:"p"},"returnedFunction"),"."),Object(i.a)("p",null,"Our ",Object(i.a)("inlineCode",{parentName:"p"},"executedFunction")," spreads over the parameters (",Object(i.a)("inlineCode",{parentName:"p"},"...args"),") to allow for the debounce function to receive any number of arguments to pass to the callback."),Object(i.a)("p",null,"We declare a callback function named ",Object(i.a)("inlineCode",{parentName:"p"},"later")," which is the function that is executed after the end of the debounce timer.\nThis is what will be called after the ",Object(i.a)("inlineCode",{parentName:"p"},"setTimeout")," expires."),Object(i.a)("p",null,"Next, we ",Object(i.a)("inlineCode",{parentName:"p"},"clearTimeout")," which had prevented the callback from being executed and thus restarts the debounce.\nThen we (re-)declare ",Object(i.a)("inlineCode",{parentName:"p"},"timeout")," which starts the debounce waiting period.\nIf the full ",Object(i.a)("inlineCode",{parentName:"p"},"wait")," time elapses before another event, then we execute the ",Object(i.a)("inlineCode",{parentName:"p"},"later")," callback function.\nThis in turn calls ",Object(i.a)("inlineCode",{parentName:"p"},"func(...args)"),"."),Object(i.a)("p",null,"There is a more advanced version of this where we can pass an ",Object(i.a)("inlineCode",{parentName:"p"},"immediate")," flag to debounce.\nCurrently we always wait until the end of the debounce to execute the callback,\nbut with ",Object(i.a)("inlineCode",{parentName:"p"},"immediate"),", you can change it such that the function executes at the leading edge and won't allow you to execute again until it has delayed calling long enough to deplete the timer."),Object(i.a)("p",null,"Common scenarios for a debounce are resize, scroll, and keyup/keydown events.\nIn addition, you should consider wrapping any interaction that triggers excessive calculations or API calls with a debounce."),Object(i.a)("p",null,"Here\u2019s a commented version of the function as well."),Object(i.a)(J,{mdxType:"DebounceCommented"})))}L.isMDXComponent=!0;var W={};function U(e){var a=e.components,t=Object(m.a)(e,["components"]);return Object(i.a)("wrapper",Object(n.a)({},W,t,{components:a,mdxType:"MDXLayout"}),Object(i.a)(u.a,{introduction:Object(i.a)(x,{mdxType:"Introduction"}),solution:Object(i.a)(L,{mdxType:"Solution"}),mdxType:"QuestionHiddenSolution"}))}U.isMDXComponent=!0;var P=function(e){return c.createElement(r.a,Object(n.a)({},e,{Content:U,video:p}))},z=!0;a.default=Object(s.a)((function(e){return c.useEffect((function(){e.lesson&&"ACTIVE"===e.lesson.status||(window.location.href="/course")}),[e]),e.lesson&&"ACTIVE"===e.lesson.status?c.createElement(o.a,Object(n.a)({},e,{Component:P})):null}),{ssr:!1})}},[["OKDF",0,1,4,6,5,9,12,11,13,14,15,18,17,2,3,7,8,10,16,19,20]]]);