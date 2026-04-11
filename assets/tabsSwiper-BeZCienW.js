import{S as c}from"./swiper-core-CCBjStua.js";const a=new c(".tabs__swiper",{spaceBetween:30,autoHeight:!0}),s=document.querySelectorAll(".tabs__header-wrap .tabs__tab");s.forEach((e,t)=>{e.addEventListener("click",()=>{a.slideTo(t)})});a.on("slideChange",()=>{const e=a.realIndex;s.forEach((t,r)=>{t.classList.toggle("tabs__tab--active",r===e)})});
//# sourceMappingURL=tabsSwiper-BeZCienW.js.map
