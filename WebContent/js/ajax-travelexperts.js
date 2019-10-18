/**
 * AJAX calls to TravelExperts REST service
 * Jay Gervais, October 2019
 */

// insert customer put example not in use
function insertCustomer(customerform)
{
	var data = '{"agentId":"' + customerform.agentId + 
				'", "custAddress":"' + customerform.custAddress + 
				'", "custBusPhone":"' + customerform.custBusPhone + 
				'", "custCity":"' + customerform.custCity + 
				'", "custCountry":"' + customerform.custCountry + 
				'", "custEmail":"' + customerform.custEmail + 
				'", "custFirstName":"' + customerform.custFirstName + 
				'", "custHomePhone":"' + customerform.custHomePhone + 
				'", "custLastName":"' + customerform.custLastName + 
				'", "custPassword":"' + customerform.custPassword + 
				'", "custPostal":"' + customerform.custPostal + 
				'", "custProv":"' + customerform.custProv + '"}';
	$.ajax({
		url:"/TravelExpertsREST/rs/customer/putcustomer",
		type:"PUT",
		data:data,
		contentType:"application/json",
		cache:false,
		dataType:"text",
		complete:function(req, stat){ $("#result").html(stat); }
		});	
}

// home page agent cards
function getAgents()
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var agentArray = JSON.parse(req.responseText);
			
			var row = document.getElementById("row");
			var agentCard = document.getElementById("agentCard");		
			
			for (i=0; i<agentArray.length; i++)
			{
				var agent = agentArray[i];
				
				var col = document.createElement("div");
				col.setAttribute("class", "col-md-6");
				row.appendChild(col);
				
				var card = document.createElement("div");
				card.setAttribute("class", "card");
				card.setAttribute("id", "agent-card");
				col.appendChild(card);
				
				var cardbody = document.createElement("div");
				cardbody.setAttribute("class", "card-body");
				card.appendChild(cardbody);
				
				var cardtitle = document.createElement("h5");
				cardtitle.setAttribute("class", "card-title");
				cardbody.appendChild(cardtitle);
				cardtitle.innerHTML = agent.agtFirstName + " " + 
									  agent.agtMiddleInitial + " " + 
									  agent.agtLastName;
				
				var cardcontact = document.createElement("p");
				cardcontact.setAttribute("class", "card-text");
				cardbody.appendChild(cardcontact);
				cardcontact.innerHTML = "Position: " + agent.agtPosition + "<br />" + 
										"Phone: " + agent.agtBusPhone + "<br />" + 
										"Email: " + agent.agtEmail;
				
				var agtbutton = document.createElement("a");
				agtbutton.setAttribute("class", "btn btn-primary text-white");
				cardbody.appendChild(agtbutton);
				agtbutton.innerHTML = "View Agent";
				agtbutton.href = "/TravelExpertsREST/page.jsp?agentId=" + agent.agentId;
			}
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/agent/getallagents", true);
	req.send();
}

// single page details of agent
function loadSingleAgent(agentId)
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var agent = JSON.parse(req.responseText);
			
			var pagetitle = document.getElementById("pagetitle");
			var title = document.getElementById("title");
			var details = document.getElementById("details");
			
			pagetitle.innerHTML = "Agent Information";
			
			title.innerHTML = agent.agtFirstName + " " + 
			  				  agent.agtMiddleInitial + " " + 
			  				  agent.agtLastName;
			
			details.innerHTML = "Position: " + agent.agtPosition + "<br />" + 
								"Phone: " + agent.agtBusPhone + "<br />" + 
								"Email: " + agent.agtEmail;
			
			getAgency(agent.agencyId);
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/agent/getagent/" + agentId, true);
	req.send();
}

