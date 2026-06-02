
const products = [
    { id: 1, name: "DOOM Eternal", price: 1999, category: "shooter" },
    { id: 2, name: "Horizon Zero Dawn", price: 1499, category: "rpg" },
    { id: 3, name: "GTA", price: 2499, category: "action" }
];


let cart = [];


function addToCart(productId) {
    let product = null;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            product = products[i];
            break;
        }
    }

    if (product) {
        let found = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === productId) {
                cart[i].quantity = cart[i].quantity + 1;
                found = true;
                break;
            }
        }
        if (!found) {
            cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
        }
        showCart();
        alert(product.name + " добавлен в корзину!");
    }
}


function removeFromCart(productId) {
    let newCart = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id !== productId) {
            newCart.push(cart[i]);
        }
    }
    cart = newCart;
    showCart();
}


function calculateTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total = total + (cart[i].price * cart[i].quantity);
    }
    return total;
}


function showCart() {
    let cartDiv = document.getElementById("cart-items");
    let totalSpan = document.getElementById("cart-total");

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Корзина пуста</p>";
        totalSpan.innerHTML = "Итого: 0 ₽";
        return;
    }

    let html = "<ul>";
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        html += "<li>";
        html += item.name + " - " + item.quantity + " шт. - " + (item.price * item.quantity) + " ₽";
        html += " <button onclick='removeFromCart(" + item.id + ")'>Удалить</button>";
        html += "</li>";
    }
    html += "</ul>";
    cartDiv.innerHTML = html;
    totalSpan.innerHTML = "Итого: " + calculateTotal() + " ₽";
}


function checkout() {
    if (cart.length === 0) {
        alert("Корзина пуста! Добавьте товары.");
    } else {
        alert("Покупка на сумму " + calculateTotal() + " ₽ прошла успешно!");
        cart = [];
        showCart();
    }
}


function filterProducts(category) {
    let cards = document.querySelectorAll(".product-card");
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let cat = card.getAttribute("data-category");
        if (category === "all" || cat === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    }
}


function init() {

    let btns = document.querySelectorAll(".add-to-cart");
    for (let i = 0; i < btns.length; i++) {
        let btn = btns[i];
        let id = parseInt(btn.getAttribute("data-id"));
        btn.onclick = function () {
            addToCart(id);
        };
    }

 
    let payBtn = document.getElementById("checkout-btn");
    if (payBtn) {
        payBtn.onclick = checkout;
    }


    let filterBtns = document.querySelectorAll(".filter-btn");
    for (let i = 0; i < filterBtns.length; i++) {
        let btn = filterBtns[i];
        let cat = btn.getAttribute("data-category");
        btn.onclick = function () {
            filterProducts(cat);
            
            for (let j = 0; j < filterBtns.length; j++) {
                filterBtns[j].classList.remove("active");
            }
            btn.classList.add("active");
        };
    }
}


window.onload = init;