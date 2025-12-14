let allProducts = [];
let totalItems = 0;
let totalPrice = 0;

// HELPERS
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ATUALIZAR RESUMO IMEDIATAMENTE
updateCartSummary();

// CARREGAR JSON DO CATÁLOGO
fetch("assets/js/catalog.json")
  .then((res) => res.json())
  .then((products) => {
    allProducts = products;

    if (document.querySelector(".products-box")) {
      printProducts(allProducts);
    }

    if (document.querySelector(".cart-box")) {
      loadCart();
    }

    updateCartSummary();
  });

// PRINTAR CATÁLOGO & HOMEPAGE
function printProducts(list) {
  const box = document.querySelector(".products-box");
  if (!box) return;

  box.innerHTML = "";

  list.forEach((p) => {
    let price = Number(p.price).toFixed(2).replace(".", ",");

    box.innerHTML += `
      <li>  
        <i class='fi-tc-plus' title='Adicionar ao Carrinho' onclick='addToCart(${p.id})'></i>
        <figure>
          <img src='${p.img}' alt='${p.name}' loading="lazy">
        </figure>
        <div>
          <h3>${p.name}</h3>
          <h6><em>R$</em> ${price}</h6>
        </div>  
      </li>
    `;
  });
}

// ADICIONAR AO CARRINHO
function addToCart(id) {
  const product = allProducts.find((p) => p.id === id);
  if (!product) return;

  let cart = getCart();
  let exist = cart.find((i) => i.id === id);

  if (exist) {
    exist.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      img: product.img,
      price: Number(product.price),
      quantity: 1,
    });
  }

  saveCart(cart);

  updateCartSummary();

  if (document.querySelector(".cart-box")) {
    loadCart();
  }

  let messageInfo = document.querySelector(".message-info-product");
  messageInfo.style.display = "flex";
  setTimeout(() => {
    messageInfo.style.display = "none";
  }, 1500);
}

// CARREGAR CARRINHO (cart.html)
function loadCart() {
  const box = document.querySelector(".cart-box");
  if (!box) return;

  let cart = getCart();
  box.innerHTML = "";

  if (cart.length === 0) {
    box.innerHTML = `<p class='cart-no-products'>Adicione produtos ao seu carrinho. <a href='catalogo.html'>Conferir Produtos</a></p>`;
    updateCartSummary();
    return;
  }

  cart.forEach((item, index) => {
    let totalItem = (item.price * item.quantity).toFixed(2).replace(".", ",");

    box.innerHTML += `
      <li class="cart-item">
        <figure>
          <img src="${item.img}" alt="${item.name}" loading="lazy">
        </figure>

        <div class='infor-product-cart'>
          <h3>${item.name}</h3>
          <button onclick="deleteItem(${index})">Excluir</button>
        </div>

        <div class="controls">
          <button onclick="updateQuantity(${item.id}, 'remove')">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, 'add')">+</button>
        </div>

        <h6><em>R$ </em>${totalItem}</h6>
      </li>
    `;
  });

  updateCartSummary();
}

// ATUALIZAR QUANTIDADE
function updateQuantity(id, action) {
  let cart = getCart();
  let item = cart.find((i) => i.id === id);
  if (!item) return;

  if (action === "add") {
    item.quantity++;
  } else if (action === "remove" && item.quantity > 1) {
    item.quantity--; // nunca deixa chegar 0
  }

  saveCart(cart);
  loadCart();
  updateCartSummary();
}

// REMOVER ITEM
function deleteItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  loadCart();
  updateCartSummary();

  let messageDelete = document.querySelector(".message-delete");
  messageDelete.style.display = "flex";
  setTimeout(() => {
    messageDelete.style.display = "none";
  }, 1500);
}

// CALCULAR RESUMO
function calculateSummary() {
  let cart = getCart();

  totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
}

// ATUALIZAR RESUMO (FUNCIONA EM TODAS AS PÁGINAS)
function updateCartSummary() {
  calculateSummary();

  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = totalItems;
    el.style.display = totalItems > 0 ? "inline-flex" : "none";
  });

  const summaryBox = document.querySelector(".summary-box");

  if (!summaryBox) return;

  if (totalItems === 0) {
    summaryBox.innerHTML = `
      <p data-cart-message style="font-size:14px; opacity:.7;">
        Aqui você encontrará os valores da sua compra assim que adicionar produtos.
      </p>
    `;
    return;
  }

  summaryBox.innerHTML = `
    <p>Produtos (<span data-cart-count>${totalItems}</span>)</p>
    <h3>Total:  <span data-cart-total>R$ ${totalPrice
      .toFixed(2)
      .replace(".", ",")}</span></h3>

    <div class='info-delivery'>
      <p>Entregas em Águas Lindas e no DF aos finais de semana.
Frete grátis a partir de R$ 19,99</p>
      <input type="text" placeholder="Adicionar Endereço" class="input-addres" />
    </div>

    <button class="btn" onclick="orderCompleted()">Finalizar Compra</button>
  `;
}

// BUSCA
const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    let text = searchInput.value.toLowerCase();
    let noProduct = document.querySelector(".no-product");

    let filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(text)
    );

    if (filtered.length === 0) {
      document.querySelector(".products-box").innerHTML = "";
      noProduct.style.display = "flex";
      noProduct.querySelector("em").innerHTML = searchInput.value;
      return;
    }

    noProduct.style.display = "none";
    printProducts(filtered);
  });
}

// FUNÇÕES GLOBAIS (para onclick)
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.deleteItem = deleteItem;

// SINCRONIZAR ENTRE ABAS
window.addEventListener("storage", (event) => {
  if (event.key === "cart") {
    loadCart();
    updateCartSummary();
  }
});

// AO CARREGAR QUALQUER PÁGINA
document.addEventListener("DOMContentLoaded", () => {
  updateCartSummary();

  if (document.querySelector(".cart-box")) {
    loadCart();
  }
});

// ORDER COMPLETED + WHATSAPP
function orderCompleted() {
  let inputAddres = document.querySelector(".input-addres").value;

  if (inputAddres.trim() === "") {
    let messageWarning = document.querySelector(".message-warning-final");
    messageWarning.style.display = "flex";

    setTimeout(() => {
      messageWarning.style.display = "none";
    }, 2000);
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let message = "*🛒 NOVO PEDIDO REALIZADO*\n\n";
  message += "*📍 Endereço de entrega:* " + inputAddres + "\n\n";
  message += "*Itens do pedido:*\n";

  let totalGeral = 0;

  cart.forEach((item) => {
    let subtotal = item.price * item.quantity;
    totalGeral += subtotal;

    message += `\n• *${item.name}*\n`;
    message += `Qtd: ${item.quantity}\n`;
    message += `Preço: R$ ${item.price.toFixed(2)}\n`;
    message += `Subtotal: R$ ${subtotal.toFixed(2)}\n`;
  });

  message += `\n----------------------\n`;
  message += `*TOTAL GERAL: R$ ${totalGeral.toFixed(2)}*\n`;
  message += `----------------------\n\n`;
  message += "*Aguardo confirmação do pedido!*";

  let msgURL = encodeURIComponent(message);
  let phone = "556195075423";

  window.open(`https://wa.me/${phone}?text=${msgURL}`, "_blank");

  localStorage.removeItem("cart");
}
