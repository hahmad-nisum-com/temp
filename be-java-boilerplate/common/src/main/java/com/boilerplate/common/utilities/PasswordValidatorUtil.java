package com.boilerplate.common.utilities;

import java.util.Arrays;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.LengthRule;
import org.passay.PasswordData;
import org.passay.PasswordValidator;
import org.passay.RuleResult;
import org.passay.WhitespaceRule;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PasswordValidatorUtil {

    /**
     * validate password and send failed validations on weak password.
     *
     * @param password String
     * @return null if validations fails then validations data
     */
    public static String validatePassword(String password) {
        PasswordValidator validator = new PasswordValidator(
                Arrays.asList(
                        new LengthRule(8, 128), // Minimum 8 characters
                        new CharacterRule(EnglishCharacterData.UpperCase, 1), // At least 1 uppercase
                        new CharacterRule(EnglishCharacterData.LowerCase, 1), // At least 1 lowercase
                        new CharacterRule(EnglishCharacterData.Digit, 1),     // At least 1 digit
                        new CharacterRule(EnglishCharacterData.Special, 1),   // At least 1 special character
                        new WhitespaceRule()                                  // No whitespace
                )
        );

        RuleResult result = validator.validate(new PasswordData(password));
        return result.isValid() ? null : String.join(", ", validator.getMessages(result));
    }

}
