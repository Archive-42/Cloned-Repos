_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[90],{"3s7W":function(e,a,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/course/palindromes-permutataions-anagrams",function(){return n("P986")}])},"9XTu":function(e,a,n){"use strict";n.d(a,"a",(function(){return m}));var t=n("wx14"),c=n("Ff2n"),o=(n("q1tI"),n("7ljp")),s=n("jDXR"),r=n("gWsq"),p={};function m(e){var a=e.components,n=Object(c.a)(e,["components"]);return Object(o.a)("wrapper",Object(t.a)({},p,n,{components:a,mdxType:"MDXLayout"}),Object(o.a)(s.a,{mdxType:"SubsectionHeader"},"Permutations"),Object(o.a)("p",null,"A permutation is a different ordering of a string's characters."),Object(o.a)("p",null,"For example, a 3 letter word will have 6 (",Object(o.a)("inlineCode",{parentName:"p"},"3! = 3 * 2 * 1"),") permutations.\nConsider the word ",Object(o.a)("inlineCode",{parentName:"p"},"dev"),":"),Object(o.a)(r.h,{mdxType:"Container"},Object(o.a)("pre",{className:"language-javascript"},Object(o.a)("code",{parentName:"pre",className:"language-javascript"},Object(o.a)("span",{parentName:"code",className:"token number"},"1.")," dev\n",Object(o.a)("span",{parentName:"code",className:"token number"},"2.")," dve\n",Object(o.a)("span",{parentName:"code",className:"token number"},"3.")," evd\n",Object(o.a)("span",{parentName:"code",className:"token number"},"4.")," edv\n",Object(o.a)("span",{parentName:"code",className:"token number"},"5.")," vde\n",Object(o.a)("span",{parentName:"code",className:"token number"},"6.")," ved\n"))),Object(o.a)("p",null,"If a question asks if strings are permutations of each other, it is asking if they have the same characters in a different order."))}m.isMDXComponent=!0},AgfK:function(e,a,n){"use strict";var t=n("q1tI"),c=n("tGWw");a.a=function(){return Object(t.useContext)(c.a)}},JVRC:function(e,a,n){"use strict";n.d(a,"a",(function(){return O}));var t=n("wx14"),c=n("Ff2n"),o=n("q1tI"),s=n("7ljp"),r=n("jDXR"),p=n("gWsq"),m=n("rePB"),i=n("Utoj"),u=n("Jpar"),l={};function d(e){var a=e.components,n=Object(c.a)(e,["components"]);return Object(s.a)("wrapper",Object(t.a)({},l,n,{components:a,mdxType:"MDXLayout"}),Object(s.a)("pre",{className:"language-javascript"},Object(s.a)("code",{parentName:"pre",className:"language-javascript"},Object(s.a)("span",{parentName:"code",className:"token comment"},"// Regex to remove non-alphanumeric"),"\n",Object(s.a)("span",{parentName:"code",className:"token keyword"},"const")," ",Object(s.a)("span",{parentName:"code",className:"token function-variable function"},"removeNonAlphanumeric")," ",Object(s.a)("span",{parentName:"code",className:"token operator"},"=")," ",Object(s.a)("span",{parentName:"code",className:"token parameter"},"string")," ",Object(s.a)("span",{parentName:"code",className:"token arrow operator"},"=>")," string",Object(s.a)("span",{parentName:"code",className:"token punctuation"},"."),Object(s.a)("span",{parentName:"code",className:"token method function property-access"},"replace"),Object(s.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(s.a)("span",{parentName:"code",className:"token regex"},Object(s.a)("span",{parentName:"span",className:"token regex-delimiter"},"/"),Object(s.a)("span",{parentName:"span",className:"token language-regex"},Object(s.a)("span",{parentName:"span",className:"token charset"},Object(s.a)("span",{parentName:"span",className:"token charset-punctuation"},"["),Object(s.a)("span",{parentName:"span",className:"token charset-negation"},"^"),Object(s.a)("span",{parentName:"span",className:"token range"},"0",Object(s.a)("span",{parentName:"span",className:"token range-punctuation"},"-"),"9"),Object(s.a)("span",{parentName:"span",className:"token range"},"a",Object(s.a)("span",{parentName:"span",className:"token range-punctuation"},"-"),"z"),Object(s.a)("span",{parentName:"span",className:"token charset-punctuation"},"]"))),Object(s.a)("span",{parentName:"span",className:"token regex-delimiter"},"/"),Object(s.a)("span",{parentName:"span",className:"token regex-flags"},"gi")),Object(s.a)("span",{parentName:"code",className:"token punctuation"},",")," ",Object(s.a)("span",{parentName:"code",className:"token string"},"''"),Object(s.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(s.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n\n",Object(s.a)("span",{parentName:"code",className:"token keyword"},"const")," ",Object(s.a)("span",{parentName:"code",className:"token function-variable function"},"isPalindrome")," ",Object(s.a)("span",{parentName:"code",className:"token operator"},"=")," ",Object(s.a)("span",{parentName:"code",className:"token parameter"},"string")," ",Object(s.a)("span",{parentName:"code",className:"token arrow operator"},"=>")," ",Object(s.a)("span",{parentName:"code",className:"token punctuation"},"{"),"\n  ",Object(s.a)("span",{parentName:"code",className:"token comment"},"// For simplicity, I'm doing the transforming here at an assumed O(n) cost"),"\n  ",Object(s.a)("span",{parentName:"code",className:"token comment"},"// You could also not transform it and consider this when you compare characters"),"\n  ",Object(s.a)("span",{parentName:"code",className:"token keyword"},"const")," formattedString ",Object(s.a)("span",{parentName:"code",className:"token operator"},"=")," ",Object(s.a)("span",{parentName:"code",className:"token function"},"removeNonAlphanumeric"),Object(s.a)("span",{parentName:"code",className:"token punctuation"},"("),"string",Object(s.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(s.a)("span",{parentName:"code",className:"token punctuation"},"."),Object(s.a)("span",{parentName:"code",className:"token method function property-access"},"toLowerCase"),Object(s.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(s.a)("span",{parentName:"code",className:"token punctuation"},")"),Object(s.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n\n  ",Object(s.a)("span",{parentName:"code",className:"token comment"},"// Walk from the beginning and end to the middle and compare each character"),"\n  ",Object(s.a)("span",{parentName:"code",className:"token keyword"},"for")," ",Object(s.a)("span",{parentName:"code",className:"token punctuation"},"("),Object(s.a)("span",{parentName:"code",className:"token keyword"},"let")," i ",Object(s.a)("span",{parentName:"code",className:"token operator"},"=")," ",Object(s.a)("span",{parentName:"code",className:"token number"},"0"),Object(s.a)("span",{parentName:"code",className:"token punctuation"},";")," i ",Object(s.a)("span",{parentName:"code",className:"token operator"},"<")," formattedString",Object(s.a)("span",{parentName:"code",className:"token punctuation"},"."),Object(s.a)("span",{parentName:"code",className:"token property-access"},"length")," ",Object(s.a)("span",{parentName:"code",className:"token operator"},"/")," ",Object(s.a)("span",{parentName:"code",className:"token number"},"2"),Object(s.a)("span",{parentName:"code",className:"token punctuation"},";")," i",Object(s.a)("span",{parentName:"code",className:"token operator"},"++"),Object(s.a)("span",{parentName:"code",className:"token punctuation"},")")," ",Object(s.a)("span",{parentName:"code",className:"token punctuation"},"{"),"\n    ",Object(s.a)("span",{parentName:"code",className:"token comment"},"// If the characters are ever not equal, it's not a palindrome"),"\n    ",Object(s.a)("span",{parentName:"code",className:"token keyword"},"if")," ",Object(s.a)("span",{parentName:"code",className:"token punctuation"},"("),"formattedString",Object(s.a)("span",{parentName:"code",className:"token punctuation"},"["),"i",Object(s.a)("span",{parentName:"code",className:"token punctuation"},"]")," ",Object(s.a)("span",{parentName:"code",className:"token operator"},"!==")," formattedString",Object(s.a)("span",{parentName:"code",className:"token punctuation"},"["),"string",Object(s.a)("span",{parentName:"code",className:"token punctuation"},"."),Object(s.a)("span",{parentName:"code",className:"token property-access"},"length")," ",Object(s.a)("span",{parentName:"code",className:"token operator"},"-")," ",Object(s.a)("span",{parentName:"code",className:"token number"},"1")," ",Object(s.a)("span",{parentName:"code",className:"token operator"},"-")," i",Object(s.a)("span",{parentName:"code",className:"token punctuation"},"]"),Object(s.a)("span",{parentName:"code",className:"token punctuation"},")")," ",Object(s.a)("span",{parentName:"code",className:"token punctuation"},"{"),"\n      ",Object(s.a)("span",{parentName:"code",className:"token keyword"},"return")," ",Object(s.a)("span",{parentName:"code",className:"token boolean"},"false"),Object(s.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n    ",Object(s.a)("span",{parentName:"code",className:"token punctuation"},"}"),"\n  ",Object(s.a)("span",{parentName:"code",className:"token punctuation"},"}"),"\n\n  ",Object(s.a)("span",{parentName:"code",className:"token keyword"},"return")," ",Object(s.a)("span",{parentName:"code",className:"token boolean"},"true"),Object(s.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n",Object(s.a)("span",{parentName:"code",className:"token punctuation"},"}"),Object(s.a)("span",{parentName:"code",className:"token punctuation"},";"),"\n")))}d.isMDXComponent=!0;var N=Object(m.a)({},i.a.Javascript,o.createElement(d,null)),b=Object(u.a)(N),j={};function O(e){var a=e.components,n=Object(c.a)(e,["components"]);return Object(s.a)("wrapper",Object(t.a)({},j,n,{components:a,mdxType:"MDXLayout"}),Object(s.a)(r.a,{mdxType:"SubsectionHeader"},"Palindromes"),Object(s.a)("p",null,"A palindrome is a word, phrase, or sequence of characters that is the same forward as it is backward."),Object(s.a)("p",null,"Examples of palindromes include:"),Object(s.a)(p.h,{mdxType:"Container"},Object(s.a)("pre",{className:"language-javascript"},Object(s.a)("code",{parentName:"pre",className:"language-javascript"},"pop\n\nlevel\n\nracecar\n\n",Object(s.a)("span",{parentName:"code",className:"token maybe-class-name"},"Never")," odd or even ",Object(s.a)("span",{parentName:"code",className:"token comment"},"// ignore white space and case"),"\n"))),Object(s.a)("p",null,"To check for a palindrome, we can do the following:"),Object(s.a)(b,{mdxType:"IsPalindrome"}))}O.isMDXComponent=!0},Jpar:function(e,a,n){"use strict";var t=n("q1tI"),c=n("iD9/");a.a=function(e,a){var n=function(e){return a?function(e,a){return a.options.includes(e)?e:a.default}(e,a):e},o=function(a){return e[n(a)||a]};return function(){return t.createElement(c.a,{code:o,getLanguageUsed:n})}}},P986:function(e,a,n){"use strict";n.r(a),n.d(a,"__N_SSG",(function(){return f}));var t=n("wx14"),c=n("q1tI"),o=n("NoRJ"),s=n("Qovc"),r=n("ekJs"),p={segments:[{name:"Introduction",startTimeSeconds:0,endTimeSeconds:43},{name:"Palindromes",startTimeSeconds:43,endTimeSeconds:113},{name:"Permutations",startTimeSeconds:113,endTimeSeconds:139},{name:"Anagrams",startTimeSeconds:139,endTimeSeconds:188},{name:"Recap",startTimeSeconds:188,endTimeSeconds:230}]},m=n("Ff2n"),i=n("7ljp"),u=n("93Pr"),l=n("JVRC"),d=n("9XTu"),N=n("jDXR"),b={};function j(e){var a=e.components,n=Object(m.a)(e,["components"]);return Object(i.a)("wrapper",Object(t.a)({},b,n,{components:a,mdxType:"MDXLayout"}),Object(i.a)(N.a,{mdxType:"SubsectionHeader"},"Anagrams"),Object(i.a)("p",null,"An anagram is a word or phrase that when rearranged will create a new word or phrase.\nFor example ",Object(i.a)("inlineCode",{parentName:"p"},"silent")," and ",Object(i.a)("inlineCode",{parentName:"p"},"listen")," are anagrams of each other."),Object(i.a)("p",null,"You may think anagrams and permutations look similar to each other, and you would be right.\nAll anagrams are permutations of each other, but not all permutations are anagrams.\nBy definition, an anagram must have ",Object(i.a)("em",{parentName:"p"},"meaning")," (be a real word or phrase),\nbut a permutation can be any ordering of the characters without needing to have meaning."),Object(i.a)("p",null,"However, ",Object(i.a)("strong",{parentName:"p"},"interviews often use the terms anagram and permutation interchangeably"),",\nand if the question asks for anagrams, it may not specifically require that the words have meaning."))}j.isMDXComponent=!0;var O={};function k(e){var a=e.components,n=Object(m.a)(e,["components"]);return Object(i.a)("wrapper",Object(t.a)({},O,n,{components:a,mdxType:"MDXLayout"}),Object(i.a)(u.b,{mdxType:"Section"},Object(i.a)("p",null,"What makes strings unique is that there is a limited set of characters (eg. 26 in the English alphabet),\nand their order and number of times a character appears conveys meaning.\nFor string interview questions, it's very common to test on this through palindromes, permutations, and anagrams.\nHaving an understanding of what these terms mean before going in can help you feel comfortable diving into a problem.")),Object(i.a)(u.b,{mdxType:"Section"},Object(i.a)(l.a,{mdxType:"Palindromes"})),Object(i.a)(u.b,{mdxType:"Section"},Object(i.a)(d.a,{mdxType:"Permutations"})),Object(i.a)(u.b,{mdxType:"Section"},Object(i.a)(j,{mdxType:"Anagrams"})))}k.isMDXComponent=!0;var g=function(e){return c.createElement(r.a,Object(t.a)({},e,{Content:k,video:p}))},f=!0;a.default=Object(s.a)((function(e){return c.useEffect((function(){e.lesson&&"ACTIVE"===e.lesson.status||(window.location.href="/course")}),[e]),e.lesson&&"ACTIVE"===e.lesson.status?c.createElement(o.a,Object(t.a)({},e,{Component:g})):null}),{ssr:!1})},"iD9/":function(e,a,n){"use strict";var t=n("q1tI"),c=n("gWsq"),o=n("AgfK"),s=function(e){var a=e.code,n=Object(o.a)().language;return t.createElement(c.h,null,a(n))};a.a=s},jDXR:function(e,a,n){"use strict";var t=n("q1tI"),c=function(e){var a=e.children;return t.createElement("h2",null,a)};a.a=c}},[["3s7W",0,1,4,6,5,9,12,11,13,14,15,18,17,2,3,7,8,10,16,19,20]]]);