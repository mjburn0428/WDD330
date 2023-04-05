import { setLocalStorage } from "./utils.mjs";

const baseURL = "https://wdd330-backend.onrender.com/";
const checkoutURL = "https://wdd330-backend.onrender.com/checkout";
let categories = ["tents", "backpacks", "hammocks", "sleeping-bags"];

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {
  constructor() {}

  async checkout(form) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(form),
    };

    const response = await fetch(checkoutURL, options).then(convertToJson);
    //window.alert(response.orderId);
    //Convert the response to json to be able to see it in the console.
    return response;
  }

  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const product = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(product);
    return data.Result;
  }

  // Fetch all data in the database that matches the searchstring from all categories..

  async findProductBySearchString(searchString) {
    let allProducts = [];
    for (const category of categories) {
      const products = await this.getData(category);

      // filters products that have the users search strings in the product name.

      let match = products.filter((element) =>
        element.Name.toLowerCase().includes(`${searchString}`)
      );
      for (const item of match) {
        allProducts.push(item);
      }
    }
    return allProducts;
  }

  async loginRequest(credentials) {
    try {
      const response = await fetch(`${baseURL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const responseConvertedToJson = await convertToJson(response);

      return responseConvertedToJson;
    } catch (error) {
      console.log(
        "🚀 ~ file: ExternalServices.mjs:70 ~ ExternalServices ~ login ~ error:",
        error
      );
    }
  }
  async grabOrders(token) {
    let response = await fetch(
      `http://server-nodejs.cit.byui.edu:3000/orders`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let myJSON = await response.json();
    return myJSON;
  }
}
