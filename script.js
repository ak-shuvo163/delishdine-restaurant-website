// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", function () {
  const darkToggle = document.getElementById("dark-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const body = document.body;

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem("theme") || "light";
  body.classList.toggle("dark", currentTheme === "dark");
  updateThemeIcon(currentTheme === "dark");

  darkToggle.addEventListener("click", function () {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon(isDark);

    // Force re-render of text colors
    document.querySelectorAll("*").forEach((element) => {
      if (
        element.classList.contains("text-gray-900") ||
        element.classList.contains("text-gray-800")
      ) {
        element.style.color = "";
      }
    });
  });

  function updateThemeIcon(isDark) {
    themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
  }
});

// Mobile Menu Toggle (Simple & Reliable)
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click", function () {
    if (mobileMenu.classList.contains("max-h-0")) {
      mobileMenu.classList.remove("max-h-0", "opacity-0");
      mobileMenu.classList.add("max-h-96", "opacity-100");
    } else {
      mobileMenu.classList.add("max-h-0", "opacity-0");
      mobileMenu.classList.remove("max-h-96", "opacity-100");
    }
  });

  // Mobile menu link click korle menu hide hobe
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("max-h-0", "opacity-0");
      mobileMenu.classList.remove("max-h-96", "opacity-100");
    });
  });
});

// Menu Filtering
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuItems = document.querySelectorAll(".menu-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");

      // Filter menu items
      menuItems.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block";
          item.style.animation = "fadeIn 0.5s ease-out";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});

// Order Modal
document.addEventListener("DOMContentLoaded", function () {
  const orderButtons = document.querySelectorAll(".order-btn");
  const modal = document.getElementById("orderModal");
  const modalContent = document.getElementById("modalContent");
  const closeButtons = document.querySelectorAll("#closeModal, #closeModal2");
  const itemNameInput = document.getElementById("itemName");
  const quantityInput = document.getElementById("quantity");
  const totalPriceDiv = document.getElementById("totalPrice");
  const decreaseBtn = document.getElementById("decreaseQty");
  const increaseBtn = document.getElementById("increaseQty");
  const confirmBtn = document.getElementById("confirmOrder");
  const orderForm = document.getElementById("orderForm");

  let currentItemPrice = 0;

  orderButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const menuCard = this.closest(".menu-card");
      const itemName = menuCard.querySelector(".menu-item-title").textContent;
      const price = parseFloat(
        menuCard.querySelector(".menu-item-price").textContent
      );

      itemNameInput.value = itemName;
      quantityInput.value = 1;
      currentItemPrice = price;
      updateTotalPrice();

      // Show modal
      modal.classList.remove("hidden");
      modal.style.display = "flex";

      // Animate modal content
      setTimeout(() => {
        modalContent.classList.add("scale-100", "opacity-100");
        modalContent.classList.remove("scale-95", "opacity-0");
      }, 10);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Hide modal
      modalContent.classList.remove("scale-100", "opacity-100");
      modalContent.classList.add("scale-95", "opacity-0");

      setTimeout(() => {
        modal.classList.add("hidden");
        modal.style.display = "none";
      }, 200);
    });
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeButtons[0].click();
    }
  });

  decreaseBtn.addEventListener("click", function () {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantityInput.value = quantity - 1;
      updateTotalPrice();
    }
  });

  increaseBtn.addEventListener("click", function () {
    let quantity = parseInt(quantityInput.value);
    if (quantity < 10) {
      quantityInput.value = quantity + 1;
      updateTotalPrice();
    }
  });

  quantityInput.addEventListener("input", updateTotalPrice);

  function updateTotalPrice() {
    const quantity = parseInt(quantityInput.value);
    const total = (currentItemPrice * quantity).toFixed(2);
    totalPriceDiv.textContent = `$${total}`;
  }

  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const itemName = itemNameInput.value;
      const quantity = quantityInput.value;
      const total = totalPriceDiv.textContent;
      const customerName = document.getElementById("customerName").value.trim();
      const customerPhone = document
        .getElementById("customerPhone")
        .value.trim();
      const customerAddress = document
        .getElementById("customerAddress")
        .value.trim();
      const errorDiv = document.getElementById("orderError");

      // Validation
      if (!customerName) {
        errorDiv.textContent = "Please enter your name.";
        errorDiv.classList.remove("hidden");
        return;
      }
      if (!customerPhone) {
        errorDiv.textContent = "Please enter your phone number.";
        errorDiv.classList.remove("hidden");
        return;
      }
      if (!/^01[0-9]{9,13}$/.test(customerPhone)) {
        errorDiv.textContent =
          "Please enter a valid Bangladeshi phone number (e.g. 01XXXXXXXXX).";
        errorDiv.classList.remove("hidden");
        return;
      }
      errorDiv.classList.add("hidden");

      // আগের মতো demo alert
      alert(
        `Order Confirmed!\n\nItem: ${itemName}\nQuantity: ${quantity}\nTotal: ${total}\nName: ${customerName}\nPhone: ${customerPhone}\nAddress: ${
          customerAddress ? customerAddress : "N/A"
        }\n\nThank you for your order! 🎉`
      );
      closeButtons[0].click();
    });
  }
});

