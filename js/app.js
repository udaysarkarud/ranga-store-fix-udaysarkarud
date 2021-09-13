// Api Connect
const loadProducts = () => {
  const url = `http://127.0.0.1:5500/ranga-api.json`;
  //const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

// call api connect and showProducts function 
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const singleProductDiv = document.createElement("div");
    singleProductDiv.classList.add("single-product");
    singleProductDiv.innerHTML = `
      <div>
        <img class="product-image" src=${product.image}></img>
      </div>
      <div class="product-info">
        <h3>${product.title}</h3>
        <h4>Avarage Rating: ${product?.rating?.rate} | Total Rated: ${product?.rating?.count}</h4>
        <h4>Category: ${product.category}</h4>
        <h2>Price: $ ${product.price}</h2>

        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add
          to cart</button>
        <button id="details-btn" class="btn btn-danger">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(singleProductDiv);
  }
};

// addToCart Function
let totalProductcount = 0;
const addToCart = (id, price) => {
  totalProductcount = totalProductcount + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = totalProductcount;
};

// convert InnerHTML tp Floating Number
const getInnerValue = (id) => {
  const elementText = document.getElementById(id).innerText;
  const elementValue = parseFloat(elementText);
  return elementValue;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInnerValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInnerValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInnerValue("price") + getInnerValue("delivery-charge") +
    getInnerValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// Buy Now Button
document.getElementById('buyNowBtn').addEventListener('click', () => {
  location.reload();
})
