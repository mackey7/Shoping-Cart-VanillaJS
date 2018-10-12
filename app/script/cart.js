fetch("https://api.myjson.com/bins/os52s")
    .then(response => {
        return response.json()
    })
    .then(response => {
        response.forEach(card => {
            const products = document.querySelector('.products');
            //create product card
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            // create product images
            const productImages = document.createElement('img');
            productImages.classList.add('product-images');
            productImages.dataset.img = card.img;
            productImages.src = card.img;
            productCard.appendChild(productImages)
            //create product name
            const productName = document.createElement('h3');
            productName.classList.add('name')
            productName.dataset.img = card.name;
            productName.innerHTML = card.name;
            productCard.appendChild(productName)
            //create price
            const price = document.createElement('span');
            price.classList.add('price');
            price.dataset.price = card.price;
            price.innerHTML = ` ${card.price} $`;
            productCard.appendChild(price)
            //crate add to cart button
            const addProduct = document.createElement('button');
            addProduct.classList.add('add-product');
            addProduct.innerHTML = "Add to cart";
            productCard.appendChild(addProduct)
            //add Porduct card to product list
            const productList = document.querySelector('#product-item');
            productList.appendChild(productCard);
        })
        return response
    })
    .then(response => {
        const addProductBtns = document.querySelectorAll('.add-product');
        for (const addProduct of addProductBtns) {
            addProduct.addEventListener('click', function (e) {
                const parent = e.target.parentNode;
                const img = parent.querySelector('.product-images').getAttribute('src');
                const name = parent.querySelector('.name').innerText;
                // const count = parent.querySelector('input').value;
                const count = 1;
                const price = parent.querySelector('.price').getAttribute("data-price");
                addIttemtoCart(name, price, count, img)
                displayCart();
            });
        };
        return response
    });

let cart = [];
//create item object
function Item(name, price, count, img) {
    this.name = name;
    this.price = price;
    this.count = count;
    this.img = img;
}
// add item do cart
function addIttemtoCart(name, price, count, img) {
    for (let i in cart) {
        if (cart[i].name === name) {
            cart[i].count += count;
            return;
        }
    }
    var item = new Item(name, price, count, img);
    cart.push(item);
}
// clean all items in cart
function clearAllCart() {
    cart = [];
}
// quantity items in cart
function countCart() {
    var totoalCount = 0;
    for (let i in cart) {
        totoalCount += cart[i].count;
    }
    return ' ' + totoalCount;
}

// how many cost
function totalCart() {
    let totoalCost = 0;
    for (var i in cart) {
        totoalCost += cart[i].price;
    }
    return totoalCost
}

// list  items in cart
function listCart() {
    return cart;
}

let output = "";
const showCart = document.querySelector('.cart-body');
function displayCart() {
    const cartArray = listCart();
    let output = "";
    for (var i in cartArray) {
        output +=
            `<tr class="show-cart-item">
        <td class="categoryName"> ${cartArray[i].name}</td>
         <td class="categoryQuantity"> ${cartArray[i].count}</td>
         <td class="categoryPrice"> ${cartArray[i].price}$</td>
          <td> <img class="categoryImage cart-item_image" src="${cartArray[i].img}" alt=""></td>
          </tr>`
    }
    showCart.innerHTML = output;

}
const clearBtn = document.createElement('button');
clearBtn.classList.add('clear-cart');
clearBtn.innerHTML = 'Clear Cart'
const cartConatiner = document.querySelector('.cart');
cartConatiner.appendChild(clearBtn);
clearBtn.addEventListener('click', function () {
    clearAllCart()
    let output = "";
    showCart.innerHTML = output;

});

const cartBtn = document.querySelector('#cart-btn')
cartBtn.addEventListener('click', function () {
    const cartConatiner = document.querySelector('.cart');
    cartConatiner.classList.toggle('active')
})
