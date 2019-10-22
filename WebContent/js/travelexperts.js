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

// additional jQuery validate fields

// letters only
jQuery.validator.addMethod("lettersonly", function(value, element) {
	return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Letters only please"); 

// phone number
jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return this.optional(element) || phone_number.length > 9 && 
    phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
}, "Please specify a valid phone number");

// address
jQuery.validator.addMethod("address", function(value, element) {
	return this.optional(element) || /^[a-zA-Z0-9,.!? ]*$/.test(value);
}, "Letters only please"); 

// postal or zip code
jQuery.validator.addMethod("postalCode", function(value, element) {
	return this.optional(element) || /^\d{5}(-\d{4})?$/.test(value) | /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/.test(value);
}, "Please add a valid postal or zip code"); 
