package com.boilerplate.user.services.impl;

import com.boilerplate.common.dto.ThirdPartyAuthResponseDto;
import com.boilerplate.common.dto.UserDto;
import com.boilerplate.common.utilities.ModelMapper;
import com.boilerplate.user.entity.User;
import com.boilerplate.user.entity.UserRole;
import com.boilerplate.user.services.IThirdPartyAuthService;
import com.boilerplate.user.services.IUserRoleService;
import com.boilerplate.user.services.IUserService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import static com.boilerplate.common.utilities.Constants.SYSTEM_USER;

@Service
@RequiredArgsConstructor
public class ThirdPartyAuthService implements IThirdPartyAuthService {

    private final IUserRoleService userRoleService;
    private final IUserService userService;

    @Override
    @Transactional
    public UserDto registerOrLoginUser(ThirdPartyAuthResponseDto responseDto, String oauthProvider) {
        Optional<User> existingUser = userService.getUserEntityByEmail(responseDto.getEmail());
        if (existingUser.isPresent()) {
            return ModelMapper.entityToDto(existingUser, UserDto.class);
        }
        return ModelMapper.entityToDto(userService.registerThirdPartyUser(responseDto, new UserRole(1L, SYSTEM_USER)), UserDto.class);
    }
}
