let allProducts = [];
// JSON CATALOG
fetch("assets/js/catalog.json")
  .then((response) => response.json())
  .then((products) => {
    allProducts = products;
    printProducts(allProducts);
  });

// PRINT FUNCTION PRODUCTS
function printProducts(list) {
  let boxProducts = document.querySelector(".products-box");
  boxProducts.innerHTML = "";

  list.forEach((product) => {
    let price = product.price.toFixed(2).replace(".", ",");

    boxProducts.innerHTML += `
    <li>  
      <i class='fi-tc-plus' title='Adicionar ao Carrinho'></i>
      <figure>
        <img src='${product.img}' alt='${product.name}'>
      </figure>
      <div>
        <h3>${product.name}</h3>
        <h6><em>R$</em> ${price}</h6>
      </div>  
    </li>
    `;
  });
}

// SEARCH ITENS
document.getElementById("search").addEventListener("input", () => {
  let text = search.value.toLowerCase();
  let noProduct = document.querySelector(".no-product");
  let filtered = allProducts.filter((product) =>
    product.name.toLowerCase().includes(text)
  );

  if (filtered.length === 0) {
    document.querySelector(".products-box").innerHTML = "";
    noProduct.style.display = "flex";
    // get value product
    let nameNoIdentify = document.querySelector(".no-product em");
    nameNoIdentify.innerHTML = search.value;
    return;
  }
  noProduct.style.display = "none";
  printProducts(filtered);
});
