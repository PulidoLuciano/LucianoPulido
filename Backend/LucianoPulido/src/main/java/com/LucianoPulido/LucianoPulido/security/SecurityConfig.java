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
            req.requestMatchers("/auth/**").permitAll();
            req.requestMatchers(HttpMethod.POST, "/contact").permitAll();
            req.requestMatchers(HttpMethod.GET, "/contact").hasRole("ADMIN");
            req.anyRequest().authenticated();
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
