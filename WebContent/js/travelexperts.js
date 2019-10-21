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

//function to nicely format phone number strings
function formatPhoneNumber(phoneNumberString) {
	var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
	if (match) {
		return '(' + match[1] + ') ' + match[2] + '-' + match[3]
	}
	return null
}