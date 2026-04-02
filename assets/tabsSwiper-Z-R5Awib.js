import{S as r}from"./swiper-CJIL9GVZ.js";const a=new r(".tabs__swiper",{spaceBetween:30}),s=document.querySelectorAll(".tabs__header-wrap .tabs__tab");s.forEach((e,t)=>{e.addEventListener("click",()=>{a.slideTo(t)})});a.on("slideChange",()=>{const e=a.realIndex;s.forEach((t,c)=>{t.classList.toggle("tabs__tab--active",c===e)})});
//# sourceMappingURL=tabsSwiper-Z-R5Awib.js.map
