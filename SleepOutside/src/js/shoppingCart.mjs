import { getLocalStorage, setLocalStorage, showCartQuantity } from "./utils.mjs"; 
// import Alert from "./alert.mjs"

export default class ShoppingCart {
    constructor(key, parentSelector) {
      this.key = key;
      this.parentSelector = parentSelector;
    }

    renderCartContents(location='so-cart') {
      const cartItems = getLocalStorage(location);
      const htmlItems = cartItems.map((item) => this.cartItemTemplate(item));
      
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
      this.cartTotal(location);
      if (location=='so-cart'){
        let deleteBtns = document.querySelectorAll(".cart-card_delete_btn");
        deleteBtns.forEach(item => {item.addEventListener('click', () => {this.removeProductFromCart(`${item.value}`)})});
      }else if (location=='wishlist'){
        let deleteBtns = document.querySelectorAll(".cart-card_delete_btn");
        deleteBtns.forEach(item => {item.addEventListener('click', () => {debugger;this.removeProductFromCart(`${item.value}`,'wishlist')})});
        let quantityInputs = document.querySelectorAll(".cart-card__quantity");
        quantityInputs.forEach((node)=>{node.style='display:none;'})
        document.querySelector('.hide-total').prepend(document.createElement('div'));
        document.querySelector('.cart-total').style='display:none;';
      }

      
      
      // adding update quantity functionality to our cart

      let quantityInputs = document.querySelectorAll(".qty-in-cart");
      quantityInputs.forEach(item => {item.addEventListener('change', () => {
        if(item.value  >= 1){
          this.updateItemQuantity(cartItems, item.id, item.value);
          this.renderCartContents();
          showCartQuantity();
          this.cartTotal();
        } else {
          this.renderCartContents();
          alert("Please use the delete button to delete an item.")
  
        }
      })})
    }

    //function to create item in cart template

    cartItemTemplate(item) {
      const productDetailsPage = `../product_pages/index.html?product=${item.Id}`;
      const newItem = `<img class="cart_img_small_view"
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
      <li class="cart-card divider">
      <a href="${productDetailsPage}" class="cart-card__image">
        <img class="cart_img"
          src="${item.colorSelectedImgSrc}"
          alt="${item.Name}"
        />
      </a>
      <a href="${productDetailsPage}">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.colorSelected}</p>
      <p class="cart-card__quantity"><label for="qty">qty: </label><input name="qty" id="${item.Id}" class="qty-in-cart" type="number" step="1" pattern="^[2-9]|[1-9][0-9]+$" value="${parseInt(item.Quantity)}"></p>
      <button class="cart-card_delete_btn" value="${item.Id}">X</button>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
    
      return newItem;
    }
   
    //The cartTotal function calculates the sum of the cost of items in the cart

    cartTotal(location='so-cart') {
      //save the items array in local storage to the variable 'cart'

      let cartItems = getLocalStorage(location);
    
      //if there is an item in the cart, calculate and show the total

      if (cartItems) {
        let sum = 0;
        sum = sum.toFixed(2);
        sum = parseFloat(sum);
        //loop through items in so-cart
        //pull list price from array and add to sum
        cartItems.forEach((item) => {
          let quantity = item.Quantity
          sum += quantity * item.ListPrice;
        });
        //insert sum into html

        document.getElementsByClassName("cart-total")[0].innerHTML =
          "Total: $" + sum.toFixed(2);
        //document.querySelector(".cart-total").innerHTML = "Total: $" + sum; unhide element

        document.querySelector(".hide-total").style.display = "flex";
        setLocalStorage("total", sum);
        // console.log(sum);
        // console.log(typeof sum);
        
      } else {
        //hide element

        document.querySelector(".hide-total").style.display = "none";
      }
      
    }

    removeProductFromCart(productId, location='so-cart') {
      // find the id in the local storage "so-cart" object and remove the first one with the same id as given function to delete when match is found

      function rem(itemInCart, idToDelete) {
        if(itemInCart['Id'] === idToDelete) { (ar.splice(ar.indexOf(itemInCart), 1)); return true;
        } else { return false;}
      }
      // variable to hold the array of items in cart

      let ar = JSON.parse(localStorage.getItem(location));
      // loop to find match

      for (const itemInCart of ar){ if(rem(itemInCart, productId)){break;}};
      // set local storage to new array

      setLocalStorage(location, ar)
      // render the cart again now that the item is removed
      
      this.renderCartContents(location);
      showCartQuantity();
    }

    updateItemQuantity(cart, id, quantity, location='so-cart'){
      let Id = id;
      let itemToUpdate = cart.findIndex(item => item.Id === Id);
      cart[itemToUpdate].Quantity = parseInt(quantity);
      setLocalStorage(location, cart);
    }
}