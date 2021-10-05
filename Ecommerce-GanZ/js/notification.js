var tabButtons = document.querySelectorAll('.notification-menu__item-link');
var tabPanles = document.querySelectorAll('.notification__box')

function showPanel(panelIndex, colorCode) {
    tabButtons.forEach(function (node) {
        node.style.backgroundColor = "";
        node.style.color = "";
    })

    tabButtons[panelIndex].style.backgroundColor = colorCode;
    tabButtons[panelIndex].style.color = "#fa6400";
    tabPanles.forEach(function (node) {
        node.style.display = "none";
    })

    tabPanles[panelIndex].style.display = "block"
    tabPanles[panelIndex].style.backgroundColor = "colorCode"
}

showPanel(1, '');




// click hover



// $(document).ready(function() {
//     $(".modal-comment").click(function(){
//         $(".modal-comment-active").toggle();
//     })
// })

var feedbackApi = "http://localhost:3000/feedback"
var historyAPI = "http://localhost:3000/orders"
function start() {
    // getFeedbacks(renderFeedbacks)
    handleCreateFeedback()
    getOrders(renderOrders)
}

start();

function getFeedbacks(callback) {
    fetch(feedbackApi).then(function (response) {
        return response.json();
    })
        .then(callback);
}
function getOrders(callback) {
    let userId = JSON.parse(localStorage.getItem('dataLogin')).id

    fetch(`${historyAPI}/?userId=${userId}`).then(function (response) {
        return response.json();
    })
        .then(callback);

}


function renderOrders(orders) {
    let total;
    let listOrder = document.querySelector('.notification__box.notification__box-history')
    let htmls = orders.map(function (item, index) {
        total = item.total
        return item.order.map(item => {
            return `
                <div class="order-history__container">
                    <div class="order-history-status">
                        <span class="order-history-like">Yêu thích</span>
                        <div class="order-history-status__deliver">
                            <i class="deliver-icon fas fa-truck"></i> 
                            <span class="order-history-delivery_detail">Đặt hàng thành công</span>
                            <i class="help-icon far fa-question-circle"></i>
                            <span class="order-history-delivery_success">ĐANG GIAO</span>
                        </div>
                    </div>
                    <a href="" class="notification__sale notification__order">
                        <div class="notification__sale-image">
                            <img src="${item.image}" alt="" class="notification__sale-img">
                        </div>
                        <div class="notification__sale-des">
                            <h3 class="notification__sale-title">✨ 💥 ${item.title} 💥 ✨</h3>
                            <p class="notification__sale-ds">Phân loại hàng: ${item.category}</p>
                            <p class="notification__sale-date">x1</p>
                        </div>
                        <div class="notification__price">
                            <span class="notification__price-current">${item.priceCurrent.toLocaleString('vi-VN')} đ</span>
                            <span class="notification__price-sale">${item.priceSale.toLocaleString('vi-VN')} đ</span>
                        </div>
                    </a>
                    <div class="notification-evaluate">
                        <span class="notification-evaluate-date">Đánh giá sản phẩm ngay</span>
                        <div class="notification-evaluate-form">
                            <h2 class="notification-evaluate-totalprice">
                                <i class="fab fa-staylinked"></i>
                                Tổng Số Tiền:
                                <span class="price-of-order">${total.toLocaleString('vi-VN')} đ</span>
                            </h2>
                            <button class="evaluate-btn btn-modal btn-active" data-bs-toggle="modal" data-bs-target="#modal-${item.id}">Đánh Giá</button>
                            <button class="evaluate-btn">Mua Lần Nữa</button>
                            <div class="modal" id="modal-${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h2 class="modal-header-heading" id="exampleModalLabel">Đánh giá sản phẩm</h2>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="modal-body-product">
                                                <img src="${item.image}" alt="shirt" class="modal-body-product-img">
                                                <div class="modal-body-product-des">
                                                    <h3 class="product-des-title">${item.title}</h3>
                                                    <p class="product-des-classify">Phân loại hàng: ${item.category}</p>
                                                </div>
                                            </div>
                                            <div class="modal-body-star">
                                                <i class="modal-star fas fa-star"></i>
                                                <i class="modal-star fas fa-star"></i>
                                                <i class="modal-star fas fa-star"></i>
                                                <i class="modal-star fas fa-star"></i>
                                                <i class="modal-star fas fa-star"></i>
                                            </div>
                                            <div class="modal-body-evaluate">
                                                <span class="modal-comment modal-comment-active">Chất lượng sản phẩm tuyệt vời</span>
                                                <span class="modal-comment">Đóng gói sản phẩm đẹp và rất chắc chắn</span>
                                                <span class="modal-comment">Phục vụ tốt</span>
                                                <span class="modal-comment">Rất đáng tiền</span>
                                                <span class="modal-comment">Thời gian giao hàng nhanh</span>
                                            </div>
                                            <div class="modal-body-comment">
                                                <textarea name="description" id="" class="form-comment" cols="30" rows="4" placeholder="Hãy chia sẽ những điều bạn thích về sản phẩm này nhé..."></textarea>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Trở lại</button>
                                            <button type="button" class="btn btn-active modal-btn-success" data-id=${item.id} data-bs-dismiss="modal" >Hoàn thành</button>
                                        </div>
                                    </div>
                                </div>
                            </div>     
                        </div>
                    </div>
                 </div>
            </div>
        `
        
        })

    }) 
    listOrder.innerHTML = htmls.join('')

    const modal_commet = document.querySelectorAll(".modal-body-evaluate .modal-comment");

    Array.from(modal_commet).forEach(function (ele) {
        ele.addEventListener("click", function (e) {
            for (let i = 0; i < modal_commet.length; i++) {
                modal_commet[i].classList.remove("modal-comment-active");
            }
            this.classList.add("modal-comment-active");
        })
    })
    // js modal

    // const evaluateBtns = document.querySelectorAll('.btn-modal');
    // const modal = document.querySelector('.modal');
    // const modalContainer = document.querySelector('.modal-container');
    // const modalClose = document.querySelector('.modal-btn-back');

    // function showEvaluateModal() {
    //     modal.classList.add('open')
    // }

    // // ham an modal close

    // function hideEvaluateModal() {
    //     modal.classList.remove('open')
    // }

    // for (const evaluateBtn of evaluateBtns) {
    //     evaluateBtn.addEventListener('click', showEvaluateModal)
    // }

    // modalClose.addEventListener('click', hideEvaluateModal)

    // modal.addEventListener('click', hideEvaluateModal)

    // modalContainer.addEventListener('click', function (e) {
    //     e.stopPropagation();
    // })

    const createBtn = document.querySelectorAll('.modal-btn-success')
    let textNotification = document.querySelector('.notification-message');
    // console.log(createBtn)
    createBtn.forEach((item,index) => {
        item.onclick = () => {
            const description = document.querySelectorAll('textarea[name="description"]');
            const img = document.querySelectorAll('.modal-body-product-img');
            const title = document.querySelectorAll('.product-des-title')
            const feedbackData = {
                productId: parseInt(item.getAttribute('data-id')),
                title: title[index].textContent,
                img: img[index].getAttribute('src'),
                nameUser: JSON.parse(localStorage.getItem('dataLogin')).name,
                email: JSON.parse(localStorage.getItem('dataLogin')).email,
                description: description[index].value
            }
            createFeedback(feedbackData)
            description[index].value = ""
            textNotification.innerHTML = 'Đánh giá thành công ^^!';
            textNotification.style.display = "block";
            setTimeout(function(){ textNotification.style.display = "none"; }, 3000);
        }

    })

}

