var tabButtonCates = document.querySelectorAll('.menu-item-link');
var tabPanleCates = document.querySelectorAll('.grid__row-cate')

function showPanelCate(panelIndex, colorCode){
    tabButtonCates.forEach(function(node){
        node.style.backgroundColor ="";
        node.style.color="";
    })

    tabButtonCates[panelIndex].style.backgroundColor = colorCode;
    tabButtonCates[panelIndex].style.color="#fa6400";
    tabPanleCates.forEach(function(node){
        node.style.display = "none";
    })

    tabPanleCates[panelIndex].style.display = "flex"
    tabPanleCates[panelIndex].style.backgroundColor ="colorCode"
}

showPanelCate(0,'');


// show cart
 let productCateAPI = "http://localhost:3000/product?"

function start(){
    getProductCates(renderPruductCates)
    getProductCates(renderPruductShirtCates)
    getProductCates(renderPruductShortCates)
    getProductCates(renderPruductJeanCates)
    getProductCates(renderPruductJeanShortCates)
    getProductCates(renderFilterItem)
}

start()

function getProductCates(callback){
    fetch(productCateAPI).then(function(response){
        return response.json();
    })
    .then(callback)
}
function renderPruductCates(productCates){
    let productShirts = productCates.filter(function(product){
        return product.category == 'shirt'
    })
    let listCartCate = document.querySelector('.grid__row-cate');
let  htmls3 = productShirts.map(function(productCate){
        return `
        <div class="grid__col-2-4 item-box" data-item="${productCate.dataItem}">
            <div class="recommend__product-box">
                <div class="recommend__product-img--detail" data-detail=${productCate.id}>
                    <img src="${productCate.image}" alt="shirt" class="recomend__product-img">
                </div>
                <h4 class="recommend__product-name">${productCate.title}</h4>
                <div class="recommend__product-price">
                    <span class="recommend__product-price-old">${productCate.priceSale} đ</span>
                    <span class="recommend__product-price-new">${productCate.priceCurrent.toLocaleString('vi-VN')} đ</span>
                </div>
                <div class="recommend__product-like">
                    <span class="recommend__product-item__like recommend__product-item__like--liked">
                        <i class="recommend__product-item__like-icon-empty far fa-heart"></i>
                        <i class="recommend__product-item__like-icon-fill fas fa-heart"></i>
                    </span>
                    <div class="recommend__product-item__star">
                        <i class="recommend__product-item__star-gold fas fa-star"></i>
                        <i class="recommend__product-item__star-gold fas fa-star"></i>
                        <i class="recommend__product-item__star-gold fas fa-star"></i>
                        <i class="recommend__product-item__star-gold fas fa-star"></i>
                        <i class="fas fa-star"></i> 
                    </div>
                    
                </div>
                <div class="recommend__product-btn" data-id = "${productCate.id}">
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
    })

    listCartCate.innerHTML = htmls3.join('')
    const link = document.querySelectorAll('.recommend__product-img--detail')
    link.forEach((item, index) => {
        item.onclick = () => {
            const id = item.getAttribute("data-detail")
            params = {id: id}
            getProductDetail(params)
        }
    });
    // Click nút CHỌN MUA để thêm sản phẩm vào giỏ hàng
    let textNotification = document.querySelector('.notification-message');
    const btnAddProductToCart = document.querySelectorAll('.recommend__product-btn')
    btnAddProductToCart.forEach((item, index) => {
        item.onclick = () => {
            const id = item.getAttribute("data-id")
            console.log(id)
            const product = productCates.find(p => p.id == item.getAttribute("data-id"));
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

// 

function renderPruductShirtCates(productCates){
    var productUnderwears = productCates.filter(function(product){
        return product.category == 'underwear'
    })
    var listCartCateShirt = document.querySelector('.grid__row-cate-shirt');
    var htmls = productUnderwears.map(function(productCateShirt){
        return `
        <div class="grid__col-2-4">
        <a href="" class="recommend__product-box">
            <div class="recommend__product-img">
            <img src="${productCateShirt.image}" alt="shirt" class="recomend__product-img">
            </div>
            <h4 class="recommend__product-name">${productCateShirt.title}</h4>
            <div class="recommend__product-price">
                <span class="recommend__product-price-old">${productCateShirt.priceSale.toLocaleString('vi-VN')} đ</span>
                <span class="recommend__product-price-new">${productCateShirt.priceCurrent.toLocaleString('vi-VN')} đ</span>
            </div>
            <div class="recommend__product-like">
                <span class="recommend__product-item__like recommend__product-item__like--liked">
                    <i class="recommend__product-item__like-icon-empty far fa-heart"></i>
                    <i class="recommend__product-item__like-icon-fill fas fa-heart"></i>
                </span>
                <div class="recommend__product-item__star">
                    <i class="recommend__product-item__star-gold fas fa-star"></i>
                    <i class="recommend__product-item__star-gold fas fa-star"></i>
                    <i class="recommend__product-item__star-gold fas fa-star"></i>
                    <i class="recommend__product-item__star-gold fas fa-star"></i>
                    <i class="fas fa-star"></i> 
                </div>
                <span class="recommend__product-item__buy">Đã bán ${productCateShirt.sold}</span>
            </div>
            <div class="recommend__product-btn">
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
        </a>
    </div>
        `
    })

    listCartCateShirt.innerHTML = htmls.join('')
}
// short
function renderPruductShortCates(productCates){
    var productUnderwears = productCates.filter(function(product){
        return product.category == 'short'
    })
    var listCartCateShirt = document.querySelector('.grid__row-cate-short');
    var htmls = productUnderwears.map(function(productCateShirt){
        return `
        <div class="grid__col-2-4">
        <a href="" class="recommend__product-box">
            <div class="recommend__product-img">
            <img src="${productCateShirt.image}" alt="shirt" class="recomend__product-img">
            </div>
            <h4 class="recommend__product-name">${productCateShirt.title}</h4>
            <div class="recommend__product-price">
                <span class="recommend__product-price-old">${productCateShirt.priceSale.toLocaleString('vi-VN')} đ</span>
                <span class="recommend__product-price-new">${productCateShirt.priceCurrent.toLocaleString('vi-VN')} đ</span>
            </div>
            <div class="recommend__product-like">
                <span class="recommend__product-item__like recommend__product-item__like--liked">
                    <i class="recommend__product-item__like-icon-empty far fa-heart"></i>
                    <i class="recommend__product-item__like-icon-fill fas fa-heart"></i>
                </span>
                <div class="recommend__product-item__star">
                    <i class="recommend__product-item__star-gold fas fa-star"></i>
                    <i class="recommend__product-item__star-gold fas fa-star"></i>
                    <i class="recommend__product-item__star-gold fas fa-star"></i>
                    <i class="recommend__product-item__star-gold fas fa-star"></i>
                    <i class="fas fa-star"></i> 
                </div>
                <span class="recommend__product-item__buy">Đã bán ${productCateShirt.sold}</span>
            </div>
            <div class="recommend__product-btn">
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
        </a>
    </div>
        `
    })

    listCartCateShirt.innerHTML = htmls.join('')
}

// jeans

function renderPruductJeanCates(productCates){
    var productShirts = productCates.filter(function(product){
        return product.category == 'feature'
    })
    var listCartCate = document.querySelector('.grid__row-cate-jeans');
    var htmls3 = productShirts.map(function(productCate){
        return `
        <div class="grid__col-2-4 item-box" data-item="${productCate.dataItem}">
            <a href="" class="recommend__product-box">
                <div class="recommend__product-img">
                <img src="${productCate.image}" alt="shirt" class="recomend__product-img">
                </div>
                <h4 class="recommend__product-name">${productCate.title}</h4>
                <div class="recommend__product-price">
                    <span class="recommend__product-price-old">${productCate.priceSale.toLocaleString('vi-VN')} đ</span>
                    <span class="recommend__product-price-new">${productCate.priceCurrent.toLocaleString('vi-VN')} đ</span>
                </div>
                <div class="recommend__product-like">
                    <span class="recommend__product-item__like recommend__product-item__like--liked">
                        <i class="recommend__product-item__like-icon-empty far fa-heart"></i>
                        <i class="recommend__product-item__like-icon-fill fas fa-heart"></i>
                    </span>
                    <div class="recommend__product-item__star">
                        <i class="recommend__product-item__star-gold fas fa-star"></i>
                        <i class="recommend__product-item__star-gold fas fa-star"></i>
                        <i class="recommend__product-item__star-gold fas fa-star"></i>
                        <i class="recommend__product-item__star-gold fas fa-star"></i>
                        <i class="fas fa-star"></i> 
                    </div>
                    <span class="recommend__product-item__buy">Đã bán 88</span>
                </div>
                <div class="recommend__product-btn">
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
            </a>
        </div>
        `
    })

    listCartCate.innerHTML = htmls3.join('')
}

// jeanshort

function renderPruductJeanShortCates(productCates){
    var productShirts = productCates.filter(function(product){
        return product.category == 'recommend'
    })
    var listCartCate = document.querySelector('.grid__row-cate-jeansShort');
    var htmls3 = productShirts.map(function(productCate){
        return `
        <div class="grid__col-2-4 item-box" data-item="${productCate.dataItem}">
            <a href="" class="recommend__product-box">
                <div class="recommend__product-img">
                <img src="${productCate.image}" alt="shirt" class="recomend__product-img">
                </div>
                <h4 class="recommend__product-name">${productCate.title}</h4>
                <div class="recommend__product-price">
                    <span class="recommend__product-price-old">${productCate.priceSale.toLocaleString('vi-VN')} đ</span>
                    <span class="recommend__product-price-new">${productCate.priceCurrent.toLocaleString('vi-VN')} đ</span>
                </div>
                <div class="recommend__product-like">
                    <span class="recommend__product-item__like recommend__product-item__like--liked">
                        <i class="recommend__product-item__like-icon-empty far fa-heart"></i>
                        <i class="recommend__product-item__like-icon-fill fas fa-heart"></i>
                    </span>
                    <div class="recommend__product-item__star">
                        <i class="recommend__product-item__star-gold fas fa-star"></i>
                        <i class="recommend__product-item__star-gold fas fa-star"></i>
                        <i class="recommend__product-item__star-gold fas fa-star"></i>
                        <i class="recommend__product-item__star-gold fas fa-star"></i>
                        <i class="fas fa-star"></i> 
                    </div>
                    <span class="recommend__product-item__buy">Đã bán 88</span>
                </div>
                <div class="recommend__product-btn">
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
            </a>
        </div>
        `
    })

    listCartCate.innerHTML = htmls3.join('')
}


// button 
function renderFilterItem(products){
    const listBtn = document.querySelectorAll('.home-filter__btn');
    const itemBox = document.querySelectorAll('.item-box');


    Array.from(listBtn).forEach(function(element){
        element.addEventListener('click', function(e){
            for(let i = 0; i <listBtn.length; i++){
                listBtn[i].classList.remove('btn-active');
            }
            this.classList.add('btn-active');

            let namefilter = element.dataset.filter;
            console.log(namefilter)
            Array.from(itemBox).forEach(function(ele){
                if(ele.dataset.item === namefilter || namefilter ==='all'){
                    ele.style.display = 'block';
                    console.log(ele.dataset.item)
                }else{
                    ele.style.display = 'none'
                }
            })
        })
    })

}

// const listBtn = document.querySelectorAll('.home-filter__btn');
// const itemBox = document.querySelectorAll('.item-box');


// Array.from(listBtn).forEach(function(element){
//     element.addEventListener('click', function(e){
//         for(let i = 0; i <listBtn.length; i++){
//             listBtn[i].classList.remove('btn-active');
//         }
//         this.classList.add('btn-active');

//         let namefilter = element.dataset.filter;
//         console.log(namefilter)
//         Array.from(itemBox).forEach(function(ele){
//             if(ele.dataset.item === namefilter || namefilter ==='all'){
//                 ele.style.display = 'block';
//                 console.log(ele.dataset.item)
//             }else{
//                 ele.style.display = 'none'
//             }
//         })
//     })
// })

const listBtnCate = document.querySelectorAll('.menu-list-item')

Array.from(listBtnCate).forEach(function(element){
    element.addEventListener('click', function(){
        for(let i = 0; i <listBtnCate.length; i++){
            listBtnCate[i].classList.remove('menu-list-item--active');
        }
        this.classList.add('menu-list-item--active');
    })
})

// menu 

function showmenu(){
    const menuFilter = document.querySelector('.menu-list');
    if(menuFilter.style.display == 'block'){
        menuFilter.style.display = 'none';
    }else
    menuFilter.style.display = 'block';
}
