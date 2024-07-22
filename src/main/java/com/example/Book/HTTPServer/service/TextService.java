package com.example.Book.HTTPServer.service;

import com.example.Book.HTTPServer.dto.ManipulateState;
import com.example.Book.HTTPServer.dto.StorageDto;
import com.example.Book.HTTPServer.exeption.NotFoundException;
import com.example.Book.HTTPServer.repository.JdbcStringRepository;
import java.sql.Connection;
import java.sql.SQLException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TextService {

    private final JdbcStringRepository jdbcStringRepository;

    public ManipulateState manipulateFromPostAndText(String textId, String messageBody)
        throws NotFoundException, SQLException {
        Connection connection = null;
        try {
            connection = jdbcStringRepository.connectJdbc();
            if (textId != null && messageBody != null) {
                jdbcStringRepository.save(connection, textId, messageBody);
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

    public String manipulateFromGetAndText(String textId) throws NotFoundException, SQLException {
        Connection connection = null;
        try {
            connection = jdbcStringRepository.connectJdbc();
            StorageDto storageDto = jdbcStringRepository.findByTextId(connection, textId);
            if (textId != null && storageDto != null) {
                return storageDto.getMessageBody();
            } else {
                throw new NotFoundException();
            }
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public ManipulateState manipulateFromDeleteAndText(String textId)
        throws NotFoundException, SQLException {
        Connection connection = null;
        try {
            connection = jdbcStringRepository.connectJdbc();
            StorageDto storageDto = jdbcStringRepository.findByTextId(connection, textId);
            if (textId != null && storageDto != null) {
                jdbcStringRepository.delete(connection, textId);
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

    public ManipulateState manipulateFromPutAndText(String textId, String messageBody)
        throws NotFoundException, SQLException {
        Connection connection = null;
        try {
            connection = jdbcStringRepository.connectJdbc();
            StorageDto storageDto = jdbcStringRepository.findByTextId(connection, textId);
            if (textId != null && messageBody != null && storageDto != null) {
                jdbcStringRepository.update(connection, textId, messageBody);
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
