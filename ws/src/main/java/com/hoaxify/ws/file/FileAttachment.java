package com.hoaxify.ws.file;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.hoaxify.ws.hoax.Hoax;

import lombok.Data;

@Entity
@Table(name = "File_Attachment")
@Data
public class FileAttachment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "fileType")
	private String fileType;

	@Column(name = "date")
	private Date date;

	@OneToOne
	private Hoax hoax;

}
