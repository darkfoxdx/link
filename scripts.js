document.addEventListener("DOMContentLoaded", function () {
  let imagesData = [];
  let buttonsData = [];
  let socialsData = [];
  let themesData = [];
  let selectedtheme = {};
  let profileData = {};
  let currentImageIndex = 0;

  const sliderImage = document.querySelector(".slider-image img");
  const sliderCaption = document.querySelector(".slider-caption p");
  const sliderLeftButton = document.querySelector(".slider-left");
  const sliderRightButton = document.querySelector(".slider-right");
  const buttonsContainer = document.getElementById("buttons-container");
  const socialIconsContainer = document.getElementById("social-icons-container");
  const bodyElement = document.body;
  const profileDescription = document.querySelector(".description");
  const avatarImage = document.querySelector(".avatar");
  

  function loadProfileData(callback) {
    fetch("data/profile.json")
      .then((response) => response.json())
      .then((data) => {
        profileData = data;
        callback();
      })
      .catch((error) => console.error("Error loading profile data:", error));
  }

  function loadThemesData(callback) {
    fetch("data/themes.json")
      .then((response) => response.json())
      .then((data) => {
        themesData = data;
        callback();
      })
      .catch((error) => console.error("Error loading themes data:", error));
  }

  function loadImagesData(callback) {
    fetch("data/images.json")
      .then((response) => response.json())
      .then((data) => {
        imagesData = data;
        callback();
      })
      .catch((error) => console.error("Error loading images data:", error));
  }

  function loadButtonsData(callback) {
    fetch("data/buttons.json")
      .then((response) => response.json())
      .then((data) => {
        buttonsData = data;
        callback();
      })
      .catch((error) => console.error("Error loading buttons data:", error));
  }

  function loadSocialsData(callback) {
    fetch("data/socials.json")
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

  function loadProfile() {
    if (profileData) {
      avatarImage.src = profileData.avatarSrc;
      profileDescription.textContent = profileData.description;
    }
  }

  function applyTheme(themeName) {
    selectedtheme = themesData.find((t) => t.name === themeName);
    if (selectedtheme) {
      bodyElement.style.backgroundColor = selectedtheme.bodyBackgroundColor;
      profileDescription.style.color = selectedtheme.profileDescriptionColor;
    }
  }

  function isMobileDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    return isMobile;
  }

  function addButtons() {
    buttonsData.forEach((buttonData) => {
      if ((buttonData.mobileVisible && isMobileDevice()) || !buttonData.mobileVisible) { // Check mobileVisible and device type
        const button = document.createElement("a");
        button.href = buttonData.url;
        button.className = "button";
        button.textContent = buttonData.title;
        
        //Theme
        if (selectedtheme) {
          button.style.backgroundColor = selectedtheme.buttonBackgroundColor;
          button.style.color = selectedtheme.buttonTextColor;
        }


        buttonsContainer.appendChild(button);

      }
    });
  }

  function addSocialIcons() {
    socialsData.forEach((socialData) => {
      if (socialData.mobileVisible && isMobileDevice() || !socialData.mobileVisible) { // Check device type or mobileVisible
        const socialIcon = document.createElement("a");
        socialIcon.href = socialData.url;
        socialIcon.className = "social-icon";

        if (selectedtheme)  {
          socialIcon.style.color = selectedtheme.socialIconColor;
        }

        // Create Font Awesome icon element based on social platform name
        const iconClass = getFontAwesomeIconClass(socialData.name);
        const iconElement = document.createElement("i");
        iconElement.className = iconClass;


        socialIcon.appendChild(iconElement);
        socialIconsContainer.appendChild(socialIcon);
      }
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
      "steam": "fab fa-steam",
      "x-twitter": "fab fa-x-twitter"
    };
    return iconMapping[socialName] || "fas fa-question"; // Default to question icon if not found
  }

  function navigate(direction) {
    currentImageIndex = (currentImageIndex + direction + imagesData.length) % imagesData.length;
    loadImage(currentImageIndex);
  }

  loadThemesData(function () {
    // Apply the default theme on page load
    applyTheme("default");

    loadProfileData(function () {
      loadProfile();
    });
    loadProfile();

    // Load other data and set up event listeners
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
});
