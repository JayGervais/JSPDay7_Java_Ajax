/**
 * AJAX calls to TravelExperts REST service for Customers
 * Jay Gervais, October 2019
 */

function insertCustomer()
{	
	var agentIdString = document.getElementById("agentId").value;
	var agentId = parseInt(agentIdString);
	var custAddress = document.getElementById("custAddress").value;
	var custBusPhone = document.getElementById("custBusPhone").value;
	var custCity = document.getElementById("custCity").value;
	var custCountry = document.getElementById("custCountry").value;
	var custEmail = document.getElementById("custEmail").value;
	var custFirstName = document.getElementById("custFirstName").value;
	var custHomePhone = document.getElementById("custHomePhone").value;
	var custLastName = document.getElementById("custLastName").value;
	var custPostal = document.getElementById("custPostal").value;
	var custProv = document.getElementById("custProv").value;
	
	var data = '{ "agentId":'+ agentId
	+', "custAddress":"' + custAddress
	+'", "custBusPhone":"'+ custBusPhone 
	+'", "custCity":"'+ custCity
	+'", "custCountry":"'+ custCountry
	+'", "custEmail":"'+ custEmail
	+'", "custFirstName":"'+ custFirstName
	+'", "custHomePhone":"'+ custHomePhone
	+'", "custLastName":"'+ custLastName
	+'", "custPostal":"'+ custPostal
	+'", "custProv":"'+ custProv
	+'" }';	
	
	$('#customerform').validate({
		rules: {
			"custFirstName": {
				required: true,
				lettersonly: true
			},
			"custLastName": {
				required: true,
				lettersonly: true
			},
			"custAddress": {
				required: true,
				address: true
			},
			"custCity": {
				required: true,
				lettersonly: true
			},
			"custProv": {
				required: true
			},
			"custCountry": {
				required: true
			},
			"custPostal": {
				required: true,
				postalCode: true
			},
			"custBusPhone": {
				required: true,
				phoneUS: true
			},
			"custHomePhone": {
				required: true,
				phoneUS: true
			},
			"custEmail": {
				required: true,
				email: true
			}
		},
		messages: {
			"custFirstName": {
				required: "First name required",
				lettersonly: "A valid name is required"
			},
			"custLastName": {
				required: "Last name required",
				lettersonly: "A valid name is required"
			},
			"custAddress": {
				required: "Address required",
				address: "A valid address is required"
			},
			"custCity": {
				required: "City required",
				lettersonly: "A valid city is required"
			},
			"custProv": {
				required: "Province or state required"
			},
			"custCountry": {
				required: "Province or state required"
			},
			"custPostal": {
				required: "Postal Code required",
				postalCode: "A valid postal or zip code is required"
			},
			"custBusPhone": {
				required: "Business phone required",
				phoneUS: "A valid phone number is required"
			},
			"custHomePhone": {
				required: "Home phone required",
				phoneUS: "A valid phone number is required"
			},
			"custEmail": {
				required: "Email required",
				email: "A valid email is required"
			}
		},
		submitHandler: function(form) {
			$.ajax({
				url:"/TravelExpertsREST/rs/customer/postcustomer/",
				type:"POST",
				data:data,
				cache:false,
				dataType:"string",
				contentType:"application/json",
				success:function(response){ $("#result").html("Customer added"); }
			});
			
			$('#customerform').clear();
			$("#result").html("Customer added");
		}
	});		
}

