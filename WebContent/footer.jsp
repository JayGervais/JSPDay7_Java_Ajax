<!-- Footer -->
  <footer class="py-5 bg-dark">
    <div class="container">
      <p class="m-0 text-center text-white">Copyright &copy; Travel Experts 2019</p>
    </div>
    <!-- /.container -->
  </footer>
  <script>
  $(document).ready(function () {      
    x=3;
    $('#bookinglist li').slice(0, 5).show(); 
  	  $('#loadMore').on('click', function (e) {
          e.preventDefault();
          x = x+5;
          $('#bookinglist li').slice(0, x).slideDown();
          $('#loadMore').html('Load More');
          $('#loadMore').css('margin-top', '15px');
      });
  });
  </script>

  <!-- Bootstrap core JavaScript -->
  <!-- <script src="js/jquery.js"></script> -->
  <script src="js/bootstrap.js"></script>

  <!-- Website JavaScript -->
  <script src="js/jquery.easing.js"></script>
  <script src="js/scrolling-nav.js"></script>
  <script src="js/travelexperts.js"></script>
  <script src="js/ajax-travelexperts.js"></script>
  
</body>
</html>