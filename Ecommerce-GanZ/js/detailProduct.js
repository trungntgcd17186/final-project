// tabbtn   

var tabButtonDess = document.querySelectorAll('.description-product__detail');
var tabPanleDess = document.querySelectorAll('.product__dt-box')

function showPanelDes(panelIndex, colorCode) {
    tabButtonDess.forEach(function (node) {
        node.style.backgroundColor = "";
        node.style.color = "";
    })

    tabButtonDess[panelIndex].style.backgroundColor = colorCode;
    tabButtonDess[panelIndex].style.color = "#fff";
    tabPanleDess.forEach(function (node) {
        node.style.display = "none";
    })

    tabPanleDess[panelIndex].style.display = "block"
    tabPanleDess[panelIndex].style.backgroundColor = "colorCode"
}

showPanelDes(0, '#fa6400');

// getAPI

function zoomout(image) {
    var src = image.src;
    document.getElementById('image-large').style.backgroundImage = "url(" + src + ")";
}

var feedbackApi = "http://localhost:3000/feedback"


const product= JSON.parse(localStorage.getItem('productDetail'))

function start() {
    getFeedbacks(renderFeedbacks,product[0].id)
    handleCreateFeedback()
}

start();



function getFeedbacks(callback,id) {
    fetch(`${feedbackApi}?productId=${id}`).then(function (response) {
        return response.json();
    })
        .then(callback);
}

function getProductDetail(id) {
    console.log(id)
    fetch(`${sourceAPI}?id=${id}`).then(function (response) {
        return response.json();
    })
    .then(callback => redirectPage(callback))
    // console.log(id,123)
}

function redirectPage(product) {
    localStorage.setItem('productDetail', JSON.stringify(product))
    window.location.href = "http://127.0.0.1:5503/detailProduct.html"
}

function createFeedback(data, callback) {
    var options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    fetch(feedbackApi, options).then(function (response) {
        response.json()
    })
        .then(callback);
}

