package com.example.todoApp.controller;

import com.example.todoApp.dto.TaskDTO;
import com.example.todoApp.service.ITaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks") // plural por convención REST
@CrossOrigin(origins = "*") // opcional: habilita CORS si usas frontend separado
public class TaskController {

    private final ITaskService taskService;

    public TaskController(ITaskService taskService) {
        this.taskService = taskService;
    }

    // -----------------------------
    // CREATE
    // -----------------------------
    @PostMapping("/{userId}")
    public ResponseEntity<Void> save(
            @PathVariable Long userId,
            @RequestBody TaskDTO task) {
        taskService.save(userId, task);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // -----------------------------
    // READ (single task)
    // -----------------------------
    @GetMapping("/{userId}/{taskId}")
    public ResponseEntity<TaskDTO> getTask(
            @PathVariable Long userId,
            @PathVariable Long taskId) {
        TaskDTO dto = taskService.getTask(userId, taskId);
        return ResponseEntity.ok(dto);
    }

    // -----------------------------
    // READ (all tasks for user)
    // -----------------------------
    @GetMapping("/{userId}")
    public ResponseEntity<List<TaskDTO>> allTask(
            @PathVariable Long userId) {
        List<TaskDTO> taskDTOS = taskService.allTask(userId);
        return ResponseEntity.ok(taskDTOS);
    }

    // -----------------------------
    // DELETE
    // -----------------------------
    @DeleteMapping("/{userId}/{taskId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long userId,
            @PathVariable Long taskId) {
        taskService.delete(userId, taskId);
        return ResponseEntity.noContent().build();
    }

    // -----------------------------
    // PATCH (partial update)
    // -----------------------------
    @PatchMapping("/{userId}")
    public ResponseEntity<Void> patch(
            @PathVariable Long userId,
            @RequestBody TaskDTO task) {
        taskService.patch(userId, task);
        return ResponseEntity.ok().build();
    }
}