function updateCustomer(customerId)
{	
	var agentIdString = document.getElementById("agentId").value;
	var agentId = parseInt(agentIdString);
	var custAddress = document.getElementById("custAddress").value;
	var custBusPhone = document.getElementById("custBusPhone").value;
	var custCity = document.getElementById("custCity").value;
	var custCountry = document.getElementById("custCountry").value;
	var custEmail = document.getElementById("custEmail").value;
	var custFirstName = document.getElementById("custFirstName").value;
	var custHomePhone = document.getElementById("custHomePhone").value;
	var custLastName = document.getElementById("custLastName").value;
	var custPostal = document.getElementById("custPostal").value;
	var custProv = document.getElementById("custProv").value;
	
	var data = '{ "customerId":'+ customerId
	+', "agentId":'+ agentId
	+', "custAddress":"' + custAddress
    +'", "custBusPhone":"'+ custBusPhone 
    +'", "custCity":"'+ custCity
    +'", "custCountry":"'+ custCountry
    +'", "custEmail":"'+ custEmail
    +'", "custFirstName":"'+ custFirstName
    +'", "custHomePhone":"'+ custHomePhone
    +'", "custLastName":"'+ custLastName
    +'", "custPostal":"'+ custPostal
    +'", "custProv":"'+ custProv
    +'" }';
	
	$('#customerform').validate({
		rules: {
			"custFirstName": {
				required: true,
				lettersonly: true
			},
			"custLastName": {
				required: true,
				lettersonly: true
			},
			"custAddress": {
				required: true,
				address: true
			},
			"custCity": {
				required: true,
				lettersonly: true
			},
			"custProv": {
				required: true
			},
			"custCountry": {
				required: true
			},
			"custPostal": {
				required: true,
				postalCode: true
			},
			"custBusPhone": {
				required: true,
				phoneUS: true
			},
			"custHomePhone": {
				required: true,
				phoneUS: true
			},
			"custEmail": {
				required: true,
				email: true
			}
		},
		messages: {
			"custFirstName": {
				required: "First name required",
				lettersonly: "A valid name is required"
			},
			"custLastName": {
				required: "Last name required",
				lettersonly: "A valid name is required"
			},
			"custAddress": {
				required: "Address required",
				address: "A valid address is required"
			},
			"custCity": {
				required: "City required",
				lettersonly: "A valid city is required"
			},
			"custProv": {
				required: "Province or state required"
			},
			"custCountry": {
				required: "Province or state required"
			},
			"custPostal": {
				required: "Postal Code required",
				postalCode: "A valid postal or zip code is required"
			},
			"custBusPhone": {
				required: "Business phone required",
				phoneUS: "A valid phone number is required"
			},
			"custHomePhone": {
				required: "Home phone required",
				phoneUS: "A valid phone number is required"
			},
			"custEmail": {
				required: "Email required",
				email: "A valid email is required"
			}
		},
		submitHandler: function(form) {
			$.ajax({
				url:"/TravelExpertsREST/rs/customer/putcustomer/",
				type:"PUT",
				data:data,
				cache:false,
				dataType:"string",
				contentType:"application/json",
				success:function(response){ $("#result").html("Customer added"); }
			});
			window.location.href = "/TravelExpertsREST/page.jsp?customerId=" + customerId;
		}
	});		
}

