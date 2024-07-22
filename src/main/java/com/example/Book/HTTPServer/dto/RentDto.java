package com.example.Book.HTTPServer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RentDto {
    private String approval;
    private String rentbody;
}