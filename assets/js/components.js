class SiteAssets extends HTMLElement {
  connectedCallback() {
    requestAnimationFrame(() => {
      ["assets/fonts/uicons-thin-chubby/css/uicons-thin-chubby.css"].forEach(
        (e) => {
          if (!document.querySelector(`link[href="${e}"]`)) {
            const n = document.createElement("link");
            n.rel = "stylesheet";
            n.href = e;
            document.head.appendChild(n);
          }
        }
      );
    });

    window.addEventListener("load", () => {
      ["assets/js/index.js", "assets/js/cart.js"].forEach((e) => {
        if (!document.querySelector(`script[src="${e}"]`)) {
          const n = document.createElement("script");
          n.src = e;
          n.defer = true;
          document.body.appendChild(n);
        }
      });
    });

    if (!document.querySelector('link[rel="shortcut icon"]')) {
      const e = document.createElement("link");
      e.rel = "shortcut icon";
      e.href = "assets/imgs/logo/favicon.webp";
      document.head.appendChild(e);
    }
  }
}

customElements.define("site-assets", SiteAssets);
class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML =
      '\n      <header>\n        <a href=\'index.html\'><img src="assets/imgs/logo/logo-left.webp" alt="Logomarca Make In Casa" loading="lazy"/></a>\n        <nav>\n          <ul>\n            <li><a href="index.html">Home</a></li>\n            <li><a href="catalogo.html">Catálogo</a></li>\n            <li><a class=\'close-link\' href="index.html#entrega">Formas de Entrega</a></li>\n          </ul>\n        </nav>\n        <div class="box-icon-cart">\n          <a href="carrinho.html" title=\'Carrinho de Compras\'><i class="fi-tc-cart-shopping-fast"></i></a>\n          <span data-cart-count>0</span>\n          <div class=\'menu-button\'>\n            <svg class=\'open-menu\' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>\n\n            <svg class=\'close-menu\' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"></path> </g></svg>\n          </div>\n        </div>\n\n      </header>\n    ';
    const e = location.pathname.split("/").pop() || "index.html",
      n = e.replace(".html", ""),
      t =
        (n.charAt(0).toUpperCase(),
        n.slice(1).toLowerCase(),
        document.querySelectorAll("header ul a"));
    "index.html" === e
      ? t[0].classList.add("marked-link")
      : t.forEach((e) => {
          e.textContent.trim().toLowerCase() === n.toLowerCase() &&
            e.classList.add("marked-link");
        });
  }
}
customElements.define("site-header", SiteHeader);
class SiteMessages extends HTMLElement {
  connectedCallback() {
    this.innerHTML =
      '\n      <div class="box-messages">\n        <div class="message-info-product">\n          <i class="fi-tc-octagon-check"></i> Produto Adicionado\n        </div>\n        <div class="message-warning-final">\n          <i class="fi-tc-triangle-warning"></i> Adicione a Localização\n        </div>\n        <div class="message-delete">\n          <i class="fi-tc-info"></i> Produto Removido\n        </div>\n      </div>\n    ';
  }
}
customElements.define("site-messages", SiteMessages);
class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML =
      '\n      <footer>\n                <a href=\'index.html\'><img src="assets/imgs/logo/logo-left.webp" alt="Logomarca Make In Casa" loading="lazy"/></a>\n        <nav class="social-medias-footer">\n          <li>\n            <a href="https://api.whatsapp.com/send/?phone=556195075423" target=\'_blank\' title="WhatsApp">\n              <svg\n                viewBox="0 0 24 24"\n                fill="none"\n                xmlns="http://www.w3.org/2000/svg"\n              >\n                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>\n                <g\n                  id="SVGRepo_tracerCarrier"\n                  stroke-linecap="round"\n                  stroke-linejoin="round"\n                ></g>\n                <g id="SVGRepo_iconCarrier">\n                  <path\n                    d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"\n                  ></path>\n                  <path\n                    fill-rule="evenodd"\n                    clip-rule="evenodd"\n                    d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"\n                  ></path>\n                </g>\n              </svg>\n            </a>\n          </li>\n          <li>\n            <a href="https://www.instagram.com/make_in_casa" target=\'_blank\' title="Instagram">\n              <svg\n                viewBox="0 0 24 24"\n                fill="none"\n                xmlns="http://www.w3.org/2000/svg"\n              >\n                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>\n                <g\n                  id="SVGRepo_tracerCarrier"\n                  stroke-linecap="round"\n                  stroke-linejoin="round"\n                ></g>\n                <g id="SVGRepo_iconCarrier">\n                  <path\n                    fill-rule="evenodd"\n                    clip-rule="evenodd"\n                    d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"\n                  ></path>\n                  <path\n                    d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"\n                  ></path>\n                  <path\n                    fill-rule="evenodd"\n                    clip-rule="evenodd"\n                    d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"\n                  ></path>\n                </g>\n              </svg>\n            </a>\n          </li>\n          \n        </nav>\n        <p>\n          © 2025 Make In Casa. Todos os direitos reservados.\n          \n        </p>\n      </footer>\n\n    ';
  }
}
customElements.define("site-footer", SiteFooter);
