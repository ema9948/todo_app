package com.example.todoApp.dto;

import com.example.todoApp.model.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskDTO {

    @NotNull(message = "The id cannot be null")
    private Long id;

    @NotNull(message = "The status cannot be null")
    private Status status;

    @NotBlank(message = "The task cannot be blank")
    private String task;
}