function renderFeedbacks(feedbacks) {
    let product = JSON.parse(localStorage.getItem('productDetail')) || {}
    console.log(product,123456);
    listFeedbacks = document.querySelector('.product__evaluate-box')
    content = document.querySelector('.content')

    htmls = feedbacks.map(function (feedback) {
        return `
        <div class="product-evaluate__comments">
            <div class="product-evaluate__comments-avatar">
                <div class="evaluate__comment-box">
                    <span class="avatar-image">
                        <img src="./asset/img/beckham.jpeg" alt="">
                        <span class="avatar-name">${feedback.nameUser}</span>
                    </span>
                    <span class="avatar-list-icon">
                        <i class="avatar-icon fas fa-star"></i>
                        <i class="avatar-icon fas fa-star"></i>
                        <i class="avatar-icon fas fa-star"></i>
                        <i class="avatar-icon fas fa-star"></i>
                        <i class="avatar-icon fas fa-star"></i>
                    </span>
                    <span class="avatar-color">Màu Sắc: Mau hong</span>
                </div>
                <div class="evaluate__comment-time">
                    <span>20/11/2020</span>
                </div>
            </div>
            <div class="product-evaluate__comments-des">
                <p>${feedback.description}</p>
            </div>
        </div>
        `
    })

    listFeedbacks.innerHTML = htmls.join('')
    let listImg = "";
    product[0]?.img?.map(item=> {
        listImg += `<div class="content-image__sml-detail">
                        <img src="${item}" alt="image" onclick="zoomout(this)">
                    </div>`
    })
    content.innerHTML = `
    <div class="content">
        <div class="content-image">
            <div id="image-large" class="content-image__large">
            </div>
                <div class="content-image__sml">
                   ${listImg}
                </div>
                <div class="content-sticker">
                    <i class="fas fa-check"></i>
                    <span class="content-sticker__name">Yêu thích</span>
                </div>
                <div class="content-item__sale-off">
                    <span class="content-item__percent">10%</span>
                    <span class="content-item__sale-off-label">GIẢM</span>
                </div>
            </div>
            <div class="content-description">
                <h2 class="content-description-title">${product[0].title}</h2>
                <p class="content-description-solid">Đã bán 100+ | 100+ đánh giá</p>

                <div class="content-description__star">
                    <div class="content-description__star-icon">
                        <i class="description__star-icon fas fa-star"></i>
                        <i class="description__star-icon fas fa-star"></i>
                        <i class="description__star-icon fas fa-star"></i>
                        <i class="description__star-icon fas fa-star"></i>
                        <i class="description__star-icon fas fa-star"></i>
                    </div>

                    <div class="content-description__des">
                        <span>100% đánh giá 5 sao</span>
                    </div>
                </div>

                <div class="content-description__price">
                    <h3 class="content__price-name">Giá bán</h3>
                    <span class="content__price-sale-off">${product[0].priceSale.toLocaleString('vi-VN')} đ</span>
                    <span class="content__price-current">${product[0].priceCurrent.toLocaleString('vi-VN')} đ</span>
                </div>

                <div class="content-description__color">
                    <h3 class="content__color-name">Màu sắc</h3>
                    <div class="content__color-detail">
                        <span class="content__color content__color-active">Hồng</span>
                        <span class="content__color">xám</span>
                        <span class="content__color">Nâu</span>
                        <span class="content__color">Đen</span>
                        <span class="content__color">Khói</span>
                        <span class="content__color">Tím</span>
                        <span class="content__color">Trắng</span>
                        <span class="content__color">Xanh</span>
                        <span class="content__color">Vàng nhạt</span>
                        <span class="content__color">Hồng đậm</span>
                        <span class="content__color">Vàng nhạt</span>
                        <span class="content__color">Nâu đen</span>
                        <span class="content__color">Xám khói</span>
                    </div>
                </div>

                <div class="content-description__size">
                    <h3 class="content__size-name">Kích cỡ</h3>
                    <span class="content__size size1 content__size-active">S</span>
                    <span class="content__size size2">M</span>
                    <span class="content__size size3">L</span>
                    <span class="content__size size4">XL</span>
                    <span class="content__size size5">XXL</span>
        
                </div>

                <div class="content-description__quanlity">
                    <h3 class="content__quanlity-name">Chọn số lượng </h3>
                    <input type="button" value="-" id="inc" onclick="decNumber()">
                    <label id="display">1</label>
                    <input type="button" value="+" id="dec" onclick="incNumber()">
                    <p class="description__quanlity-solid">69 sản phẩm có sẵn</p>
                </div>

                <div class="buy__now">
                    <button class="btn-add buy__now-cart">
                        <i class="fas fa-shopping-bag"></i>
                        Thêm Vào Giỏ Hàng
                    </button>
                    <button class="btn-add buy__now-live">Mua Ngay</button>
                </div>
                <p class="link-to-size">Nếu bạn chưa biết rõ size của mình, hãy tham khảo 
                    <a href="./size.html" title="Hướng dẫn chọn size phù hợp" target="_blank"> hướng dẫn chọn size</a>
                </p>
            </div>
        </div>
    `
    let image = document.querySelector('.content-image__large')
    image.style.backgroundImage = `url("${product[0].image}")`

    // choose color

    const colorBtn = document.querySelectorAll(".content__color");
    const sizeBtn = document.querySelectorAll(".content__size")

    colorBtn.forEach(function (element) {
        element.addEventListener("click", function () {
            for (let i = 0; i < colorBtn.length; i++) {
                colorBtn[i].classList.remove('content__color-active');
            }
            this.classList.add('content__color-active');
        })
    })

    sizeBtn.forEach(function (element) {
        element.addEventListener("click", function () {
            for (let i = 0; i < sizeBtn.length; i++) {
                sizeBtn[i].classList.remove('content__size-active');
            }
            this.classList.add('content__size-active');
        })
    })


    // button up, down

    var i = 1; 

    incNumber = ()  => {
        if (i < 100) {
            i++;
        }
        document.getElementById("display").innerHTML = i;
    }

    decNumber =() => {
        if (i > 1) {
            --i;
        }
        document.getElementById("display").innerHTML = i;
    }

    // Thêm giỏ hàng
    let textNotification = document.querySelector('.notification-message');
    let addCartBtn = document.querySelector('.buy__now-cart');
    addCartBtn.onclick = function(){
        addProductToCart(product[0]);
        onLoadCartNumbers();
        cartNumbers(product[0]);
        totalCost(product[0]);
        displayCartMini(); 
        displayCart();
        textNotification.innerHTML = 'Thêm vào giỏ hàng thành công ^^';
        textNotification.style.display = "block";
        setTimeout(function(){ textNotification.style.display = "none"; }, 3000);
    };

    // Thanh toán
    let payCartBtn = document.querySelector('.buy__now-live');
    payCartBtn.onclick = function(){
        addProductToCart(product[0]);
        onLoadCartNumbers();
        cartNumbers(product[0]);
        totalCost(product[0]);
        displayCartMini(); 
        displayCart();
        setTimeout(() => {
			window.location = './order.html';
		}, 1000);
    };
}

function handleCreateFeedback() {
    let createBtn = document.querySelector('#feedback')
    if(createBtn) {
        createBtn.onclick = function () {
            var description = document.querySelector('input[name="description"]').value;
            var feedbackData = {
                description: description
            }
            createFeedback(feedbackData, function () {
                getFeedbacks(renderFeedbacks)
            })
        }
    }
    
}




