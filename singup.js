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
  postUser(newUser);
  location.replace('/login.html');
});

// read form value data
function readFormData() {
  let newUser = {
    username: signName.value,
    email: signEmail.value,
    password: signPassWord.value,
  };
  return newUser;
}

// add form data to database
function postUser(user) {
  fetch(`${USER_URL}${EXT}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(USER_URL);
    })
    .catch((error) => {
      console.log(error);
    });
}

// reset form
function resetForm() {
  signName.value = '';
  signEmail.value = '';
  signPassWord.value = '';
}

// generate new uuid
// function generateUUID() {
//   return (
//     Math.random().toString(36).substring(2, 15) +
//     Math.random().toString(36).substring(2, 15)
//   );
// }
