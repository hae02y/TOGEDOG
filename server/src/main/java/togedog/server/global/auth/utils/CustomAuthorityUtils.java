package togedog.server.global.auth.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {

    private String adminMailAdress = "admin@admin.com";

    private final List<GrantedAuthority> ADMIN_ROLES = AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_USER");
    private final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("ROLE_USER");
    private final List<String> ADMIN_ROLES_STRING  = List.of("ADMIN", "USER");
    private final List<String> USER_ROLE_STRING = List.of("USER");

    public List<GrantedAuthority> createAuthorities(String email){
        if(email.equals(adminMailAdress)){
            return ADMIN_ROLES;
        }else {
            return USER_ROLES;
        }
    }

    //DB에 저장된 ROLE을 기반으로 권한 정보 생성.
    public List<GrantedAuthority> createAuthorities(List<String> roles){
        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE" + role))
                .collect(Collectors.toList());

        return authorities;
    }

    public List<String> createRoles(String email){
        if(email.equals(adminMailAdress)){
            return ADMIN_ROLES_STRING;
        }else {
            return USER_ROLE_STRING;
        }
    }

}
