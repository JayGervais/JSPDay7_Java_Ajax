<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Travel Experts</title>
<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="css/scrolling-nav.css">

  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">

  <title>Travel Experts</title>

  <!-- Bootstrap core CSS -->
  <link href="css/bootstrap.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="css/scrolling-nav.css" rel="stylesheet">
  <link href="css/travelexperts.css" rel="stylesheet">

</head>

<body id="page-top">
<script>
	window.onload = function WindowLoad(event) {
		getAgents();
	    loadBookings();
	}
</script>

  <!-- Navigation -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <div class="container">
      <a class="navbar-brand js-scroll-trigger" href="http://localhost:9090/TravelExpertsREST/#page-top">Travel Experts</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="http://localhost:9090/TravelExpertsREST/#agent">Agent Directory</a>
          </li>
           <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="http://localhost:9090/TravelExpertsREST/#bookings">Bookings</a>
          </li>
          <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="http://localhost:9090/TravelExpertsREST/#customer">Customers</a>
          </li>
          <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="http://localhost:9090/TravelExpertsREST/#next">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>