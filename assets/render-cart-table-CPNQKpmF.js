import{s as _,g as b,u as o,a as v}from"./burgerSide-_98NqH6S.js";function m(t){const a=Number(t.currentPrice)||0,e=Number(t.quantity)||1,r=a*e;return`
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
            <input type="number" value="${e}" min="1" class="quantity-picker__input" data-quantity-input>
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
          <span>${r} грн.</span>
        </div>
      </div>
    </div>
  `}function d(){const t=document.querySelector(".cart-table__result-sum-amount");t&&(t.textContent=String(v()))}function u(){const t=document.querySelector(".cart-table__wrap");if(!t)return;const a=document.querySelector(".cart-table__header"),e=b();if(!e.length){t.innerHTML=`
      <div class="cart-table__item">
        <div class="cart-table__wrap-row">
          <div class="cart-table__product-name ta-l">Корзина пуста</div>
          <div class="cart-table__product-amount"></div>
          <div class="cart-table__product-price"></div>
          <div class="cart-table__product-price--total"></div>
        </div>
      </div>
    `,d();return}t.innerHTML=a.innerHTML+e.map(m).join(""),d()}function y(){document.addEventListener("click",t=>{const a=t.target.closest("[data-quantity-plus]"),e=t.target.closest("[data-quantity-minus]");if(!a&&!e)return;const r=t.target.closest(".cart-table__item"),n=r?.querySelector("[data-quantity-input]"),c=r?.dataset.productId;if(!n||!c)return;const i=Number(n.value)||1,s=a?i+1:Math.max(1,i-1);n.value=String(s),o(c,s),u()}),document.addEventListener("change",t=>{const a=t.target.closest("[data-quantity-input]");if(!a)return;const r=a.closest(".cart-table__item")?.dataset.productId;if(!r)return;const n=Math.max(1,Number(a.value)||1);a.value=String(n),o(r,n),u()})}let l=!1,p=!1;function g(){document.querySelector(".cart-table")&&(u(),l||(y(),l=!0),p||(_(u),p=!0))}export{g as i};
//# sourceMappingURL=render-cart-table-CPNQKpmF.js.map
