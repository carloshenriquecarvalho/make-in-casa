// LINKS AND SCRIPTS
class SiteAssets extends HTMLElement {
  connectedCallback() {
    // TITLE

    let pageName = location.pathname;
    let title = ((t) => t[0].toUpperCase() + t.slice(1))(
      location.pathname.split("/").pop().replace(".html", "")
    );

    if (pageName == "/index.html") {
      title = "Home";
      this.innerHTML = `
        <title>Make In Casa - ${title}</title>
      `;
    } else {
      this.innerHTML = `
        <title>Make In Casa - ${title}</title>
      `;
    }

    // CSS
    const styles = [
      "assets/fonts/uicons-thin-chubby/css/uicons-thin-chubby.css",
      "assets/css/style.css",
    ];

    styles.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    });

    // JS
    const scripts = ["assets/js/index.js", "assets/js/cart.js"];

    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.defer = true;
      document.body.appendChild(script);
    });
  }
}

customElements.define("site-assets", SiteAssets);

// HEADER
class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <img src="" alt="" />
        <nav>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="catalogo.html">Catalogo</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Contato</a></li>
            <li><a href="#">Mais</a></li>
          </ul>
        </nav>
        <div class="box-icon-cart">
          <a href="carrinho.html"><i class="fi-tc-cart-shopping-fast"></i></a>
          <span data-cart-count>0</span>
        </div>
      </header>
    `;

    const page = location.pathname.split("/").pop() || "index.html";
    const title = page.replace(".html", "");

    const normalized =
      title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();

    const links = document.querySelectorAll("header ul a");

    if (page === "index.html") {
      links[0].classList.add("marked-link");
    } else {
      links.forEach((a) => {
        if (a.textContent.trim().toLowerCase() === title.toLowerCase()) {
          a.classList.add("marked-link");
        }
      });
    }
  }
}

customElements.define("site-header", SiteHeader);
