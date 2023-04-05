import ExternalServices from "./ExternalServices.mjs";
import productList from "./productList.mjs";
import { getParams} from "./utils.mjs";


const category = getParams("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const product_list = new productList(category, dataSource, element);
document.querySelector(".sort form").addEventListener('click', ()=>{
    // Check to see if a click changed anything. If it did, reload the product list.
    let form = document.querySelector(".sort form");
    if (form.lastSortBy == null){
        form.lastSortBy = document.querySelector("#sort-by").value;
    }
    if (form.lastAscending == null){
        form.lastAscending = document.querySelector("#order").checked;
    }
    if (form.lastSortBy != document.querySelector("#sort-by").value ||
     form.lastAscending != document.querySelector("#order").checked){
        document.querySelector(".product-list").innerHTML = "";
        product_list.init();
    }
    form.lastSortBy = document.querySelector("#sort-by").value;
    form.lastAscending = document.querySelector("#order").checked;
})
product_list.init();