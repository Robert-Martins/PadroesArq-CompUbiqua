package br.com.agendesaude.api.infra.exception;

public class InvalidMediaTypeException extends RuntimeException {

  public InvalidMediaTypeException(String message) {
    super(message);
  }
}