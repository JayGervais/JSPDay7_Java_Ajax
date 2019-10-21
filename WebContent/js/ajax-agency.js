/**
 * AJAX calls to TravelExperts REST service for Agencies
 * Jay Gervais, October 2019
 */

// ---------------------------------------------------------------------------------------------- //
	// Agency GET
// ---------------------------------------------------------------------------------------------- //

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