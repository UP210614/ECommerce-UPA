package com.example.p03.controller;

import com.example.p03.config.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import com.example.p03.dto.ClientDTO;
import com.example.p03.dto.LogInDTO;
import com.example.p03.exception.ExcepcionRecursoNoEncontrado;
import com.example.p03.service.ClientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtUtil jwtUtil;
    private final ClientService clientService;

    public AuthController(JwtUtil jwtUtil, @Autowired ClientService clientService) {
        this.jwtUtil = jwtUtil;
        this.clientService = clientService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LogInDTO data) {

        try{
            ClientDTO client = clientService.authenticateClient(data.getEmail(), data.getPassword());
            String token = jwtUtil.generateToken(client.getEmail());
            return ResponseEntity.ok(Map.of("token", token));
        }catch(ExcepcionRecursoNoEncontrado e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
        
    }
}
