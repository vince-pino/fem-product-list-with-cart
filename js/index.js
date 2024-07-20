import { foodData } from './food-data.js';

function displayAllItems() {
  foodData.forEach((item) => {
    const itemsContainer = document.querySelector("#items-container");
    itemsContainer.innerHTML += `
      <div class="card relative">
          <div id="ID" data-id="${item.id}"></div>
          <div id="image-container" class="bg-[url('${item.desktop}')] bg-no-repeat bg-cover h-60 w-full mb-9 rounded-lg">
          </div>
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
        </div>
    `;
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
      quantity += 1;
      cartQuantity += 1;
      imageContainer.classList.add("border-2", "border-[hsl(14,86%,42%)]");
      localStorage.setItem("cart-quantity", cartQuantity);
      displayQuantity();
      displayCartQuantity();
      displayCartItems();
      displayAddedItem();
    }
    function handleDecrementClick() {
      if (quantity > 0) {
        quantity -= 1;
        cartQuantity -= 1;
        localStorage.setItem("cart-quantity", cartQuantity);
        displayQuantity();
        displayCartQuantity();
        displayCartItems();
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
      }
    }
    function handleIncrementClick() {
      quantity += 1;
      cartQuantity += 1;
      localStorage.setItem("cart-quantity", cartQuantity);
      displayQuantity();
      displayCartQuantity();
      displayCartItems();
    }
    function displayQuantity() {
      btnText.textContent = quantity;
    }
    function displayCartQuantity() {
      cartQuantityEl.textContent = cartQuantity;
    }
    function displayCartItems() {
      if (cartQuantity > 0) {
        document.querySelector("#illustration").style.display = "none";
        document.querySelector("#empty-cart").style.display = "none";
      } else {
        document.querySelector("#illustration").style.display = "block";
        document.querySelector("#empty-cart").style.display = "block";
      }
    }
    function displayAddedItem() {
      const foundItem = getItem(id);
      const name = foundItem.name;
      const price = (foundItem.price).toFixed(2);

      const cartItemContainer = document.querySelector("#cart-items-container");
      cartItemContainer.innerHTML += `
        <div class="flex justify-between items-center pb-4 mb-4 border-b-2">
          <div>
            <div class="font-semibold">
              ${name}
            </div>
            <span class="text-[hsl(14,86%,42%)] font-semibold mr-4">1x</span>
            <span class="text-[#CAAFA7] mr-2">@ ${price}</span>
            <span class="text-[#92807a]">$${price}</span>
          </div>
          <div class="flex items-center justify-center w-5 h-5 border-2 border-[#CAAFA7] rounded-full cursor-pointer duration-300 ease-out hover:border-gray-700 group">
            <svg class="text-[#CAAFA7] duration-300 ease-out group-hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="currentColor" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
          </div>
        </div>
      `;
    }
    function getItem(id) {
      return foodData.find((item) => item.id === id);
    }

    addToCartBtn.addEventListener("click", handleAddToCartClick);
    decrementBtn.addEventListener("click", handleDecrementClick);
    incrementBtn.addEventListener("click", handleIncrementClick);
  });
}
displayAllItems();