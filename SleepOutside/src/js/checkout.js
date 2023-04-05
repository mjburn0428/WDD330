import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.js";

loadHeaderFooter();
const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// this is how it would look if we listen for the submit on the form
document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  // e.target would contain our form in this case
  myCheckout.checkout();
});