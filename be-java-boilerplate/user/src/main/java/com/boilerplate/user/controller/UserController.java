package com.boilerplate.user.controller;

import com.boilerplate.common.dto.*;
import com.boilerplate.common.enums.AccountStatus;
import com.boilerplate.user.model.UpdateUserDTO;
import com.boilerplate.user.services.IThirdPartyAuthService;
import com.boilerplate.user.services.IUserService;
import liquibase.repackaged.org.apache.commons.collections4.CollectionUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import java.util.List;

import static com.boilerplate.common.utilities.Constants.*;

@Slf4j
@RestController
@RequestMapping(API + USERS)
@CrossOrigin(originPatterns = "*", maxAge = 3600)
@RequiredArgsConstructor
 public class UserController {

    private final IUserService userService;
    private final IThirdPartyAuthService thirdPartyAuthService;



    /**
     * save.
     *
     * @param userSaveRequestDto signupRequest
     * @return ResponseEntity
     */
    @PostMapping
    public ResponseEntity<UserDto> save(@Valid @RequestBody UserSaveRequestDto userSaveRequestDto) {
        log.info("Users Signup Request: {}", userSaveRequestDto);
        UserDto userDto = userService.saveUser(userSaveRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }

    @PutMapping(UPDATE_CURRENT_PASSWORD)
    public ResponseEntity<UserDto> updatePassword(@Valid @RequestBody UpdateUserPasswordDto updateUserPasswordDto,
                                                                      HttpServletRequest request) {
        log.info("Logged in user current password Request: {}", updateUserPasswordDto);
        String userEmail = request.getHeader("email");
        UserDto userDto = userService.updateCurrentPassword(userEmail, updateUserPasswordDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }

    /**
     * update.
     *
     * @param updateUserDTO UserUpdateRequestDto
     * @return ResponseEntity
     */
    @PutMapping(U_UID)
    public ResponseEntity<UserDto> update(@PathVariable @Min(1) String uuid, @RequestBody UpdateUserDTO updateUserDTO) {
        log.debug("Update Users By Id Request: {}", updateUserDTO);
        UserDto updatedUser = userService.update(uuid, updateUserDTO);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * lockUser.
     *
     * @param email String
     * @return ResponseEntity
     */
    @PutMapping("/{email}" + STATUS)
    public ResponseEntity<String> updateAccountStatus(@PathVariable String email,
                                                      @Valid @RequestBody UpdateAccountStatusDto updateAccountStatusDto) {
        log.debug("Processing account status for user: {}", email);
        userService.updateUserAccountStatus(email, updateAccountStatusDto.getAccountStatus());
        return ResponseEntity.ok("User status updated to " + updateAccountStatusDto.getAccountStatus().name());
    }

     /**
     * get.
     *
     * @param email email
     * @return ResponseEntity
     */
    @GetMapping(USER_BY_EMAIL + "/{email}")
    public ResponseEntity<UserDto> getByEmail(@PathVariable String email) {
        log.debug("Get Users By Email Request: {}", email);
        UserDto user = userService.getByEmail(email);
        return ResponseEntity.ok(user);
    }

    @PostMapping(THIRD_PARTY_LOGIN)
    public ResponseEntity<UserDto> thirdPartyLogin(@RequestParam("provider") String provider,
                                              @Valid @RequestBody ThirdPartyAuthResponseDto thirdPartyAuthResponseDto) {
        UserDto user = thirdPartyAuthService.registerOrLoginUser(thirdPartyAuthResponseDto, provider);
        return ResponseEntity.ok(user);
    }

    @PatchMapping("/unsubscribe")
    public ResponseEntity<String> unsubscribe(@RequestParam("email") String email) {
        boolean result = userService.unsubscribeByEmail(email);
        if (result) {
            return ResponseEntity.ok("You have successfully unsubscribed from promotional emails.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

  @GetMapping(SEARCH_USERS)
  public ResponseEntity<Page<UserDto>> getUsers(
      @RequestParam(required = false) String search,
      @RequestParam(required = false) String status,
      @RequestParam(required = false) Long roleId,
      @PageableDefault(sort = "firstName", direction = Sort.Direction.ASC) Pageable pageable) {

    AccountStatus accountStatus =
        StringUtils.isNotBlank(status) ? AccountStatus.valueOf(status.toUpperCase()) : null;
    return ResponseEntity.ok(
        userService.searchUsers(search, accountStatus, roleId, pageable));
  }

}
