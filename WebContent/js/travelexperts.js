/**
 * Travel Experts JavaScript
 * Jay Gervais, October 2019
 */

// nav bar transparent to solid
$(document).ready(function() {
     $(window).scroll(function() {
       if($(this).scrollTop() > 100) { 
           $('#mainNav').addClass('navbar-shrink');
       } else {
           $('#mainNav').removeClass('navbar-shrink');
       }
   });
}); 