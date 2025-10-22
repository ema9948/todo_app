package com.example.todoApp.controller;

import com.example.todoApp.dto.TaskDTO;
import com.example.todoApp.service.ITaskService;
import com.example.todoApp.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {

    private final ITaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // -----------------------------
    // CREATE
    // -----------------------------
    @PostMapping("/{userId}")
    public ResponseEntity<Void> save(@PathVariable Long userId, @RequestBody TaskDTO task) {
        taskService.save(userId, task);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // -----------------------------
    // READ
    // -----------------------------
    @GetMapping("/{userId}/{taskId}")
    public ResponseEntity<TaskDTO> getTask(@PathVariable Long userId, @PathVariable Long taskId) {
        TaskDTO dto = taskService.getTask(userId, taskId);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<TaskDTO>> allTask(@PathVariable Long userId) {
        List<TaskDTO> taskDTOS = taskService.allTask(userId);
        return ResponseEntity.ok(taskDTOS);
    }

    // -----------------------------
    // DELETE
    // -----------------------------
    @DeleteMapping("/{userId}/{taskId}")
    public ResponseEntity<Void> delete(@PathVariable Long userId, @PathVariable Long taskId) {
        taskService.delete(userId, taskId);
        return ResponseEntity.ok().build();
    }

    // -----------------------------
    // PATCH
    // -----------------------------
    @PatchMapping("/{userId}")
    public ResponseEntity<Void> patch(@PathVariable Long userId, @RequestBody TaskDTO task) {
        taskService.patch(userId, task);
        return ResponseEntity.ok().build();
    }
}
