/**
 * SOULTHREAD SYNDICATE - CORE ENGINE (UNIFIED & OPTIMIZED)
 */

// GLOBAL THEME ENFORCER (Prevents White Flash on All Pages)
if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light-mode');
}

class HeroSlider {
    constructor() {
        this.stack = document.getElementById('heroStack');
        if (!this.stack) return;

        this.cards = Array.from(this.stack.querySelectorAll('.carousel-card'));
        this.waitlistSlot = document.getElementById('waitlistSlot');
        this.bookingStatus = 'OPEN'; 
        
        this.currentIndex = 1; 
        this.isAnimating = false;
        this.autoPlayDelay = 4000;

        this.init();
    }

    init() {
        this.updateWaitlistUI();
        this.render();
        this.startAutoPlay();
    }

    updateWaitlistUI() {
        if (this.waitlistSlot) {
            const h2 = this.waitlistSlot.querySelector('h2');
            h2.innerText = `WAITLIST ${this.bookingStatus}`;
            if (this.bookingStatus === 'FULL') {
                this.waitlistSlot.style.borderColor = '#888';
                h2.style.color = '#888';
            }
        }
    }

    render() {
        requestAnimationFrame(() => {
            this.cards.forEach((card, index) => {
                card.className = 'carousel-card hidden';
                if (index === this.currentIndex) card.className = 'carousel-card center';
                else if (index === (this.currentIndex - 1 + this.cards.length) % this.cards.length) card.className = 'carousel-card left';
                else if (index === (this.currentIndex + 1) % this.cards.length) card.className = 'carousel-card right';
            });
        });
    }

    next() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.render();
        setTimeout(() => { this.isAnimating = false; }, 400);
    }

    startAutoPlay() {
        setInterval(() => { this.next(); }, this.autoPlayDelay);
    }
}

// ==========================================
// INITIALIZATION HUB
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log("SYNDICATE OS: INITIALIZING CORE SYSTEMS...");
    
    // 1. Hero Slider
    if (document.getElementById('heroStack')) {
        window.SoulThreadHero = new HeroSlider();
        console.log("-> HERO ENGINE: ONLINE");
    }

    // 2. Global UI Systems
    initCartSystem();
    initContactModal();
    initStoreFilters();
    initWishlistSystem();
    initThemeToggle();
    initProductLogic();
    initMobileMenu();
    
    console.log("SYNDICATE OS: ALL SYSTEMS OPERATIONAL.");
});


