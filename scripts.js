document.addEventListener("DOMContentLoaded", function () {
  let imagesData = [];
  let buttonsData = [];
  let currentImageIndex = 0;

  const sliderImage = document.querySelector(".slider-image img");
  const sliderCaption = document.querySelector(".slider-caption p");
  const sliderLeftButton = document.querySelector(".slider-left");
  const sliderRightButton = document.querySelector(".slider-right");
  const buttonsContainer = document.getElementById("buttons-container");

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

  function navigate(direction) {
    currentImageIndex = (currentImageIndex + direction + imagesData.length) % imagesData.length;
    loadImage(currentImageIndex);
  }

  loadImagesData(function () {
    loadImage(currentImageIndex);
  });

  loadButtonsData(function () {
    addButtons();

    sliderLeftButton.addEventListener("click", function () {
      navigate(-1);
    });

    sliderRightButton.addEventListener("click", function () {
      navigate(1);
    });
  });
});
