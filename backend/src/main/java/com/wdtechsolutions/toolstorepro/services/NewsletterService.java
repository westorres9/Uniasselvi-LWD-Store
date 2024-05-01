package com.wdtechsolutions.toolstorepro.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wdtechsolutions.toolstorepro.dto.NewsletterDTO;
import com.wdtechsolutions.toolstorepro.entities.Newsletter;
import com.wdtechsolutions.toolstorepro.repositories.NewsletterRepository;
import com.wdtechsolutions.toolstorepro.services.exceptions.DatabaseException;

@Service
public class NewsletterService {

	@Autowired
	private NewsletterRepository newsletterRepository;

	@Transactional
	public NewsletterDTO insert(NewsletterDTO dto) {
		try {
			Newsletter newsletter = new Newsletter();
			newsletter.setEmail(dto.getEmail());
			newsletter = newsletterRepository.save(newsletter);
			return new NewsletterDTO(newsletter);
		} 
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
}
