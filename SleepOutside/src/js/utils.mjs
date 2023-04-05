import Alert from "./alert.mjs";
import ProductDetailsModal from "./ProductDetailsModal.mjs";

// wrapper for querySelector...returns matching element

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const ListArrayHtml = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  } else {
    parentElement.insertAdjacentHTML(position, ListArrayHtml.join(""));
  }
  // Setting click event to trigger quick lookup modal
  const buttons = document.querySelectorAll(".quick-button");

  const buttonsArrayLenght = buttons.length;

  for (let index = 0; index < buttonsArrayLenght; index++) {
    buttons[index].addEventListener("click", async () => {
      const productId = buttons[index].getAttribute("data-src");

      const response = await fetch(
        `https://wdd330-backend.onrender.com/product/${productId}`
      );

      const product = await response.json();

      const p = new ProductDetailsModal(product.Result);

      document
        .querySelector("#quickLookupModal")
        .classList.remove("hide-modal");

      p.renderProductDetails();
    });
  }

  const closeModalButton = document.querySelector("#modalButton");

  closeModalButton.addEventListener("click", () => {
    document.querySelector("#quickLookupModal").classList.add("hide-modal");
  });
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  let response = await fetch(path);
  if (response.ok) {
    let text = await response.text();
    return text;
  } else {
    throw new Error("Failed to load path.");
  }
}

export async function loadHeaderFooter() {
  let headerContent = await loadTemplate("/partials/header.html");
  let footerContent = await loadTemplate("/partials/footer.html");
  let headerElement = document.querySelector("header");
  let footerElement = document.querySelector("footer");
  renderWithTemplate(headerContent, headerElement);
  renderWithTemplate(footerContent, footerElement);
  showCartQuantity();
}

// function to Add a superscript number of items
// in the cart to the backpack icon.

export function showCartQuantity() {
  let new_cart = getLocalStorage("so-cart");

  // select the div element I (prince) added to the all the html docs.

  let cartQuantityElement = document.querySelector("#cart-items-number");

  // Set the superscript to the number of items in the cart 'IF'there is an item in the cart.

  if (new_cart) {
    let quantity = 0;
    for (let i in new_cart) {
      quantity += new_cart[i].Quantity;
    }
    cartQuantityElement.textContent = quantity;
    cartQuantityElement.style.display = "block";
  } else {
    cartQuantityElement.style.display = "none";
  }
}

//Alert classes and functions.
export function alertMessage(message, scroll = true) {
  // Wrapper for createOneAlert from the Alert class
  let options = {};
  options.scroll = scroll;
  Alert.createOneAlert(message, options);
}

export function initCarousel() {
  // Select all slides
  const slides = document.querySelectorAll(".slide");

  // Validation to check to product that doesn't have extra images
  if (slides) {
    // loop through slides and set each slides translateX
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${indx * 100}%)`;
    });

    // select next slide button
    const nextSlide = document.querySelector(".btn-next");

    // current slide counter
    let curSlide = 0;
    // maximum number of slides
    let maxSlide = slides.length - 1;

    // add event listener and navigation functionality
    nextSlide.addEventListener("click", function () {
      // check if current slide is the last and reset current slide
      if (curSlide === maxSlide) {
        curSlide = 0;
      } else {
        curSlide++;
      }

      //   move slide by -100%
      slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
      });
    });

    // select next slide button
    const prevSlide = document.querySelector(".btn-prev");

    // add event listener and navigation functionality
    prevSlide.addEventListener("click", function () {
      // check if current slide is the first and reset current slide to last
      if (curSlide === 0) {
        curSlide = maxSlide;
      } else {
        curSlide--;
      }

      //   move slide by 100%
      slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
      });
    });
  }
}
