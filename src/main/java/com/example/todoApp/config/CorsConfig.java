package com.example.todoApp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        // Allow credentials like cookies, authorization headers, etc.
        config.setAllowCredentials(true);
        // Specify allowed origins (e.g., your frontend URL)
        config.setAllowedOrigins(Arrays.asList("http://localhost:4200", "http://localhost:5173"));
        // Specify allowed HTTP methods
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        // Specify allowed headers
        config.setAllowedHeaders(Arrays.asList("Authorization", "Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers"));
        // Specify exposed headers that the client can access
        config.setExposedHeaders(Arrays.asList("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
        // Set the maximum age for pre-flight request caching
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Register the CORS configuration for all paths ("/**")
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}