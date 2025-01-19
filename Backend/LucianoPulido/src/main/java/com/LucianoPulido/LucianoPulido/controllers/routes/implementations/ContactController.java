package com.LucianoPulido.LucianoPulido.controllers.routes.implementations;

import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.ContactDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.mappers.ContactMapper;
import com.LucianoPulido.LucianoPulido.controllers.routes.base.GenericController;
import com.LucianoPulido.LucianoPulido.models.Contact;
import com.LucianoPulido.LucianoPulido.services.interfaces.ContactService;

@RestController
@RequestMapping("/contact")
public class ContactController extends GenericController<Contact, UUID, ContactService, ContactDTO, ContactMapper>{

    @GetMapping("/dashboard")
    public Set<Contact> getArticleDashboardInfo(@RequestParam("limit") int limit, @RequestParam("offset") int offset) {
        Set<Contact> response = super.getServicio().findWithPagination(limit, offset);
        return response;
    }

    @GetMapping("/count")
    public Map<String, Long> countContacts() {
        return Map.of("count", super.getServicio().count());
    }
}
