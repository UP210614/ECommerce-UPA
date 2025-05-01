package com.example.p03.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.validation.BindingResult;
// import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;

import com.example.p03.model.Client;
import com.example.p03.service.ClientService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.util.*;
import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.p03.dto.ClientDTO;
import com.example.p03.dto.CreateClientDTO;
import com.example.p03.dto.GetClientDTO;
import com.example.p03.dto.LogInDTO;
import com.example.p03.exception.ExcepcionRecursoNoEncontrado;


@Tag(name = "Endpoints de clientes", description = "Lectura y altas de clientes")
@RestController
@RequestMapping({"/clients"})
public class ClientController {
    private final ClientService ClientService;

    public ClientController(@Autowired ClientService ClientService) {
        this.ClientService = ClientService;
    }
    @Operation(summary =  "Obtener todos los clientes")
    @GetMapping({ "/all" })
    public ResponseEntity<List<Client>> getClients() {
        return ResponseEntity.ok(ClientService.getClients());
    }

    @Operation(summary =  "Obtener todos los clientes")
    @GetMapping({ "/allDTO" })
    public ResponseEntity<List<GetClientDTO>> getClientsDTO() {
        return ResponseEntity.ok(ClientService.getClientsDTO());
    }

    @Operation(summary = "guardar cliente")
    @PostMapping("/saveClient")
    @ResponseStatus(HttpStatus.CREATED)
    public ClientDTO saveClient(@Valid @RequestBody CreateClientDTO data) {
        return ClientService.saveClientDTO(data);
    }

    @Operation(summary = "inicio de sesión")
    @PostMapping("/login")
    public ResponseEntity<Object> login(@Valid @RequestBody LogInDTO data) {
        try {
            ClientDTO clientDTO = ClientService.authenticateClient(data.getEmail(), data.getPassword());
            return ResponseEntity.ok(clientDTO);
        } catch (ExcepcionRecursoNoEncontrado e) {
            if (e.getMessage().contains("El cliente no fue encontrado")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            } else if (e.getMessage().contains("Contraseña incorrecta")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error desconocido");
            }
        }
    }
}