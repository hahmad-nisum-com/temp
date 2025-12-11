package com.boilerplate.user.controller;

import com.boilerplate.common.dto.UserDto;
import com.boilerplate.common.dto.UserSaveRequestDto;
import com.boilerplate.common.model.request.ActiveInactiveRequest;
import com.boilerplate.common.model.validation.CreateGroup;
import com.boilerplate.common.model.validation.UpdateGroup;
import com.boilerplate.user.model.SaveAndUpdateUserByAdminDTO;
import com.boilerplate.user.model.UpdateUserDTO;
import com.boilerplate.user.services.IThirdPartyAuthService;
import com.boilerplate.user.services.IUserService;
import liquibase.repackaged.org.apache.commons.collections4.CollectionUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import java.util.List;

import static com.boilerplate.common.utilities.Constants.*;


@Slf4j
@RestController
@RequestMapping(API + ADMIN)
@CrossOrigin(originPatterns = "*", maxAge = 3600)
@RequiredArgsConstructor
public class AdminController {

    private final IUserService userService;


    /**
     * getUsers.
     *
     * @return ResponseEntity
     */
    // Read operation
    @GetMapping
    public ResponseEntity<List<UserDto>> getUsers() {
        log.debug("Get All Users");
        List<UserDto> users = userService.getAllUsers();
        if (CollectionUtils.isEmpty(users)) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(users);
        }
        return ResponseEntity.ok(users);
    }

    /**
     * delete.
     *
     * @param uuid Long
     * @return ResponseEntity
     */
    @DeleteMapping(U_UID)
    public ResponseEntity<String> delete(@PathVariable @Min(1) String uuid) {
        log.debug("delete User By Id Request: {}", uuid);
        userService.deleteByUuid(uuid);
        log.info("Deleted Successfully: {}", uuid);
        return ResponseEntity.ok("Deleted Successfully");
    }

    /**
     * get.
     *
     * @param uuid id
     * @return ResponseEntity
     */
    @GetMapping(U_UID)
    public ResponseEntity<UserDto> get(@PathVariable @Min(1) String uuid) {
        log.debug("Get Users By Id Request: {}", uuid);
        UserDto user = userService.getByUuid(uuid);
        return ResponseEntity.ok(user);
    }


    /**
     * activate Inactivate Users.
     *
     * @param uuids UUID
     * @return ResponseEntity
     */
    @PatchMapping(ACTIVATE_INACTIVATE_USER)
    public ResponseEntity<String> activateInactivateUsers(final @RequestBody ActiveInactiveRequest uuids) {
        log.debug("activateInactivateUsers User By Uuids Request: {}", uuids.getUuids());
        userService.activeInactiveUsersById(uuids.getUuids());
        return ResponseEntity.ok("Account status changed Successfully");
    }

    /**
     * update.
     *
     * @param saveAndUpdateUserByAdminDTO
     * @return ResponseEntity
     */
    @PatchMapping(U_UID)
    public ResponseEntity<UserDto> update(@PathVariable @Min(1) String uuid, @Validated(UpdateGroup.class) @RequestBody SaveAndUpdateUserByAdminDTO saveAndUpdateUserByAdminDTO) {
        log.debug("Update Users By Id Request: {}", saveAndUpdateUserByAdminDTO);
        UserDto updatedUser = userService.updateUserByAdmin(uuid, saveAndUpdateUserByAdminDTO);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * save.
     *
     * @param saveAndUpdateUserByAdminDTO signupRequest
     * @return ResponseEntity
     */
    @PostMapping
    public ResponseEntity<UserDto> save(@Validated(CreateGroup.class) @RequestBody SaveAndUpdateUserByAdminDTO saveAndUpdateUserByAdminDTO) {
        log.info("User Creating Request By Admin: {}", saveAndUpdateUserByAdminDTO);
        UserDto userDto = userService.CreateUserByAdmin(saveAndUpdateUserByAdminDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }


}