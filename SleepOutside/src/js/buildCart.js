import {cartItem} from './cart.js';

let items = cartItem.getItemsFromLocalStorage();
for (let i = 0; i < items.length; i++){
  items[i].renderThisItem();
}