package com.example.Book.HTTPServer.service;

import com.example.Book.HTTPServer.dto.BookDto;
import com.example.Book.HTTPServer.dto.ManipulateState;
import com.example.Book.HTTPServer.exeption.NotFoundException;
import com.example.Book.HTTPServer.repository.JdbcStringRepository;
import java.sql.Connection;
import java.sql.SQLException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {

    private final JdbcStringRepository jdbcStringRepository;

    public String manipulateFromGetAndBook(String isbn) throws NotFoundException, SQLException {
        Connection connection = jdbcStringRepository.connectJdbc();
        try {
            BookDto bookDto = jdbcStringRepository.findByISBN(connection, isbn);
            if (isbn != null) {
                return bookDto.getBookbody();
            } else {
                throw new NotFoundException();
            }
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public ManipulateState manipulateFromPostAndBook(String ISBN, String messageBody)
            throws NotFoundException, SQLException {
        Connection connection = null;
        try {
            connection = jdbcStringRepository.connectJdbc();
            if (ISBN != null && messageBody != null) {
                jdbcStringRepository.saveBook(connection, ISBN, messageBody);
                return ManipulateState.SUCCESS;
            } else {
                throw new NotFoundException();
            }
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public ManipulateState manipulateFromPutAndBook(String ISBN, String bookbody)
            throws NotFoundException, SQLException {
        Connection connection = null;
        try {
            connection = jdbcStringRepository.connectJdbc();
            BookDto bookDto = jdbcStringRepository.findByISBN(connection, ISBN);
            if (ISBN != null && bookbody != null && bookDto != null) {
                jdbcStringRepository.updateBook(connection, ISBN, bookbody);
                return ManipulateState.SUCCESS;
            } else {
                throw new NotFoundException();
            }
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }
}