function loadprovince(provCountryCode)
{
	console.log("in loadprovinces");
	
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if (req.readyState == 4 && req.status == 200)
		{
			var regionArray = JSON.parse(req.responseText);
			var regionSelect = document.getElementById("custProv");
			clearSelect(regionSelect);
			console.log("cleared console length=" + regionSelect.length);
			
			for (i=0; i<regionArray.length; i++)
			{		
				var region = regionArray[i];
				var option = document.createElement("option");
				
				option.text = region.provStateName;
				option.value = region.provStateCode;
				regionSelect.add(option);
			}
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/customer/getprovstates/" + provCountryCode);
	req.send();
}

function clearSelect(selectObject)
{
	for (i = selectObject.options.length -1; i >= 0; i--)
	{
		selectObject.remove(i);
	}
}

function deleteCustomer(customerId)
{
	if (confirm("Are you sure you want to delete this customer?"))
	{
		$.ajax({
			url:"/TravelExpertsREST/rs/customer/deletecustomer/" + customerId,
			type:"DELETE",
			success:function(result) { 
				$("#result").html("Customer successfully deleted"); 
				window.location.href = "/TravelExpertsREST/page.jsp?customerId=1";
			}
		});
	}
	return false;
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
			custdiv.innerHTML = "<strong>" + customer.custFirstName + " " + customer.custLastName + ", " +
								customer.custCity + " " + customer.custProv + "</strong>";
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
			title.innerHTML = customer.custFirstName + " " + customer.custLastName +
							  "<div class='float-right'><a href='/TravelExpertsREST/addcustomer.jsp?customerId=" + customer.customerId + "' " +
							  "+ id='book-url'>Update Customer ></a></div>"; 
		
			var card = document.createElement("div");
			card.setAttribute("class", "card");
			cardbody.appendChild(card);
			
			var cardholder = document.createElement("div");
			cardholder.setAttribute("class", "card-body");
			card.appendChild(cardholder);
			
			var row = document.createElement("div");
			row.setAttribute("class", "row");
			cardholder.appendChild(row);
			
			var col = document.createElement("div");
			col.setAttribute("class", "col-md-6");
			row.appendChild(col);
			
			var col2 = document.createElement("div");
			col2.setAttribute("class", "col-md-6");
			row.appendChild(col2);
			
			var address = document.createElement("p");
			address.setAttribute("class", "cust-descript");
			col.appendChild(address);
			address.innerHTML = "<strong>Address:</strong><br />" + customer.custAddress + "<br />" +
							  customer.custCity + ", " + customer.custCountry + " " + customer.custPostal;
			
			if (customer.custEmail.trim() == "")
			{
				email = "";
			} else {
				email = "<br /><i class='fas fa-envelope'></i> " + customer.custEmail;
			}
			
			var contact = document.createElement("p");
			contact.setAttribute("class", "cust-descript");
			col2.appendChild(contact);
			contact.innerHTML = "<strong>Contact:</strong><br /><i class='fas fa-phone'></i> Business: " + 
								formatPhoneNumber(customer.custBusPhone) + "<br />" 
								+ "<i class='fas fa-phone'></i> Home: " + formatPhoneNumber(customer.custHomePhone) + 
							  	email;
			
			custBookings = getCustomerBookings(customerId);
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
				
				if (customer.custEmail.trim() != "")
				{
					customerEmail = "<i class='fas fa-envelope'></i> " + customer.custEmail;
				}
				else
				{
					customerEmail = "";
				}
				
				list.innerHTML = "<div class='row'>" + 
								 "<div class='col-md-5'>" +
								 "<div id='" + customer.customerId + "'></div><strong>" +
								 customer.custFirstName + " " + customer.custLastName + "</strong><br />" +
							     customer.custAddress + "<br />" +
							     customer.custCity + ", " + customer.custProv + " " + customer.custPostal +
								 "</div>" +
								 "<div class='col-md-5'><strong>" + 	 
								 "Contact</strong><br /><i class='fas fa-phone'></i> Home: " +
								 formatPhoneNumber(customer.custHomePhone) + "<br /><i class='fas fa-phone'></i> Business: " +
								 formatPhoneNumber(customer.custBusPhone) + "<br />" +
								 customerEmail +
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

function customerFormData(customerId)
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{		
		if (req.readyState == 4 && req.status == 200)
		{
			var customer = JSON.parse(req.responseText);
			
			document.getElementById("custFirstName").value = customer.custFirstName;	
			document.getElementById("pagetitle").innerHTML = "Update Customer";
			
			function setSelectValue (id, val) {
			    document.getElementById(id).value = val;
			}
		
			setSelectValue("agentId", customer.agentId);
			
			if (customer.custCountry != "United States") {
				country = document.getElementById("custCountry").value = "ca";
			} else {
				country = document.getElementById("custCountry").value = "us";
			}
			
			loadprovince(country);			
			setSelectValue("custProv", customer.custProv);
			document.getElementById("custAddress").value = customer.custAddress;
			document.getElementById("custBusPhone").value = formatPhoneNumber(customer.custBusPhone);
			document.getElementById("custCity").value = customer.custCity;
			document.getElementById("custEmail").value = customer.custEmail.trim();
			document.getElementById("custFirstName").value = customer.custFirstName;
			document.getElementById("custHomePhone").value = formatPhoneNumber(customer.custHomePhone);
			document.getElementById("custLastName").value = customer.custLastName;
			document.getElementById("custPostal").value = customer.custPostal;
			document.getElementById("custProv").value = customer.custProv;
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/customer/getcustomer/" + customerId, true);
	req.send();
}
