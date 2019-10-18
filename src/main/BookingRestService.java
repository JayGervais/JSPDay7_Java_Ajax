package main;


import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import java.lang.reflect.Type;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.FormParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.core.MediaType;
import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import model.Booking;
import model.Bookingdetail;


@Path("/booking")
public class BookingRestService {

	private static final Logger logger = Logger.getLogger(BookingRestService.class);

	@GET
	@Path("/getallbookings")
    @Produces(MediaType.APPLICATION_JSON)
	public String getAllBookings(@QueryParam("request") String request ,
			 @DefaultValue("1") @QueryParam("version") int version) {

		if (logger.isDebugEnabled()) {
			logger.debug("Start getAllBookings");
			logger.debug("data: '" + request + "'");
			logger.debug("version: '" + version + "'");
		}

		String response = null;

        try{			
            switch(version){
	            case 1:
	                if(logger.isDebugEnabled()) logger.debug("in version 1");

	                response = "Response from RESTEasy Restful Webservice : " + request;
                    break;
                default: throw new Exception("Unsupported version: " + version);
            }
        }
        catch(Exception e){
        	response = e.getMessage().toString();
        }
        
        if(logger.isDebugEnabled()){
            logger.debug("result: '"+response+"'");
            logger.debug("End getAllBookings");
        }
        // add code here to call JPA object
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("TravelExpertsREST");
        EntityManager em = factory.createEntityManager();
        
        Query query = em.createQuery("select b from Booking b order by b.bookingDate desc");
        
        List<Booking> list = (List<Booking>) query.getResultList();
        Gson gson = new Gson();
        Type type = new TypeToken<List<Booking>>() {}.getType();
        response = gson.toJson(list, type);
        
        //---
        em.close();
        factory.close();
        return response;	
	}
	
	
	@GET
	@Path("/getbookingdetails")
    @Produces(MediaType.APPLICATION_JSON)
	public String getBookingDetails(@QueryParam("request") String request ,
			 @DefaultValue("1") @QueryParam("version") int version) {

		if (logger.isDebugEnabled()) {
			logger.debug("Start getBookingDetails");
			logger.debug("data: '" + request + "'");
			logger.debug("version: '" + version + "'");
		}

		String response = null;

        try{			
            switch(version){
	            case 1:
	                if(logger.isDebugEnabled()) logger.debug("in version 1");

	                response = "Response from RESTEasy Restful Webservice : " + request;
                    break;
                default: throw new Exception("Unsupported version: " + version);
            }
        }
        catch(Exception e){
        	response = e.getMessage().toString();
        }
        
        if(logger.isDebugEnabled()){
            logger.debug("result: '"+response+"'");
            logger.debug("End getBookingDetails");
        }
        // add code here to call JPA object
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("TravelExpertsREST");
        EntityManager em = factory.createEntityManager();
        
        Query query = em.createQuery("select b from Bookingdetail b");
        
        List<Bookingdetail> list = (List<Bookingdetail>) query.getResultList();
        Gson gson = new Gson();
        Type type = new TypeToken<List<Bookingdetail>>() {}.getType();
        response = gson.toJson(list, type);
        
        //---
        em.close();
        factory.close();
        return response;	
	}
	
	@GET
	@Path("/getbooking/{bookingid}")
    @Produces(MediaType.APPLICATION_JSON)
	public String getBooking(@QueryParam("request") String request ,
			 @DefaultValue("1") @QueryParam("version") int version,
			 @PathParam("bookingid") int bookingId) 
	{

		if (logger.isDebugEnabled()) {
			logger.debug("Start getBooking");
			logger.debug("data: '" + request + "'");
			logger.debug("version: '" + version + "'");
		}

		String response = null;

        try{			
            switch(version){
	            case 1:
	                if(logger.isDebugEnabled()) logger.debug("in version 1");

	                response = "Response from RESTEasy Restful Webservice : " + request;
                    break;
                default: throw new Exception("Unsupported version: " + version);
            }
        }
        catch(Exception e){
        	response = e.getMessage().toString();
        }
        
        if(logger.isDebugEnabled()){
            logger.debug("result: '"+response+"'");
            logger.debug("End getBooking");
        }
        // add code here to call JPA object
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("TravelExpertsREST");
        EntityManager em = factory.createEntityManager();
        
        Query query = em.createQuery("select b from Bookingdetail b where b.bookingDetailId=" + bookingId);
        
        List<Bookingdetail> list = (List<Bookingdetail>) query.getResultList();
        Gson gson = new Gson();
        Type type = new TypeToken<List<Bookingdetail>>() {}.getType();
        response = gson.toJson(list, type);
        
        //---
        em.close();
        factory.close();
        return response;	
	}
	
	
	
	
	
	
	
	
	@POST
	@Path("/<add method name here>")
    @Produces(MediaType.TEXT_PLAIN)
	public String postSomething(@FormParam("request") String request ,  @DefaultValue("1") @FormParam("version") int version) {

		if (logger.isDebugEnabled()) {
			logger.debug("Start postSomething");
			logger.debug("data: '" + request + "'");
			logger.debug("version: '" + version + "'");
		}

		String response = null;

        try{			
            switch(version){
	            case 1:
	                if(logger.isDebugEnabled()) logger.debug("in version 1");

	                response = "Response from RESTEasy Restful Webservice : " + request;
                    break;
                default: throw new Exception("Unsupported version: " + version);
            }
        }
        catch(Exception e){
        	response = e.getMessage().toString();
        }
        
        if(logger.isDebugEnabled()){
            logger.debug("result: '"+response+"'");
            logger.debug("End postSomething");
        }
        return response;	
	}

	@PUT
	@Path("/<add method name here>")
    @Produces(MediaType.TEXT_PLAIN)
	public String putSomething(@FormParam("request") String request ,  @DefaultValue("1") @FormParam("version") int version) {
		if (logger.isDebugEnabled()) {
			logger.debug("Start putSomething");
			logger.debug("data: '" + request + "'");
			logger.debug("version: '" + version + "'");
		}

		String response = null;

        try{			
            switch(version){
	            case 1:
	                if(logger.isDebugEnabled()) logger.debug("in version 1");

	                response = "Response from RESTEasy Restful Webservice : " + request;
                    break;
                default: throw new Exception("Unsupported version: " + version);
            }
        }
        catch(Exception e){
        	response = e.getMessage().toString();
        }
        
        if(logger.isDebugEnabled()){
            logger.debug("result: '"+response+"'");
            logger.debug("End putSomething");
        }
        return response;	
	}

	@DELETE
	@Path("/<add method name here>")
	public void deleteSomething(@FormParam("request") String request ,  @DefaultValue("1") @FormParam("version") int version) {
		
		if (logger.isDebugEnabled()) {
			logger.debug("Start deleteSomething");
			logger.debug("data: '" + request + "'");
			logger.debug("version: '" + version + "'");
		}


        try{			
            switch(version){
	            case 1:
	                if(logger.isDebugEnabled()) logger.debug("in version 1");

                    break;
                default: throw new Exception("Unsupported version: " + version);
            }
        }
        catch(Exception e){
        	e.printStackTrace();
        }
        
        if(logger.isDebugEnabled()){
            logger.debug("End deleteSomething");
        }
	}
}
