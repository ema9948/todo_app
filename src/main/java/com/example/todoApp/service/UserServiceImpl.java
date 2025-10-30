package com.example.todoApp.service;


import com.example.todoApp.Utils.ApiException;
import com.example.todoApp.Utils.PasswordUtils;
import com.example.todoApp.dto.LoginRequest;
import com.example.todoApp.dto.RegisterRequest;
import com.example.todoApp.model.UserModel;
import com.example.todoApp.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserServiceImpl implements IUserService {


    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public Object register(RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent())
            throw new ApiException("EMAIL IN USED", HttpStatus.CONFLICT);

        userRepository.save(UserModel.builder()
                .email(registerRequest.getEmail())
                .password(PasswordUtils.hashPassword(registerRequest.getPassword()))
                .build());
        return Map.of("Account: ", "created");
    }

    public Object authentication(LoginRequest loginRequest) {
        UserModel user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new ApiException("INCORRECT CREDENTIALS", HttpStatus.NOT_FOUND));
        if (!PasswordUtils.verifyPassword(loginRequest.getPassword(), user.getPassword()))
            throw new ApiException("INCORRECT CREDENTIALS", HttpStatus.NOT_ACCEPTABLE);

        return Map.of("userID", user.getId());
    }
}
