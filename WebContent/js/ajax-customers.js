/**
 * AJAX calls to TravelExperts REST service for Customers
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

// ---------------------------------------------------------------------------------------------- //
	// Customer GET
// ---------------------------------------------------------------------------------------------- //
function customerCard()
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var customerArray = JSON.parse(req.responseText);
				
			var customerDetails = document.getElementById("customerdetails");
			var custTotal = 0;
			
			for (var i=0; i<customerArray.length; i++)
			{
				custTotal += 1;
			}
			customerDetails.innerHTML = "<strong>Total Customers: </strong>" + custTotal + "<br />";
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/customer/getallcustomers", true);
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
			getCustomerBookings(customerId);
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/customer/getcustomer/" + customerId, true);
	req.send();
}

function loadCustomerList()
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var customerArray = JSON.parse(req.responseText);
			
			var pagetitle = document.getElementById("pagetitle");
			pagetitle.innerHTML = "Customers";
			var title = document.getElementById("title");
			var cardbody = document.getElementById("card-body");
			
			for (i=0; i<customerArray.length; i++)
			{	
				var customer = customerArray[i];
				
				var list = document.createElement("li");
				list.setAttribute("class", "list-group-item");
				cardbody.appendChild(list);
				
				list.innerHTML = "<div class='row'>" + 
								 "<div class='col-md-5'>" +
								 "<div id='" + customer.customerId + "'></div><strong>" +
								 customer.custFirstName + " " + customer.custLastName + "</strong><br />" +
							     customer.custAddress + "<br />" +
							     customer.custCity + ", " + customer.custProv + " " + customer.custPostal +
								 "</div>" +
								 "<div class='col-md-5'><strong>" + 	 
								 "Contact</strong><br />Home Phone: " +
								 formatPhoneNumber(customer.custHomePhone) + "<br />Business Phone: " +
								 formatPhoneNumber(customer.custBusPhone) + "<br />Email: " +
								 customer.custEmail +
								 "</div>" +
								 "<div class='col-md-2'>" + 
								 "<div class='float-right'><a href='/TravelExpertsREST/page.jsp?customerId=" + customer.customerId + "' " +
							 		"+ id='book-url'>View Details ></a></div>" +
							 	 "</div></div>";
			}
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/customer/getallcustomers", true);
	req.send();
}

function getCustomerBookings(customerId)
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var custBookArray = JSON.parse(req.responseText);
			
			var card = document.getElementById("card-body");
			
			var custListCard = document.createElement("card-footer");
			card.appendChild(custListCard);

			for (i=0; i<custBookArray.length; i++)
			{	
				var custBookings = custBookArray[i];
				
				var list = document.createElement("li");
				list.setAttribute("class", "list-group-item");
				custListCard.appendChild(list);
				
				list.innerHTML = "<div class='row'>" + 
								 "<div class='col-md-5'>" +
								 "<div id='" + customerId + "'></div><strong>" +
								 custBookings.bookingDate.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, "") + "</strong><br />" +
								 "<div id='" + custBookings.bookingId + "'></div>" +
								 "</div>" +
								 "<div class='col-md-5'>" + 	 

								 "</div>" +
								 "<div class='col-md-2'>" + 
								 "<div class='float-right'><a href='/TravelExpertsREST/page.jsp?bookingId=" + custBookings.bookingId + "' " +
							 		"+ id='book-url'>View Details ></a></div>" +
							 	 "</div></div>";
				loadBookingDetails(custBookings.bookingId);
			}
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/booking/getcustomerbooking/" + customerId, true);
	req.send();
}








