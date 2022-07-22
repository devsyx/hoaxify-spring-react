package com.hoaxify.ws.user;

import java.util.Collection;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.hoaxify.ws.auth.Token;
import com.hoaxify.ws.hoax.Hoax;

import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User implements UserDetails {

	private static final long serialVersionUID = -5684257173402693449L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@UniqueUsername
	@NotNull(message = "{hoaxify.constraint.username.NotNull.message}")
	@Size(min = 4, max = 255)
	private String username;

	@NotNull(message = "{hoaxify.constraint.displayName.NotNull.message}")
	@Size(min = 4, max = 255)
	private String displayName;

	@NotNull(message = "{hoaxify.constraint.password.NotNull.message}")
	@Size(min = 8)
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{hoaxify.constraint.password.Pattern.message}")
	private String password;

	private String image;

	@OneToMany(mappedBy = "user", orphanRemoval = true)
	private List<Hoax> hoaxes;

	@OneToMany(mappedBy = "user", orphanRemoval = true)
	private List<Token> tokens;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList("Role_user");
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
