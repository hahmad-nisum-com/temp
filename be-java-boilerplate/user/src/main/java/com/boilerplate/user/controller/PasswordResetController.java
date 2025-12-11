package com.boilerplate.user.controller;

import com.boilerplate.user.model.UpdatePasswordDTO;
import com.boilerplate.user.model.ForgotPasswordDTO;
import com.boilerplate.user.services.IPasswordResetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.boilerplate.common.utilities.Constants.*;

@Slf4j
@RestController
@RequestMapping(API + PASSWORD)
@RequiredArgsConstructor
public class PasswordResetController {

    private final IPasswordResetService passwordResetService;

    @PostMapping(FORGOT_PASSWORD)
    public ResponseEntity<String> forgetPassword(@Valid @RequestBody ForgotPasswordDTO forgotPasswordDTO) {
        passwordResetService.createAndSendToken(forgotPasswordDTO.getEmail());
        return ResponseEntity.ok("Reset link sent to email.");
    }

    @PostMapping(UPDATE_PASSWORD)
    public ResponseEntity<String> updatePassword(@Valid @RequestBody UpdatePasswordDTO updatePasswordDTO) {
        passwordResetService.updatePassword(updatePasswordDTO.getToken(), updatePasswordDTO.getPassword());
        return ResponseEntity.ok("Password reset successful.");
    }
}

