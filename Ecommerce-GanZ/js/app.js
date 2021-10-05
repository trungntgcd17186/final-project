let sourceAPI = "http://localhost:3000/product?";
let params = {}

// variable
const cartContainer = document.querySelector('.header__cart-list');
const productList = document.querySelector('.grid__row-feature');
const cartList = document.querySelector('.hearder__cart-list-item');
const cartCountInfo = document.querySelector('.header__cart-notice');
const cartTotalValue = document.querySelector('.header__cart-footer p span');
let cartItemID = 1;

function start() {
    getProducts(params,renderProducts);
    getProducts(params,renderProductUnderWear);
    displayCartMini();
    onLoadCartNumbers();
    // productList?.addEventListener('click', purchaseProduct);
    // cartList?.addEventListener('click', deleteProduct);

    // getProductDetail(renderProductDetail) 
}

start();

window.addEventListener('DOMContentLoaded', () => {
    getProducts(renderProducts);
    getProducts(renderProductUnderWear);
    onLoadCartNumbers();
    displayCartMini();
    displayCart();
    // loadCart();
});
let value;
const btnSearch = document.querySelector('.header__search-btn')
const inputSearch = document.querySelector('.header__search-input')

inputSearch.addEventListener('change', (e) => {
    value = e.target.value

})
btnSearch.addEventListener('click', () => {
   params= {q: value}
   getProducts(params,renderProducts)
   getProducts(params,renderProductUnderWear)


})

//CHỨC NĂNG

function getProducts(params,callback) {
    fetch(`${sourceAPI}` + (new URLSearchParams(params)).toString()).then(function (response) {
        return response.json();
    })
    .then(callback)
}

function getProductDetail(params) {
   
    fetch(sourceAPI +(new URLSearchParams(params)).toString()).then(function (response) {
        return response.json();
    })
    .then(callback => redirectPage(callback))
    // console.log(id,123)
}

function redirectPage(product) {
    localStorage.setItem('productDetail', JSON.stringify(product))
    window.location.href = "http://127.0.0.1:5503/detailProduct.html"
}

function renderProducts(products) {
    var productCategorys = products.filter(function (product) {
        return product.category == 'feature';
    })
    var listCartBlock = document.querySelector('.grid__row-feature, .grid__row-detailProduct');
    var htmls = productCategorys.map(function (product, index) {
        return `
        <div class="grid__col-2-5">
        <div class="feature__product-box">
        <a  class="feature__product-image" data-detail=${product.id}>
            <img src="${product.image}" alt="shirt" class="feature__product-img">
        </a>
        <a href="detailProduct.html" class="feature__product-name">${product.title}</a>
        <div class="feature__product-price">
            <span class="feature__product-price-new">${product.priceCurrent.toLocaleString('vi-VN')} đ</span>
            <span class="feature__product-price-old">${product.priceSale.toLocaleString('vi-VN')} đ</span>
        </div>
        <div class="feature__product-like">
            <span class="feature__product-item__like feature__product-item__like--liked">
            <i class="feature__product-item__like-icon-empty far fa-heart"></i>
            <i class="feature__product-item__like-icon-fill fas fa-heart"></i>
            <span class="feature__product-item__like-total">(100+ Thích)</span>
            </span>
            <div class="feature__product-item__star">
            <i class="feature__product-item__star-gold fas fa-star"></i>
            <i class="feature__product-item__star-gold fas fa-star"></i>
            <i class="feature__product-item__star-gold fas fa-star"></i>
            <i class="feature__product-item__star-gold fas fa-star"></i>
            <i class="fas fa-star"></i>
            </div>
            
        </div>
        <div class="feature__product-btn" data-id = "${product.id}">
            <a  class="feature__product-link">
                <i class="fas fa-shopping-bag"></i>
                <span>Chọn mua</span>
            </a>
        </div>
        <div class="feature__product-item__favourite">
            <i class="fas fa-check"></i>
            <span>yêu thích</span>
        </div>
        <div class="feature__product-item__sale-off">
            <span class="feature__product-item__percent">10%</span>
            <span class="feature__product-item__sale-off-label">GIẢM</span>
        </div>
        </div>
    </div>
        `
    });

    listCartBlock ? listCartBlock.innerHTML = htmls.join('') : "";

    //Click để di chuyển đến trang Sản phẩm chi tiết
    const link = document.querySelectorAll('.feature__product-image')
   
    link.forEach((item, index) => {
        item.onclick = () => {
            const id= item.getAttribute("data-detail")
            params = {id: id}
            getProductDetail(params)
        }
    });

    //Click nút CHỌN MUA để thêm sản phẩm vào giỏ hàng
    let textNotification = document.querySelector('.notification-message');
    const btnAddProductToCart = document.querySelectorAll('.feature__product-btn')
    btnAddProductToCart.forEach((item, index) => {
        item.onclick = () => {
            const id = item.getAttribute("data-id")
            const product = products.find((item) => item.id == id);
            addProductToCart(product);
            cartNumbers(index);
            totalCost(product);
            onLoadCartNumbers();
            displayCartMini();
            displayCart();
            textNotification.innerHTML = 'Thêm vào giỏ hàng thành công ^^';
            textNotification.style.display = "block";
            setTimeout(function(){ textNotification.style.display = "none"; }, 3000);
        }
    })
};

