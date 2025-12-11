package com.boilerplate.user.services;

public interface IPasswordResetService {
    void createAndSendToken(String email);
    void updatePassword(String token, String newPassword);

}
