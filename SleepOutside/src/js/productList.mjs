import { renderListWithTemplate } from "./utils.mjs";
import ProductDetailsModal from "./ProductDetailsModal.mjs";

export function productCardTemplate(product) {
  //Use destructoring to enable readable code and pull specific properties from our object
  const { Id, Images, Name, ListPrice, NameWithoutBrand } = product;
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${Id}">
      <img
        src="${Images.PrimarySmall}"
        alt="Image of ${NameWithoutBrand}"
      />
      <h3 class="card__brand">${Name}</h3>
      <h2 class="card__name">${NameWithoutBrand}</h2>
      <p class="product-card__price">$${ListPrice}</p></a>
      <button class="quick-button" data-src="${Id}">Quick lookup</button>
  </li>`;
}

export default class productList {
  // class to generate list of product card in HTML from an array.
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.url = document.URL;
  }

  async init() {
    let productList = await this.dataSource.getData(this.category);
    try {
      productList = this.sortProductList(productList);
      console.log(
        "🚀 ~ file: productList.mjs:33 ~ productList ~ init ~ productList:",
        productList
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: productList.mjs:35 ~ productList ~ init ~ error:",
        error
      );
    }

    this.renderList(productList);

    document.querySelector(".title").innerHTML =
      this.category[0].toUpperCase() + this.category.substring(1);

    //Code for breadcrumbs (product quantity in the list)

    const product_quantity = productList.length;
    const quantity_element = document.getElementById("quantity");
    quantity_element.innerHTML = `Product Category > ${product_quantity} items`;
    quantity_element.href = this.url;
  }

  renderList(productList2) {
    renderListWithTemplate(productCardTemplate, this.listElement, productList2);

    // Setting click event to trigger quick lookup modal
    // const buttons = document.querySelectorAll('.quick-button');

    // const buttonsArrayLenght = buttons.length;

    // for (let index = 0; index < buttonsArrayLenght; index++) {
    //   buttons[index].addEventListener('click', async () => {
    //     const productId = buttons[index].getAttribute('data-src');

    //     const response = await fetch(
    //       `http://server-nodejs.cit.byui.edu:3000/product/${productId}`
    //     );

    //     const product = await response.json();

    //     const p = new ProductDetailsModal(product.Result);

    //     document
    //       .querySelector('#quickLookupModal')
    //       .classList.remove('hide-modal');

    //     p.renderProductDetails();
    //   });
    // }

    // const closeModalButton = document.querySelector('#modalButton');

    // closeModalButton.addEventListener('click', () => {
    //   document.querySelector('#quickLookupModal').classList.add('hide-modal');
    // });
  }

  filterProductList(list) {
    // return random list of product whose index is less than 4
    // from the list of all tents/products.
    var randomNum = Math.floor(Math.random() * (list.length + 1 - 4));
    return list.slice(randomNum, randomNum + 4);
  }

  sortProductList(list) {
    let sortBy = document.querySelector("#sort-by").value;
    let ascending = document.querySelector("#order").checked;
    if (sortBy == "Name") {
      list.sort((a, b) => {
        let returnValue = 0;
        if (a.NameWithoutBrand > b.NameWithoutBrand) {
          returnValue = 1;
        } else {
          returnValue = -1;
        }
        if (ascending) {
          returnValue *= -1;
        }
        return returnValue;
      });
    }
    if (sortBy == "Price") {
      list.sort((a, b) => {
        let returnValue = 0;
        if (a.FinalPrice < b.FinalPrice) {
          returnValue = 1;
        } else {
          returnValue = -1;
        }
        if (ascending) {
          returnValue *= -1;
        }
        return returnValue;
      });
    }
    return list;
  }
}
