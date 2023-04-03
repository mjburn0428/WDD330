const requestURL = 'https://mjburn0428.github.io/WDD230/chamber/data.json';
const cards = document.querySelector('.grid');


fetch('data.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    const businesses = jsonObject["businesses"];
    businesses.forEach(displayBusinesses);
  });

function displayBusinesses(company) {
    // Create elements to add to the document
    let card = document.createElement('section');
    let h2 = document.createElement('h2');
    let h3 = document.createElement('h3');
    let h4 = document.createElement('h4');
    let h5 = document.createElement('h5');
    let h6 = document.createElement('h6');
    let p = document.createElement('p');
    let logo = document.createElement('img');

    // Change the textContent property of the each h property
    h2.textContent = company.business;
    h3.textContent = company.contact;
    h4.textContent = company.phonenumber;
    h5.textContent = company.email;
    h6.textContent = company.website;
    p.textContent = company.membership;

    // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values.
    logo.setAttribute('src', company.imageurl);
    logo.setAttribute('alt', `Logo of ${company.business}`);
    logo.setAttribute('loading', 'lazy');

    // Add/append the section(card) with the h2 element
    card.appendChild(logo)
    card.appendChild(h2);
    card.appendChild(h3);
    card.appendChild(h4);
    card.appendChild(h5);
    card.appendChild(h6);
    card.appendChild(p);

    // Add/append the existing HTML div with the cards class with the section(card)
    document.querySelector('div.grid').appendChild(card);
}

/*button*/
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector(".grid");

listbutton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
});

gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
})