package com.example.taskmanager.repositorio;

import com.example.taskmanager.modelo.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepo extends JpaRepository<Task,Long> {
}
