/*----------------------------------------------
                Custom JS
------------------------------------------------*/

// Closes the sidebar menu
$("#menu-close").click(function (e) {
  e.preventDefault();
  $("#sidebar-wrapper").toggleClass("active");
});
// Opens the sidebar menu
$("#menu-toggle").click(function (e) {
  e.preventDefault();
  $("#sidebar-wrapper").toggleClass("active");
});
// Scrolls to the selected menu item on the page
$(function () {
  $("a[href*=#]:not([href=#],[data-toggle],[data-target],[data-slide])").click(
    function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") ||
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000
          );
          return false;
        }
      }
    }
  );
});
//#to-top button appears after scrolling
var fixed = false;
$(document).scroll(function () {
  if ($(this).scrollTop() > 250) {
    if (!fixed) {
      fixed = true;
      // $('#to-top').css({position:'fixed', display:'block'});
      $("#to-top").show("slow", function () {
        $("#to-top").css({
          position: "fixed",
          display: "block",
        });
      });
    }
  } else {
    if (fixed) {
      fixed = false;
      $("#to-top").hide("slow", function () {
        $("#to-top").css({
          display: "none",
        });
      });
    }
  }
});

// Disable Google Maps scrolling
// See http://stackoverflow.com/a/25904582/1607849
// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function (event) {
  var that = $(this);
  that.on("click", onMapClickHandler);
  that.off("mouseleave", onMapMouseleaveHandler);
  that.find("iframe").css("pointer-events", "none");
};
var onMapClickHandler = function (event) {
  var that = $(this);
  // Disable the click handler until the user leaves the map area
  that.off("click", onMapClickHandler);
  // Enable scrolling zoom
  that.find("iframe").css("pointer-events", "auto");
  // Handle the mouse leave event
  that.on("mouseleave", onMapMouseleaveHandler);
};
// Enable map zooming with mouse scroll when the user clicks the map
$(".map").on("click", onMapClickHandler);

let mhr;
let rhr;
const mhr_change = function () {
  mhr = Math.round($("#maxHeartRate").val());
  calculate_zones();
};
const rhr_change = function () {
  rhr = Math.round($("#restingHeartRate").val());
  calculate_zones();
};
$("#maxHeartRate").on("input", mhr_change);
$("#restingHeartRate").on("input", rhr_change);

const karvonen_formula = function (mhr_rhr_diff, rhr, intensity) {
  return Math.round(mhr_rhr_diff * intensity + rhr);
};

const calculate_zones = function () {
  if (!mhr || !rhr) {
    return;
  }

  const intensity = {
    zone1: {
      low: 0.5,
      hi: 0.6,
    },
    zone2: {
      low: 0.6,
      hi: 0.7,
    },
    zone3: {
      low: 0.7,
      hi: 0.8,
    },
    zone4: {
      low: 0.8,
      hi: 0.9,
    },
    zone5: {
      low: 0.9,
      hi: 1.0,
    },
  };

  var diff = mhr - rhr;

  for (zone in intensity) {
    low_target = karvonen_formula(diff, rhr, intensity[zone].low);
    hi_target = karvonen_formula(diff, rhr, intensity[zone].hi);
    $(`#${zone}`).text(`${low_target} - ${hi_target}`);
  }
};
