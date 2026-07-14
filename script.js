// ---- Product Data (edit here to add/change products) ----
// postUrl = the Instagram post link for that product (copy link from your @etruriaapparel post)
const products = [
  {
    id: 1,
    catalog: "No. I",
    name: "Minimalist Bear Graphic T-Shirt",
    price: "Rs. 1,599",
    desc: "A soft, everyday tee with a minimalist bear graphic print.",
    postUrl: "https://www.instagram.com/p/DHpmi9evO-r/?igsh=MXE1eHl3c2lvNDA2bw=="
  },
  {
    id: 2,
    catalog: "No. II",
    name: "Always in a Good Mood – Floral Graphic T-Shirt",
    price: "Rs. 1,599",
    desc: "A relaxed-fit tee with a floral graphic and an easy-going message.",
    postUrl: "https://www.instagram.com/p/DHO22NHNRaI/?igsh=dHU4NzBjbnh5eHJ6"
  },
  {
    id: 3,
    catalog: "No. III",
    name: 'I\'m a Sucker for Books" Sweatshirt – Cozy & Stylish',
    price: "Rs. 1,599",
    desc: 'A cozy, oversized sweatshirt with a "Sucker for Books" print — soft, warm, and stylish.',
    postUrl: "https://www.instagram.com/p/DF57I-aq_jJ/?igsh=MXQ4Y2k0cWdtNmg0dw=="
  },
  {
    id: 4,
    catalog: "No. IV",
    name: "Spider Web Graphic T-Shirt",
    price: "Rs. 1,599",
    desc: "A bold spider web graphic tee for an edgy, statement look.",
    postUrl: "https://www.instagram.com/p/DHnBwzUtVW3/?igsh=MTZ4eGZqeHlqNHRraQ=="
  }
];

// ---- Nav toggle (mobile) ----
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

// ---- Footer year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Load / re-process Instagram embeds ----
function loadInstagramEmbeds() {
  if (window.instgrm) {
    window.instgrm.Embeds.process();
  } else {
    const existing = document.querySelector('script[src*="embed.js"]');
    if (!existing) {
      const s = document.createElement('script');
      s.src = '//www.instagram.com/embed.js';
      s.async = true;
      document.body.appendChild(s);
    } else {
      // script tag present but instgrm not ready yet — wait a moment
      setTimeout(loadInstagramEmbeds, 300);
    }
  }
}

function instaEmbedMarkup(url) {
  return `
    <blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14"
      style="background:#FFF; border:0; margin:0 auto; max-width:100%; min-width:280px; padding:0; width:100%;">
    </blockquote>`;
}

// ---- Render Shop Grid ----
const grid = document.getElementById('product-grid');
if (grid) {
  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="vitrine">${instaEmbedMarkup(p.postUrl)}</div>
      <div class="product-info">
        <p class="catalog-no">${p.catalog}</p>
        <h3>${p.name}</h3>
        <p class="price">${p.price}</p>
        <a class="btn btn-primary" href="product.html?id=${p.id}">View Piece</a>
      </div>
    </div>
  `).join('');
  loadInstagramEmbeds();
}

// ---- Render Product Detail ----
const detail = document.getElementById('product-detail');
if (detail) {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')) || 1;
  const p = products.find(x => x.id === id) || products[0];

  detail.innerHTML = `
    <div class="detail-vitrine">${instaEmbedMarkup(p.postUrl)}</div>
    <div class="detail-info">
      <p class="catalog-no">${p.catalog}</p>
      <h1>${p.name}</h1>
      <p class="price">${p.price}</p>
      <p class="desc">${p.desc}</p>
      <div class="size-select">
        <label>Select Size</label>
        <div class="size-options">
          <button data-size="S">S</button>
          <button data-size="M">M</button>
          <button data-size="L">L</button>
          <button data-size="XL">XL</button>
        </div>
      </div>
      <button class="btn btn-primary" id="addToCartBtn">Add to Cart</button>
      <p class="add-note" id="addNote"></p>
    </div>
  `;
  loadInstagramEmbeds();

  const sizeButtons = detail.querySelectorAll('.size-options button');
  let selectedSize = null;
  sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSize = btn.dataset.size;
    });
  });

  document.getElementById('addToCartBtn').addEventListener('click', () => {
    const note = document.getElementById('addNote');
    if (!selectedSize) {
      note.textContent = "Please select a size first.";
      return;
    }
    note.textContent = `Added "${p.name}" (Size ${selectedSize}) to your cart.`;
  });
}

// ---- Contact Form (demo only, no backend) ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('formNote').textContent =
      "Thank you — your message has been noted. We'll reply soon.";
    contactForm.reset();
  });
}