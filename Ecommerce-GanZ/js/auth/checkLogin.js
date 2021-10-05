// Check User is ADMIN or USER
// if ADMIN => Go to ADMIN PAGE
// if User => Go to USER PAGE
// if No USer => Go To Login Page
// function start() {
//     checkLogin();
//   }
//   start();
  
  (function checkLogin() {
      let user = JSON.parse(localStorage.getItem("dataLogin"));
      const noneUser = document.querySelectorAll('.header__navbar-item-none-user');
      const userLogin = document.querySelector('.header__navbar-item.header__navbar-user');
      const userName = document.querySelector('.header__navbar-user-name');
      const notify = document.querySelector('.header__notify')
      if (user ) {
        noneUser.forEach(item => {
          item.style.display = "none"
        })
        
        userLogin.style.display ="flex";
        userName.innerText = user.name
      }
      else {
        userLogin.style.display ="none";
        notify.innerHTML = `
          <p>Bạn chưa đăng nhập !!!</p>
        `
      }
  })()
  