package com.boilerplate.user.entity;

import com.boilerplate.common.entity.BaseEntity;
import com.boilerplate.common.enums.AccountStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.Email;

@ToString(exclude = "userRole") // Prevents lazy loading issues
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SQLDelete(sql = "UPDATE user SET account_status = 'BLOCKED' WHERE id=?")
@Where(clause = "account_status IN ('ACTIVE', 'TEMP_BLOCKED')")
public class User extends BaseEntity {

    private static final long serialVersionUID = 7156526077883281623L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String uuid;
    private String userName;
    private String firstName;
    private String lastName;
    @Email()
    @Column(unique = true)
    private String email;
    private String password;
    @Column(unique = true)
    private String phoneNumber;
    private String countryCode;
    private String isoCountry;
    private Boolean isEmailVerified;
    private String profilePictureId;
    private Boolean isPasswordSet;
    private Boolean isProfileComplete;
    private boolean subscribedToPromotions=true;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "account_status", nullable = false)
    private AccountStatus accountStatus = AccountStatus.ACTIVE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_role_id", referencedColumnName = "id", nullable = false)
    private UserRole userRole;

    @Transient
    private String profilePictureUrl;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id != null && id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return id == null ? 0 : id.hashCode();
    }
}

