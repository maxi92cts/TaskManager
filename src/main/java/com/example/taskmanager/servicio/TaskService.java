package com.example.taskmanager.servicio;

import com.example.taskmanager.modelo.Task;
import com.example.taskmanager.repositorio.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepo repo;

    public List<Task> list(){
        return repo.findAll();
    }

    public Task addTask(Task task){
        return repo.save(task);
    }

    public Task getTaskById(Long id){
        Optional<Task> task = repo.findById(id);
        return task.orElse(null);
    }

    public Task updateTask(Long id, Task task){
        Task existingTask = getTaskById(id);
        if(existingTask != null){
            existingTask.setName(task.getName());
            existingTask.setDate(task.getDate());
            existingTask.setCompleted(task.isCompleted());
            return repo.save(existingTask);
        }
        return null;
    }

    public void deleteTask(Long id){
        repo.deleteById(id);
    }

    public Task editTask(Long id, Task task) {
        Task existingTask = getTaskById(id);
        if (existingTask != null) {
            existingTask.setName(task.getName());
            existingTask.setDate(task.getDate());
            existingTask.setCompleted(task.isCompleted());
            return repo.save(existingTask);
        } else {
            throw new RuntimeException("La tarea con el ID " + id + " no se encontró.");
        }
    }
}
