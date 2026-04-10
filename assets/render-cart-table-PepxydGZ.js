import{s as _,g as b,u as o,a as v}from"./burgerSide-_98NqH6S.js";function m(t){const a=Number(t.currentPrice)||0,n=Number(t.quantity)||1,e=a*n;return`
    <div class="cart-table__item" data-product-id="${t.id}">
      <div class="cart-table__wrap-row">
        <div class="cart-table__product-name ta-l">
          ${t.name} ${t.weight?`${t.weight}г.`:""}
        </div>
        <div class="cart-table__product-amount">
          <div class="quantity-picker">
            <button type="button" class="quantity-picker__button quantity-picker__minus" data-quantity-minus>
              <svg>
                <use href="#icon-range-arrow"></use>
              </svg>
            </button>
            <input type="number" value="${n}" min="1" class="quantity-picker__input" data-quantity-input>
            <button type="button" class="quantity-picker__button quantity-picker__plus" data-quantity-plus>
              <svg>
                <use href="#icon-range-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
        <div class="cart-table__product-price">
          <span>${a} грн.</span>
        </div>
        <div class="cart-table__product-price--total">
          <span>${e} грн.</span>
        </div>
      </div>
    </div>
  `}function d(){const t=document.querySelector(".cart-table__result-sum-amount");t&&(t.textContent=String(v()))}function u(){const t=document.querySelector(".cart-table__wrap");if(!t)return;const a=b();if(!a.length){t.innerHTML=`
      <div class="cart-table__item">
        <div class="cart-table__wrap-row">
          <div class="cart-table__product-name ta-l">Корзина пуста</div>
          <div class="cart-table__product-amount"></div>
          <div class="cart-table__product-price"></div>
          <div class="cart-table__product-price--total"></div>
        </div>
      </div>
    `,d();return}t.innerHTML=a.map(m).join(""),d()}function y(){document.addEventListener("click",t=>{const a=t.target.closest("[data-quantity-plus]"),n=t.target.closest("[data-quantity-minus]");if(!a&&!n)return;const e=t.target.closest(".cart-table__item"),r=e?.querySelector("[data-quantity-input]"),i=e?.dataset.productId;if(!r||!i)return;const c=Number(r.value)||1,s=a?c+1:Math.max(1,c-1);r.value=String(s),o(i,s),u()}),document.addEventListener("change",t=>{const a=t.target.closest("[data-quantity-input]");if(!a)return;const e=a.closest(".cart-table__item")?.dataset.productId;if(!e)return;const r=Math.max(1,Number(a.value)||1);a.value=String(r),o(e,r),u()})}let l=!1,p=!1;function g(){document.querySelector(".cart-table")&&(u(),l||(y(),l=!0),p||(_(u),p=!0))}export{g as i};
//# sourceMappingURL=render-cart-table-PepxydGZ.js.map
