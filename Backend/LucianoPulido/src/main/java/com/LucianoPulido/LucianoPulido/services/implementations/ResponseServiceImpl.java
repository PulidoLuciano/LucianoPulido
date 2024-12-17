package com.LucianoPulido.LucianoPulido.services.implementations;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.Response;
import com.LucianoPulido.LucianoPulido.persistence.repositories.ResponseRepository;
import com.LucianoPulido.LucianoPulido.services.base.GenericServiceImpl;
import com.LucianoPulido.LucianoPulido.services.interfaces.ResponseService;

@Service
public class ResponseServiceImpl extends GenericServiceImpl<Response, UUID, ResponseRepository> implements ResponseService{

}
