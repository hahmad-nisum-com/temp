package com.boilerplate.user.services;

import com.boilerplate.common.dto.ThirdPartyAuthResponseDto;
import com.boilerplate.common.dto.UpdateUserPasswordDto;
import com.boilerplate.common.dto.UserDto;
import com.boilerplate.common.dto.UserSaveRequestDto;
import com.boilerplate.common.enums.AccountStatus;
import com.boilerplate.user.entity.User;
import com.boilerplate.user.model.SaveAndUpdateUserByAdminDTO;
import com.boilerplate.user.model.UpdateUserDTO;
import com.boilerplate.user.entity.UserRole;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface IUserService {

    List<UserDto> getAllUsers();

    UserDto getByUuid(String uuid);

    UserDto getByEmail(String email);

    Optional<User> getUserEntityByEmail(String email);

    UserDto saveUser(UserSaveRequestDto userSaveRequestDto);

    UserDto updateCurrentPassword(String userEmail, UpdateUserPasswordDto updateUserPasswordDto);

    UserDto update(String uuid, UpdateUserDTO updateUserDTO);

    void updateUserPassword(String uuid, String newPassword);

    void deleteByUuid(String uuid);

    void updateUserAccountStatus(String email, AccountStatus accountStatus);

    User registerThirdPartyUser(ThirdPartyAuthResponseDto userDto, UserRole userRole);

    void activeInactiveUsersById(List<String> uuids);

    UserDto CreateUserByAdmin(SaveAndUpdateUserByAdminDTO saveAndUpdateUserByAdminDTO);

    UserDto updateUserByAdmin(String uuid, SaveAndUpdateUserByAdminDTO saveAndUpdateUserByAdminDTO);

    void sendPromotionalEmails();

    boolean unsubscribeByEmail(String email);

    Page<UserDto> searchUsers(String searchTerm, AccountStatus accountStatus, Long userRoleId,
        Pageable pageable);

}
