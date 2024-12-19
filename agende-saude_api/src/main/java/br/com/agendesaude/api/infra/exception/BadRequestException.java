package br.com.agendesaude.api.infra.exception;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {

  private static final long serialVersionUID = -2193041101505576613L;

  private List<String> erros;

  public BadRequestException(List<String> errors) {
    super();
    this.erros = errors;
  }

  public BadRequestException() {
    super();
  }

  public BadRequestException(String msg) {
    super(msg);
  }

  public BadRequestException(String msg, Throwable t) {
    super(msg, t);
  }

  public List<String> getErros() {
    return erros;
  }

  public void setErros(List<String> erros) {
    this.erros = erros;
  }
}