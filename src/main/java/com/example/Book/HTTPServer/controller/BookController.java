package com.example.Book.HTTPServer.controller;
import com.example.Book.HTTPServer.exeption.NotFoundException;
import com.example.Book.HTTPServer.service.BookService;

import java.sql.SQLException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    private final BookService bookService;

    // @CrossOrigin(origins = ["http://localhost:3000"])
    @GetMapping("/api/book/{isbn}")
    public ResponseEntity getFromBook(@PathVariable String isbn) throws SQLException {
        try {
            var stringOfISBN = bookService.manipulateFromGetAndBook(isbn);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(stringOfISBN);
        } catch (NotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @PostMapping("/api/book/{isbn}")
    public ResponseEntity postFromISBN(@PathVariable String isbn,
                                       @RequestBody String messageBody) throws SQLException {
        try {
            bookService.manipulateFromPostAndBook(isbn, messageBody);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(null);
        } catch (NotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @PutMapping("/api/book/{isbn}")
    public ResponseEntity putFromISBN(@PathVariable String isbn,
                                      @RequestBody String bookBody) throws SQLException {
        try {
            bookService.manipulateFromPutAndBook(isbn, bookBody);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(null);
        } catch (NotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }
}