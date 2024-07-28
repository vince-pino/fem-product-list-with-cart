import { foodData } from "./food-data.js";

function displayAllItems() {
  foodData.forEach((item) => {
    const itemsContainer = document.querySelector("#items-container");
    const card = document.createElement("div");
    card.className = "card relative";
    card.innerHTML = `
    <div id="ID" data-id="${item.id}"></div>
    <div id="image-container" class="bg-no-repeat bg-cover h-60 w-full mb-9 rounded-lg"></div>
    <div class="text-sm font-thin">
      ${item.name} 
    </div>
    <div class="text-base font-semibold">
      ${item.description}
    </div>
    <div class="text-rose-700 font-bold">
      $${item.price.toFixed(2)}
    </div>
    <button class="flex items-center justify-center bg-white w-40 h-12 rounded-full border border-gray-400 absolute top-[220px] left-1/2 -translate-x-1/2 duration-300 ease-out hover:border-rose-900 group">
      <span id="decrement-btn" class="hidden">
          <svg class="text-white group-hover:text-red-400" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="currentColor" viewBox="0 0 10 2">
              <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z"/>
          </svg>
      </span>
      <img id="cart-icon" src="assets/images/icon-add-to-cart.svg" alt="">
      <span class="ml-2 font-semibold text-sm group-hover:text-[hsl(14,86%,42%)]" data-value="0" id="btn-text">
        Add to cart
      </span>
      <span id="increment-btn" class="hidden">
        <svg class="text-white group-hover:text-red-400" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 10 10"><path fill="currentColor" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
      </span>
    </button>
  `;

    const imageContainer = card.querySelector("#image-container");
    imageContainer.style.backgroundImage = `url('${item.desktop}')`;

    itemsContainer.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");

  const cartQuantityEl = document.querySelector("#cart-quantity");
  let cartQuantity = parseInt(localStorage.getItem("cart-quantity")) || 0;

  if (!isNaN(cartQuantity)) {
    cartQuantity = 0;
  }

  cards.forEach((card) => {
    const addToCartBtn = card.querySelector("button");
    const btnText = addToCartBtn.querySelector("#btn-text");
    const imageContainer = card.querySelector("#image-container");
    const cartIcon = addToCartBtn.querySelector("#cart-icon");

    const decrementBtn = addToCartBtn.querySelector("#decrement-btn");
    const incrementBtn = addToCartBtn.querySelector("#increment-btn");

    const id = card.querySelector("#ID").dataset.id;
    let quantity = 0;

    function handleAddToCartClick() {
      addToCartBtn.className =
        "flex items-center justify-between bg-[hsl(14,86%,42%)] w-40 h-12 px-3 rounded-full absolute top-[220px] left-1/2 -translate-x-1/2";
      addToCartBtn.disabled = true;

      decrementBtn.className =
        "w-5 h-5 border-2 border-white rounded-full flex items-center justify-center cursor-pointer duration-300 ease-out hover:bg-white group";

      incrementBtn.className =
        "w-5 h-5 border-2 border-white rounded-full flex items-center justify-center cursor-pointer duration-300 ease-out hover:bg-white group";

      cartIcon.className = "hidden";
      btnText.className = "text-white";
      quantity = 1;
      cartQuantity += 1;
      imageContainer.classList.add("border-2", "border-[hsl(14,86%,42%)]");
      localStorage.setItem("cart-quantity", cartQuantity);
      displayQuantity();
      displayCartQuantity();
      displayAddedItem();
      displayTotalCost();
    }
    function handleDecrementClick() {
      if (quantity > 0) {
        quantity -= 1;
        cartQuantity -= 1;
        localStorage.setItem("cart-quantity", cartQuantity);
        displayQuantity();
        displayCartQuantity();
        changeCartItemQuantity();
        displayTotalCost();
      }

      if (quantity === 0) {
        addToCartBtn.className =
          "flex items-center justify-center bg-white w-40 h-12 rounded-full border border-gray-400 absolute top-[220px] left-1/2 -translate-x-1/2 duration-300 ease-out hover:border-rose-900 group";
        decrementBtn.className = "hidden";
        incrementBtn.className = "hidden";
        cartIcon.className = "block";
        btnText.className =
          "ml-2 font-semibold text-sm group-hover:text-[hsl(14,86%,42%)]";
        btnText.textContent = "Add to cart";
        imageContainer.classList.remove("border-2", "border-[hsl(14,86%,42%)]");
        addToCartBtn.disabled = false;

        const cartItems = document.querySelectorAll(".cart-item");
        cartItems.forEach((item) => {
          const itemID = item.querySelector(".cart-item-id").dataset.id;
          if (itemID === id) {
            item.querySelector(".cart-item-id").closest(".cart-item").remove();
          }
        });
      }
      displayTotalCost();
    }
    function handleIncrementClick() {
      quantity += 1;
      cartQuantity += 1;
      localStorage.setItem("cart-quantity", cartQuantity);
      displayQuantity();
      displayCartQuantity();
      changeCartItemQuantity();
      displayTotalCost();
    }
    function handleRemoveBtnClick() {
      const item = this.closest(".cart-item");
      const itemID = item.querySelector(".cart-item-id").dataset.id;
      const cartItemQuantityEl = item.querySelector(".cart-item-quantity",).textContent;
      const totalItemPriceEl = item.querySelector(".total-item-price").textContent;
      let totalItemPrice = parseFloat(totalItemPriceEl.replace("$", ""));
      let cartItemQuantity = parseFloat(cartItemQuantityEl.replace("x", ""));
      cartQuantity -= cartItemQuantity;
      

      cards.forEach((card) => {
        const id = card.querySelector("#ID").dataset.id;
        if (id === itemID) {
          const addToCartBtn = card.querySelector("button");
          const btnText = addToCartBtn.querySelector("#btn-text");
          const imageContainer = card.querySelector("#image-container");
          const cartIcon = addToCartBtn.querySelector("#cart-icon");
          const decrementBtn = addToCartBtn.querySelector("#decrement-btn");
          const incrementBtn = addToCartBtn.querySelector("#increment-btn");

          const totalCost = document.querySelector("#total");
          let total = parseFloat(totalCost.textContent.replace("$", ""));
          total -= totalItemPrice;
          totalCost.textContent = "$" + total.toFixed(2);
              
          addToCartBtn.className =
            "flex items-center justify-center bg-white w-40 h-12 rounded-full border border-gray-400 absolute top-[220px] left-1/2 -translate-x-1/2 duration-300 ease-out hover:border-rose-900 group";
          decrementBtn.className = "hidden";
          incrementBtn.className = "hidden";
          cartIcon.className = "block";
          btnText.className =
            "ml-2 font-semibold text-sm group-hover:text-[hsl(14,86%,42%)]";
          btnText.textContent = "Add to cart";
          imageContainer.classList.remove(
            "border-2",
            "border-[hsl(14,86%,42%)]",
          );
          addToCartBtn.disabled = false;
        }
      });

      displayCartQuantity();
      item.remove();
    }
    function displayQuantity() {
      btnText.textContent = quantity;
    }
    function displayCartQuantity() {
      cartQuantityEl.textContent = cartQuantity;

      if (cartQuantity > 0) {
        document.querySelector("#illustration").style.display = "none";
        document.querySelector("#empty-cart").style.display = "none";
        document
          .querySelector("#total-cost-container")
          .classList.remove("hidden");
        document.querySelector("#total-cost-container").classList.add("flex");
        document
          .querySelector("#carbon-neutral-container")
          .classList.remove("hidden");
        document
          .querySelector("#carbon-neutral-container")
          .classList.add("flex");
        document.querySelector("#confirm-button").classList.remove("hidden");
      } else {
        document.querySelector("#illustration").style.display = "block";
        document.querySelector("#empty-cart").style.display = "block";
        document.querySelector("#total-cost-container").classList.add("hidden");
        document
          .querySelector("#total-cost-container")
          .classList.remove("flex");
        document
          .querySelector("#carbon-neutral-container")
          .classList.add("hidden");
        document
          .querySelector("#carbon-neutral-container")
          .classList.remove("flex");
        document.querySelector("#confirm-button").classList.add("hidden");
      }
    }
    function displayAddedItem() {
      const foundItem = getItem(id);
      const cartItemId = foundItem.id;
      const name = foundItem.name;
      const price = foundItem.price.toFixed(2);

      const cartItemContainer = document.querySelector("#cart-items-container");
      cartItemContainer.innerHTML += `
        <div class="cart-item flex justify-between items-center pb-4 mb-4 border-b-2">
          <div>
            <div class="cart-item-id" data-id="${cartItemId}"></div>
            <div class="font-semibold">
              ${name}
            </div>
            <span class="cart-item-quantity text-[hsl(14,86%,42%)] font-semibold mr-4 ">1x</span>
            <span class="text-[#CAAFA7] mr-2">@ ${price}</span>
            <span class="total-item-price text-[#92807a] ">$${price}</span>
          </div>
          <div class="remove-button flex items-center justify-center w-5 h-5 border-2 border-[#CAAFA7] rounded-full cursor-pointer duration-300 ease-out hover:border-gray-700 group">
            <svg class="text-[#CAAFA7] duration-300 ease-out group-hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="currentColor" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
          </div>
        </div>
      `;

      const removeBtn = document.querySelectorAll(".remove-button");
      removeBtn.forEach((button) => {
        button.addEventListener("click", handleRemoveBtnClick);
      });
    }
    function getItem(id) {
      return foodData.find((item) => item.id === id);
    }
    function changeCartItemQuantity() {
      const cartItems = document.querySelectorAll(".cart-item");
      const foundItem = getItem(id);
      const price = foundItem.price;
      let total = (price * quantity).toFixed(2);
      cartItems.forEach((item) => {
        const itemID = item.querySelector(".cart-item-id").dataset.id;
        const cartItemQuantity = item.querySelector(".cart-item-quantity");
        if (itemID === id) {
          item.querySelector(".total-item-price").textContent = `$${total}`;
          cartItemQuantity.textContent = quantity + "x";
        }
      });
    }
    function displayTotalCost() {
      const totalCost = document.querySelector("#total");
      const totalItemPrice = document.querySelectorAll(".total-item-price");
      let total = 0;
      totalItemPrice.forEach((itemPrice) => {
        const priceString = itemPrice.textContent;
        total += parseFloat(priceString.split("").slice(1).join(""));
      });
      totalCost.textContent = "$" + total.toFixed(2);
    }
    
    addToCartBtn.addEventListener("click", handleAddToCartClick);
    decrementBtn.addEventListener("click", handleDecrementClick);
    incrementBtn.addEventListener("click", handleIncrementClick);

  });

  function displayOrderedItems() {
    document.querySelector(".confirm-order-modal").classList.remove("hidden");
    document.querySelector(".confirm-order-modal").classList.add("flex");

    const orderedItemsContainer = document.querySelector("#ordered-items-container");
    const totalOrderCost = document.querySelector("#total").textContent;

      const items = document.querySelectorAll(".cart-item");
      items.forEach((item) => {
        const itemID = item.querySelector(".cart-item-id").dataset.id;
        const foundItem = foodData.find((item) => item.id === itemID);
        const name = foundItem.name;
        const price = foundItem.price.toFixed(2);
        const imageUrl = foundItem.thumbnail;
        const quantity = item.querySelector(".cart-item-quantity").textContent;
        const total = item.querySelector(".total-item-price").textContent;

        orderedItemsContainer.innerHTML += `
          <div class="flex justify-between items-center border-b-2 pb-4 pt-4">
              <div class="flex">
                <img
                  class="mr-3 h-12 w-12 rounded-lg border bg-cover"
                  src="${imageUrl}"
                  alt=""
                />
                <div>
                  <div class="font-semibold">${name}</div>
                  <span
                    class="ordered-item-quantity mr-4 font-semibold text-[hsl(14,86%,42%)]"
                  >
                    ${quantity}
                  </span>
                  <span class="mr-2 text-[#CAAFA7]">@ ${price}</span>
                </div>
              </div>
              <span class="total-ordered-item-price text-[#92807a]">${total}</span>
            </div>
        `;
      });
    document.querySelector("#total-order-confirmed").textContent = totalOrderCost;
  }

  const confirmBtn = document.querySelector("#confirm-button");
  confirmBtn.addEventListener("click", displayOrderedItems);
}
displayAllItems();
