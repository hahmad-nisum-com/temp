package com.boilerplate.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto implements Serializable {

    private Long productId;
    private Integer quantity;
    private Double priceAtTimeOfAddition;
}
