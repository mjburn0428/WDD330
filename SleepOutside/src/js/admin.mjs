import ExternalServices from "./ExternalServices.mjs";

export default class Authentication {
  constructor() {
    this.token = null;
    this.services = new ExternalServices();
  }
  static async login(email, password) {
    const externalServices = new ExternalServices();
    try {
      const response = await externalServices.loginRequest({
        email,
        password,
      });

      this.token = response.accessToken;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(
        "🚀 ~ file: admin.mjs:17 ~ Authentication ~ document.querySelector ~ error:",
        error
      );
    }
    // Orders is an array
    let orders = await externalServices.grabOrders(this.token);
    let main = document.querySelector("main");
    // Use for loop so I can step through in the debugger
    // Start at 1 because first order is a test
    for (let i = 1; i < orders.length; i++) {
      let orderNode = document.createElement("div");
      orderNode.classList.add("order__card");
      orderNode.innerHTML = `<p>${orders[i].fname} ${orders[i].lname}</p>
      <p>Address: ${orders[i].street}, ${orders[i].city}, ${orders[i].state}</p>`;

      // Add the items
      orderNode.innerHTML += `<p> ---------- Orders ---------</p>`;
      orders[i].items.forEach((item) => {
        orderNode.innerHTML += `<p>${item.name} <strong>X</strong> ${item.quantity}</p>`;
      });
      main.appendChild(orderNode);
    }
    return;
  }

  static buildLogin() {
    // Shouldn't this be called 'buildLogin' or something?
    // ok I renamed it to buildLogin because it makes sense
    return `
        <form class='login' id="admin-form">
            <label for='email'>Email</label>
                <input type='email' name='email' id='email' required>
            <label for='password'>Password</label>
                <input type='password' name='password' id='password' required>
            <button id='submit' type='submit'>Submit</button>
        </form>`;
  }
}
