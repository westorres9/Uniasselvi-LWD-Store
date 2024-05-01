package com.uniasselvi.lwdstore.services;

import com.uniasselvi.lwdstore.repositories.NewsletterRepository;
import com.uniasselvi.lwdstore.services.exceptions.DatabaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uniasselvi.lwdstore.dto.NewsletterDTO;
import com.uniasselvi.lwdstore.entities.Newsletter;

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
