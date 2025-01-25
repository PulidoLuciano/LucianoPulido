package com.LucianoPulido.LucianoPulido.services.interfaces;

import com.LucianoPulido.LucianoPulido.models.User;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendArticleEmail() throws MessagingException;
    void sendWelcomeEmail(User user, String token) throws MessagingException;
    void sendForgotPasswordEmail(User user, String token) throws MessagingException;
}
