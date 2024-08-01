package com.example.p03.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.example.p03.model.Client;
import com.example.p03.dto.ClientDTO;
import com.example.p03.dto.CreateClientDTO;
import java.util.List;
import java.util.*;

@Mapper(
  componentModel = "spring", 
  injectionStrategy = InjectionStrategy.CONSTRUCTOR, 
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ClientMapper {

    ClientDTO toDTO (Client model);

    List<ClientDTO> toDTO(List<Client> model);

    @Mapping(target = "idClient", ignore = true)
    Client toModel(CreateClientDTO data);
    
}