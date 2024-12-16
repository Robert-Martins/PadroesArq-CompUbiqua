package br.com.agendesaude.api.infra.utils;

import static io.micrometer.common.util.StringUtils.isNotEmpty;

import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StringUtil {

  private StringUtil() {
  }

  public static String trimLowerCase(String value) {
    if (isNotEmpty(value)) {
      return value.trim().toLowerCase();
    } else {
      return value;
    }
  }

  public static String getFirstName(String name) {
    int posicaoEspaco = name.indexOf(' ');
    if (posicaoEspaco != -1) {
      return name.substring(0, posicaoEspaco);
    } else {
      return name;
    }
  }

  public static String capitalizeSentence(String value) {
    return Stream.of(value.trim().split("\\s"))
        .filter(word -> word.length() > 0)
        .map(StringUtil::capitalizeWord)
        .collect(Collectors.joining(" "));
  }

  public static String capitalizeWord(String value) {
    var word = value.toLowerCase();
    if (!word.equals("da") && !word.equals("do") && !word.equals("de") && !word.equals("das") && !word.equals("dos")
        && !word.equals("des") && !word.equals("e")) {
      return word.substring(0, 1).toUpperCase() + word.substring(1);
    } else {
      return word;
    }
  }

}
