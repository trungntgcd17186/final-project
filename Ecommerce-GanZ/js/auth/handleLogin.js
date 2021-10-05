
var courseApi = "http://localhost:3000/users";

function start() {
  handleLogin();
  checkUser();
}
start();


// Login Handler

async function handleLogin() {

  const res = await fetch(courseApi);
  let data = await res.json();

  var email = document.querySelector('input[name="email"]');

  var password = document.querySelector('input[name="password"]');

  var takeBtn = document.querySelector("#login");

  takeBtn.onclick = function () {
    var formData = {
      email: email.value,
      password: password.value,
    };
    const loginData = data.find(
      (el) => el.email === formData.email && el.password === formData.password
    );
    
    if (loginData.length !== 0) {
      localStorage.setItem("dataLogin", JSON.stringify(loginData));
      checkUser();
    } else {
      alert("Tài khoản không tồn tại hoặc không đúng.");
      return false;
    }
  };
}
function checkUser() {
  const user = JSON.parse(localStorage.getItem("dataLogin"));
  if (user.role == "admin") {
    window.location.href = "/index.html";
  }
  if (user.role == "user") {
    window.location.href = "/index.html";
  }
}
