package com.example.todoApp.controller;

import com.example.todoApp.dto.LoginRequest;
import com.example.todoApp.dto.RegisterRequest;
import com.example.todoApp.service.IUserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(value = "/auth/")
public class AuthController {

    private final IUserService IUserService;

    public AuthController(IUserService IUserService) {
        this.IUserService = IUserService;
    }

    @PostMapping("authentication")
    public ResponseEntity<Object> authentication(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(IUserService.authentication(loginRequest));
    }

    @PostMapping("register")
    public ResponseEntity<Object> register(@Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(IUserService.register(registerRequest));
    }


}
