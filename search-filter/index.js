//http://localhost:3000/items

const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".products");
const btns = document.querySelectorAll(".btn");

let allProducts = [];
const filters = {
    searchItems: "",
};

document.addEventListener("DOMContentLoaded", () => {
    axios
        .get('http://localhost:3000/items')
        .then(res => {
            allProducts = res.data;
            renderProducts(res.data, filters);
        }).catch((err) => { console.log(err) });
})

function renderProducts(_products, _filters) {
    const filteredProducts = _products.filter((p) => {
        return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
    });
    productsDOM.innerHTML = "";
    filteredProducts.forEach((item, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <div class="img-container"><img src=${item.image} alt="p-${index}"></div>
        <div class="product-desc">
            <p class="product-price">${item.price} $</p>
            <p class="product-title">${item.title}</p>
        </div>`;
        productsDOM.appendChild(productDiv);
    });
    const product = document.querySelectorAll(".product");
    if (product.length <= 2) {
        productsDOM.style.height = "85rem";
        for (let i = 0; i <= 2; i++)
        product[i].style.height = "45%";
    }
    else if (product.length >= 3 && product.length < 5) {
        productsDOM.style.height = "160rem";
        for (let i = 3; i < 5; i++)
        product[i].style.height = "45%";
    }
    else productsDOM.style.height = "200rem"
}



searchInput.addEventListener("input", (e) => {
    filters.searchItems = e.target.value;
    renderProducts(allProducts, filters);
});

btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const filter = e.target.dataset.filter;
        filters.searchItems = filter;
        renderProducts(allProducts, filters);
    })
})