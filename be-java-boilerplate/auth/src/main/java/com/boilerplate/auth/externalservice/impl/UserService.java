package com.boilerplate.auth.externalservice.impl;

import com.boilerplate.auth.externalservice.IUserService;
import com.boilerplate.common.dto.ThirdPartyAuthResponseDto;
import com.boilerplate.common.dto.UpdateAccountStatusDto;
import com.boilerplate.common.dto.UserDto;
import com.boilerplate.common.enums.AccountStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserService implements IUserService {

    @Override
    public UserDto getUserByEmail(String email) {
        return null;
    }

    @Override
    public UserDto saveUser(UserDto userDto) {
        return null;
    }

    @Override
    public UserDto thirdPartyLogin(String authProvider, ThirdPartyAuthResponseDto userDto) {
        return null;
    }

    @Override
    public String updateUserAccountStatus(String email, UpdateAccountStatusDto updateAccountStatusDto) {
        return null;
    }

}
