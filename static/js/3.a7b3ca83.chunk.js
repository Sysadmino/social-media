(this["webpackJsonpsocial-media"]=this["webpackJsonpsocial-media"]||[]).push([[3],{280:function(e,t,i){"use strict";var o=i(2),c=(i(0),i(10)),n=i(16),s=i(1),r=function(e){return{isAuth:e.auth.isAuth}};t.a=function(e){return Object(c.b)(r)((function(t){return t.isAuth?Object(s.jsx)(e,Object(o.a)({},t)):Object(s.jsx)(n.a,{to:"/login"})}))}},282:function(e,t,i){e.exports={"header-img":"profile-info_header-img__1-ZB_","ava-img":"profile-info_ava-img__3bjYi",info:"profile-info_info__2LN_w",description:"profile-info_description__1bMXw","info-block":"profile-info_info-block__2VTOf","edit-button":"profile-info_edit-button__2Q6Di"}},285:function(e,t,i){"use strict";i.r(t);var o=i(2),c=i(0),n=i.n(c),s=i(10),r=i(16),l=i(26),a=i(46),j=i(282),b=i.n(j),d=i(1),u=function(e){var t=e.profileStatus,i=e.updateUserProfileStatus,o=e.isOwner,n=Object(c.useState)(!1),s=Object(l.a)(n,2),r=s[0],a=s[1],j=Object(c.useState)(t),b=Object(l.a)(j,2),u=b[0],f=b[1];Object(c.useEffect)((function(){f(t)}),[t]);return Object(d.jsxs)("div",{children:[r&&Object(d.jsx)("div",{children:Object(d.jsx)("input",{autoFocus:!0,onBlur:function(){a(!1),i(u)},value:u,onChange:function(e){var t=e.target.value;f(t)}})}),!r&&Object(d.jsx)("div",{children:Object(d.jsx)("span",{onDoubleClick:function(){a(!!o)},children:t||"\u041d\u0435\u0442 \u0441\u0442\u0430\u0442\u0443\u0441\u0430"})})]})},f=n.a.memo(u),O=i(95),h=i(40),x=i(32),p=function(e){var t=e.saveProfileCallback,i=e.profile,c=Object(x.e)({defaultValues:{fullName:null===i||void 0===i?void 0:i.fullName,aboutMe:null===i||void 0===i?void 0:i.aboutMe,lookingForAJob:null===i||void 0===i?void 0:i.lookingForAJob,lookingForAJobDescription:null===i||void 0===i?void 0:i.lookingForAJobDescription},mode:"onChange"}),n=c.register,s=c.handleSubmit;return Object(d.jsxs)("form",{onSubmit:s((function(e){t(e)})),children:[Object(d.jsxs)("div",{children:[Object(d.jsx)("b",{children:"Full name:"}),Object(d.jsx)(h.a,{type:"text",placeholder:"Full name",name:Object(o.a)({},n("fullName"))})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("b",{children:"About me:"}),Object(d.jsx)(h.b,{type:"text",placeholder:"About me",name:Object(o.a)({},n("aboutMe"))})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("b",{children:"Looking for a job:"}),Object(d.jsx)(h.a,{type:"checkbox",name:Object(o.a)({},n("lookingForAJob"))})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("b",{children:"My professional skills:"}),Object(d.jsx)(h.b,{type:"text",placeholder:"My professional skills",name:Object(o.a)({},n("lookingForAJobDescription"))})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("b",{children:"Contacts"}),Object(d.jsx)("div",{children:Object(d.jsxs)("b",{children:["vk:"," ",Object(d.jsx)(h.a,{type:"text",placeholder:"vk",name:Object(o.a)({},n("contacts.vk"))})]})}),Object(d.jsx)("div",{children:Object(d.jsxs)("b",{children:["facebook:"," ",Object(d.jsx)(h.a,{type:"text",placeholder:"facebook",name:Object(o.a)({},n("contacts.facebook"))})]})}),Object(d.jsx)("div",{children:Object(d.jsxs)("b",{children:["website:"," ",Object(d.jsx)(h.a,{type:"text",placeholder:"website",name:Object(o.a)({},n("contacts.website"))})]})}),Object(d.jsx)("div",{children:Object(d.jsxs)("b",{children:["twitter:"," ",Object(d.jsx)(h.a,{type:"text",placeholder:"twitter",name:Object(o.a)({},n("contacts.twitter"))})]})}),Object(d.jsx)("div",{children:Object(d.jsxs)("b",{children:["instagram:"," ",Object(d.jsx)(h.a,{type:"text",placeholder:"instagram",name:Object(o.a)({},n("contacts.instagram"))})]})}),Object(d.jsx)("div",{children:Object(d.jsxs)("b",{children:["youtube:"," ",Object(d.jsx)(h.a,{type:"text",placeholder:"youtube",name:Object(o.a)({},n("contacts.youtube"))})]})}),Object(d.jsx)("div",{children:Object(d.jsxs)("b",{children:["github:"," ",Object(d.jsx)(h.a,{type:"text",placeholder:"github",name:Object(o.a)({},n("contacts.github"))})]})}),Object(d.jsx)("div",{children:Object(d.jsxs)("b",{children:["mainLink:"," ",Object(d.jsx)(h.a,{type:"text",placeholder:"mainLink",name:Object(o.a)({},n("contacts.mainLink"))})]})})]}),Object(d.jsx)("button",{children:"save"})]})},v=function(e){var t,i=e.isOwner,o=e.profile,n=e.profileStatus,s=e.saveProfile,r=e.updateUserProfileStatus,j=e.updateUserProfilePhoto,u=Object(c.useState)(!1),h=Object(l.a)(u,2),x=h[0],v=h[1];if(!o)return Object(d.jsx)(a.a,{inBlock:!0,transparent:!0});return Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)("div",{className:b.a.info,children:[Object(d.jsxs)("div",{className:b.a["info-block"],children:[Object(d.jsx)("img",{alt:"",className:b.a["ava-img"],src:(null===o||void 0===o||null===(t=o.photos)||void 0===t?void 0:t.small)||O.a}),i&&Object(d.jsx)("input",{type:"file",onChange:function(e){var t,i;(null===(t=e.target.files)||void 0===t?void 0:t.length)&&0!==(null===(i=e.target.files)||void 0===i?void 0:i.length)&&j(e.target.files[0])}}),Object(d.jsx)("br",{}),x?Object(d.jsx)(p,{saveProfileCallback:function(e){s(e),v(!1)},profile:o}):Object(d.jsx)(m,{profile:o,isOwner:i,goToEditMode:function(){v(!0)}})]}),Object(d.jsx)("div",{className:b.a.description,children:Object(d.jsx)(f,{isOwner:i,profileStatus:n,updateUserProfileStatus:r})})]})})},m=function(e){var t=e.isOwner,i=e.profile,o=Object.keys(i.contacts).filter((function(e){return""!==i.contacts[e]}));return Object(d.jsxs)(d.Fragment,{children:[t&&Object(d.jsx)("button",{className:b.a["edit-button"],onClick:e.goToEditMode,children:"Edit profile"}),(null===i||void 0===i?void 0:i.fullName)&&Object(d.jsxs)("div",{children:[Object(d.jsx)("b",{children:"Full name:"})," ",null===i||void 0===i?void 0:i.fullName]}),(null===i||void 0===i?void 0:i.aboutMe)&&Object(d.jsxs)("div",{children:[Object(d.jsx)("b",{children:"About me:"})," ",null===i||void 0===i?void 0:i.aboutMe]}),(null===i||void 0===i?void 0:i.lookingForAJob)&&Object(d.jsxs)("div",{children:[Object(d.jsx)("b",{children:"Looking for a job:"})," ",(null===i||void 0===i?void 0:i.lookingForAJob)?"Yes":"No"]}),(null===i||void 0===i?void 0:i.lookingForAJobDescription)&&Object(d.jsxs)("div",{children:[Object(d.jsx)("b",{children:"My professional skills:"})," ",null===i||void 0===i?void 0:i.lookingForAJobDescription]}),(null===i||void 0===i?void 0:i.contacts)&&0!==o.length&&Object(d.jsxs)("div",{children:[Object(d.jsx)("b",{children:"Contacts"}),Object.keys(i.contacts).map((function(e){return""!==i.contacts[e]&&Object(d.jsx)(g,{contactTitle:e,contactValue:i.contacts[e]},e)}))]})]})},g=function(e){var t=e.contactTitle,i=e.contactValue;return Object(d.jsxs)("div",{children:[Object(d.jsxs)("b",{children:[t,":"]})," ",i]})},k=n.a.memo(v),P=function(e){return Object(d.jsx)("div",{children:Object(d.jsx)(k,{isOwner:e.isOwner,profile:e.profile,saveProfile:e.saveProfile,profileStatus:e.profileStatus,updateUserProfilePhoto:e.updateUserProfilePhoto,updateUserProfileStatus:e.updateUserProfileStatus})})},S=i(42),y=i(280),U=i(29);t.default=Object(S.c)(Object(s.b)((function(e){return{profile:e.profilePage.profile,profileStatus:e.profilePage.profileStatus,authorizedUserId:e.auth.id,isAuth:e.auth.isAuth}}),{getUserProfile:U.f.getUserProfile,getUserProfileStatus:U.f.getUserProfileStatus,updateUserProfileStatus:U.f.updateUserProfileStatus,updateUserProfilePhoto:U.f.updatePhotoRequest,saveProfile:U.f.saveProfile}),y.a)((function(e){var t=e.authorizedUserId,i=e.getUserProfile,n=e.getUserProfileStatus,s=Object(r.h)().userId,l=Object(r.g)();return Object(c.useEffect)((function(){var e=+s;e||(e=t)||l.push("/login"),e?(i(e),n(e)):console.error("id should exists in URI params or in state (authorizedUserId)")}),[s]),Object(d.jsx)(P,Object(o.a)(Object(o.a)({},e),{},{isOwner:!s}))}))}}]);
//# sourceMappingURL=3.a7b3ca83.chunk.js.map