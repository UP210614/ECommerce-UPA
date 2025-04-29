package com.example.p03.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.example.p03.model.ShippingAddress;
import com.example.p03.dto.CreateShippingAddressDTO;
import com.example.p03.dto.ShippingAddressDTO;
import java.util.List;


@Mapper(
  componentModel = "spring", 
  injectionStrategy = InjectionStrategy.CONSTRUCTOR, 
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)

public interface ShippingAddressMapper {

    ShippingAddressDTO toDTO (ShippingAddress model);

    List<ShippingAddressDTO> toDTO(List<ShippingAddress> model);

    @Mapping(target = "idAddress", ignore = true)
    ShippingAddress toModel(CreateShippingAddressDTO data);
    
}
