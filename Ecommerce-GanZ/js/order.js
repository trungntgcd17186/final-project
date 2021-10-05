const baseURL = 'http://localhost:3000';

//Modal voucher
let voucherClick = document.querySelector('.voucher__link');
let voucherModal = document.getElementById("modalVoucher");
let close = document.getElementsByClassName("close")[0];

voucherClick.onclick = function(e) {
  e.preventDefault();
  voucherModal.style.display = "block";
}
close.onclick = function() {
  voucherModal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == voucherModal) {
    voucherModal.style.display = "none";
  }
};

//Hiển thị đơn hàng trong trang Thanh toán
function displayOrder(){
  let cartItems = localStorage.getItem('productsInCart');
  let cartCost = localStorage.getItem('totalCost');
  let cartNumbers = localStorage.getItem('cartNumbers');

  cartItems = JSON.parse(cartItems);
  cartCost = JSON.parse(cartCost);
  
  let productContainer = document.querySelector('.container__content');
  let countTotal = document.querySelector('.container__heading span');
  let totalCostCart = document.querySelector('.total__money-product');

  let totalCostProduct = document.querySelector('.money-product span');
  let totalCostDelivery = document.querySelector('.money-delivery span');
  let totalCostCartEnd = document.querySelector('.total__money-order');

  if( cartItems && productContainer){
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item => {
        productContainer.innerHTML += 
        `
          <div class="container__item">
              <div class="content__item container__product">
                  <img src="${item.image}" alt="Product" class="product__img">
                  <p class="product-name">${item.title}</p>
              </div>
              <ul class="content__item containar__product-element">
                  <li>${item.priceCurrent.toLocaleString('vi-VN')} đ</li>
                  <li>${item.inCart}</li>
                  <li>${item.priceCurrent.toLocaleString('vi-VN') * item.inCart}.000 đ</li>
              </ul>
          </div>
        `
      });
			
			totalCostDelivery.textContent = `20.000 đ`;
      countTotal.textContent = cartNumbers;
      totalCostProduct.textContent = cartCost.toLocaleString('vi-VN') + ` đ`;
			if(cartNumbers != 0){
				totalCostCart.textContent = (cartCost + 20000).toLocaleString('vi-VN') + `đ`;
			}
			else{
				totalCostCart.textContent = cartCost.toLocaleString('vi-VN') + `đ`;
			}
      totalCostCartEnd.textContent = totalCostCart.textContent;
  }
}

displayOrder();

let userid = document.querySelector('#userId');
let username = document.querySelector('#addName');
let email = document.querySelector('#addEmail');
let phone = document.querySelector('#addPhone');
let address = document.querySelector('#addAddress');

let dataUser = JSON.parse(localStorage.getItem('dataLogin'));
if(dataUser){
	userid.value = dataUser.id;
	// username.value = dataUser.name;
	email.value = dataUser.email;
}

let regex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if (username)
	username.oninput = () => {
		let text = document.querySelector('.valid__feedback-name');
		if (isNaN(username.value)) {
			username.style.borderColor = 'var(--valid-color--right)';
			text.style.display = 'none';
		} else if (username.value == '') {
			username.style.borderColor = 'var(--valid-color--wrong)';
			text.style.display = 'block';
			text.style.color = 'var(--valid-color--wrong)';
			text.innerHTML = 'Tên không được bỏ trống!';
		} else {
			username.style.borderColor = 'var(--valid-color--wrong)';
			text.style.display = 'block';
			text.style.color = 'var(--valid-color--wrong)';
			text.innerHTML = 'Tên không hợp lệ!';
		}
};
if (address)
	address.oninput = () => {
		let text = document.querySelector('.valid__feedback-address');

		if (address.value == '') {
			address.style.borderColor = 'var(--valid-color--wrong)';
			text.style.display = 'block';
			text.style.color = 'var(--valid-color--wrong)';
			text.innerHTML = 'Địa chỉ không được bỏ trống!';
		} else {
			address.style.borderColor = 'var(--valid-color--right)';
			text.style.display = 'none';
		}
};
if (phone)
	phone.oninput = () => {
		let text = document.querySelector('.valid__feedback-phone');
		if (isNaN(phone.value) || phone.value.length > 10) {
			phone.style.borderColor = 'var(--valid-color--wrong)';
			text.style.display = 'block';
			text.style.color = 'var(--valid-color--wrong)';
			text.innerHTML = 'Số điện thoại không hợp lệ!';
		} else if (phone.value == '') {
			phone.style.borderColor = 'var(--valid-color--wrong)';
			text.style.display = 'block';
			text.style.color = 'var(--valid-color--wrong)';
			text.innerHTML = 'Số điện thoại không được bỏ trống!';
		} else {
			phone.style.borderColor = 'var(--valid-color--right)';
			text.style.display = 'none';
		}
};
if (email)
	email.oninput = () => {
		let text = document.querySelector('.valid__feedback-email');

		if (!regex.test(email.value) && email.value != '') {
			email.style.borderColor = 'var(--valid-color--wrong)';
			text.style.display = 'block';
			text.style.color = 'var(--valid-color--wrong)';
			text.innerHTML = 'Email không hợp lệ!';
		} else {
			email.style.borderColor = 'var(--valid-color--right)';
			text.style.display = 'none';
		}
};

