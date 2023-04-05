import { initCarousel } from './utils.mjs';

export default class ProductDetailsModal {
  constructor(product) {
    this.product = product;
  }

  renderProductDetails() {
    let product_string = `<p>Name: ${this.product.Brand.Name}</p>
    <p>Brand: ${this.product.Name}</p>
    <p>Description: ${this.product.DescriptionHtmlSimple}</p>
    `;

    document.getElementById('quick-modal-product-details').innerHTML =
      product_string;
  }

  //Code to calculate discounts for products

  calc_discount() {
    return (
      100 - (this.product.ListPrice / this.product.SuggestedRetailPrice) * 100
    );
  }
}
