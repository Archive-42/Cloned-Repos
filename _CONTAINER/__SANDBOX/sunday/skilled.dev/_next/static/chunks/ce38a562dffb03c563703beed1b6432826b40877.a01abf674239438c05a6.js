(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[24],{"2DGu":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var i=n("q1tI"),l=n("nBDQ"),a=function(){var e=i.useContext(l.a).appState.videoWidth;return{videoWidth:e,textWidth:100-e}}},"gh+C":function(e,t,n){"use strict";var i,l=n("wx14"),a=n("ODXe"),o=n("q1tI"),s=n("7l9Y"),r=n.n(s),u=n("wTVd"),c=n("2DGu"),d=n("Un8n"),m=n("5DUM"),f=n("K/TP"),p=n("8M3D"),E=n("u6Fh"),g=n("Ajb8"),v=n("wABe"),b=n("i0HL"),S=n("vhnP"),O=n("64ku"),h=n("oEKK"),V=n("Zb/x"),C=n("AgfK"),I=n("Utoj"),T=n("a6RD"),x=n.n(T),j=n("DIQZ"),w=n("LfjD"),y=x()((function(){return Promise.all([n.e(28),n.e(29),n.e(27),n.e(38)]).then(n.bind(null,"Pm4i"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["Pm4i"]},modules:["./UserSolution"]}}),U=x()((function(){return Promise.all([n.e(28),n.e(27),n.e(31)]).then(n.bind(null,"swto"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["swto"]},modules:["./CodeMirrorWrapper"]}}),A=function(e){var t=e.video,n=e.userId,l=e.lessonId,a=e.savedCode,s=e.savedNotes,r=e.userCode,u=e.testsCode,c=e.handleTestsChange,d=e.solutionCode,m=e.validationItems,f=e.mode,p=e.activeTab,E=e.setActiveTab,g=e.tabSize,v=e.toggleToResults,b=e.setExecutionResults,S=e.toggleIsOpen,O=e.isFetchingUserLessonDetails;return o.createElement(o.Fragment,null,o.createElement(w.n,null,o.createElement(w.o,null,o.createElement(w.v,null,o.createElement(w.u,{isActive:p===i.UserSolution,onClick:function(){return E(i.UserSolution)}},i.UserSolution),o.createElement(w.u,{isActive:p===i.Video,onClick:function(){return E(i.Video)}},i.Video),o.createElement(w.u,{isActive:p===i.Validate,onClick:function(){return E(i.Validate)}},i.Validate),o.createElement(w.u,{isActive:p===i.Solution,onClick:function(){return E(i.Solution)}},i.Solution),o.createElement(w.u,{isActive:p===i.Tests,onClick:function(){return E(i.Tests)}},i.Tests),o.createElement(w.u,{isActive:p===i.Notes,onClick:function(){return E(i.Notes)}},i.Notes))),o.createElement(y,{userId:n,lessonId:l,visible:p===i.UserSolution,mode:f,userCode:r,savedCode:a,testsCode:u,tabSize:g,toggleToResults:v,setExecutionResults:b,toggleIsOpen:S,isFetchingUserLessonDetails:O}),o.createElement(w.y,{visible:p===i.Video},t),p===i.Validate&&o.createElement(w.r,null,o.createElement(w.q,null,o.createElement("ol",null,m.map((function(e,t){return o.createElement("li",{key:t},o.createElement(e,null))}))))),p===i.Solution&&o.createElement(U,{value:d,mode:f}),p===i.Tests&&o.createElement(U,{onChange:c,value:u,mode:f}),p===i.Notes&&o.createElement(j.a,{userId:n,lessonId:l,savedNotes:s})))},k=n("MPYF");!function(e){e.UserSolution="Code",e.Hints="Hints",e.Validate="Validate",e.Tests="Tests",e.Solution="Solution",e.Video="Video",e.MyTests="My Tests",e.Results="Results",e.Notes="Notes"}(i||(i={}));var R,D=function(e){var t=e.userId,n=e.lessonId,l=e.video,s=e.status,r=e.draft,u=e.QuestionStatement,d=e.validationItems,m=e.getUserAnswer,f=e.getTests,p=e.getSolutionCode,E=e.toggleIsOpen,g=e.isFetchingUserLessonDetails,v=Object(c.a)().videoWidth,b=Object(C.a)().language,S=I.j[b].tabSize,O=I.b[b],h=o.useState(o.createElement(k.b,null)),T=Object(a.a)(h,2),x=T[0],j=T[1],y=o.useState(!1),U=Object(a.a)(y,2),R=U[0],D=U[1],L=o.useState(i.UserSolution),P=Object(a.a)(L,2),N=P[0],F=P[1],Q=o.useCallback((function(){D(!0)}),[F,D]),q=null===r||void 0===r?void 0:r.code,M=null===s||void 0===s?void 0:s.notes,W=o.useRef(null),B=o.useRef(null),K=o.useRef(null),z=W.current?W.current.innerText:"",G=B.current?B.current.innerText:"",J=K.current?K.current.innerText:"",_=o.useMemo((function(){return m(b)}),[m(b),b]),H=o.useMemo((function(){return f(b)}),[f(b),b]),Z=o.useMemo((function(){return p(b)}),[p(b),b]),X=o.useState(""),Y=Object(a.a)(X,2),$=Y[0],ee=Y[1],te=o.useCallback((function(e,t,n){ee(n)}),[]);return o.useEffect((function(){ee(J)}),[J]),o.createElement(o.Fragment,null,o.createElement(w.e,null,o.createElement(A,{userId:t,lessonId:n,video:l,savedNotes:M,savedCode:q,QuestionStatement:u,testsCode:$,handleTestsChange:te,solutionCode:G,validationItems:d,mode:O,activeTab:N,setActiveTab:F,executionResults:x,userCode:z,tabSize:S,toggleToResults:Q,setExecutionResults:j,toggleIsOpen:E,isFetchingUserLessonDetails:g})),o.createElement(V.a,{fluid:!0,width:v,maxWidth:"100%",isOpen:R,toggle:function(){return D(!R)},label:"your solution results"},o.createElement(w.j,null,o.createElement("p",{style:{marginBottom:"12px",fontWeight:600}},"Test Results"),o.createElement("div",null,x))),o.createElement("div",{ref:W,style:{display:"none"}},_),o.createElement("div",{ref:K,style:{display:"none"}},H),o.createElement("div",{ref:B,style:{display:"none"}},Z))},L=n("UmdJ"),P=n("gWsq"),N=n("93Pr"),F=n("vr1N"),Q=n("TnaC"),q=n("EGS6"),M=n("wKAn"),W=n("3x/V");!function(e){e.Validation="VALIDATION",e.SolutionVideo="SOLUTION_VIDEO"}(R||(R={}));var B=function(e){var t=e.slug,n=e.lesson,i=e.status,s=e.draft,C=e.isFetchingUserLessonDetails,T=e.Introduction,x=e.QuestionStatement,j=e.Solution,w=e.LearningOutcomes,y=e.validationItems,U=e.explanationItems,A=e.getUserAnswer,k=e.getTests,B=e.getSolutionCode,K=e.isCodeEditorOpen,z=e.toggleCodeEditor,G=e.video,J=Object(m.a)(),_=Object(c.a)(),H=_.videoWidth,Z=_.textWidth,X=o.useRef(null),Y=Object(f.b)(X),$=Y.refs,ee=Y.setActiveRef,te=o.useCallback((function(){ee(f.a.SolutionRef)}),[$,ee]),ne=Object(d.a)({explanationLength:U.length,validationLength:y.length}),ie=ne.incrementExplanationStep,le=ne.incrementValidationStep,ae=ne.totalExplanationSteps,oe=ne.totalValidationSteps,se=ne.setQuestionComplete,re=ne.isComplete,ue=ne.explanationStepsViewed,ce=ne.validationStepsViewed,de=ne.activeSection,me=ne.SectionType,fe=o.useState(null),pe=Object(a.a)(fe,2),Ee=pe[0],ge=pe[1],ve=o.useCallback((function(){Ee===R.Validation?ge(null):ge(R.Validation)}),[Ee,ge]),be=Object(F.a)(n.id),Se=be.solutionVideoUrl,Oe=be.hasFetchedVideo,he=o.useState(M.a.Text),Ve=Object(a.a)(he,2),Ce=Ve[0],Ie=Ve[1],Te=o.useCallback((function(){Ce===M.a.Text?Ie(M.a.Video):Ie(M.a.Text)}),[Ce]);return o.createElement(u.a,null,o.createElement(W.h,null,o.createElement(p.a,{slug:n.slug,activeLeftPanel:Ce,toggleActiveLeftPanel:Te}),o.createElement(W.p,null,o.createElement(W.g,{ref:X,width:Z,hasScroll:Ce===M.a.Text},o.createElement(W.f,null,o.createElement(W.l,{isActive:Ce===M.a.Text,onClick:function(){return Ie(M.a.Text)}},"Question Breakdown"),o.createElement(W.m,{isActive:Ce===M.a.Video,onClick:function(){return Ie(M.a.Video)}},"Solution Video")),o.createElement(W.b,{isPadded:!0,isActive:Ce===M.a.Text},o.createElement("div",null,o.createElement(g.a,{hideNavButtons:!0,type:n.type,title:n.title,slug:n.slug,categoryTitle:n.category.title,categorySlug:n.category.slug,description:n.description,LearningOutcomes:w})),o.createElement(v.a,null,o.createElement(W.j,{"aria-label":"Question introduction",tabIndex:-1,ref:function(e){return $[f.a.IntroductionRef]=e},style:{paddingTop:0},isOpen:!0},o.createElement(T,null),!!n.introductionVideoUrl&&o.createElement(N.c,null,o.createElement(r.a,Object(l.a)({},I.l,{url:n.introductionVideoUrl})))),o.createElement(W.a,{isOpen:ue>0},o.createElement(W.j,{"aria-label":"Explanation of the question",tabIndex:-1,ref:function(e){return $[f.a.ExplanationRef]=e},isOpen:ue>0||re},o.createElement(S.a,{items:U,isComplete:re,explanationStepsViewed:ue,isActiveSection:de===me.Explanation,scrollRef:X})),re&&o.createElement(W.j,{tabIndex:-1,ref:function(e){return $[f.a.ValidationRef]=e},isOpen:!0},o.createElement(O.a,{items:y,isComplete:re,validationStepsViewed:0,isActiveSection:de===me.Validation})),o.createElement(W.j,{tabIndex:-1,ref:function(e){return $[f.a.SolutionRef]=e},isOpen:re},re&&o.createElement(E.a,null),re&&Se&&o.createElement(W.e,null,o.createElement(N.c,null,o.createElement(r.a,Object(l.a)({},I.l,{url:Se})))),re&&o.createElement(j,null)))),o.createElement(P.h,null,o.createElement(W.j,{"aria-label":"Buttons to trigger additional steps",tabIndex:-1,ref:function(e){return $[f.a.ButtonsRef]=e},isOpen:!0},o.createElement(Q.a,{slug:t,incrementExplanationStep:ie,incrementValidationStep:le,setQuestionComplete:se,isComplete:re,hasStartedLesson:ue>0||ce>0,explanationStepsViewed:ue,validationStepsViewed:ce,totalExplanationSteps:ae,totalValidationSteps:oe,toggleTray:ve,scrollToSolution:te,toggleCodeEditor:z})))),o.createElement(W.b,{isActive:Ce===M.a.Video},o.createElement(W.d,null,o.createElement(h.a,{isLoading:!Oe,url:Se,segments:G.segments,uniqueKey:n.id}))),o.createElement(W.n,null,o.createElement(V.a,{isSidebarPage:!0,width:60,isOpen:Ee===R.Validation&&!re,toggle:ve,label:"validate your answer"},o.createElement(W.j,{"aria-label":"Validate that your answer is optimal",tabIndex:-1},o.createElement(W.o,null,I.i),o.createElement(b.a,{items:y,viewedCount:ce})),o.createElement(q.a,{slug:t,incrementExplanationStep:ie,incrementValidationStep:le,setQuestionComplete:se,isComplete:re,hasStartedLesson:ue>0||ce>0,explanationStepsViewed:ue,validationStepsViewed:ce,totalExplanationSteps:ae,totalValidationSteps:oe,toggleTray:ve,scrollToSolution:te,toggleCodeEditor:z})))),o.createElement(W.i,{width:H},o.createElement(D,{video:o.createElement(h.a,{isLoading:!Oe,url:Se,segments:G.segments,uniqueKey:n.id}),isFetchingUserLessonDetails:C,status:i,draft:s,userId:J,lessonId:n.id,QuestionStatement:x,validationItems:y,getUserAnswer:A,getTests:k,getSolutionCode:B,title:n.title,toggleIsOpen:z})))),o.createElement(W.c,null,o.createElement(L.b,{isFetchingUserLessonDetails:C,status:i,draft:s,userId:J,lessonId:n.id,QuestionStatement:x,validationItems:y,getUserAnswer:A,getTests:k,getSolutionCode:B,title:n.title,isOpen:K,toggleIsOpen:z})))};t.a=B},kB7q:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return a}));var i=n("q1tI"),l=function(){return null},a=function(e){return i.createElement(i.Fragment,null,"// Upgrade for full course access")}},oEKK:function(e,t,n){"use strict";var i=n("5bJ9");t.a=i.a},vr1N:function(e,t,n){"use strict";var i=n("rePB"),l=n("ODXe"),a=n("q1tI"),o=n("+Znz"),s=n("pf24");var r=function(){var e=Object(a.useRef)(!0),t=Object(a.useCallback)((function(){return e.current}),[]);return Object(a.useEffect)((function(){return function(){e.current=!1}}),[]),t};function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}t.a=function(e){var t=a.useState(!1),n=Object(l.a)(t,2),c=n[0],d=n[1],m=a.useState({solutionVideoUrl:null}),f=Object(l.a)(m,2),p=f[0],E=f[1],g=r();return a.useEffect((function(){e&&o.a.get("lessons/".concat(e,"/solutionVideoUrl")).then((function(e){g()&&(e&&e.solutionVideoUrl&&E(e),d(!0))})).catch((function(e){s.a.withScope((function(t){s.a.captureException(e)}))}))}),[e]),function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({hasFetchedVideo:c},p)}},wTVd:function(e,t,n){"use strict";var i=n("q1tI"),l=n("Mcjp"),a=n("i+kJ"),o=function(e){var t=e.children,n=e.hideSkipToContent,o=e.subNav;return i.createElement(a.a,null,!n&&i.createElement(l.a,null),o,i.createElement(a.b,{tabIndex:-1},t))};t.a=o}}]);