let orderData = {};
let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
let total = parseInt(localStorage.getItem('totalCost'));
let formPayment = document.querySelector('#form-payment');
let formInput = document.querySelectorAll('.payment__form-input');
let message = document.querySelector('.input-message');

let textName = document.querySelector('.valid__feedback-name');
let textPhone = document.querySelector('.valid__feedback-phone');
let textAddress = document.querySelector('.valid__feedback-address');
let textNotification = document.querySelector('.notification-message');

function handleValidate() {
  if (username.value == '' || phone.value == '' || address.value == ''){
    alert('Bạn cần nhập đầy đủ thông tin!');
		textNotification.innerHTML = 'Vui lòng bạn nhập những thông tin giao hàng cần thiết !!!';
    textNotification.style.display = "block";
    setTimeout(function(){ textNotification.style.display = "none"; }, 5000);

		username.style.borderColor = 'var(--valid-color--wrong)';
		textName.style.display = 'block';
		textName.style.color = 'var(--valid-color--wrong)';
		textName.innerHTML = 'Tên không được bỏ trống!';

		phone.style.borderColor = 'var(--valid-color--wrong)';
		textPhone.style.display = 'block';
		textPhone.style.color = 'var(--valid-color--wrong)';
		textPhone.innerHTML = 'Tên không được bỏ trống!';

		address.style.borderColor = 'var(--valid-color--wrong)';
		textAddress.style.display = 'block';
		textAddress.style.color = 'var(--valid-color--wrong)';
		textAddress.innerHTML = 'Địa không được bỏ trống!';
  }
  else {
		formInput.forEach((item) => {
			if (item.value != '') {
				orderData = {
					// userId: JSON.parse(localStorage.getItem('dataLogin')).id,
					...orderData,
					[item.id]: item.value,
					order: Object.values(cartItems),
					total: total + 20000,
					message: message.value,
					methodPayment: 'Thanh toán khi nhận hàng',
					status: 'Đang gói',
					delevered: 'Chưa nhận hàng',
					date: new Date()
				};
			}
		});

    alert('Cảm ơn bạn đã mua hàng 🥰🥰🥰');

		$.ajax({
			method: 'POST',
			url: `${baseURL}/orders`,
			data: JSON.stringify(orderData),
			success: function (data) {
				console.log(data);
			},
			error: function (err) {
				console.log(err);
			},
			contentType: 'application/json',
		});
		window.localStorage.removeItem('productsInCart');
		window.localStorage.removeItem('cartNumbers');
		window.localStorage.removeItem('totalCost');
		setTimeout(() => {
			window.location = 'index.html';
		}, 2000);
	}
}
formPayment
	? formPayment.addEventListener('submit', (e) => {
			e.preventDefault();
      if(cartItems !== null && total != 0 ){
        handleValidate();
      }
			else{
        alert('Đơn hàng của bạn chưa có sản phẩm!!! Vui lòng hãy chọn sản phẩm.')
      }
	  })
	: '';






