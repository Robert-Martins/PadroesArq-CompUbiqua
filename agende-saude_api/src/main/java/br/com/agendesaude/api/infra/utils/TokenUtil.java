package br.com.agendesaude.api.infra.utils;

import br.com.agendesaude.api.infra.exception.CustomException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

public class TokenUtil {

  private static final Random generator = new Random();

  public static String generateRandomFourDigitsCode() {
    return String.format("%04d", generator.nextInt(9000) + 1000);
  }

  public static String generateRandomHash() {
    try {
      byte[] randomBytes = new byte[16];
      generator.nextBytes(randomBytes);
      MessageDigest md = MessageDigest.getInstance("SHA-256");
      byte[] hashBytes = md.digest(randomBytes);
      StringBuilder hexString = new StringBuilder();
      for (byte b : hashBytes) {
        hexString.append(String.format("%02x", b));
      }
      return hexString.toString();
    } catch (NoSuchAlgorithmException e) {
      throw new CustomException("Error generating hash", e);
    }
  }
}
