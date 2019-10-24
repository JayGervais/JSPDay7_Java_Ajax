package auth;

import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.sql.*;

@WebServlet("/Login")
public class LoginServlet extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet
{
 
    /**
	 * 
	 */
	private static final long serialVersionUID = 3722825956363628282L;
	
	public LoginServlet() {
		super();
	} 

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException 
	{
        response.setContentType("text/html;charset=UTF-8");
        
        String email = request.getParameter("email");
        String pass = request.getParameter("pass");
        
        if( Validate.checkUser(email, pass))
        {	
        	HttpSession session = request.getSession();
        	session.setAttribute("admin", email);
        	session.setMaxInactiveInterval(30*60);
        	response.sendRedirect("index.jsp");
        }
        else
        {
        	RequestDispatcher rd = getServletContext().getRequestDispatcher("/login.html");
			PrintWriter out = response.getWriter();
			out.println("<p class='error' id='error'>Email or password is does not match</div>");
			rd.include(request, response);
        }
    }  
}