// home page booking list
function loadBookings()
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var bookingArray = JSON.parse(req.responseText);
			var bookingList = document.getElementById("bookinglist");
			
			var bookingDetails = document.getElementById("bookingdetails");
			var bookingSum = 0;
			var commissionSum = 0;
			
			for (i=0; i<bookingArray.length; i++)
			{	
				var booking = bookingArray[i];
				
				var list = document.createElement("li");
				list.setAttribute("class", "list-group-item");
				bookingList.appendChild(list);
				
				list.innerHTML = "<div class='row'>" + 
				 				 "<div class='col-md-8'>" +
				 				 booking.booking.bookingDate.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + ": " + 
								 booking.destination + "<br />Base: $" + 
								 booking.basePrice.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " / Comission: $" + 
								 booking.agencyCommission.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') +
								 "</div>" +
								 "<div class='col-md-4'>" + 
								 "<div class='float-right'><a href='/TravelExpertsREST/page.jsp?bookingId=" + booking.booking.bookingId + "' " +
								 		"+ id='book-url'>View Details ></a></div>" +
								 "</div></div>";
				
				bookingSum += parseInt(booking.basePrice);
				var baseTotal = bookingSum.toFixed(2);
				
				commissionSum += parseInt(booking.agencyCommission);
				var commTotal = commissionSum.toFixed(2);
			}
			bookingDetails.innerHTML = "<strong>Base Total:</strong> $" + baseTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "<br />" +
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
									"<td class='title'>Destination:</td>" +
									"<td>" + booking.destination + "</td>" +
									"</tr>" +									
									"<tr>" +
									"<tr>" +
									"<td class='title'>Description:</td>" +
									"<td>" + booking.description + "</td>" +
									"</tr>" +									
									"<tr>" +
									"<td class='title'>Purchase Date:</td>" +
									"<td>" + booking.booking.bookingDate.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + "</td>" +
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
									"<td>Trip End Date: " + booking.tripEnd.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + "</td>" +
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

function getCustomerName(customerId)
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var customer = JSON.parse(req.responseText);
			var custdiv = document.getElementById(customerId);
			custdiv.innerHTML = customer.custFirstName + " " + customer.custLastName + ", " +
								customer.custCity + " " + customer.custProv;
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/customer/getcustomer/" + customerId, true);
	req.send();
}

function getCustomer(customerId)
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var customer = JSON.parse(req.responseText);
			title.innerHTML = customer.custFirstName + " " + customer.custLastName + ", " +
							  customer.custCity + ", " + customer.custProv + 
							  "<div class='float-right'><a href='/TravelExpertsREST/page.jsp?customerId=" + customer.customerId + "' " +
						 		"+ id='book-url'>Customer Details ></a></div>"; 
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/customer/getcustomer/" + customerId, true);
	req.send();
}

function loadCustomerDetails(customerId)
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		var pagetitle = document.getElementById("pagetitle");
		var title = document.getElementById("title");
		var cardbody = document.getElementById("card-body");
		
		if (req.readyState == 4 && req.status == 200)
		{
			var customer = JSON.parse(req.responseText);
			
			pagetitle.innerHTML = "Customer Details";
			title.innerHTML = customer.custFirstName + " " + customer.custLastName; 
			
			var address = document.createElement("p");
			address.setAttribute("class", "cust-descript");
			cardbody.appendChild(address);
			address.innerHTML = "<strong>Address:</strong><br />" + customer.custAddress + "<br />" +
							  customer.custCity + ", " + customer.custCountry + " " + customer.custPostal;
			
			var contact = document.createElement("p");
			contact.setAttribute("class", "cust-descript");
			cardbody.appendChild(contact);
			contact.innerHTML = "<strong>Contact:</strong><br />Business Phone: " + 
								formatPhoneNumber(customer.custBusPhone) + "<br />" 
								+ "Home Phone: " + formatPhoneNumber(customer.custHomePhone) + 
							  	"<br />Email: " + customer.custEmail;
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/customer/getcustomer/" + customerId, true);
	req.send();
}

// function to nicely format phone number strings
function formatPhoneNumber(phoneNumberString) {
	var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
	if (match) {
		return '(' + match[1] + ') ' + match[2] + '-' + match[3]
	}
	return null
}


// agency
function getAgency(agencyId)
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var agency = JSON.parse(req.responseText);
			
			var cardbody = document.getElementById("card-body");
			var agencyCard = document.createElement("card-body");
			agencyCard.setAttribute("id", "agent-card");
			cardbody.appendChild(agencyCard);
			
			agencyCard.innerHTML = "<h3>Agency:</h3><hr>" + 
								   "<p>" + agency.agncyAddress + "<br />" + 
								   agency.agncyCity + ", " + agency.agncyProv + "<br />" +
								   agency.agncyPostal + "</p>"; 
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/agency/getagency/" + agencyId, true);
	req.send();
}



