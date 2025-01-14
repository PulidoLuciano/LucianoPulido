package com.LucianoPulido.LucianoPulido.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    CustomCorsConfiguration customCorsConfiguration;
    @Autowired
    AuthenticationProvider authenticationProvider;
    @Autowired
    JwtAuthFilter jwtAuthFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.cors(cors -> cors.configurationSource(customCorsConfiguration))
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests((req) -> {
            //Authentication and users
            req.requestMatchers("/auth/**").permitAll();
            req.requestMatchers("/user/exists").permitAll();
            //Categories
            req.requestMatchers(HttpMethod.GET, "/category").permitAll();
            req.requestMatchers("/category/**").hasAnyAuthority("ADMIN");
            //Contacts
            req.requestMatchers(HttpMethod.GET, "/contact/**").hasAnyAuthority("ADMIN");
            req.requestMatchers(HttpMethod.POST, "/contact").permitAll();
            //Articles
            req.requestMatchers(HttpMethod.GET, "article/**").permitAll();
            req.requestMatchers(HttpMethod.POST, "article/**/comment").authenticated();
            req.requestMatchers("/article/**").hasAnyAuthority("ADMIN");
            //Comments
            req.requestMatchers("comment/**").hasAnyAuthority("ADMIN");
        }
        )
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        .exceptionHandling(exception -> {
            exception.accessDeniedHandler((req, res, accessDeniedException) -> {
                res.setStatus(403);
                res.setContentType("application/json");
                res.getWriter().write("{\"error\": \"Access denied\", \"details\"{\"message\": \"" + "You don't have permission to do that" + "\"}}");
            });
            exception.authenticationEntryPoint((req, res, authException) -> {
                res.setStatus(401);
                res.setContentType("application/json");
                res.getWriter().write("{\"error\": \"Unauthorized\", \"details\": {\"message\": \"" + "You need to be logged in to do that" + "\"}}");
            });
        })
        ;

        return http.build();
    }
}
