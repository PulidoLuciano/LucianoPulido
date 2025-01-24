package com.LucianoPulido.LucianoPulido.controllers.errors;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.LucianoPulido.LucianoPulido.security.TokenException;

import jakarta.mail.MessagingException;

@ControllerAdvice
public class GlobalExceptionHandler{
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(NoResourceFoundException ex){
        ErrorResponse response = new ErrorResponse("Recurso no encontrado", createDetails(ex));
        return new ResponseEntity<>( response ,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ErrorResponse> handleMissingParametersOnRequest(MissingServletRequestParameterException ex){
        ErrorResponse response = new ErrorResponse("Faltan los parámetros en la query string", createDetails(ex));
        return new ResponseEntity<>( response ,HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        ErrorResponse response = new ErrorResponse("Los datos proporcionados no son correctos", errors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex){
        ErrorResponse response = new ErrorResponse("Los datos proporcionados son incorrectos", createDetails(ex));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException ex){
        ErrorResponse response = new ErrorResponse("E-mail o contraseña incorrectos", createDetails(ex));
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException ex){
        ErrorResponse response = new ErrorResponse("No tienes permisos para hacer eso", createDetails(ex));
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(TokenException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(TokenException ex){
        ErrorResponse response = new ErrorResponse("El token enviado es incorrecto", createDetails(ex));
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(HttpClientErrorException.class)
    public ResponseEntity<ErrorResponse> handleHttpClientException(Exception ex) {
        ErrorResponse response = new ErrorResponse("Hubo un error al hacer un llamado a una API externa", createDetails(ex));
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<ErrorResponse> handleMessagingException(MessagingException ex) {
        ErrorResponse response = new ErrorResponse("Hubo un error al enviar un correo", createDetails(ex));
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex) {
        System.err.println(ex.getClass());
        ErrorResponse response = new ErrorResponse("Ocurrió un error inesperado", createDetails(ex));
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> hadnleNoSuchElementException(NoSuchElementException ex) {
        ErrorResponse response = new ErrorResponse("No se encontraron los datos", createDetails(ex));
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Map<String, String> createDetails(Exception ex){
        Map<String, String> details = new HashMap<>();
        details.put("message", ex.getMessage());
        return details;
    }
}
