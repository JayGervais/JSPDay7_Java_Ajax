<jsp:include page="header.jsp" />

<header class="bg-primary text-white bg-img-sm">
    <div class="container text-center">
      <h1 class="t-shadow"></h1>
      <p class="lead"></p>
    </div>
 </header>

<div class="container pt-5 mb-5">
<button type="button" class="btn btn-light shaded" onclick="goBack()">Go Back</button>
<script>
function goBack() {
  window.history.back();
}
</script>
<h1 id="pagetitle">New Customer</h1>

	<div class="card bg-light">
		<div class="card-header">
			<h5 class="card-title" id="title">Add New Customer</h5>
		</div> 
	  	<div class="card-body" id="card-body">
	    	
			<jsp:include page="customerform.jsp" />

	  	</div>
	</div>
</div>

<jsp:include page="footer.jsp" />