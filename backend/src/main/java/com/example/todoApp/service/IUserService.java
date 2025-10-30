package com.example.todoApp.service;

import com.example.todoApp.dto.LoginRequest;
import com.example.todoApp.dto.RegisterRequest;

public interface IUserService {
    public Object register(RegisterRequest registerRequest);

    public Object authentication(LoginRequest loginRequest);
}
