package com.example.todoApp.service;

import com.example.todoApp.Utils.ApiException;
import com.example.todoApp.dto.TaskDTO;
import com.example.todoApp.model.TaskModel;
import com.example.todoApp.model.UserModel;
import com.example.todoApp.repository.TaskRepository;
import com.example.todoApp.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TaskService implements ITaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    // -----------------------------
    // CREATE
    // -----------------------------
    @Override
    public void save(Long userId, TaskDTO taskDTO) {
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException("USER NOT FOUND", HttpStatus.NOT_FOUND));

        TaskModel task = TaskModel.builder()
                .task(taskDTO.getTask())
                .status(taskDTO.getStatus())  // ahora es un enum Status
                .user(user)
                .build();

        taskRepository.save(task);
    }

    // -----------------------------
    // READ (single)
    // -----------------------------
    @Override
    public TaskDTO getTask(Long userId, Long taskId) {
        TaskModel task = findTaskOwnedBy(userId, taskId);
        return TaskDTO.builder()
                .id(task.getId())
                .task(task.getTask())
                .status(task.getStatus())
                .build();
    }

    // -----------------------------
    // READ (all)
    // -----------------------------
    @Override
    public List<TaskDTO> allTask(Long userId) {
        return taskRepository.findByUserId(userId).stream()
                .map(taskModel -> TaskDTO.builder()
                        .id(taskModel.getId())
                        .task(taskModel.getTask())
                        .status(taskModel.getStatus())
                        .build())
                .toList();
    }

    // -----------------------------
    // DELETE
    // -----------------------------
    @Override
    public void delete(Long userId, Long taskId) {
        TaskModel task = findTaskOwnedBy(userId, taskId);
        taskRepository.delete(task);
    }

    // -----------------------------
    // PATCH (update partial)
    // -----------------------------
    @Override
    @Transactional
    public void patch(Long userId, TaskDTO taskDTO) {
        TaskModel task = findTaskOwnedBy(userId, taskDTO.getId());

        if (taskDTO.getTask() != null)
            task.setTask(taskDTO.getTask());
        if (taskDTO.getStatus() != null)
            task.setStatus(taskDTO.getStatus());
    }

    // -----------------------------
    // PRIVATE HELPER
    // -----------------------------
    private TaskModel findTaskOwnedBy(Long userId, Long taskId) {
        TaskModel task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ApiException("TASK NOT FOUND", HttpStatus.NOT_FOUND));

        if (!task.getUser().getId().equals(userId))
            throw new ApiException("TASK NOT FOUND", HttpStatus.NOT_FOUND);

        return task;
    }
}