// Contact Form Validation & Submission

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;
  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const phoneInput = document.getElementById("contactPhone");
  const messageInput = document.getElementById("contactMessage");
  const errorDiv = document.getElementById("contactError");
  const successDiv = document.getElementById("contactSuccess");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    errorDiv.classList.add("hidden");
    successDiv.classList.add("hidden");

    // Validation
    if (!nameInput.value.trim()) {
      errorDiv.textContent = "Please enter your name.";
      errorDiv.classList.remove("hidden");
      nameInput.focus();
      return;
    }
    if (
      !emailInput.value.trim() ||
      !/^\S+@\S+\.\S+$/.test(emailInput.value.trim())
    ) {
      errorDiv.textContent = "Please enter a valid email address.";
      errorDiv.classList.remove("hidden");
      emailInput.focus();
      return;
    }
    if (
      !phoneInput.value.trim() ||
      !/^01[0-9]{9,13}$/.test(phoneInput.value.trim())
    ) {
      errorDiv.textContent =
        "Please enter a valid Bangladeshi phone number (e.g. 01XXXXXXXXX).";
      errorDiv.classList.remove("hidden");
      phoneInput.focus();
      return;
    }
    if (!messageInput.value.trim()) {
      errorDiv.textContent = "Please enter your message.";
      errorDiv.classList.remove("hidden");
      messageInput.focus();
      return;
    }

    // Success
    successDiv.classList.remove("hidden");
    contactForm.reset();
  });
});

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.querySelector("[data-mobile-menu]");
  const mobileMenu = document.querySelector("[data-mobile-menu-items]");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      // Toggle mobile menu visibility
      mobileMenu.classList.toggle("hidden");

      // Optional: Add animation classes
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("animate-in", "slide-in-from-top-2");
      } else {
        mobileMenu.classList.remove("animate-in", "slide-in-from-top-2");
      }
    });
  }

  // Close mobile menu when clicking on menu items
  const mobileMenuItems = document.querySelectorAll(
    "[data-mobile-menu-items] a"
  );
  mobileMenuItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      mobileMenu &&
      !mobileMenu.contains(event.target) &&
      !mobileMenuButton.contains(event.target)
    ) {
      mobileMenu.classList.add("hidden");
    }
  });
});

// Alternative method if the above doesn't work
function toggleMobileMenu() {
  const mobileMenu = document.querySelector(
    ".mobile-menu, [data-mobile-menu-items], .md\\:hidden"
  );
  if (mobileMenu) {
    mobileMenu.classList.toggle("hidden");
    console.log("Mobile menu toggled");
  } else {
    console.log("Mobile menu element not found");
  }
}

// Make function globally available
window.toggleMobileMenu = toggleMobileMenu;

// Parallax Hero Effect
window.addEventListener("scroll", function () {
  const hero = document.getElementById("hero-parallax");
  if (!hero) return;
  const scrolled = window.scrollY;
  // Adjust the parallax speed (lower = slower)
  const speed = 0.4;
  hero.style.backgroundPosition = `center ${scrolled * speed}px`;
});

// Typewriter Effect for Hero Section
const typewriterText = "The Best Food in Town – Served with Love ";
const typewriterElem = document.getElementById("typewriter-text");
if (typewriterElem) {
  let i = 0;
  function typeWriter() {
    if (i <= typewriterText.length) {
      typewriterElem.textContent = typewriterText.slice(0, i);
      i++;
      setTimeout(typeWriter, 55);
    }
  }
  typeWriter();
}
