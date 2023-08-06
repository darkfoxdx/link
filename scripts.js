document.addEventListener("DOMContentLoaded", function () {
  let imagesData = [];
  let buttonsData = [];
  let socialsData = [];
  let currentImageIndex = 0;

  const sliderImage = document.querySelector(".slider-image img");
  const sliderCaption = document.querySelector(".slider-caption p");
  const sliderLeftButton = document.querySelector(".slider-left");
  const sliderRightButton = document.querySelector(".slider-right");
  const buttonsContainer = document.getElementById("buttons-container");
  const socialIconsContainer = document.getElementById("social-icons-container");

  function loadImagesData(callback) {
    fetch("images.json")
      .then((response) => response.json())
      .then((data) => {
        imagesData = data;
        callback();
      })
      .catch((error) => console.error("Error loading images data:", error));
  }

  function loadButtonsData(callback) {
    fetch("buttons.json")
      .then((response) => response.json())
      .then((data) => {
        buttonsData = data;
        callback();
      })
      .catch((error) => console.error("Error loading buttons data:", error));
  }

  function loadSocialsData(callback) {
    fetch("socials.json")
      .then((response) => response.json())
      .then((data) => {
        socialsData = data;
        callback();
      })
      .catch((error) => console.error("Error loading socials data:", error));
  }

  function loadImage(index) {
    const imgData = imagesData[index];
    if (imgData) {
      sliderImage.src = imgData.image;
      sliderImage.alt = "Image " + (index + 1);
      sliderCaption.textContent = imgData.caption;
    }
  }

  function addButtons() {
    buttonsData.forEach((buttonData) => {
      const button = document.createElement("a");
      button.href = buttonData.url;
      button.className = "button";
      button.textContent = buttonData.title;
      buttonsContainer.appendChild(button);
    });
  }

  function addSocialIcons() {
    socialsData.forEach((socialData) => {
      const socialIcon = document.createElement("a");
      socialIcon.href = socialData.url;
      socialIcon.className = "social-icon";
      
      // Create Font Awesome icon element based on social platform name
      const iconClass = getFontAwesomeIconClass(socialData.name);
      const iconElement = document.createElement("i");
      iconElement.className = iconClass;
      
      socialIcon.appendChild(iconElement);
      socialIconsContainer.appendChild(socialIcon);
    });
  }

  function getFontAwesomeIconClass(socialName) {
    // Map social platform names to corresponding Font Awesome icons
    const iconMapping = {
      "facebook": "fab fa-facebook",
      "email": "fas fa-envelope",
      "discord": "fab fa-discord",
      "youtube": "fab fa-youtube",
      "instagram": "fab fa-instagram",
      "twitter": "fab fa-twitter",
      "twitch": "fab fa-twitch",
      "patreon": "fab fa-patreon",
      "tiktok": "fab fa-tiktok",
      "linkedin": "fab fa-linkedin",
      "github": "fab fa-github",
      "paypal": "fab fa-paypal",
      "telegram": "fab fa-telegram",
      "whatsapp": "fab fa-whatsapp",
      "steam": "fab fa-steam"
    };
    return iconMapping[socialName] || "fas fa-question"; // Default to question icon if not found
  }

  function navigate(direction) {
    currentImageIndex = (currentImageIndex + direction + imagesData.length) % imagesData.length;
    loadImage(currentImageIndex);
  }

  loadImagesData(function () {
    loadImage(currentImageIndex);
  });

  loadButtonsData(function () {
    addButtons();
  });

  loadSocialsData(function () {
    addSocialIcons();
  });

  sliderLeftButton.addEventListener("click", function () {
    navigate(-1);
  });

  sliderRightButton.addEventListener("click", function () {
    navigate(1);
  });
});
