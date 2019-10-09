/**
 * Travel Experts JavaScript
 * Jay Gervais, 2019
 */

function insertCustomer(myform)
	{
		var data = '{"agentId":"' + myform.agentId + 
					'", "custAddress":"' + myform.custAddress + 
					'", "custBusPhone":"' + myform.custBusPhone + 
					'", "custCity":"' + myform.custCity + 
					'", "custCountry":"' + myform.custCountry + 
					'", "custEmail":"' + myform.custEmail + 
					'", "custFirstName":"' + myform.custFirstName + 
					'", "custHomePhone":"' + myform.custHomePhone + 
					'", "custLastName":"' + myform.custLastName + 
					'", "custPassword":"' + myform.custPassword + 
					'", "custPostal":"' + myform.custPostal + 
					'", "custProv":"' + myform.custProv + '"}';
		$.ajax({
			url:"/JSPDay7/rs/customer/putcustomer",
			type:"PUT",
			data:data,
			contentType:"application/json",
			cache:false,
			dataType:"text",
			complete:function(req, stat){ $("#result").html(stat); }
			});	
	}