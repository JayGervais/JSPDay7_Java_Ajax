/**
 * AJAX calls to TravelExperts REST service
 * Jay Gervais, October 2019
 */

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
		url:"http://192.168.137.1:9090/TravelExpertsREST/rs/customer/putcustomer",
		type:"PUT",
		data:data,
		contentType:"application/json",
		cache:false,
		dataType:"text",
		complete:function(req, stat){ $("#result").html(stat); }
		});	
}

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

function loadSingleAgent(agentId)
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var agent = JSON.parse(req.responseText);
			
			var title = document.getElementById("title");
			var details = document.getElementById("details");	
			
			title.innerHTML = agent.agtFirstName + " " + 
			  				  agent.agtMiddleInitial + " " + 
			  				  agent.agtLastName;
			
			details.innerHTML = "Position: " + agent.agtPosition + "<br />" + 
								"Phone: " + agent.agtBusPhone + "<br />" + 
								"Email: " + agent.agtEmail;
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/agent/getagent/" + agentId, true);
	req.send();
}

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
				
				list.innerHTML = booking.booking.bookingDate.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + ": " + 
								 booking.destination + "<br />Base: $" + 
								 "<div class='float-right'><a href='/TravelExpertsREST/page.jsp?bookingId=" + booking.booking.bookingId + "' " +
								 		"+ id='book-url'>View Details ></a></div>" +
								 booking.basePrice.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " / Comission: $" + 
								 booking.agencyCommission.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
				
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

function loadSingleBooking(bookingId)
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var bookingArray = JSON.parse(req.responseText);
			
			var title = document.getElementById("title");
			var details = document.getElementById("details");	
			
			for (i=0; i<bookingArray.length; i++)
			{	
				var booking = bookingArray[i];
				
				getCustomer(booking.booking.customerId);
					
				details.innerHTML = "<table class='table'><tbody>" + 
									"<tr>" +
									"<td>Destination:</td>" +
									"<td>" + booking.destination + "</td>" +
									"</tr>" +
									"<tr>" +
									"<td>Description:</td>" +
									"<td>" + booking.description + "</td>" +
									"</tr>" +									
									"<tr>" +
									"<td>Purchase Date:</td>" +
									"<td>" + booking.booking.bookingDate.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + "</td>" +
									"</tr>" +									
									"<tr>" +
									"<td>Booking Number:</td>" +
									"<td>" + booking.booking.bookingNo  + "</td>" +
									"</tr>" +								
									"<tr>" +
									"<td>Travelers:</td>" +
									"<td>" + booking.booking.travelerCount + "</td>" +
									"</tr>" +									
									"<tr>" +
									"<td>Start Date:</td>" +
									"<td>" + booking.tripStart.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + "</td>" +
									"</tr>" +									
									"<tr>" +
									"<td>End Date:</td>" +
									"<td>Trip End Date: " + booking.tripEnd.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + "</td>" +
									"</tr>" +									
									"<tr>" +
									"<td>Base Price:</td>" +
									"<td>$" + booking.basePrice.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "</td>" +
									"</tr>" +									
									"<tr>" +
									"<td>Commission:</td>" +
									"<td>$" + booking.agencyCommission.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "</td>" +
									"</tr>" +
									"</tbody></table>";
			}
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/booking/getbooking/" + bookingId, true);
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


