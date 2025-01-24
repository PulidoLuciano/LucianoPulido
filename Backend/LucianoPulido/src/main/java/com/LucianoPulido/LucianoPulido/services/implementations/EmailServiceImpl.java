package com.LucianoPulido.LucianoPulido.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.services.interfaces.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

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
    public void sendWelcomeEmail(User user, String token) throws MessagingException{
        MimeMessage message = javaMailSender.createMimeMessage();

        message.setSubject("Welcome to my blog! Verify your email");
        message.setRecipients(MimeMessage.RecipientType.TO, user.getEmail());

        String verificationLink = "http://localhost:5173/verify?token=" + token;
        String htmlContent = "<html lang=\"en\">\r\n" + //
                        "<head>\r\n" + //
                        "    <meta charset=\"UTF-8\">\r\n" + //
                        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n" + //
                        "    <title>Registration Email</title>\r\n" + //
                        "    <style>\r\n" + //
                        "        body {\r\n" + //
                        "            font-family: Arial, sans-serif;\r\n" + //
                        "            background-color: #FEFAE0; /* tertiary color */\r\n" + //
                        "            margin: 0;\r\n" + //
                        "            padding: 0;\r\n" + //
                        "            color: #283618; /* primary dark color */\r\n" + //
                        "        }\r\n" + //
                        "\r\n" + //
                        "        .email-container {\r\n" + //
                        "            max-width: 600px;\r\n" + //
                        "            margin: 20px auto;\r\n" + //
                        "            background-color: #fff;\r\n" + //
                        "            border: 1px solid #DDA15E; /* secondary light color */\r\n" + //
                        "            border-radius: 8px;\r\n" + //
                        "            overflow: hidden;\r\n" + //
                        "            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\r\n" + //
                        "        }\r\n" + //
                        "\r\n" + //
                        "        .email-header {\r\n" + //
                        "            background-color: #606C38; /* primary dark color */\r\n" + //
                        "            color: #FEFAE0; /* tertiary color */\r\n" + //
                        "            text-align: center;\r\n" + //
                        "            padding: 20px;\r\n" + //
                        "        }\r\n" + //
                        "\r\n" + //
                        "        .email-header h1 {\r\n" + //
                        "            margin: 0;\r\n" + //
                        "            font-size: 24px;\r\n" + //
                        "        }\r\n" + //
                        "\r\n" + //
                        "        .email-body {\r\n" + //
                        "            padding: 20px;\r\n" + //
                        "        }\r\n" + //
                        "\r\n" + //
                        "        .email-body p {\r\n" + //
                        "            line-height: 1.6;\r\n" + //
                        "            margin: 10px 0;\r\n" + //
                        "        }\r\n" + //
                        "\r\n" + //
                        "        .email-button {\r\n" + //
                        "            display: block;\r\n" + //
                        "            margin: 20px auto;\r\n" + //
                        "            padding: 10px 20px;\r\n" + //
                        "            background-color: #606C38; /* primary light color */\r\n" + //
                        "            color: #FEFAE0; /* tertiary color */\r\n" + //
                        "            text-decoration: none;\r\n" + //
                        "            border-radius: 4px;\r\n" + //
                        "            text-align: center;\r\n" + //
                        "            font-weight: bold;\r\n" + //
                        "        }\r\n" + //
                        "\r\n" + //
                        "        .email-footer {\r\n" + //
                        "            background-color: #DDA15E; /* secondary light color */\r\n" + //
                        "            text-align: center;\r\n" + //
                        "            padding: 10px;\r\n" + //
                        "            color: #283618; /* primary dark color */\r\n" + //
                        "            font-size: 14px;\r\n" + //
                        "        }\r\n" + //
                        "\r\n" + //
                        "        .email-footer a {\r\n" + //
                        "            color: #283618;\r\n" + //
                        "            text-decoration: none;\r\n" + //
                        "        }\r\n" + //
                        "\r\n" + //
                        "        .email-footer a:hover {\r\n" + //
                        "            text-decoration: underline;\r\n" + //
                        "        }\r\n" + //
                        "    </style>\r\n" + //
                        "</head>\r\n" + //
                        "<body>\r\n" + //
                        "    <div class=\"email-container\">\r\n" + //
                        "        <div class=\"email-header\">\r\n" + //
                        "            <h1>Welcome to my blog!</h1>\r\n" + //
                        "        </div>\r\n" + //
                        "        <div class=\"email-body\">\r\n" + //
                        "            <p>Hi " + user.getUsername() + ",</p>\r\n" + //
                        "            <p>Thanks for signing up! I’m really happy to have you here.</p>\r\n" + //
                        "            <p>Just one last step: click the button below to verify your email address and activate your account:</p>\r\n" + //
                        "            <a href=\""+ verificationLink + "\" class=\"email-button\">Verify Email</a>\r\n" + //
                        "            <p>If this wasn’t you, don’t worry—you can just ignore this email or contact me to this same e-mail address.</p>\r\n" + //
                        "        </div>\r\n" + //
                        "        <div class=\"email-footer\">\r\n" + //
                        "            <p>Luciano Nicolás Pulido</p>\r\n" + //
                        "            <p>Software developer</p>\r\n" + //
                        "        </div>\r\n" + //
                        "    </div>\r\n" + //
                        "</body>\r\n" + //
                        "</html>\r\n" + //
                        "";
        message.setContent(htmlContent, "text/html; charset=utf-8");
        javaMailSender.send(message);

    }

    @Override
    public void sendForgotPasswordEmail() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'sendForgotPasswordEmail'");
    }
}
