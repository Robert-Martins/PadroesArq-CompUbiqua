package br.com.agendesaude.api.infra.exception;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorHandler {

  @ExceptionHandler(EntityNotFoundException.class)
  public ResponseEntity<BadRequestException> handleError404() {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new BadRequestException("Resource not found"));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<BadRequestException> handleError400(MethodArgumentNotValidException ex) {
    List<String> erros = ex.getFieldErrors().stream()
        .map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage())
        .collect(Collectors.toList());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BadRequestException(erros));
  }

  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<BadRequestException> handleCustomException(BadRequestException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex);
  }

}
