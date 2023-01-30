const POST_URL = 'https://crud-fed-default-rtdb.firebaseio.com/posts';
const USER_URL = 'https://crud-fed-default-rtdb.firebaseio.com/user';
const EXT = '.json';

// form value
let arms = document.getElementById('arms');
let legs = document.getElementById('legs');
let upperBody = document.getElementById('upperbody');
let cardio = document.getElementById('cardio');
let Quote = document.getElementById('Quote');
let submitBtn = document.getElementById('submit-btn');

// event listener on button
submitBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  e.preventDefault();
  debugger;
  let newWorkOut = readFormData();
  let newUUID = generateUUID();
  postNewUser(newUUID, newWorkOut);
  appendNewRecord(newUUID, newWorkOut);
  resetForm();
});

// read form value data
function readFormData() {
  const gym = {
    arms: arms.value,
    legs: legs.value,
    upperBody: upperBody.value,
    cardio: cardio.value,
    quote: Quote.value,
  };
  return gym;
}

// add form data to database to create new workout
function postNewUser(uuid, user) {
  fetch(`${POST_URL}/${uuid}${EXT}`, {
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
  arms.value = '';
  legs.value = '';
  upperBody.value = '';
  cardio.value = '';
  Quote.value = '';
}

// ***********************render in html*******************
function appendNewRecord(uuid, workout) {
  const plans = document.getElementById('plans');

  const create = `
  <div id='post'>
  <div id ='${uuid}' class="post-er" > 
  <label>Arms: 
      <input type="text" value="${workout.arms}" readonly />
    </label>
  <label>Legs: 
      <input type="text" value="${workout.legs}" readonly />
    </label>
    <label>Upperbody: 
      <input type="text" value="${workout.upperBody}" readonly />
    </label>
    <label>Cardio: 
      <input type="text" value="${workout.cardio}" readonly />
    </label>
    <label>Quote: 
      <input type="text" value="${workout.quote}" readonly />
    </label>
    <button onclick="deletepost(this)" class="deleteBtn" type="submit">Delete</button>
      <button onclick="edit(this)" class="editBtn" type="button">Edit</button>
  </div>
  </div>
  `;
  plans.innerHTML += create;
}

// *********UPDATE/EDIT******
function edit(btn) {
  const current = btn.parentElement;
  const currentUUID = current.id;
  const InfoArr = current.querySelectorAll('input');
  let updatedWorkOut = null;

  const isEdit = btn.innerHTML.toUpperCase();
  if (isEdit === 'EDIT') {
    btn.innerHTML = 'save';
    InfoArr.forEach((field) => field.removeAttribute('readonly'));
    // console.log('editing', petInfoArr);
  } else {
    btn.innerHTML = 'EDIT';
    InfoArr.forEach((field) => field.setAttribute('readonly', 'readonly'));
    // console.log('saving start', petInfoArr);
    updatedWorkOut = {
      arms: InfoArr[0].value,
      legs: InfoArr[1].value,
      upperbody: InfoArr[2].value,
      cardio: InfoArr[3].value,
      Quote: InfoArr[4].value,
    };

    updateRecord(currentUUID, updatedWorkOut);
  }
}

// UPDATE FIREBASE
function updateRecord(uuid, workout) {
  fetch(`${POST_URL}/${uuid}${EXT}`, {
    // method: 'patch',
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(workout),
  });
}

// ********Delete
function deletepost(btn) {
  const current = btn.parentElement;
  const currentUUID = current.id;
  console.log(currentUUID);

  fetch(`${POST_URL}/${currentUUID}${EXT}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data));

  current.remove();
}

// generate new uuid
function generateUUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
