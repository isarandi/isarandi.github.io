window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/pose_den";
var INTERP_BASE_1 = "./static/interpolation/pose_den_1";
var INTERP_BASE_2 = "./static/interpolation/pose_den_2";
var INTERP_BASE_3 = "./static/interpolation/pose_den_3";
var INTERP_BASE_4 = "./static/interpolation/pose_den_4";
var INTERP_BASE_5 = "./static/interpolation/pose_den_5";

var NUM_INTERP_FRAMES = 20;
var NUM_INTERP_FRAMES_1 = 19;
var NUM_INTERP_FRAMES_2 = 18;
var NUM_INTERP_FRAMES_3 = 54;
var NUM_INTERP_FRAMES_4 = 57;
var NUM_INTERP_FRAMES_5 = 48;

var interp_images = [];
var interp_images_1 = [];
var interp_images_2 = [];
var interp_images_3 = [];
var interp_images_4 = [];
var interp_images_5 = [];

function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    // var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.png';
    var path = INTERP_BASE + '/img_' + String(i) + '.png';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function preloadInterpolationImages_1() {
  for (var i = 0; i < NUM_INTERP_FRAMES_1; i++) {
    var path = INTERP_BASE_1 + '/img_' + String(i) + '.png';
    interp_images_1[i] = new Image();
    interp_images_1[i].src = path;
  }
}

function preloadInterpolationImages_2() {
  for (var i = 0; i < NUM_INTERP_FRAMES_2; i++) {
    var path = INTERP_BASE_2 + '/img_' + String(i) + '.png';
    interp_images_2[i] = new Image();
    interp_images_2[i].src = path;
  }
}

function preloadInterpolationImages_3() {
  for (var i = 0; i < NUM_INTERP_FRAMES_3; i++) {
    // var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.png';
    var path = INTERP_BASE_3 + '/img_' + String(i) + '.png';
    interp_images_3[i] = new Image();
    interp_images_3[i].src = path;
  }
}

function preloadInterpolationImages_4() {
  for (var i = 0; i < NUM_INTERP_FRAMES_4; i++) {
    var path = INTERP_BASE_4 + '/img_' + String(i) + '.png';
    interp_images_4[i] = new Image();
    interp_images_4[i].src = path;
  }
}

function preloadInterpolationImages_5() {
  for (var i = 0; i < NUM_INTERP_FRAMES_5; i++) {
    var path = INTERP_BASE_5 + '/img_' + String(i) + '.png';
    interp_images_5[i] = new Image();
    interp_images_5[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}

function setInterpolationImage_1(i) {
  var image = interp_images_1[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper-1').empty().append(image);
}

function setInterpolationImage_2(i) {
  var image = interp_images_2[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper-2').empty().append(image);
}

function setInterpolationImage_3(i) {
  var image = interp_images_3[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper-3').empty().append(image);
}

function setInterpolationImage_4(i) {
  var image = interp_images_4[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper-4').empty().append(image);
}

function setInterpolationImage_5(i) {
  var image = interp_images_5[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper-5').empty().append(image);
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    preloadInterpolationImages_1();

    $('#interpolation-slider-1').on('input', function(event) {
      setInterpolationImage_1(this.value);
    });
    setInterpolationImage_1(0);
    $('#interpolation-slider-1').prop('max', NUM_INTERP_FRAMES_1 - 1);

    bulmaSlider.attach();

    preloadInterpolationImages_2();

    $('#interpolation-slider-2').on('input', function(event) {
      setInterpolationImage_2(this.value);
    });
    setInterpolationImage_2(0);
    $('#interpolation-slider-2').prop('max', NUM_INTERP_FRAMES_2 - 1);
    
    bulmaSlider.attach();
    
    preloadInterpolationImages_3();

    $('#interpolation-slider-3').on('input', function(event) {
      setInterpolationImage_3(this.value);
    });
    setInterpolationImage_3(0);
    $('#interpolation-slider-3').prop('max', NUM_INTERP_FRAMES_3 - 1);

    bulmaSlider.attach();

    preloadInterpolationImages_4();

    $('#interpolation-slider-4').on('input', function(event) {
      setInterpolationImage_4(this.value);
    });
    setInterpolationImage_4(0);
    $('#interpolation-slider-4').prop('max', NUM_INTERP_FRAMES_4 - 1);

    bulmaSlider.attach();

    preloadInterpolationImages_5();

    $('#interpolation-slider-5').on('input', function(event) {
      setInterpolationImage_5(this.value);
    });
    setInterpolationImage_5(0);
    $('#interpolation-slider-5').prop('max', NUM_INTERP_FRAMES_5 - 1);

    bulmaSlider.attach();

})
