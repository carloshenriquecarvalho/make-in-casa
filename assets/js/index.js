// JSON CATALOG
fetch("assets/js/catalog.json")
  .then((response) => response.json())
  .then((products) => {
    // PRINT PRODUCTS
    products.forEach((product) => {
      let boxProducts = document.querySelector(".boxProducts");
      boxProducts.innerHTML += `
        <li>  
            <a href='#'>
                <i class='fi-tc-cart-minus'></i>
                <figure>
                    <img src='${product.img}' alt='${product.name}'>
                </figure>
                <h3>${product.name}</h3>
                <h6>R$ ${product.price}</h6>       
            </a>
        </li>
      `;
    });
  });
