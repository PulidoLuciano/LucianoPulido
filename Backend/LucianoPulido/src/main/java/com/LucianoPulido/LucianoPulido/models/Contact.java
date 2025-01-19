package com.LucianoPulido.LucianoPulido.models;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Contacts")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID) 
    private UUID id;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String subject;

    @Column
    private String message;

    @Column
    private Date date;

    public Contact() {
        this.date = new Date();
    }

    public Contact(String name, String email, String subject, String message) {
        setName(name);
        setEmail(email);
        setSubject(subject);
        setMessage(message);
        this.date = new Date();
    }

    public Contact(UUID id, String name, String email, String subject, String message) {
        setId(id);
        setName(name);
        setEmail(email);
        setSubject(subject);
        setMessage(message);
        this.date = new Date();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if(name.isBlank() || name == null) throw new IllegalArgumentException("Name must not be blank");
        if(name.length() > 30) throw new IllegalArgumentException("Name must not be longer than 30 characters");
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if(email.isBlank() || email == null) throw new IllegalArgumentException("Email must not be blank");
        if(!email.matches("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")) throw new IllegalArgumentException(email + " is not a valid email");
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        if(subject.isBlank() || subject == null) throw new IllegalArgumentException("Subject must not be blank");
        if(subject.length() > 30) throw new IllegalArgumentException("Subject must not be longer than 30 characters");
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        if(message.isBlank() || message == null) throw new IllegalArgumentException("Message must not be blank");
        if(message.length() > 300) throw new IllegalArgumentException("Message must not be longer than 300 characters");
        this.message = message;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