function renderProductUnderWear(products) {
    var productUnderwears = products.filter(function (product) {
        return product.category == 'recommend';
    })
    console.log(productUnderwears)
    var listCartBlock2 = document.querySelector('.grid__row-recommend');
    var htmls2 = productUnderwears.map(function (productUnderwear, index) {
        return `
        <div class="grid__col-2-5">
        <div class="recommend__product-box" >
            <div class="recommend__product-img" data-id= ${productUnderwear.id}>
                <img src="${productUnderwear.image}" alt="shirt" class="feature__product-img">
            </div>
            <h4 class="recommend__product-name">${productUnderwear.title}</h4>
            <div class="recommend__product-price">
                <span class="recommend__product-price-new">${productUnderwear.priceCurrent.toLocaleString('vi-VN')} đ</span>
                <span class="recommend__product-price-old">${productUnderwear.priceSale.toLocaleString('vi-VN')} đ</span>
            </div>
            <div class="recommend__product-like">
                <span class="recommend__product-item__like recommend__product-item__like--liked">
                    <i class="recommend__product-item__like-icon-empty far fa-heart"></i>
                    <i class="recommend__product-item__like-icon-fill fas fa-heart"></i>
                    <span class="recommend__product-item__like-total">(99+ Thích)</span>
                </span>
                <div class="recommend__product-item__star">
                    <i class="recommend__product-item__star-gold fas fa-star"></i>
                    <i class="recommend__product-item__star-gold fas fa-star"></i>
                    <i class="recommend__product-item__star-gold fas fa-star"></i>
                    <i class="recommend__product-item__star-gold fas fa-star"></i>
                    <i class="fas fa-star"></i> 
                </div>

            </div>
            <div class="recommend__product-btn" data-id = "${productUnderwear.id}">
                <div class="recommend__product-link">
                    <i class="fas fa-shopping-bag"></i>
                    <span>Chọn mua</span>
                </div>
            </div>
            <div class="recommend__product-sold">
                <span class="recommend__product-text">Bán chạy nhất 100+/ tháng</span>
            </div>
            <div class="recommend__product-top">
                <span>top</span>
            </div>
        </div>
    </div>
        `
    });

    listCartBlock2 ? listCartBlock2.innerHTML = htmls2.join('') : ""

    // Click để di chuyển đến trang Sản phẩm chi tiết
    const link = document.querySelectorAll('.recommend__product-img')
    link.forEach((item, index) => {
        item.onclick = () => {
            const id = item.getAttribute("data-id")
            params = {id: id}
            getProductDetail(params)
        }
    });

    //Click nút CHỌN MUA để thêm sản phẩm vào giỏ hàng
    let textNotification = document.querySelector('.notification-message');
    const btnAddProductToCart = document.querySelectorAll('.recommend__product-btn')
    btnAddProductToCart.forEach((item, index) => {
        item.onclick = () => {
            const product = products.find(p => p.id == item.getAttribute("data-id"));
            addProductToCart(product);
            cartNumbers(index);
            totalCost(product);
            onLoadCartNumbers();
            displayCartMini();
            displayCart();
            textNotification.innerHTML = 'Thêm vào giỏ hàng thành công ^^';
            textNotification.style.display = "block";
            setTimeout(function(){ textNotification.style.display = "none"; }, 3000);
        }
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        document.querySelector('.header__cart-notice').textContent = productNumbers;
    }
    else {
        document.querySelector('.header__cart-notice').textContent = 0;
    }
    // displayCartMini();
}

function cartNumbers(product) {
    console.log("The product added is:", product);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.header__cart-notice').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.header__cart-notice').textContent = 1;
    }
}

function addProductToCart(product) {
    let cartItems = localStorage.getItem('productsInCart');

	cartItems = JSON.parse(cartItems);

	if (cartItems != null) {
		if (cartItems[`product ${product.id}`] == undefined) {
			cartItems = {
				...cartItems,
				[`product ${product.id}`]: { ...product, inCart: 0 },
			};
		}
		cartItems[`product ${product.id}`].inCart += 1;
	} else {
		cartItems = {
			[`product ${product.id}`]: { ...product, inCart: 1 },
		};
	}

	localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cart'cost is:", cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + parseInt(product.priceCurrent));
    } else {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", parseInt(product.priceCurrent));
    }
}

