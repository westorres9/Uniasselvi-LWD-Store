package com.uniasselvi.lwdstore.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.uniasselvi.lwdstore.dto.NewsletterDTO;
import com.uniasselvi.lwdstore.services.NewsletterService;

@RestController
@RequestMapping(value = "/newsletter")
public class NewsletterController {
	
	@Autowired
	private NewsletterService newsletterService;
	
	@PostMapping
	public ResponseEntity<NewsletterDTO> insert(@RequestBody NewsletterDTO dto) {
		dto = newsletterService.insert(dto);
		URI uri = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(dto.getId())
				.toUri();
		return ResponseEntity.created(uri).body(dto);
	}
}
