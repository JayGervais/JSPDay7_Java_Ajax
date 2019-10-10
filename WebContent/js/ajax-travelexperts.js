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
				agtbutton.href = "/TravelExpertsREST/agent.jsp?agentId=" + agent.agentId;
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
			
			var title = document.getElementById("agenttitle");
			var details = document.getElementById("agentdetails");	
			
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
								 "<div class='float-right book-link'><a href='' id='book-url'>View Details ></a></div>" +
								 booking.basePrice.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " / Comission: $" + 
								 booking.agencyCommission.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
				
				var bookurl = document.getElementById("book-url");
				bookurl.href = "/TravelExpertsREST/agent.jsp?bookingId=" + booking.booking.bookingId;
				
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
