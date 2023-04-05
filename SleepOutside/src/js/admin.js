import auth from './admin.mjs';

function handleSubmit() {
  let form = document.querySelector('#admin-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;

    const password = document.querySelector('#password').value;

    auth.login(email, password);
  });
}

function addForm() {
  let main = document.querySelector('main');
  main.innerHTML = auth.buildLogin();
}

addForm();

handleSubmit();
