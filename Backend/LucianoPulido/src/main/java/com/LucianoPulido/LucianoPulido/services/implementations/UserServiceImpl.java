package com.LucianoPulido.LucianoPulido.services.implementations;

import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.persistence.repositories.UserRepository;
import com.LucianoPulido.LucianoPulido.services.base.GenericServiceImpl;
import com.LucianoPulido.LucianoPulido.services.interfaces.UserService;

@Service
public class UserServiceImpl extends GenericServiceImpl<User, String, UserRepository> implements UserService{

}