function createFeedback(data, callback) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    fetch(feedbackApi, options).then(function (response) {
        response.json()
    })
        .then(callback);
}

// function renderFeedbacks(feedbacks){
//     listFeedbacks = document.querySelector('.product__evaluate-box')
//     htmls = feedbacks.map(function(feedback){
//         return `
//         <div class="product-evaluate__comments">
//             <div class="product-evaluate__comments-avatar">
//                 <div class="evaluate__comment-box">
//                     <span class="avatar-image">
//                         <img src="./asset/img/beckham.jpeg" alt="">
//                         <span class="avatar-name">Quoc Khanh</span>
//                     </span>
//                     <span class="avatar-list-icon">
//                         <i class="avatar-icon fas fa-star"></i>
//                         <i class="avatar-icon fas fa-star"></i>
//                         <i class="avatar-icon fas fa-star"></i>
//                         <i class="avatar-icon fas fa-star"></i>
//                         <i class="avatar-icon fas fa-star"></i>
//                     </span>
//                     <span class="avatar-color">Màu Sắc: Mau hong</span>
//                 </div>
//                 <div class="evaluate__comment-time">
//                     <span>20/11/2020</span>
//                 </div>
//             </div>
//             <div class="product-evaluate__comments-des">
//                 <p>${feedback.description}</p>
//             </div>
//         </div>
//         `
//     })

//     listFeedbacks.innerHTML = htmls.join('')
// }

function handleCreateFeedback() {

}

// menu-mobile

function toggleMemu() {
    var menu = document.querySelector('.notification-menu__list');
    if (menu.style.display == 'none') {
        menu.style.display = 'block';
    } else menu.style.display = 'none';

}

let dataUser = JSON.parse(localStorage.getItem('dataLogin'));

let userName = document.querySelector('.my-profile__info-name');
let userNameAccount = document.querySelector('.manage__profile-namefill');

userName.textContent = dataUser.name;
userNameAccount.textContent = dataUser.name;