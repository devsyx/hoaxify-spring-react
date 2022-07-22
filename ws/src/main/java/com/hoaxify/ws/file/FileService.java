package com.hoaxify.ws.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.apache.tika.Tika;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hoaxify.ws.configuration.AppConfiguration;
import com.hoaxify.ws.user.User;

@Service
@EnableScheduling
public class FileService {

	AppConfiguration appConfiguration;

	Tika tika;

	FileAttachmentRepository fileAttachmentRepository;

	public FileService(AppConfiguration appConfiguration, FileAttachmentRepository fileAttachmentRepository) {
		super();
		this.appConfiguration = appConfiguration;
		this.tika = new Tika();
		this.fileAttachmentRepository = fileAttachmentRepository;
	}

	public String writeBase64EncodedStringToFile(String image) throws IOException {
		String fileName = generadeRandomName();
		File target = new File(appConfiguration.getProfileStoragePath() + "/" + fileName);
		OutputStream outputStream = new FileOutputStream(target);
		byte[] base64encoded = Base64.getDecoder().decode(image);
		outputStream.write(base64encoded);
		outputStream.close();
		return fileName;
	}

	public String generadeRandomName() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	public void deleteProfileImage(String oldImageName) {
		if (oldImageName == null)
			return;
		deleteFile(Paths.get(appConfiguration.getProfileStoragePath(), oldImageName));
	}

	public void deleteAttachmentFile(String oldFileName) {
		if (oldFileName == null)
			return;
		deleteFile(Paths.get(appConfiguration.getAttachmentStoragePath(), oldFileName));
	}

	public void deleteFile(Path path) {
		try {
			Files.deleteIfExists(path);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String detectType(String value) {
		byte[] base64encoded = Base64.getDecoder().decode(value);
		return tika.detect(base64encoded);
	}

	public String detectType(byte[] arr) {
		return tika.detect(arr);
	}

	public FileAttachment saveHoaxAttachment(MultipartFile file) {
		String fileName = generadeRandomName();
		File target = new File(appConfiguration.getAttachmentStoragePath() + "/" + fileName);
		String fileType = null;
		try {
			byte[] arr = file.getBytes();
			OutputStream outputStream = new FileOutputStream(target);
			outputStream.write(arr);
			outputStream.close();
			fileType = detectType(arr);
		} catch (IOException e) {
			e.printStackTrace();
		}
		FileAttachment fileAttachment = new FileAttachment();
		fileAttachment.setName(fileName);
		fileAttachment.setDate(new Date());
		fileAttachment.setFileType(fileType);

		return fileAttachmentRepository.save(fileAttachment);
	}

	@Scheduled(fixedRate = 1 * 60 * 60 * 1000)
	public void cleanupStorage() {
		Date date = new Date(System.currentTimeMillis() - (1 * 60 * 60 * 1000));
		List<FileAttachment> filesToBeDeleted = fileAttachmentRepository.findByDateBeforeAndHoaxIsNull(date);
		for (FileAttachment file : filesToBeDeleted) {
			deleteAttachmentFile(file.getName());
			fileAttachmentRepository.deleteById(file.getId());
		}
	}

	public void deleteAllStoredFilesForUser(User inDB) {
		deleteProfileImage(inDB.getImage());
		List<FileAttachment> filesToBeRemoved = fileAttachmentRepository.findByHoaxUser(inDB);
		for (FileAttachment file : filesToBeRemoved) {
			deleteAttachmentFile(file.getName());
		}
	}
}
