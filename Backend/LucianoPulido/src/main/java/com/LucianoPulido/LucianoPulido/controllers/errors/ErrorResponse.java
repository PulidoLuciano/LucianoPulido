package com.LucianoPulido.LucianoPulido.controllers.errors;

import java.util.Map;

public class ErrorResponse {

    String error;
    Map<String, String> details;
    
    public ErrorResponse(String error) {
        this.error = error;
    }

    public ErrorResponse(String error, Map<String, String> details) {
        this.error = error;
        this.details = details;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public Map<String, String> getDetails() {
        return details;
    }

    public void setDetails(Map<String, String> details) {
        this.details = details;
    }
}
