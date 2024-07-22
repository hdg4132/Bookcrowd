package com.example.Book.HTTPServer.controller;

import com.example.Book.HTTPServer.exeption.NotFoundException;
import com.example.Book.HTTPServer.service.TextService;
import java.sql.SQLException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class TextController {

    private final TextService textService;

    @GetMapping("/api/text/{textId}")
    public ResponseEntity getFromTextAndTextId(@PathVariable String textId) throws SQLException {
        try {
            var stringOfTextId = textService.manipulateFromGetAndText(textId);
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(stringOfTextId);
        } catch (NotFoundException e) {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(null);
        }
    }

    @PostMapping("/api/text/{textId}")
    public ResponseEntity postFromText(@PathVariable String textId,
        @RequestBody String messageBody) throws SQLException {
        try {
            textService.manipulateFromPostAndText(textId, messageBody);
            return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(null);
        } catch (NotFoundException e) {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(null);
        }
    }

    @PutMapping("/api/text/{textId}")
    public ResponseEntity putFromText(@PathVariable String textId,
        @RequestBody String messageBody) throws SQLException {
        try {
            textService.manipulateFromPutAndText(textId, messageBody);
            return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(null);
        } catch (NotFoundException e) {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(null);
        }
    }

    @DeleteMapping("/api/text/{textId}")
    public ResponseEntity deleteFromTextAndTextId(@PathVariable String textId) throws SQLException {
        try {
            textService.manipulateFromDeleteAndText(textId);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (NotFoundException e) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}

