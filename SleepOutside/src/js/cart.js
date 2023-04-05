import ShoppingCart from "./shoppingCart.mjs";

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();
document.querySelector("#check-out").addEventListener("click", ()=>{
    if (document.querySelector(".product-list").children.length == 0){
        alert("You cannot check out with an empty cart!");
    }else{
        document.querySelector("#check-out-link").href = "../checkout/index.html";
    }
})