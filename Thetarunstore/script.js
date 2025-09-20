const products = [
  {
    id: 1,
    title: "HIROTO",
    price: 1699,
    img: "./image/shirt-1.png",
    description:
      "Orange Solid Slim Fit ...",
  },
  {
    id: 2,
    title: "CONDUI",
    price: 1899,
    img: "./image/shirt-2.png",
    description:
      "Green & White Herringb..."
  },
  {
    id: 3,
    title: " WURKO ",
    price: 1899,
    img: "./image/shirt-3.png",
    description:
      "Cream Herringbone Wove..."
  },
  {
    id: 4,
    title: " SCENE ",
    price: 1899,
    img: "./image/shirt-4.png",
    description:
      "Cream Crew Neck Graphi..."
  },
  {
    id: 5,
    title: " PING ",
    price: 1899,
    img: "./image/shirt-5.png",
    description:
      "Cream Crew Neck Graphi..."
  },
  {
    id: 6,
    title: " BHERO ",
    price: 1899,
    img: "./image/shirt-6.png",
    description:
      "Beige Cotton Solid Sli..."
  },
  {
    id: 7,
    title: " GIJOL ",
    price: 1899,
    img: "./image/tshirt-2.png",
    description:
      "Black Geometric Textur..."
  },
  {
    id: 8,
    title: " GENACH ",
    price: 1899,
    img: "./image/tshirt-1.png",
    description:
      "Brown Geometric Textur..."
  },
  {
    id: 9,
    title: " GENACH ",
    price: 1899,
    img: "./image/hoodie-1.png",
    description:
      "Brown Geometric Textur..."
  },
  {
    id: 10,
    title: " GENACH ",
    price: 1899,
    img: "./image/hoodie-2.png",
    description:
      "Brown Geometric Textur..."
  },
  {
    id: 11,
    title: " GENACH ",
    price: 1899,
    img: "./image/hoodie-3.png",
    description:
      "Brown Geometric Textur..."
  },
  {
    id: 12,
    title: "HIDKO",
    price: 1899,
    img: "./image/tshirt-3.png",
    description:
      "Green Solid Relaxed Fi..."
  },
  {
    id: 13,
    title: " BRAG ",
    price: 1899,
    img: "./image/tshirt-4.png",
    description:
      "Cream Crew Neck Graphi..."
  },
  {
    id: 14,
    title: " TAPA ",
    price: 1899,
    img: "./image/tshirt-5.png",
    description:
      "Cream Crew Neck Graphi..."
  },
  {
    id: 15,
    title: " MIGO ",
    price: 1899,
    img: "./image/tshirt-6.png",
    description:
      "Navy Crew Neck Graphic..."
  },
  {
    id: 16,
    title: " BOH ",
    price: 1899,
    img: "./image/tshirt-7.png",
    description:
      "Olive Oversized Crew N..."
  },


];

let cart = [];

// Render products dynamically
function renderProducts(list = products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  list.forEach((p) => {
    productList.innerHTML += `
          <div class="product-card">
            <div class="product-image">
              <img src="${p.img}" alt="${p.title}" />
              <div class="overlay">
                <button class="add-btn" onclick="addToCart(${p.id})">Add</button>
                <div class="sizes">
                  <span onclick="selectSize(${p.id}, 'S')">S</span>
                  <span onclick="selectSize(${p.id}, 'M')">M</span>
                  <span onclick="selectSize(${p.id}, 'L')">L</span>
                  <span onclick="selectSize(${p.id}, 'XL')">XL</span>
                  <span onclick="selectSize(${p.id}, 'XXL')">XXL</span>
                  <span onclick="selectSize(${p.id}, '3XL')">3XL</span>
                </div>
              </div>
            </div>
           <div class="product-info">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <p class="price">rs. ${p.price}</p>
           </div>
        </div>
        `;
  });
}

function selectSize(productId, size) {
  const product = products.find((p) => p.id === productId);
  product.selectedSize = size;
  alert(`${product.title} size ${size} selected!`);
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const size = product.selectedSize || "M";
  const existing = cart.find((c) => c.id === id && c.size === size);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, size, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").textContent = cart.reduce(
    (a, c) => a + c.qty,
    0
  );
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
          <div class="cart-item">
            <img src="${item.img}" alt="${item.title}" width="50">
            <div>
              <div>${item.title} (${item.size})</div>
              <div>₹${item.price} × ${item.qty}</div>
              <button onclick="removeFromCart(${item.id}, '${item.size}')">Remove</button>
            </div>
          </div>
        `;
  });
  document.getElementById("cart-total").textContent = total;
}

function removeFromCart(id, size) {
  cart = cart.filter((c) => !(c.id === id && c.size === size));
  updateCart();
}

function toggleCart() {
  const cartBox = document.getElementById("cart");
  cartBox.style.display = cartBox.style.display === "block" ? "none" : "block";
}

function searchProducts() {
  const q = document.getElementById("search").value.toLowerCase();
  const filtered = products.filter((p) => p.title.toLowerCase().includes(q));
  renderProducts(filtered);
}

// Login modal
function openLogin() {
  document.getElementById("login-modal").style.display = "flex";
}
function closeLogin() {
  document.getElementById("login-modal").style.display = "none";
}
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  alert(`Logged in as: ${email}`);
  closeLogin();
}

// Initialize
renderProducts();
