package com.boilerplate.auth.externalservice;

import static com.boilerplate.common.utilities.Constants.API;
import static com.boilerplate.common.utilities.Constants.SAVE_USER;
import static com.boilerplate.common.utilities.Constants.THIRD_PARTY_LOGIN;
import static com.boilerplate.common.utilities.Constants.USERS;
import static com.boilerplate.common.utilities.Constants.USER_BY_EMAIL;

import com.boilerplate.auth.fallback.UserServiceFallback;
import com.boilerplate.common.dto.ThirdPartyAuthResponseDto;
import com.boilerplate.common.dto.UpdateAccountStatusDto;
import com.boilerplate.common.dto.UserDto;
import com.boilerplate.common.enums.AccountStatus;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "boilerplate-user", fallbackFactory = UserServiceFallback.class)
public interface IUserService {

    /**
     * User Service.
     */
    @GetMapping(API + USERS + USER_BY_EMAIL + "/{email}")
    UserDto getUserByEmail(@PathVariable String email);

    @PostMapping(API + USERS + SAVE_USER )
    UserDto saveUser(@RequestBody UserDto userDto);

    @PostMapping(API + USERS + THIRD_PARTY_LOGIN )
    UserDto thirdPartyLogin(@RequestParam("provider") String authProvider, @RequestBody ThirdPartyAuthResponseDto userDto);

    @PutMapping(API + USERS + "/{email}/status")
    String updateUserAccountStatus(@PathVariable("email") String email, @RequestBody UpdateAccountStatusDto updateAccountStatusDto);

}