// ==========================================
// MOBILE HAMBURGER MENU SYSTEM
// ==========================================
function initMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    if (!navContainer || !navLinks) return;

    // Inject hamburger button if not already present
    if (!document.getElementById('hamburger')) {
        const btn = document.createElement('div');
        btn.id = 'hamburger';
        btn.className = 'hamburger';
        btn.setAttribute('aria-label', 'Open Menu');
        btn.setAttribute('role', 'button');
        btn.setAttribute('tabindex', '0');
        btn.innerHTML = '<span></span><span></span><span></span>';
        
        // Append to the end to keep it on the right side
        navContainer.appendChild(btn);
    }

    // Inject mobile nav overlay if not already present
    if (!document.getElementById('mobileNavOverlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'mobileNavOverlay';
        overlay.className = 'mobile-nav-overlay';
        document.body.appendChild(overlay);
    }

    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('mobileNavOverlay');

    const openMenu = () => {
        navLinks.classList.add('active');
        hamburger.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', () => {
        navLinks.classList.contains('active') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // Close on any nav link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    console.log('-> MOBILE MENU: ONLINE');
}

// ==========================================
// CONTACT MODAL SYSTEM (WITH AUTO-INJECTION)
// ==========================================
function initContactModal() {
    let modal = document.getElementById('contactModal');
    
    // If modal is missing in HTML, inject it globally
    if (!modal) {
        console.log("-> CONTACT SYSTEM: MODAL MISSING, INJECTING PROTOCOL...");
        const modalHTML = `
            <div class="contact-modal" id="contactModal">
                <div class="contact-modal-content">
                    <div class="close-contact-modal"><i class="fas fa-times"></i></div>
                    <h2>TRANSMIT MESSAGE</h2>
                    <p>Establish a secure line with the Syndicate.</p>
                    <form class="syndicate-contact-form">
                        <div class="form-row">
                            <input type="text" placeholder="Agent Name" required>
                            <input type="email" placeholder="Encrypted Email" required>
                        </div>
                        <input type="text" placeholder="Subject" required>
                        <textarea placeholder="Message Log" rows="4" required></textarea>
                        <button type="submit" class="transmit-btn">SEND TRANSMISSION</button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        modal = document.getElementById('contactModal');
    }

    const openBtns = document.querySelectorAll('.get-in-touch-btn, #openContactModal');
    const closeBtns = modal.querySelectorAll('.close-contact-modal');
    const form = modal.querySelector('.syndicate-contact-form');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showSyndicateNotification("TRANSMISSION RECEIVED. AN AGENT WILL CONTACT YOU SHORTLY.", 'check-circle');
            modal.classList.remove('active');
            document.body.style.overflow = '';
            form.reset();
        });
    }
    console.log("-> CONTACT SYSTEM: ONLINE");
}

// ==========================================
// STORE FILTERING SYSTEM
// ==========================================
function initStoreFilters() {
    const grid = document.querySelector('.raptr-store-grid');
    if (!grid) return;

    console.log("-> STORE ENGINE: DETECTED. LOADING FILTERS...");

    const cards = Array.from(grid.querySelectorAll('.product-card'));
    const categoryChecks = document.querySelectorAll('.filter-section input[type="checkbox"]');
    const priceSlider = document.querySelector('.price-slider');
    const availabilityRadios = document.querySelectorAll('input[name="avail"]');
    const searchInput = document.querySelector('.search-wrap input');
    const searchBtn = document.querySelector('.search-btn');

    const updateFilters = () => {
        const activeCategories = Array.from(categoryChecks)
            .filter(c => c.checked)
            .map(c => {
                const labelText = c.parentElement.innerText || "";
                return labelText.split('(')[0].trim().toLowerCase();
            });
        
        const maxPrice = parseInt(priceSlider?.value || 30000);
        const selectedAvail = document.querySelector('input[name="avail"]:checked');
        const availability = selectedAvail ? selectedAvail.parentElement.innerText.trim().toLowerCase() : "";
        const searchQuery = searchInput?.value.toLowerCase().trim() || "";

        cards.forEach(card => {
            const category = card.getAttribute('data-category')?.toLowerCase() || "";
            const price = parseInt(card.getAttribute('data-price') || 0);
            const inStock = card.getAttribute('data-stock') === 'true';
            const isCommission = card.getAttribute('data-commission') === 'true';
            const title = card.querySelector('h4')?.innerText.toLowerCase() || "";

            let visible = true;

            // If a product is not tagged, we show it by default unless filters are active
            const hasTags = card.hasAttribute('data-category');

            if (activeCategories.length > 0) {
                if (!hasTags || !activeCategories.includes(category)) visible = false;
            }
            
            if (hasTags && price > maxPrice) visible = false;

            if (availability === 'in stock' && hasTags && !inStock) visible = false;
            if (availability === 'commission open' && hasTags && !isCommission) visible = false;

            if (searchQuery && !title.includes(searchQuery)) visible = false;

            card.style.display = visible ? 'block' : 'none';
        });

        if (priceSlider) {
            const label = document.querySelector('.price-labels span:last-child');
            if (label) label.innerText = `Rs ${maxPrice.toLocaleString()}`;
        }
    };

    categoryChecks.forEach(c => c.addEventListener('change', updateFilters));
    if (priceSlider) priceSlider.addEventListener('input', updateFilters);
    availabilityRadios.forEach(r => r.addEventListener('change', updateFilters));
    if (searchBtn) searchBtn.addEventListener('click', updateFilters);
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') updateFilters();
        });
    }
    
    // Initial run to sync UI
    updateFilters();
}

// ==========================================
// WISHLIST & NOTIFICATIONS
// ==========================================
function initWishlistSystem() {
    const wishlistBtns = document.querySelectorAll('.wishlist-icon');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const heart = this.querySelector('i');
            heart.classList.toggle('fas');
            heart.classList.toggle('far');
            if (heart.classList.contains('fas')) {
                heart.style.color = '#ff3e3e';
                showSyndicateNotification("PROTOCOL: PRODUCT ADDED TO FAVORITES. THANK YOU, AGENT.", 'heart');
            } else {
                heart.style.color = '';
            }
        });
    });
}

function showSyndicateNotification(message, icon = 'check-circle') {
    const notification = document.createElement('div');
    notification.className = 'syndicate-alert';
    notification.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-${icon}"></i>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => { notification.classList.add('show'); }, 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ==========================================
// CART SYSTEM
// ==========================================
let cart = JSON.parse(localStorage.getItem('soulthread_cart')) || [];

function initCartSystem() {
    const badge = document.querySelector('.cart-badge');
    const addBtns = document.querySelectorAll('.buy-btn, .add-to-cart-btn');
    const cartIcon = document.querySelector('.cart-icon-wrap');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalDisplay = document.getElementById('cartTotalDisplay');

    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartDrawer?.classList.add('open');
            cartOverlay?.classList.add('active');
        });
    }

    const hideCart = () => {
        cartDrawer?.classList.remove('open');
        cartOverlay?.classList.remove('active');
    };

    if (closeCart) closeCart.addEventListener('click', hideCart);
    if (cartOverlay) cartOverlay.addEventListener('click', hideCart);

    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.product-card');
            if (!card) return;

            const name = card.querySelector('h4').innerText;
            const priceText = card.querySelector('.product-price-row span').innerText;
            const price = parseInt(priceText.replace(/[^0-9]/g, ''));
            const imgSrc = card.querySelector('.product-img img').src;

            addToCart({ name, price, priceText, imgSrc });
            
            const originalText = btn.innerText;
            btn.innerText = 'ADDED!';
            setTimeout(() => btn.innerText = originalText, 1500);
            
            cartDrawer?.classList.add('open');
            cartOverlay?.classList.add('active');
        });
    });

    function addToCart(product) {
        const existing = cart.find(item => item.name === product.name);
        if (existing) existing.quantity++;
        else cart.push({ ...product, quantity: 1 });
        saveCart();
        renderCart();
    }

    function saveCart() { localStorage.setItem('soulthread_cart', JSON.stringify(cart)); }

    function renderCart() {
        if (!cartItemsList) return;
        if (cart.length === 0) {
            cartItemsList.innerHTML = `<div class="empty-cart-container"><i class="fas fa-shopping-bag empty-cart-icon"></i><p>Syndicate bag is empty.</p></div>`;
            if (badge) badge.classList.remove('active');
            if (cartTotalDisplay) cartTotalDisplay.innerText = 'Rs 0';
            return;
        }

        cartItemsList.innerHTML = '';
        let total = 0, totalItems = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            totalItems += item.quantity;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item-row';
            itemEl.innerHTML = `
                <img src="${item.imgSrc}" class="cart-item-img">
                <div class="cart-item-info" style="flex-grow: 1;">
                    <h5>${item.name}</h5>
                    <div class="qty-toggle">
                        <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                    </div>
                </div>
                <div style="text-align: right;">
                    <p class="cart-item-price">Rs ${(item.price * item.quantity).toLocaleString()}</p>
                    <i onclick="removeCartItem(${index})" class="fas fa-trash-alt trash-btn"></i>
                </div>
            `;
            cartItemsList.appendChild(itemEl);
        });

        if (badge) { badge.innerText = totalItems; badge.classList.add('active'); }
        if (cartTotalDisplay) cartTotalDisplay.innerText = `Rs ${total.toLocaleString()}`;
    }

    window.updateQty = (index, delta) => {
        cart[index].quantity += delta;
        if (cart[index].quantity < 1) cart.splice(index, 1);
        saveCart();
        renderCart();
    };

    window.removeCartItem = (index) => {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    };
    
    renderCart();
}

// ==========================================
// MISC UI UTILITIES
// ==========================================
function initThemeToggle() {
    let themeToggle = document.getElementById('themeToggleCheckbox');
    
    // Inject toggle globally if missing on the current page
    if (!themeToggle) {
        const toggleHTML = `
          <section class="theme-toggle-section">
            <div class="nav-container theme-toggle-container">
              <div class="theme-labels">
                <span class="theme-label active" id="label-dark"><i class="fas fa-moon"></i> DARK MODE</span>
              </div>
              <label class="switch">
                <input type="checkbox" id="themeToggleCheckbox">
                <span class="slider round"></span>
              </label>
              <div class="theme-labels">
                <span class="theme-label" id="label-light"><i class="fas fa-sun"></i> LIGHT MODE</span>
              </div>
            </div>
          </section>
        `;
        
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.insertAdjacentHTML('beforebegin', toggleHTML);
        } else {
            document.body.insertAdjacentHTML('beforeend', toggleHTML);
        }
        themeToggle = document.getElementById('themeToggleCheckbox');
    }

    if (!themeToggle) return;

    // Sync toggle switch visual state with the user's saved preference
    if (localStorage.getItem('theme') === 'light') {
        themeToggle.checked = true;
        document.documentElement.classList.add('light-mode');
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.documentElement.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
}

function initProductLogic() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('fade-in'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Gallery & Tabs logic
    const thumbs = document.querySelectorAll('.thumb');
    const mainImg = document.getElementById('main-image');
    if (mainImg) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                mainImg.src = thumb.getAttribute('data-src');
            });
        });
    }

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.getAttribute('data-tab'))?.classList.add('active');
        });
    });
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) window.scrollY > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
});

window.openMobileMenu = function() {
    document.getElementById('mobileNav')?.classList.add('active');
    document.querySelector('.mobile-nav-overlay')?.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeMobileMenu = function() {
    document.getElementById('mobileNav')?.classList.remove('active');
    document.querySelector('.mobile-nav-overlay')?.classList.remove('active');
    document.body.style.overflow = '';
};