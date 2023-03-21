// *********************
const POST_URL = 'https://crud-fed-default-rtdb.firebaseio.com/posts';
const USER_URL = 'https://crud-fed-default-rtdb.firebaseio.com/user';
const EXT = '.json';
// form value
let signName = document.getElementById('sign-up-name');
let signEmail = document.getElementById('sign-up-email');
let signPassWord = document.getElementById('sign-up-password');
let signBtn = document.getElementById('login-btn');

// event listener on button
signBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  e.preventDefault();
  let newUser = readFormData();
  let newUUID = generateUUID();
  postNewUser(newUUID, newUser);
  resetForm();
  setTimeout(function home() {
    location.replace('/login.html');
  }, 3000);
});

// read form value data
function readFormData() {
  const newUser = {
    username: signName.value,
    email: signEmail.value,
    password: signPassWord.value,
  };
  return newUser;
}

// add form data to database to create new user
function postNewUser(uuid, user) {
  fetch(`${USER_URL}/${uuid}${EXT}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((resp) => {
      resp.json();
    })
    .then((data) => console.log('data', data));
}

// reset form
function resetForm() {
  signName.value = '';
  signEmail.value = '';
  signPassWord.value = '';
}

// generate new uuid
function generateUUID() {
  return signName.value;
}
