package com.example.taskmanager.controlador;

import com.example.taskmanager.modelo.Task;
import com.example.taskmanager.servicio.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*") // Permite solicitudes de cualquier origen
public class TaskController {

    @Autowired
    private TaskService service;

    @GetMapping("/list")
    public List<Task> list(){
        return service.list();
    }

    @PostMapping("/add")
    public Task addTask(@RequestBody Task task){
        return service.addTask(task);
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id){
        return service.getTaskById(id);
    }

    @PutMapping("/update/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task){
        return service.updateTask(id, task);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable Long id){
        service.deleteTask(id);
    }
}