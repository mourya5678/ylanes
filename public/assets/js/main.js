$(document).ready(function () {
  $(".ct_menu_bar").click(function () {
    $(".ct_navbar").addClass("ct_show");
  });
  $(".ct_close_menu").click(function () {
    $(".ct_navbar").removeClass("ct_show");
  });
$(".ct_uploaded_post_images").owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})


 



 
});

 $(".chat-list a").click(function () {
    $(".chatbox").addClass("showbox");
    return false;
  });

  $(".chat-icon").click(function () {
    $(".chatbox").removeClass("showbox");
  });
$(window).on("load", function () {
  $(".ct_loader_main").fadeOut();
});
// $(window).scroll(function () {
//   var scroll = $(window).scrollTop();

//   if (scroll >= 0) {
//     $(".ct_header").addClass("ct_sticky_menu");
//   } else {
//     $(".ct_header").removeClass("ct_sticky_menu");
//   }
// });












