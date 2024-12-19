package br.com.agendesaude.api.domain.service;

import static br.com.agendesaude.api.infra.utils.TokenUtil.generateRandomFourDigitsCode;
import static br.com.agendesaude.api.infra.utils.TokenUtil.generateRandomHash;

import br.com.agendesaude.api.domain.dto.TokenDto;
import br.com.agendesaude.api.domain.model.Token;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.domain.repository.TokenRepository;
import br.com.agendesaude.api.domain.repository.UserRepository;
import br.com.agendesaude.api.infra.exception.BadRequestException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

  private final JavaMailSender javaMailSender;

  private final TokenRepository tokenRepository;

  private final UserRepository userRepository;

  public TokenService(JavaMailSender javaMailSender, TokenRepository tokenRepository, UserRepository userRepository) {
    this.javaMailSender = javaMailSender;
    this.tokenRepository = tokenRepository;
    this.userRepository = userRepository;
  }

  @Transactional
  public void enviarEmail(String email) {
    deleteExpiredTokens();
    TokenDto tokenDto = generateToken();

    String subject = "Recuperação de senha AgendeSaude".formatted(email);

    String message = """
            <html>
                <body>
                    <p>Olá %s,</p>
                    <p>Seu código de verificação é: <strong>%s</strong></p>
                    <p>Por favor, utilize este código para prosseguir com a redefinição de senha.</p>
                </body>
            </html>
        """.formatted(email, tokenDto.getToken());

    try {
      MimeMessage mimeMessage = javaMailSender.createMimeMessage();
      MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, StandardCharsets.UTF_8.toString());
      messageHelper.setSubject(subject);
      messageHelper.setText(message, true);
      messageHelper.setFrom("agendesaude@robert-martins.com");
      messageHelper.setTo(email);

      javaMailSender.send(mimeMessage);
    } catch (MessagingException e) {
      System.out.println("Erro ao enviar e-mail: " + e.getMessage());
    }
  }

  public void deleteExpiredTokens() {
    LocalDateTime tenMinutesAgo = Instant.now().minusSeconds(10 * 60).atZone(ZoneId.systemDefault()).toLocalDateTime();

    List<Token> expiredTokens = tokenRepository.findAllByCreatedAtBefore(tenMinutesAgo);

    if (!expiredTokens.isEmpty()) {
      tokenRepository.deleteAll(expiredTokens);
    }
  }


  public void resetPassword(TokenDto tokenDto) {

    User user = userRepository.findByEmail(tokenDto.getEmail());

    tokenRepository.findByHash(tokenDto.getHash())
        .ifPresentOrElse(token -> {
          user.setPassword(new BCryptPasswordEncoder().encode(tokenDto.getNewPassword()));
          userRepository.save(user);
          tokenRepository.delete(token);
        }, () -> {
          throw new BadRequestException("Usuário não encontrado para o hash fornecido");
        });
  }


  public TokenDto generateToken() {
    Token token = new Token();
    token.setToken(generateRandomFourDigitsCode());
    token.setHash(generateRandomHash());
    return this.tokenRepository.save(token).mapEntityToDto();
  }

  public TokenDto validateToken(String tokenIdentification) {
    return this.tokenRepository.findByToken(tokenIdentification)
        .orElseThrow(() -> new BadRequestException("Token not found"))
        .mapEntityToDto();
  }
}