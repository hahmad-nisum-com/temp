package com.boilerplate.user.services;

import com.boilerplate.common.dto.ThirdPartyAuthResponseDto;
import com.boilerplate.common.dto.UserDto;

public interface IThirdPartyAuthService {
    UserDto registerOrLoginUser(ThirdPartyAuthResponseDto responseDto, String oauthProvider);
}
