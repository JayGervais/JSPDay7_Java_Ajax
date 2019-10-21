/**
 * AJAX calls to TravelExperts REST service for Agents
 * Jay Gervais, October 2019
 */

// ---------------------------------------------------------------------------------------------- //
	// Agent GET
// ---------------------------------------------------------------------------------------------- //

//home page agent cards
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
										"Phone: " + formatPhoneNumber(agent.agtBusPhone) + "<br />" + 
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
								"Phone: " + formatPhoneNumber(agent.agtBusPhone) + "<br />" + 
								"Email: " + agent.agtEmail;
			
			getAgency(agent.agencyId);
		}
	};
	req.open("GET", "/TravelExpertsREST/rs/agent/getagent/" + agentId, true);
	req.send();
}