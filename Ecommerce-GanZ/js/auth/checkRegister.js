var courseApi = "http://localhost:3000/users";

function start() {
  getCourses();
  handleCreateForm();
  // createCourse();
}
start();

function handleCreateForm() {

  var createBtn = document.querySelector("#register");
  
  createBtn.onclick = async function (event) {
    event.preventDefault();
    var role = document.querySelector('input[name="role"]').value;
    var name = document.querySelector('input[name="name"]').value;
    var phonenumber = document.querySelector('input[name="phonenumber"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var password = document.querySelector('input[name="password"]').value;
    var confirm_password = document.querySelector(
      'input[name="confirmpassword"]'
    ).value;

    let registerFormDatas = {
      role: role,
      name: name,
      phonenumber: phonenumber,
      email: email,
      password: password,
    };
    // Check all input. Dieu kien so 1.
    if (
    name == "" ||
    phonenumber == "" ||
    email == "" ||
    password == "" ||
    confirm_password == "" ||
    password.length == "" ||
    confirm_password.length == "" ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return false;
    }
    // Check password length. Dieu kien so 2.
    if (password.length < 8) {
      alert("Mật khẩu phải từ 8 kí tự trở lên!");
      return false;
    }
    // Check confirm password is correct or not Dieu kien so 3.
    if (password != confirm_password) {
      alert("Sai xác nhận mật khẩu!");
      return false;
    } 
    // If all form is filled. Dieu kien so 4.
    if (
      name != "" &&
      phonenumber != "" &&
      email != "" &&
      password != "" &&
      confirm_password != "" &&
      password.length >= 8 &&
      confirm_password.length >= 8 &&
      password == confirm_password 
    ) {
      // Check isEmail and isPhoneNumber
      // PhoneNumber must be NUMBER and 10 characters
      if (phonenumber !== checkPhoneNumber(phonenumber)) {
        console.log(checkPhoneNumber(phonenumber))
        alert("Nhập sai số điện thoại")
        return false;
      }
      // Check Email
      if (email !== checkIsEmail(email)) {    
          alert("Nhập sai Email!")
        return false;
      }
      // Check isEmail exist !
      const correct = await checkValidEmail(email);
      if (correct) {
        createCourse(registerFormDatas, function () {
          getCourses();
          window.location.href = "/login.html"
        });
        alert("Đăng kí thành công!");
      }
    }
    else {
      alert("Nhập form không đúng!");
      return false;
    }
  };
}
async function checkValidEmail (emailInput) {
  const res = await fetch(courseApi);
  let data = await res.json();

  const user = data.find((e) => e.email === emailInput); 
  if (user) {
    alert("Email đã tồn tại!");
    return false;
  } else {
    return true;
  }
}

function getCourses(callback) {
  fetch(courseApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function createCourse(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(courseApi, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
