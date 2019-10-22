<div class="container">
	<form method="post" id="customerform">
	<div class="row">
		<div class="col-md-6">
			<div class="form-group">
				<label>First Name: *</label> 
				<input type="text" class="form-control" name="custFirstName" id="custFirstName" />
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label>Last Name: *</label> 
				<input type="text" class="form-control" name="custLastName" id="custLastName" />
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label>Country: *</label> 
				<select name="custCountry" class="form-control" id="custCountry" onchange="loadprovince(this.value)">
					<option value="">Select a Country</option>
					<option value="ca">Canada</option>
					<option value="us">United States</option>
				</select>
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label>Province/State: *</label>
				<select class="form-control" name="custProv" id="custProv">
					<option value="">Select a Province or State</option>
				</select>
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label>Address: *</label> 
				<input type="text" class="form-control" name="custAddress" id="custAddress" />
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">	
				<label>City: *</label>
				<input type="text" class="form-control" name="custCity" id="custCity" />
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label>Postal or ZIP Code: *</label>
				<input type="text" class="form-control" name="custPostal" id="custPostal" onkeyup="this.value=this.value.toUpperCase();" />
			</div>	
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label>Business Phone: *</label> 
				<input type="text" class="form-control" name="custBusPhone" id="custBusPhone" />
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label>Home Phone: *</label> 
				<input type="text" class="form-control" name="custHomePhone" id="custHomePhone" />
			</div>	
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label>Email: *</label> 
				<input type="text" class="form-control" name="custEmail" id="custEmail" />
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
				<label>Agent</label> 
				<select name="agentId" class="form-control" id="agentId">
					<option value="">Select an Agent...</option>
				</select>
			</div>
		</div>
	</div>
		<div class="form-group">
			<button onclick="insertCustomer()" id="custBtn" class="btn btn-primary">Add Customer</button>
		</div>
    <p id="result"></p>
</form>
</div>
<script>
window.onload = function WindowLoad(event) {
	selectAgentDropdown();

	var url_string = window.location.href;
    var url = new URL(url_string);
    var customerId = url.searchParams.get("customerId");

    if (customerId != null)
    {
    	customerFormData(customerId);
    	var btn = document.getElementById("custBtn").innerHTML = "Update Customer";
    	document.getElementById("custBtn").setAttribute("onclick", "updateCustomer("+ customerId +");");
    } 
}
</script>