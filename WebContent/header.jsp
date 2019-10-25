<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta name="google" content="notranslate">
<title>Travel Experts</title>
<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="css/scrolling-nav.css">
<link rel="stylesheet" type="text/css" href="css/travelexperts.css" rel="stylesheet">  
<script src="https://kit.fontawesome.com/900aac187b.js" crossorigin="anonymous"></script>
<script src="js/jquery.js"></script>

  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">

</head>

<body id="page-top">

  <!-- Navigation -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <div class="container">
      <a class="navbar-brand js-scroll-trigger" href="/TravelExpertsREST/#page-top">Travel Experts</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="/TravelExpertsREST/#agent">Agent Directory</a>
          </li>
           <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="/TravelExpertsREST/#bookings">Bookings</a>
          </li>
          <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="/TravelExpertsREST/#customer">Customers</a>
          </li>
          <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="/TravelExpertsREST/#contact">About</a>
          </li>
          <li class="nav-item logout">
            <form action="LogoutServlet" method="post">
				<input type="submit" value="Logout" class="btn btn-dark">
			</form>
          </li>
        </ul>
      </div>
    </div>
  </nav>