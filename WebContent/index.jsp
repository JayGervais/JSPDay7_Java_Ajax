<!-- jsp header -->
<jsp:include page="header.jsp" />

<script>
	window.onload = function WindowLoad(event) {
		getAgents();
		loadBookings();	
	}
</script>

<header class="bg-primary text-white bg-img">
    <div class="container text-center">
      <h1 class="t-shadow"></h1>
      <p class="lead"></p>
    </div>
 </header>

  <section id="agent">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2>Agent Directory</h2>
          <p class="lead">See who's planning the next adventures</p>
          	<div class="row" id="row"></div>
        </div>
      </div>
    </div>
  </section>
  
  <section id="bookings" class="bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
        
	        	<h2>Bookings</h2>
	        	<p class="lead">An account overview</p>
				<div class="card bg-light">
					<div class="card-header">
						<h5 class="card-title">Booking Totals</h5>
					</div>
				 	<div class="card-body">
				    	<p class="card-text" id="bookingdetails"></p>
				  	</div>
				</div>
				<ul class="list-group" id="bookinglist"></ul>
	          	<button class="btn btn-primary" id="loadMore">View Recent Bookings</button>
	          	<button onclick="window.location='page.jsp?bookings=1'" class="btn btn-secondary" id="viewallbookings">View All Bookings</button> 	
        </div>
      </div>
    </div>
  </section>
  
  <section id="customer">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2>Customers</h2>
          <p class="lead"></p>
          
          <!--<jsp:include page="customerform.jsp" />-->
		   <button onclick="window.location='addcustomer.jsp'" class="btn btn-primary">Add New Customer</button>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2>About</h2>
          <p class="lead">Travel Experts Software Service created by Jay, Tea, Cailan, and Harpreet for SAIT's OOSD program.</p>
        </div>
      </div>
    </div>
  </section>
  
<!-- jsp footer -->
<jsp:include page="footer.jsp" />