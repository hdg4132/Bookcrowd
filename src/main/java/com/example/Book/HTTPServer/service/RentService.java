package com.example.Book.HTTPServer.service;

import com.example.Book.HTTPServer.dto.BookDto;
import com.example.Book.HTTPServer.dto.RentDto;
import com.example.Book.HTTPServer.dto.ManipulateState;
import com.example.Book.HTTPServer.exeption.NotFoundException;
import com.example.Book.HTTPServer.repository.JdbcStringRepository;
import java.sql.Connection;
import java.sql.SQLException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RentService {

    private final JdbcStringRepository jdbcStringRepository;

    public ManipulateState manipulateFromPostAndRent(String messageBody)
            throws NotFoundException, SQLException {
        Connection connection = null;
        try {
            connection = jdbcStringRepository.connectJdbc();
            if (messageBody != null) {
                jdbcStringRepository.saveRent(connection, messageBody);
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

    public String manipulateFromGetAndRent(String approval) throws NotFoundException, SQLException {
        Connection connection = jdbcStringRepository.connectJdbc();
        try {
            RentDto rentDto = jdbcStringRepository.findByApproval(connection, approval);
            if (connection != null) {
                return rentDto.getRentbody();
            } else {
                throw new NotFoundException();
            }
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public ManipulateState manipulateFromPutAndRentAdmin(String rentId, String messageBody)
            throws NotFoundException, SQLException {
        Connection connection = null;
        try {
            connection = jdbcStringRepository.connectJdbc();
            if (messageBody != null) {
                jdbcStringRepository.saveRentAdmin(connection, rentId, messageBody);
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

    public ManipulateState manipulateFromPostAndWishlist(String messageBody)
            throws NotFoundException, SQLException {
        Connection connection = null;
        try {
            connection = jdbcStringRepository.connectJdbc();
            if (messageBody != null) {
                jdbcStringRepository.saveWishlist(connection, messageBody);
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
