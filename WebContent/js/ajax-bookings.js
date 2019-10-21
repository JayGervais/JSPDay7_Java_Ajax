/**
 * AJAX calls to TravelExperts REST service for Bookings
 * Jay Gervais, October 2019
 */

// ---------------------------------------------------------------------------------------------- //
	// Bookings GET
// ---------------------------------------------------------------------------------------------- //

function loadBookings()
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var bookingArray = JSON.parse(req.responseText);
			var bookingList = document.getElementById("bookinglist");
			
			for (i=0; i<bookingArray.length; i++)
			{	
				var booking = bookingArray[i];
				
				var list = document.createElement("li");
				list.setAttribute("class", "list-group-item");
				bookingList.appendChild(list);
				
				list.innerHTML = "<div class='row'>" + 
				 				 "<div class='col-md-8'>" +
				 				 "<div class='date'>" + booking.bookingDate.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + "</div>" +
				 				 "<div id='" + booking.bookingId + "'></div>" +
								 "</div>" +
								 "<div class='col-md-4'>" + 
								 "<div class='float-right'><a href='/TravelExpertsREST/page.jsp?bookingId=" + booking.bookingId + "' " +
								 		"+ id='book-url'>View Details ></a></div>" +
								 "</div></div>";
				loadBookingDetails(booking.bookingId);
				getBookingTotal();
			}
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/booking/getallbookings", true);
	req.send();
}

function loadBookingDetails(bookingId)
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var bookingArray = JSON.parse(req.responseText);
			
			for (i=0; i<bookingArray.length; i++)
			{
				var bookingDetails = bookingArray[i];
				var bookingDiv = document.getElementById(bookingId);
				bookingDiv.innerHTML =  "<strong>" + bookingDetails.destination + "</strong><i> from " + 
										bookingDetails.tripStart.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + 
										" to " + bookingDetails.tripEnd.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + "</i><br />Base: $" + 
										bookingDetails.basePrice.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " / Comission: $" + 
										bookingDetails.agencyCommission.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
			}
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/booking/getbooking/" + bookingId, true);
	req.send();
}

function getBookingTotal()
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var bookingArray = JSON.parse(req.responseText);		
			var bookingDetails = document.getElementById("bookingdetails");
			var bookingSum = 0;
			var commissionSum = 0;
			var totalBookings = 0;
			
			for (i=0; i<bookingArray.length; i++)
			{	
				var booking = bookingArray[i];
				
				totalBookings += 1;
				
				bookingSum += parseInt(booking.basePrice);
				var baseTotal = bookingSum.toFixed(2);
				
				commissionSum += parseInt(booking.agencyCommission);
				var commTotal = commissionSum.toFixed(2);
			}
			bookingDetails.innerHTML = "<strong>Total Bookings: </strong>" + totalBookings + "<br />" +
									   "<strong>Base Total:</strong> $" + baseTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "<br />" +
									   "<strong>Commission Total:</strong> $" + commTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/booking/getbookingdetails", true);
	req.send();
}

// lists all bookings on page
function loadBookingList()
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var bookingArray = JSON.parse(req.responseText);
			
			var pagetitle = document.getElementById("pagetitle");
			pagetitle.innerHTML = "Bookings";
			var title = document.getElementById("title");
			var cardbody = document.getElementById("card-body");
			
			var bookingSum = 0;
			var commissionSum = 0;
			
			for (i=0; i<bookingArray.length; i++)
			{	
				var booking = bookingArray[i];
				
				var list = document.createElement("li");
				list.setAttribute("class", "list-group-item");
				cardbody.appendChild(list);
				
				list.innerHTML = "<div class='row'>" + 
								 "<div class='col-md-5'>" +
								 "<div id='" + booking.booking.customerId + "'></div>" +
							     booking.booking.bookingDate.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + "<br />Base: $" +
								 booking.basePrice.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " / Comission: $" + 
								 booking.agencyCommission.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') +
								 "</div>" +
								 "<div class='col-md-5'>" + 	 
								 booking.tripStart.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + " to " +
								 booking.tripEnd.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + "<br />" +
								 booking.destination + "<br />" +
								 booking.description +
								 "</div>" +
								 "<div class='col-md-2'>" + 
								 "<div class='float-right'><a href='/TravelExpertsREST/page.jsp?bookingId=" + booking.booking.bookingId + "' " +
							 		"+ id='book-url'>View Details ></a></div>" +
							 	 "</div></div>";
				
				bookingSum += parseInt(booking.basePrice);
				var baseTotal = bookingSum.toFixed(2);
				
				commissionSum += parseInt(booking.agencyCommission);
				var commTotal = commissionSum.toFixed(2);
				
				getCustomerName(booking.booking.customerId);
			}
			
			title.innerHTML = "Base Total: $" + baseTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " / Commission Total: $" + 
							  commTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');			
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/booking/getbookingdetails", true);
	req.send();
}

// details for single booking page
function loadSingleBooking(bookingId)
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var bookingArray = JSON.parse(req.responseText);
			
			var pagetitle = document.getElementById("pagetitle");
			var title = document.getElementById("title");
			var details = document.getElementById("details");	
			pagetitle.innerHTML = "Booking Details";
			
			for (i=0; i<bookingArray.length; i++)
			{	
				var booking = bookingArray[i];
	
				getCustomer(booking.booking.customerId);
					
				details.innerHTML = "<table class='table'><tbody>" + 
									"<tr>" +
									"<td class='title'>Booking Number:</td>" +
									"<td>" + booking.booking.bookingNo + "</td>" +
									"</tr>" +									
									"<tr>" +
									"<td class='title'>Purchase Date:</td>" +
									"<td>" + booking.booking.bookingDate.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + "</td>" +
									"</tr>" +										
									"<tr>" +
									"<td class='title'>Destination:</td>" +
									"<td>" + booking.destination + "</td>" +
									"</tr>" +												
									"<tr>" +
									"<tr>" +
									"<td class='title'>Description:</td>" +
									"<td>" + booking.description + "</td>" +
									"</tr>" +										
									"<tr>" +
									"<td class='title'>Travelers:</td>" +
									"<td>" + booking.booking.travelerCount + "</td>" +
									"</tr>" +											
									"<tr>" +
									"<td class='title'>Start Date:</td>" +
									"<td>" + booking.tripStart.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + "</td>" +
									"</tr>" +											
									"<tr>" +
									"<td class='title'>End Date:</td>" +
									"<td>" + booking.tripEnd.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + "</td>" +
									"</tr>" +										
									"<tr>" +
									"<td class='title'>Base Price:</td>" +
									"<td>$" + booking.basePrice.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "</td>" +
									"</tr>" +								
									"<tr>" +
									"<td class='title'>Commission:</td>" +
									"<td>$" + booking.agencyCommission.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "</td>" +
									"</tr>" +
									"</tbody></table>";
			}
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/booking/getbooking/" + bookingId, true);
	req.send();
}