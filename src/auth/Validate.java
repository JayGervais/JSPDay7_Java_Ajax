package auth;

import java.sql.*;

import org.mindrot.jbcrypt.BCrypt;


public class Validate
{
    public static boolean checkUser(String email,String pass) 
    {
        boolean st = false;
        try {

            //loading driver
            //Class.forName("com.mariadb.jdbc.Driver");

            //creating connection with the database
            Connection con = DriverManager.getConnection("jdbc:mariadb://localhost:3306/travelexperts","root","");
            PreparedStatement ps = con.prepareStatement("select * from admins where AdminEmail=?");
            ps.setString(1, email);
            // ps.setString(2, pass);
            ResultSet rs = ps.executeQuery();
            st = rs.next();
            while(st)
            {
            	String dbpass = rs.getString(5);
            	String dbpassPHP = dbpass;
            	if (!BCrypt.checkpw(pass, dbpassPHP))
            	{
            		return false;
            	}
            }
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        return st;                 
    }   
	
	
//	public static boolean checkUser(String email,String pass) 
//    {
//        boolean st = false;
//        try {
//
//            //loading driver
//            //Class.forName("com.mariadb.jdbc.Driver");
//
//            //creating connection with the database
//            Connection con = DriverManager.getConnection("jdbc:mariadb://localhost:3306/travelexperts","root","");
//            PreparedStatement ps = con.prepareStatement("insert into admins (AdminFirstName, AdminLastName, AdminEmail, AdminPosition, AdminPassword) values (?,?,?,?,?)");
//            String password = BCrypt.hashpw("password", BCrypt.gensalt());
//            
//            ps.setString(1, "Admin");
//            ps.setString(2, "Access");
//            ps.setString(3, "superuser@travel.ca");
//            ps.setString(4, "Super User");
//            ps.setString(5, password);
//            
//           
//            ResultSet rs = ps.executeQuery();
//        }
//        catch(Exception e) {
//            e.printStackTrace();
//        }
//        return st;                 
//    }
	
}
