<!-- jsp header -->
<jsp:include page="header.jsp" />
<%
//allow access only if session exists
if(session.getAttribute("admin") == null)
{
	response.sendRedirect("login.html");
}
%>
<script>
	window.onload = function WindowLoad(event) {
		getAgents();
		loadBookings();	
		customerCard();
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
          <p class="lead">Those taking adventures</p>
          	<div class="card bg-light">
				<div class="card-header">
					<h5 class="card-title">Customer Summary</h5>
				</div>
			 	<div class="card-body">
			    	<p class="card-text" id="customerdetails"></p>
			  	</div>
			</div>
		   <button onclick="window.location='page.jsp?customers=1'" class="btn btn-primary" id="viewallcustomers">View All Customers</button>
		   <button onclick="window.location='addcustomer.jsp'" class="btn btn-secondary">Add New Customer</button>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2>SAIT Object Oriented Software Development (OOSD) Threaded Final Project, Spring 2019</h2>
          <h3>By Jay Gervais, Cailan Lay, Tea Tammiste, and Harpreet Kalsi</h3>
          <p class="lead">Android App Development</p>
          <p>Jay and Tea worked together to create the Travel Experts Android app. The development included a custom-built API service to retrieve and send data from the Travel Experts database.</p>
          <p class="lead">Desktop Application</p>
          <p>Cailan drove the development of the Travel Experts desktop application with the support of Harpreet. Using JavaFX, they put together an elegant way to help Travel Experts employees keep track of their data.</p>
          <p class="lead">Web Application RESTservice</p>
          <p>Jay created the RESTful API and web application to provide an interface accessible from any web browser. The REST service provides access to the database from any application, app, or web browser.</p>
          
        </div>
      </div>
    </div>
  </section>
  
<!-- jsp footer -->
<jsp:include page="footer.jsp" />