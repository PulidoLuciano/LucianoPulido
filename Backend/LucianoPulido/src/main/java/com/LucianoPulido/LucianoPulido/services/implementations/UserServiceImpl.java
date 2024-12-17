package com.LucianoPulido.LucianoPulido.services.implementations;

import java.util.UUID;

import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.persistence.repositories.UserRepository;
import com.LucianoPulido.LucianoPulido.services.base.GenericServiceImpl;
import com.LucianoPulido.LucianoPulido.services.interfaces.UserService;

public class UserServiceImpl extends GenericServiceImpl<User, UUID, UserRepository> implements UserService{

}
