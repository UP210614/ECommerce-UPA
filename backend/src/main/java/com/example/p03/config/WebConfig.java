package com.example.p03.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                String frontendIp = System.getenv("FRONTEND_IP");
                System.out.println("Frontend IP: " + frontendIp);
                String allowedOrigin = frontendIp;
                Boolean allowCredentials = Boolean.parseBoolean(System.getenv("ALLOW_CREDENTIALS"));
                registry.addMapping("/**")
                        .allowedOrigins(allowedOrigin )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(allowCredentials);
            }
        };
    }
}
