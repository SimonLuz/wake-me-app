
// ******************************************************************
// // JQuery - SLICK library for the "hour" slider
// ******************************************************************

export const moveHourSlider = () => {

    $('.center').slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
        arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });

    // get rid of side arrows
    $(document).ready(function() {
        $(".set-time__scene").slick({
            arrows:false
        });
    });    
    
};

