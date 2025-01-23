package com.LucianoPulido.LucianoPulido.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.services.interfaces.EmailService;

@Service
public class EmailServiceImpl implements EmailService{

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendArticleEmail() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'sendArticleEmail'");
    }

    @Override
    public void sendWelcomeEmail() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'sendWelcomeEmail'");
    }

    @Override
    public void sendForgotPasswordEmail() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'sendForgotPasswordEmail'");
    }
}
