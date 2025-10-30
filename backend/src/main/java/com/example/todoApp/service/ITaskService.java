package com.example.todoApp.service;

import com.example.todoApp.dto.TaskDTO;

import java.util.List;

public interface ITaskService {

    // CREATE
    void save(Long userId, TaskDTO taskDTO);

    // READ
    TaskDTO getTask(Long userId, Long taskId);

    List<TaskDTO> allTask(Long userId);

    // DELETE
    void delete(Long userId, Long taskId);

    // UPDATE (PATCH)
    void patch(Long userId, TaskDTO taskDTO);
}
