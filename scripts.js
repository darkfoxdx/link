document.addEventListener("DOMContentLoaded", function () {
  let imagesData = [];
  let currentImageIndex = 0;

  const sliderImage = document.querySelector(".slider-image img");
  const sliderCaption = document.querySelector(".slider-caption p");
  const sliderLeftButton = document.querySelector(".slider-left");
  const sliderRightButton = document.querySelector(".slider-right");

  function loadImagesData(callback) {
    fetch("images.json")
      .then((response) => response.json())
      .then((data) => {
        imagesData = data;
        callback();
      })
      .catch((error) => console.error("Error loading images data:", error));
  }

  function loadImage(index) {
    const imgData = imagesData[index];
    if (imgData) {
      const sliderImageContainer = document.querySelector(".slider-image");
      const imgElement = sliderImageContainer.querySelector("img");
      
      imgElement.src = imgData.image;
      imgElement.alt = "Image " + (index + 1);
      sliderCaption.textContent = imgData.caption;
    }
  }
  
  function navigate(direction) {
    currentImageIndex = (currentImageIndex + direction + imagesData.length) % imagesData.length;
    loadImage(currentImageIndex);
  }

  loadImagesData(function () {
    loadImage(currentImageIndex);

    sliderLeftButton.addEventListener("click", function () {
      navigate(-1);
    });

    sliderRightButton.addEventListener("click", function () {
      navigate(1);
    });
  });
});
