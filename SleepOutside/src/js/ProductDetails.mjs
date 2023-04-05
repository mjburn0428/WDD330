import {
  setLocalStorage,
  getLocalStorage,
  showCartQuantity,
  alertMessage,
  initCarousel
} from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.url = document.URL;
  }

  async init() {
    //get details for current product
    this.product = await this.dataSource.findProductById(this.productId);

    //render HTML with product details
    this.renderProductDetails();
    //add listener to cart button
    document
      .getElementById('addToCart') // Why is this so complicated? The product information is already in this.product.
      .addEventListener('click', this.addToCartHandler.bind(this));
    document.querySelector('#addToWishlist').addEventListener('click', (e) => {
      this.addToWishList(this.product);
    });

    //Code for breadcrumbs (href tags)
    const breadcrumb_element = document.getElementById(
      'product_page_breadcrumb'
    );
    breadcrumb_element.href = this.url;
    const product_category = this.product.Category;
    document.getElementById(
      'list_page_breadcrumb'
    ).href = `../product-listing/index.html?category=${product_category}`;
  }

  addProductToCart(product, location='so-cart') {
    product = this.handleColor(product);
    let cart = getLocalStorage(location);
    if (cart === null) {
      cart = [];
    }
    // adding functionality for quantity
    let item = this.handleQuantity(product, cart);
    // pushing item to cart
    if (item['newItem']) {
      cart.push(product);
    } else {
      let Id = product.Id;
      let originalItemAdded = cart.findIndex((item) => item.Id === Id);
      cart[originalItemAdded].Quantity = item['newQuantity'];
    }
    setLocalStorage(location, cart);
    if (location == 'so-cart') {
      alertMessage('The item was added to your cart successfully.');
    } else {
      alertMessage(`The item was added to the ${location} successfully.`);
    }
  }

  handleQuantity(product, cart) {
    let newItem = true;
    let newQuantity = { Quantity: 0 };
    for (let i in cart) {
      // console.log("3.", cart[i]);
      if (cart[i].Id === product.Id && cart[i].colorSelected == product.colorSelected) {
        // console.log("5. ", cart[i].Quantity, typeof product.Quantity, product.Quantity);
        cart[i].Quantity = parseInt(cart[i].Quantity) + 1;
        newQuantity = cart[i].Quantity;
        // console.log("4. ", cart[i].Id, product.Id, typeof cart[i].Quantity, cart[i].Quantity, typeof product.Quantity, product.Quantity);
        newItem = false;
        break;
      }
    }
    if (newItem) {
      product.Quantity = 1;
    }
    // console.log("1.", typeof product.Quantity, product.Quantity);
    return { newItem: newItem, newQuantity: newQuantity };
  }

  // Returns the product, so use the = operator
  handleColor(product){
    let node = document.querySelector('#color-select');

    // If we are on the wishlist page, just return it. color info is already there
    if (node == null){
      return product;
    }

    // Otherwise, add the color info
    product.colorSelected = node.value;

    for (let i = 0; i < product.Colors.length; i++){
      if (product.Colors[i].ColorName == product.colorSelected){
        product.colorSelectedImgSrc = product.Colors[i].ColorPreviewImageSrc;
      }
    }
    return product;
  }

  async addToCartHandler(e) {
    // Color the button
    document.querySelector('#addToCart').classList.add('button-clicked');
    //animate icon
    this.play();
    //get product
    const product = await this.dataSource.findProductById(e.target.dataset.id);
    //add product to cart
    this.addProductToCart(product);
    //update icon superscript
    showCartQuantity();
  }

  async removeFromCartHandler(e) {
    const product = await this.dataSource.findProductById(e.target.dataset.id);
    removeProductFromCart(product);
    showCartQuantity();
  }

  renderProductDetails() {
    let product_string;

    if (this.product.Images.ExtraImages) {
      if (
        'ExtraImages' in this.product.Images &&
        this.product.Images.ExtraImages.length > 0
      ) {
        product_string = `<section class="product-detail">
        <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <!-- slider container -->
        <div class="slider">
          <div class="slide">
             <img
              src="${this.product.Images.PrimaryMedium}"
              alt="${this.product.Name}"/>
          </div>`;

        // This loop adds the HTML to render the extra images into the image carousel
        for (
          let index = 0;
          index < this.product.Images.ExtraImages.length;
          index++
        ) {
          product_string += `<div class="slide">
                                <img
                                  src="${this.product.Images.ExtraImages[index].Src}"
                                  alt="${this.product.Images.ExtraImages[index].Title}"
                                />
                              </div>`;
        }
        product_string += `<!-- Control buttons -->
        <button class="btn btn-next">></button>
        <button class="btn btn-prev"><</button>
      </div>`;
      }
    } else {
      product_string = `<section class="product-detail">
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img class="divider product_img"
        src="${this.product.Images.PrimaryMedium}"
        alt="${this.product.Name}"/>`;
    }

    //get discount to insert into product string literal
    let discount = Math.trunc(this.calc_discount());
    //create product string literal

    // Why add another suggestedRetailPrice? A variable that did this already existed. Mabey it was in the downloaded JSON.
    if (this.product.SuggestedRetailPrice != this.product.FinalPrice) {
      product_string += `<p class="discount">Sale: ${discount}% Off. You save $${Math.round(
        this.product.SuggestedRetailPrice - this.product.FinalPrice
      )} dollars!</p>
        <p class="product-card__price">Was: <span class="productListPrice">$${
          this.product.SuggestedRetailPrice
        }</span>
         Now: <span class="productFinalPrice">$${
           this.product.FinalPrice
         }</span></p>`;
    } else {
      product_string += `<p class="product-card__price">$${this.product.FinalPrice}</p>`;
    }
    product_string += ` <div class="product__color">${this.product.Colors[0].ColorName}</div>
      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
      <button id="addToCart" data-id="${this.productId}">Add to Cart</button>
      <button id="addToWishlist" data-id="${this.productId}">Add to Wishlist</button>
      </div>
      </section>`;

    document.getElementById('product_details').innerHTML = product_string;
    

    // Add color select
    // For some reason I couldn't get this to work in the formatted string above, so I'm adding it afterwards
    let colorNode = document.querySelector(".product__color")
    colorNode.textContent = "";
    let selectNode = document.createElement('select');
    selectNode.id = 'color-select';
    for (let i = 0; i < this.product.Colors.length; i++){
      let optionNode = document.createElement('option');
      optionNode.value = this.product.Colors[i].ColorName;
      optionNode.textContent = optionNode.value;
      selectNode.append(optionNode);
    }
    colorNode.append(selectNode);
    // End color select

    if (this.product.Images.ExtraImages) {
      initCarousel();
    }
  }

  //Code to calculate discounts for products

  calc_discount() {
    return (
      100 - (this.product.ListPrice / this.product.SuggestedRetailPrice) * 100
    );
  }

  //Code for animation for cart icon

  play() {
    const cart = document.querySelector('.cart');
    cart.classList.add('cart-animate');
    this.stop();
  }
  stop() {
    const cart = document.querySelector('.cart');
    cart.addEventListener('animationend', function () {
      cart.classList.remove('cart-animate');
    });
  }

  async addToWishList(product){
    product = this.handleColor(product);
    document.querySelector("#addToWishlist").classList.add("button-clicked");
    this.addProductToCart(product, 'wishlist');
    showCartQuantity();
  }
}
