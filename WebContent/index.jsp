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
				  <div class="card-body">
				    <h5 class="card-title">Booking Overview</h5>
				    <p class="card-text" id="bookingdetails"></p>
				  </div>
				</div>
				<ul class="list-group" id="bookinglist"></ul>
	          	<button class="btn btn-primary" id="loadMore">View Bookings</button> 	

        </div>
      </div>
    </div>
  </section>
  
  <section id="customer">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2>Add a new Customer to the account</h2>
          <p class="lead"></p>
          
          <jsp:include page="customerform.jsp" />
		   
        </div>
      </div>
    </div>
  </section>

  <section id="next" class="bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2>Contact us</h2>
          <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero odio fugiat voluptatem dolor, provident officiis, id iusto! Obcaecati incidunt, qui nihil beatae magnam et repudiandae ipsa exercitationem, in, quo totam.</p>
        </div>
      </div>
    </div>
  </section>
  
<!-- jsp footer -->
<jsp:include page="footer.jsp" />