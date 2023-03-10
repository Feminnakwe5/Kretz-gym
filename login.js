const POST_URL = 'https://crud-fed-default-rtdb.firebaseio.com/posts';
const USER_URL = 'https://crud-fed-default-rtdb.firebaseio.com/user';
const EXT = '.json';
// form inputs
let loginName = document.getElementById('login-username');
let loginPassWord = document.getElementById('login-password');
const submitBtn = document.getElementById('login-btn');

const getUser = (user) => fetch(`${USER_URL}/${user.username}${EXT}`);

function browserValidation() {
  if (!loginPassWord.value || loginPassWord.value.length < 5) {
    return 'password failed';
  }
  return null;
}

submitBtn.addEventListener('click', handleLoginSubmit);

async function handleLoginSubmit(e) {
  e.preventDefault();
  e.stopPropagation();

  const user = {
    username: loginName.value,
    password: loginPassWord.value,
  };
  try {
    const validationError = browserValidation();
    if (validationError) {
      throw Error(validationError);
    }
    const checkToSeeIfUserExistsInDatabase = await getUser(user);
    if (!checkToSeeIfUserExistsInDatabase.ok) {
      throw Error('Error validating the user');
    }
    const userInformationInDatabase =
      await checkToSeeIfUserExistsInDatabase.json();
    if (!userInformationInDatabase) {
      throw Error("Username Doesn't exist");
    }
    if (userInformationInDatabase) {
      localStorage.setItem(
        'userInfo',
        JSON.stringify(userInformationInDatabase)
      );
      location.replace('/dash.html');
    }
  } catch (error) {
    alert(error);
  }
}
