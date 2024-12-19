package br.com.agendesaude.api.infra.exception;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<CustomException> handleError404() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomException("Resource not found"));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<CustomException> handleError400(MethodArgumentNotValidException ex) {
        List<String> erros = ex.getFieldErrors().stream()
            .map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage())
            .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new CustomException(erros));
    }

    public static class CustomException extends RuntimeException {
        private static final long serialVersionUID = -2193041101505576613L;
        private List<String> erros;

        public CustomException(List<String> erros) {
            this.erros = erros;
        }

        public CustomException(String msg) {
            super(msg);
        }

        public List<String> getErros() {
            return erros;
        }

        public void setErros(List<String> erros) {
            this.erros = erros;
        }
    }
}
