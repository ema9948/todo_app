package com.example.todoApp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskDTO {
    @NotBlank(message = "El id no puede estar vacío")
    Long id;
    @NotBlank(message = "El status no puede estar vacío")
    Boolean status;
    @NotBlank(message = "El task no puede estar vacío")
    String task;
}
