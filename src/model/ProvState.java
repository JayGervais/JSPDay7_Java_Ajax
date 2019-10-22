package model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the prov_states database table.
 * 
 */
@Entity
@Table(name="prov_states")
@NamedQuery(name="ProvState.findAll", query="SELECT p FROM ProvState p")
public class ProvState implements Serializable {
	private static final long serialVersionUID = 1L;
	private int provStateId;
	private String country;
	private String provStateCode;
	private String provStateName;

	public ProvState() {
	}


	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int getProvStateId() {
		return this.provStateId;
	}

	public void setProvStateId(int provStateId) {
		this.provStateId = provStateId;
	}


	public String getCountry() {
		return this.country;
	}

	public void setCountry(String country) {
		this.country = country;
	}


	public String getProvStateCode() {
		return this.provStateCode;
	}

	public void setProvStateCode(String provStateCode) {
		this.provStateCode = provStateCode;
	}


	public String getProvStateName() {
		return this.provStateName;
	}

	public void setProvStateName(String provStateName) {
		this.provStateName = provStateName;
	}

}