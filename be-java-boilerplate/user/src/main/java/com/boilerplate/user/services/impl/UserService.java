package com.boilerplate.user.services.impl;

import static com.boilerplate.common.enums.EmailSubject.USER_ACCOUNT_STATUS_UPDATE_SUBJECT;
import static com.boilerplate.common.enums.EmailSubject.WELCOME_SUBJECT;
import static com.boilerplate.common.enums.EmailType.ACCOUNT_CREATION;
import static com.boilerplate.common.enums.EmailType.WELCOME;
import static com.boilerplate.common.enums.EmailType.USER_ACCOUNT_STATUS_UPDATE;
import static com.boilerplate.common.enums.EmailType.USER_ACCOUNT_UPDATE;
import static com.boilerplate.common.utilities.Constants.SYSTEM_USER;
import static com.boilerplate.common.utilities.Constants.USER_NOT_FOUND;
import static com.boilerplate.common.utilities.Constants.USER_DEACTIVATED;
import static com.boilerplate.common.utilities.Constants.USER_ACTIVE;
import static com.boilerplate.common.enums.EmailType.PROMOTIONAL;
import static com.boilerplate.common.utilities.Constants.UNSUBSCRIBE_PATH;

import com.boilerplate.common.customexception.BusinessException;
import com.boilerplate.common.customexception.NotFoundException;
import com.boilerplate.common.dto.*;
import com.boilerplate.common.enums.AccountStatus;
import com.boilerplate.common.enums.EmailSubject;
import com.boilerplate.common.enums.EmailType;
import com.boilerplate.common.utilities.ModelMapper;
import com.boilerplate.user.entity.User;
import com.boilerplate.user.entity.UserRole;
import com.boilerplate.user.externalservice.INotificationService;
import com.boilerplate.user.model.SaveAndUpdateUserByAdminDTO;
import com.boilerplate.user.model.UpdateUserDTO;
import com.boilerplate.user.repository.UserRepository;
import com.boilerplate.user.repository.specification.pattern.UserSpecification;
import com.boilerplate.user.services.IUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final INotificationService notificationService;

    @Value("${base-url}")
    private String baseUrl;

    @Override
    public List<UserDto> getAllUsers() {
        return ModelMapper.listEntityToDto(userRepository.findAll(), UserDto.class);
    }

    @Override
    public UserDto getByUuid(String uuid) {
        return userRepository.findByUuid(uuid)
                .map(user -> ModelMapper.entityToDto(user, UserDto.class))
                .orElseThrow(() -> new NotFoundException("User not found with ID: " + uuid));
    }

    @Override
    public UserDto getByEmail(String email) {
        if (StringUtils.isEmpty(email) || email.isBlank()) {
            throw new BusinessException("Email cannot be empty or blank");
        }
        return Optional.ofNullable(userRepository.findByEmail(email))
                .map(user -> ModelMapper.entityToDto(user, UserDto.class))
                .orElseThrow(() -> new NotFoundException("User Not Found With Email: " + email));
    }

    @Override
    public Optional<User> getUserEntityByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserDto saveUser(UserSaveRequestDto userSaveRequestDto) {
        userRepository.findByEmail(userSaveRequestDto.getEmail()).ifPresent(user -> {
            log.error("Duplicate User: {}", userSaveRequestDto);
            throw new BusinessException("Email already exists");
        });
        userSaveRequestDto.setPassword(passwordEncoder.encode(userSaveRequestDto.getPassword()));
        User user = ModelMapper.dtoToEntity(userSaveRequestDto, User.class);
        setDefaultUserFields(user);
        sendUserAccountCreatedNotification(user);
        return ModelMapper.entityToDto(userRepository.save(user), UserDto.class);
    }

    @Override
    public UserDto CreateUserByAdmin(SaveAndUpdateUserByAdminDTO saveAndUpdateUserByAdminDTO) {
        userRepository.findByEmail(saveAndUpdateUserByAdminDTO.getEmail()).ifPresent(user -> {
            log.error("Duplicate User: {}", saveAndUpdateUserByAdminDTO);
            throw new BusinessException("Email already exists");
        });
        String rawPassword = saveAndUpdateUserByAdminDTO.getPassword();
        saveAndUpdateUserByAdminDTO.setPassword(passwordEncoder.encode(saveAndUpdateUserByAdminDTO.getPassword()));
        User user = ModelMapper.dtoToEntity(saveAndUpdateUserByAdminDTO, User.class);
        setDefaultUserFields(user);
        sendWelcomeEmailByAdmin(user.getEmail(), rawPassword, EmailType.USER_ACCOUNT_CREATION_BY_ADMIN, EmailSubject.USER_ACCOUNT_CREATION_LOGIN_INSTRUCTIONS);
        return ModelMapper.entityToDto(userRepository.save(user), UserDto.class);
    }

    private void sendWelcomeEmailByAdmin(String email, String password, EmailType emailType, EmailSubject emailSubject) {
        Map<String, Object> templateModel = new HashMap<>();
        templateModel.put("email", email);
        templateModel.put("password", password);

        EmailNotificationDto emailNotificationDto = EmailNotificationDto.builder()
                .title(EmailSubject.USER_ACCOUNT_CREATION_LOGIN_INSTRUCTIONS.getSubjectName())
                .templateModel(templateModel)
                .emailType(emailType) // This should map to your welcome email template
                .sendTo(email)
                .build();

        notificationService.sendEmail(emailNotificationDto);
        log.info("Welcome email sent to {} with login credentials", email);
    }


    @Override
    public UserDto updateCurrentPassword(String userEmail, UpdateUserPasswordDto updateUserPasswordDto) {
        if (updateUserPasswordDto.getCurrentPassword().equals(updateUserPasswordDto.getNewPassword())) {
            throw new BusinessException("Current and new passwords must not be the same");
        }
        if (!updateUserPasswordDto.getNewPassword().equals(updateUserPasswordDto.getConfirmPassword())) {
            throw new BusinessException("New password and confirm password do not match");
        }
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new BusinessException("User not found"));
        if (!passwordEncoder.matches(updateUserPasswordDto.getCurrentPassword(), user.getPassword())) {
            throw new BusinessException("Current password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(updateUserPasswordDto.getNewPassword()));
        User updatedUser = userRepository.save(user);
        return ModelMapper.entityToDto(updatedUser, UserDto.class);
    }


    @Override
    @Transactional
    public UserDto update(String uuid, UpdateUserDTO dto) {
        User existingUser = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new NotFoundException("User not found"));
        updateExistingUser(dto, existingUser);
        User updatedUser = userRepository.save(existingUser);
        return ModelMapper.entityToDto(updatedUser, UserDto.class);
    }

    @Override
    @Transactional
    public UserDto updateUserByAdmin(String uuid, SaveAndUpdateUserByAdminDTO saveAndUpdateUserByAdminDTO) {
        User existingUser = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new NotFoundException("User not found"));
        userRepository.findByEmail(saveAndUpdateUserByAdminDTO.getEmail())
                .filter(user -> !user.getUuid().equals(existingUser.getUuid()))
                .ifPresent(user -> {
                    log.error("Duplicate User: {}", saveAndUpdateUserByAdminDTO);
                    throw new BusinessException("Email already exists");
                });

        updateExistingUserByAdmin(saveAndUpdateUserByAdminDTO, existingUser);
        User updatedUser = userRepository.save(existingUser);
        notifyUserWithAccountUpdate(updatedUser);

        return ModelMapper.entityToDto(updatedUser, UserDto.class);
    }


    @Override
    public void updateUserPassword(String uuid, String newPassword) {
        User user = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setIsPasswordSet(true);
        userRepository.save(user);
    }

    @Override
    public void deleteByUuid(String uuid) {
        User user = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.setAccountStatus(AccountStatus.BLOCKED);
        userRepository.save(user);
    }

    @Override
    public void updateUserAccountStatus(String email, AccountStatus accountStatus) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new BusinessException(USER_NOT_FOUND));
        user.setAccountStatus(accountStatus);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void activeInactiveUsersById(List<String> uuids) {
        List<User> users = userRepository.findByUuidIn(uuids);
        if (users.isEmpty()) {
            throw new BusinessException(USER_NOT_FOUND);
        }


        users.forEach(user -> {
            user.setAccountStatus(
                    user.getAccountStatus() == AccountStatus.ACTIVE
                            ? AccountStatus.INACTIVE
                            : AccountStatus.ACTIVE
            );
            userRepository.save(user);

            String statusMessage = user.getAccountStatus() == AccountStatus.ACTIVE
                    ? USER_ACTIVE + user.getUuid()
                    : USER_DEACTIVATED + user.getUuid();

            sendEmailNotification(user.getFirstName(), user.getLastName(), user.getEmail(),
                    USER_ACCOUNT_STATUS_UPDATE_SUBJECT.getSubjectName(), statusMessage,
                    USER_ACCOUNT_STATUS_UPDATE, "content");

        });
    }

    private void sendEmailNotification(String firstName, String lastName, String email,
                                       String subject, String statusMessage, EmailType emailType,
                                       String contentKey) {
        Map<String, Object> templateModel = new HashMap<>();

        templateModel.put("username", firstName.toUpperCase(Locale.ROOT) + " " + lastName.toUpperCase(Locale.ROOT));
        templateModel.put(contentKey, statusMessage);

        EmailNotificationDto emailNotificationDto = EmailNotificationDto.builder()
                .title(subject)
                .templateModel(templateModel)
                .emailType(emailType)
                .sendTo(email)
                .build();

        notificationService.sendEmail(emailNotificationDto);
        log.info("Email sent to {}: {}", email, statusMessage);
    }


    public User registerThirdPartyUser(ThirdPartyAuthResponseDto responseDto, UserRole userRole) {
        User user = buildUserForThirdPartyService(responseDto, userRole);
        notifyUserWithAccountRegistration(user);
        return userRepository.save(user);
    }

    private void notifyUserWithAccountRegistration(User user) {
        EmailNotificationDto emailNotificationDto = EmailNotificationDto.builder()
                .sendTo(user.getEmail())
                .emailType(ACCOUNT_CREATION)
                .templateModel(Map.of("username", user.getUserName()/*,"password", user.getPassword()*/))
                .title(EmailSubject.ACCOUNT_CREATION_SUBJECT.getSubjectName())
                .build();
        notificationService.sendEmail(emailNotificationDto);
    }

    private void notifyUserWithAccountUpdate(User user) {
        EmailNotificationDto emailNotificationDto = EmailNotificationDto.builder()
                .sendTo(user.getEmail())
                .emailType(USER_ACCOUNT_UPDATE)
                .templateModel(Map.of("username", user.getUserName()/*,"password", user.getPassword()*/))
                .title(EmailSubject.USER_ACCOUNT_DETAILS_UPDATE.getSubjectName())
                .build();
        notificationService.sendEmail(emailNotificationDto);
    }

    private void sendUserAccountCreatedNotification(User user) {
        Map<String, Object> templateModel = new HashMap<>();
        templateModel.put("username",
                Optional.ofNullable(user.getFirstName())
                        .map(name -> name.toUpperCase(Locale.ROOT))
                        .orElse("") + " "
                        + Optional.ofNullable(user.getLastName())
                        .map(name -> name.toUpperCase(Locale.ROOT))
                        .orElse(""));

        EmailNotificationDto emailNotificationDto = EmailNotificationDto.builder()
                .sendTo(user.getEmail())
                .emailType(WELCOME)
                .templateModel(templateModel)
                .title(WELCOME_SUBJECT.getSubjectName())
                .build();

        notificationService.sendEmail(emailNotificationDto);
    }

    private static void setDefaultUserFields(User user) {
        user.setUserName(user.getEmail());
        user.setUuid(UUID.randomUUID().toString());
        user.setIsEmailVerified(false);
        user.setIsPasswordSet(true);
        user.setIsProfileComplete(true);
        user.setAccountStatus(AccountStatus.ACTIVE);
        if (user.getUserRole() == null) {
            user.setUserRole(new UserRole(1L, SYSTEM_USER));
        }
    }

    private void updateExistingUser(UpdateUserDTO dto, User existingUser) {
        if (dto.getFirstName() != null) {
            existingUser.setFirstName(dto.getFirstName());
        }
        if (dto.getLastName() != null) {
            existingUser.setLastName(dto.getLastName());
        }
        if (dto.getPhoneNumber() != null) {
            existingUser.setPhoneNumber(dto.getPhoneNumber());
        }
        if (dto.getCountryCode() != null) {
            existingUser.setCountryCode(dto.getCountryCode());
        }
        if (dto.getIsoCountry() != null) {
            existingUser.setIsoCountry(dto.getIsoCountry());
        }
    }

    private void updateExistingUserByAdmin(SaveAndUpdateUserByAdminDTO dto, User existingUser) {
        if (dto.getFirstName() != null) {
            existingUser.setFirstName(dto.getFirstName());
        }
        if (dto.getLastName() != null) {
            existingUser.setLastName(dto.getLastName());
        }
        if (dto.getPhoneNumber() != null) {
            existingUser.setPhoneNumber(dto.getPhoneNumber());
        }
        if (dto.getCountryCode() != null) {
            existingUser.setCountryCode(dto.getCountryCode());
        }
        if (dto.getIsoCountry() != null) {
            existingUser.setIsoCountry(dto.getIsoCountry());
        }
        if (dto.getEmail() != null) {
            existingUser.setEmail(dto.getEmail());
        }
        if (dto.getPassword() != null) {
            existingUser.setPassword(dto.getPassword());
        }
        if (dto.getUserRole() != null) {
            UserRole newRole = new UserRole();
            newRole.setId(dto.getUserRole().getId());
            newRole.setName(dto.getUserRole().getName());
            existingUser.setUserRole(newRole);
        }

    }

    private static User buildUserForThirdPartyService(ThirdPartyAuthResponseDto responseDto, UserRole userRole) {
        return User.builder()
                .uuid(UUID.randomUUID().toString())
                .email(responseDto.getEmail())
                .userName(responseDto.getEmail())
                .firstName(responseDto.getFirstName())
                .lastName(responseDto.getLastName())
                .isPasswordSet(false)
                .isEmailVerified(false)
                .isProfileComplete(false)
                .userRole(userRole)
                .build();
    }

    public void sendPromotionalEmails() {
        List<User> users = userRepository.findBySubscribedToPromotionsTrue();
        for (User user : users) {
            String unsubscribeUrl = String.format(baseUrl + UNSUBSCRIBE_PATH, user.getEmail());
            sendPromotionalEmail(user.getEmail(), user.getUserName(), unsubscribeUrl);
        }
    }

    public void sendPromotionalEmail(String to, String username, String unsubscribeUrl) {
        EmailNotificationDto emailNotificationDto = EmailNotificationDto.builder()
                .sendTo(to)
                .emailType(PROMOTIONAL) // assuming you have an EmailType enum; replace if needed
                .title(EmailSubject.PROMOTIONAL_SUBJECT.getSubjectName())
                .templateModel(Map.of(
                        "username", username,
                        "unsubscribeUrl", unsubscribeUrl
                ))
                .build();

        notificationService.sendEmail(emailNotificationDto);
    }

    public boolean unsubscribeByEmail(String email) {
        return userRepository.findByEmail(email).map(user -> {
            user.setSubscribedToPromotions(false);
            userRepository.save(user);
            return true;
        }).orElse(false);
    }

    public Page<UserDto> searchUsers(String searchTerm, AccountStatus accountStatus, Long userRoleId,
        Pageable pageable) {
        Specification<User> spec = Specification
            .where(UserSpecification.searchByFirstNameOrLastNameOrEmail(searchTerm))
            .and(UserSpecification.withAccountStatus(accountStatus))
            .and(UserSpecification.withUserRole(userRoleId));

        return ModelMapper.pageEntityToDto(userRepository.findAll(spec, pageable), UserDto.class);
    }
}
