document.addEventListener('DOMContentLoaded', function() {
  const starRating = document.querySelectorAll('.suraj-star-rating label');
  const radios = document.querySelectorAll('.suraj-star-rating input[type="radio"]');

  starRating.forEach(function(label) {
    label.addEventListener('mouseover', function() {
      const currentStar = parseInt(this.getAttribute('for').replace('star', ''));
      highlightStars(currentStar);
    });

    label.addEventListener('mouseout', function() {
      const checkedStar = getCheckedStar();
      highlightStars(checkedStar);
    });

    label.addEventListener('click', function() {
      const selectedStar = parseInt(this.getAttribute('for').replace('star', ''));
      highlightStars(selectedStar);
    });
  });

  function highlightStars(num) {
    starRating.forEach(function(star) {
      const starNum = parseInt(star.getAttribute('for').replace('star', ''));
      if (starNum <= num) {
        star.style.color = '#f5b301'; // Gold for filled stars
      } else {
        star.style.color = '#ddd'; // Default for unfilled stars
      }
    });
  }

  function getCheckedStar() {
    for (let radio of radios) {
      if (radio.checked) {
        return parseInt(radio.value);
      }
    }
    return 0; // Return 0 if no star is selected
  }
});