// deleto prodcut cart list;
function deleteProduct(e) {
    let cartItem;
    if (e.target.className === "header__cart-item-remove") {
        cartItem = e.target.parentElement.parentElement.parentElement;
        cartItem.remove();
    } else if (e.target.tagName === "I") {
        cartItem = e.target.parentElement.parentElement;
        cartItem.remove();
    }
    // this remove form dom only
    // console.log(cartItem);

    let products = getProductFromLocalStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // updating the product list after the deletion
    // updateCartInfo();
    displayCart();
}

function displayCartMini() {
    let cartHeader = document.querySelector('.header__cart-header');
    let cartItem = document.querySelector('.header__cart-list-item');
    let cartFooterCost = document.querySelector('.header__cart-footer span');

    let cartCost = localStorage.getItem('totalCost');
    cartCost = JSON.parse(cartCost);

    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (cartItems && cartItem) {
        cartHeader.innerHTML = '';
        cartItem.innerHTML = '';
        Object.values(cartItems).map(item => {
            cartItem.innerHTML +=
                `
                <li class="hearder__cart-item" data-id = ${item.id}>
                    <img src="${item.image}" alt="" class="hearder__cart-img">
                    <div class="header__cart-item-info">
                        <div class="header__cart-item-head">
                            <h5 class="header__cart-item-name">${item.title}.</h5>
                            <div class="header__cart-item-price-wrap">
                                <span class="header__cart-item-price">${item.priceCurrent.toLocaleString('vi-VN')} đ</span>
                                <span class="header__cart-item-multiply">x</span>
                                <span class="header__cart-item-qnt">${item.inCart}</span>
                            </div>
                        </div>
                        <div class="header__cart-item-body">
                            <span class="header__cart-item-description">Phân loại: ${item.category}</span>
                            <span class="header__cart-item-remove">Xoá</span>
                        </div>
                    </div>
                </li>
                `
        });
        cartHeader.innerHTML = `<h4 class="hearder__cart-heading">Sản phẩm đã thêm</h4>`;
        cartFooterCost.textContent = cartCost.toLocaleString('vi-VN') + ` đ`;


        //Click nút Xóa để gỡ sản phẩm khỏi giỏ hàng
        let textNotification = document.querySelector('.notification-message');
        let removeBtn = document.querySelectorAll('.header__cart-item-remove');
        removeBtn.forEach((item, index) => {
            item.onclick = () => {
                textNotification.innerHTML = 'Xóa thành công';
                textNotification.style.display = "block";
                setTimeout(function(){ textNotification.style.display = "none"; }, 3000);

                handleDeleteProduct(index);
                addProductToCart(products[index]);
                onLoadCartNumbers();
            }
        });
        if(cartCost == 0){
            cartHeader.innerHTML = 
            `
            <img src="./asset/img/no-cart.png" alt="no-cart" class="header__cart-no-cart-img">
            <p class="header__cart-list-no-cart-msg">Chưa có sản phẩm trong giỏ hàng</p>
            `
        }
    }
}


