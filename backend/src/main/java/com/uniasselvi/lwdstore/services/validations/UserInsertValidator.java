package com.uniasselvi.lwdstore.services.validations;


import java.util.ArrayList;
import java.util.List;


import com.uniasselvi.lwdstore.controller.exceptions.FieldMessage;
import com.uniasselvi.lwdstore.dto.UserInsertDTO;
import com.uniasselvi.lwdstore.entities.User;
import com.uniasselvi.lwdstore.repositories.UserRepository;
import jakarta.validation.ConstraintValidator;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.validation.ConstraintValidatorContext;

public class UserInsertValidator implements ConstraintValidator<UserInsertValid, UserInsertDTO> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void initialize(UserInsertValid ann) {
    }

    @Override
    public boolean isValid(UserInsertDTO dto, ConstraintValidatorContext context) {

        List<FieldMessage> list = new ArrayList<>();

        User user = userRepository.findByEmail(dto.getEmail());
        if(user != null) {
            list.add(new FieldMessage("email", "Email já existe"));
        }

        for (FieldMessage e : list) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
                    .addConstraintViolation();
        }
        return list.isEmpty();
    }
}
