package com.example.Book.HTTPServer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookDto {
    private String ISBN;
    private String bookbody;
}
