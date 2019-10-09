/**
 * Travel Experts JavaScript
 * Jay Gervais, 2019
 */

// insert customer function
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