// Hiển thị trên trang Giỏ hàng
function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    let cartCost = localStorage.getItem('totalCost');
    let cartNumbers = localStorage.getItem('cartNumbers');

    cartItems = JSON.parse(cartItems);
    cartCost = JSON.parse(cartCost);

    let productContainer = document.querySelector('.cart__body');
    let countTotal = document.querySelector('.total-amount');
    let totalCostCart = document.querySelector('.total-money');
    let textNotification = document.querySelector('.notification-message');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML +=
                `
        <div class="product__item">
            <div class="cart__content">
              <div class="cart__product">
                <div class="product__desc">
                  <img src="${item.image}" alt="Product" class="product__img">
                  <div class="product__text">
                    <p class="product__name">${item.title}</p>
                    <p class="product__price">${item.priceSale} đ</p>
                    <p class="product__type">${item.category}</p>
                  </div>
                </div>
              </div>
              <div class="cart__product-element">
                <p class="product-number product__unit-price">${item.priceCurrent.toLocaleString('vi-VN')} đ</p>
                <div class="product__amount">
                  <div class="amount-number">
                    <input type="number" class="amount-display" value="${item.inCart}" min="1">
                    <div class="custom-arrow">
                        <div class="arrow">
                            <i class="fas fa-chevron-up"></i>
                        </div>
                        <div class="arrow">
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </div>
                  </div>
                </div>
                <p class="product-number product__into-money" data-price= ${parseInt(item.inCart * item.priceCurrent)}>${item.inCart * item.priceCurrent.toLocaleString('vi-VN')}.000 đ</p>
              </div>
            </div>
            <div class="cart__operation">
              <a class="btn cart__operation-link">
                <i class="fas fa-trash"></i>
              </a>
            </div>
          </div>
        `
        })
        totalCostCart.textContent = `${cartCost.toLocaleString('vi-VN')} đ`;
        countTotal.innerHTML = cartNumbers;

        //Click nút biểu tượng để gỡ sản phẩm khỏi giỏ hàng
        let removeBtn = document.querySelectorAll('.cart__operation-link');
        removeBtn.forEach((item, index) => {
            item.onclick = () => {
                if (confirm("Bạn có chắc chắn xóa sản phẩm không?") == true){
                    textNotification.innerHTML = 'Xóa thành công';
                    textNotification.style.display = "block";
                    setTimeout(function(){ textNotification.style.display = "none"; }, 3000);

                    handleDeleteProduct(index);
                    totalCost(products[index]);
                    cartNumbers(index);
                    onLoadCartNumbers();
                } 
            }
        });

        let quantity = document.querySelectorAll('.amount-display');
        let intoMoney = document.querySelectorAll('.product-number.product__into-money');

        let productNumbers = localStorage.getItem('cartNumbers');
        productNumbers = parseInt(productNumbers);

        let allProductInLocal = Object.values(cartItems);

        for (let i = 0; i < quantity.length; i++) {
            quantity[i].addEventListener('change', () => {
                if (quantity[i].value > 0) {

                    intoMoney[i].innerHTML = `${(
                        parseInt(allProductInLocal[i].priceCurrent) * parseInt(quantity[i].value)).toLocaleString('vi-VN')}` + `đ`;

                    intoMoney[i].setAttribute('data-price', parseInt(allProductInLocal[i].priceCurrent) * parseInt(quantity[i].value).toLocaleString('vi-VN'))

                    allProductInLocal[i].inCart = parseInt(quantity[i].value);

                    localStorage.setItem('productsInCart', JSON.stringify(cartItems));


                    let priceAll = [];
                    for (let i = 0; i < intoMoney.length; i++) {
                        priceAll.push(parseInt(intoMoney[i].getAttribute('data-price').toLocaleString('vi-VN'))); 
                    }
                    let priceChange = priceAll.reduce((acc, item) => acc + item);
                    totalCostCart.innerHTML = `${priceChange.toLocaleString('vi-VN')} đ`;
                    cartCost = priceAll.reduce((acc, item) => acc + item);
                    localStorage.setItem('totalCost', cartCost);

                    let amountTotal = [];
                    for (let i = 0; i < quantity.length; i++) {
                        amountTotal.push(parseInt(quantity[i].value));
                    }
                    let countChange = amountTotal.reduce((acc, item) => acc + item);
                    cartNumbers = amountTotal.reduce((acc, item) => acc + item);
                    countTotal.innerHTML = `${countChange}`;
                    localStorage.setItem('cartNumbers', cartNumbers);
                    onLoadCartNumbers();
                    displayCartMini();
                }
            });
        };

        allProductInLocal[index].inCart = parseInt(quantity[index].value);
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    };
};

function handleDeleteProduct(index) {
    let cartItem = JSON.parse(localStorage.getItem('productsInCart'));
    let totalPrice = parseInt(localStorage.getItem('totalCost'));
    let cartNumber = localStorage.getItem('cartNumbers');

    cartItem = Object.values(cartItem);

    cartItem = { ...cartItem };

    totalPrice -= cartItem[index].priceCurrent * cartItem[index].inCart;
    // localStorage.setItem('totalCost', totalPrice);

    if (cartItem[index].inCart == 1) {
        cartNumber = cartNumber - 1;
    }
    else if(cartNumber > cartItem[index].inCart){
        cartNumber = cartNumber - cartItem[index].inCart;
    }
    else{
        cartNumber = cartItem[index].inCart - cartNumber;
    }
    // localStorage.setItem('cartNumbers', cartNumber);

    delete cartItem[index];

    cartItem = { ...cartItem };

    localStorage.setItem('cartNumbers', cartNumber);
    localStorage.setItem('totalCost', totalPrice);

    localStorage.setItem('productsInCart', JSON.stringify(cartItem));

    onLoadCartNumbers();
    displayCartMini();
    displayCart();
    displayOrder();
};  

// Yêu cầu giỏ hàng khi nhấn nút Đặt hàng
function orderToPay() {
    let totalPrice = parseInt(localStorage.getItem('totalCost'));
    let orderBtn = document.querySelector('.btn__order');
    if (totalPrice != 0) {
        orderBtn.setAttribute("href", "./order.html");
    }
    else {
        alert('Bạn cần phải có sản phẩm trong giỏ hàng !!!')
    }
}




