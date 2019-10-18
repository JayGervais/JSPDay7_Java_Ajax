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
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.FormParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.core.MediaType;
import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import model.Customer;


@Path("/customer")
public class CustomerRestService 
{
	private static final Logger logger = Logger.getLogger(CustomerRestService.class);
	
	
	// http://10.187.133.64:9090/TravelExpertsREST/rs/customer/getallcustomers
	// http://192.168.137.1:9090/TravelExpertsREST/rs/customer/getallcustomers
	@GET
	@Path("/getallcustomers")
    @Produces(MediaType.APPLICATION_JSON)
	public String getAllCustomers(@QueryParam("request") String request ,
			 @DefaultValue("1") @QueryParam("version") int version) 
	{
	
		if (logger.isDebugEnabled()) {
			logger.debug("Start getAllCustomers");
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
            logger.debug("End getAllCustomers");
        }
        // add code here to call JPA object
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("TravelExpertsREST");
        EntityManager em = factory.createEntityManager();
        
        Query query = em.createQuery("select a from Customer a order by a.custFirstName");
        List<Customer> list = (List<Customer>) query.getResultList();
        Gson gson = new Gson();
        Type type = new TypeToken<List<Customer>>() {}.getType();
        
        response = gson.toJson(list, type);
        
        //---
        em.close();
        factory.close();
        
        return response;	
	}
	

	// (localhost) http://192.168.44.1:9090/TravelExpertsREST/rs/customer/getcustomer/{customerid} - 108
	// 192.168.0.15:9090/JSPDay7/rs/customer/getcustomer/
	@GET
	@Path("/getcustomer/{customerid}")
    @Produces(MediaType.APPLICATION_JSON)
	public String getCustomer(@QueryParam("request") String request ,
			 @DefaultValue("1") @QueryParam("version") int version,
			 @PathParam("customerid") int customerId) 
	{
		if (logger.isDebugEnabled()) {
			logger.debug("Start getCustomer");
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
            logger.debug("End getCustomer");
        }
        
        // add code here to call JPA object
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("TravelExpertsREST");
        EntityManager em = factory.createEntityManager();
        
        Customer c = em.find(Customer.class, customerId);
        // below is alternate option for getting single object:
        // Query query = em.createQuery("select a from Customer a where a.customerId=" + customerId);
        // Customer list = (Customer) query.getSingleResult();
        
        Gson gson = new Gson();
        Type type = new TypeToken<Customer>() {}.getType();
        
        response = gson.toJson(c, type);
        
        //---
        em.close();
        factory.close();
        
        return response;	        
	}
	

	// (localhost) used for updating
	// http://192.168.44.1:9090/TravelExpertsREST/rs/customer/postcustomer
	@POST
	@Path("/postcustomer")
    @Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String postCustomer(@FormParam("request") String request ,  
			@DefaultValue("1") @FormParam("version") int version, 
			String jsonString) 
	{		
		if (logger.isDebugEnabled()) {
			logger.debug("Start postCustomer");
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
            logger.debug("End postCustomer");
        }
        // add code here to call JPA object
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("TravelExpertsREST");
        EntityManager em = factory.createEntityManager();

        Gson gson = new Gson();
        Type type = new TypeToken<Customer>() {}.getType();   
        Customer c = gson.fromJson(jsonString, type);
    
        em.getTransaction().begin();
        Customer result = em.merge(c);
        em.getTransaction().commit();
        
        if (result != null)
        {
        	response = "Update successful";
        }
        else
        {
        	response = "Update failed";
        }
        
        // close 
        em.close();
        factory.close();
        
        //---
        return response;	
	}

	
	// (localhost) 
	// http://192.168.44.1:9090/TravelExpertsREST/rs/customer/putcustomer
	@PUT
	@Path("/putcustomer")
    @Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String putCustomer(String jsonString) 
	{
        // add code here to call JPA object
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("TravelExpertsREST");
        EntityManager em = factory.createEntityManager();

        Gson gson = new Gson();
        Type type = new TypeToken<Customer>() {}.getType();   
        Customer c = gson.fromJson(jsonString, type);

        String response;
        
        em.getTransaction().begin();
        Customer result = em.merge(c);
        em.getTransaction().commit();
        
        if (result != null)
        {
        	response = "Update successful";
        }
        else
        {
        	response = "Update failed";
        }
        
        // close 
        em.close();
        factory.close();
        
        //---
        return response;	
	}

	// (localhost) http://192.168.44.1:9090/TravelExpertsREST/rs/customer/deletecustomer/{customerid}
	@DELETE
	@Path("/deletecustomer/{customerid}")
	public String deleteCustomer(@PathParam("customerid") int customerId,
			@FormParam("request") String request ,  
			@DefaultValue("1") @FormParam("version") int version) {
		
		if (logger.isDebugEnabled()) {
			logger.debug("Start deleteCustomer");
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
            logger.debug("End deleteCustomer");
        }
        
        // add code here to call JPA object
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("TravelExpertsREST");
        EntityManager em = factory.createEntityManager();

        Customer findCustomer = em.find(Customer.class, customerId);
        em.getTransaction().begin();
        em.remove(findCustomer);
        
        em.getTransaction().commit();
        
        // close
        em.close();
        factory.close();
        
        return "Customer successfully deleted";
	}
}
