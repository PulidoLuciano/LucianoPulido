package com.LucianoPulido.LucianoPulido.services.interfaces;

import java.util.Set;

import com.LucianoPulido.LucianoPulido.models.Article;
import com.LucianoPulido.LucianoPulido.models.User;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendArticleEmail(Article article, Set<User> users) throws MessagingException;
    void sendWelcomeEmail(User user, String token) throws MessagingException;
    void sendForgotPasswordEmail(User user, String token) throws MessagingException;
}
