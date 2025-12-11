package com.boilerplate.common.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ActiveInactiveRequest {
    @NotBlank
    private List<String> uuids;
}
