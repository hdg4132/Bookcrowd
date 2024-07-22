package com.example.Book.HTTPServer.controller;

import com.example.Book.HTTPServer.exeption.NotFoundException;
import com.example.Book.HTTPServer.service.RentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RentController {

    private final RentService rentService;

    @PostMapping("/api/rent")
    public ResponseEntity postForRent(@RequestBody String messageBody) throws SQLException {
        try {
            rentService.manipulateFromPostAndRent(messageBody);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(null);
        } catch (NotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @GetMapping("/api/rent/{approval}")
    public ResponseEntity getFromRent(@PathVariable String approval) throws SQLException {
        // 승인에 따라 rent 목록 불러오기, 1은 미승인, 2는 승인, 3은 반려
        try {
            var stringOfISBN = rentService.manipulateFromGetAndRent(approval);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(stringOfISBN);
        } catch (NotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @PutMapping("/api/rent_admin/{id}")
    public ResponseEntity PutAndRentAdmin(@PathVariable String id,
                                          @RequestBody String messageBody) throws SQLException {
        try {
            rentService.manipulateFromPutAndRentAdmin(id, messageBody);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(null);
        } catch (NotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @PostMapping("/api/wishlist")
    public ResponseEntity postForWishlist(@RequestBody String messageBody) throws SQLException {
        try {
            rentService.manipulateFromPostAndWishlist(messageBody);
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
