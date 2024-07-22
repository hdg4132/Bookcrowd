package com.example.Book.HTTPServer.repository;

import com.example.Book.HTTPServer.dto.StorageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.sql.*;

@Repository
@RequiredArgsConstructor
public class JdbcStringRepository {

    public Connection connectJdbc() throws SQLException {
        String url = "jdbc:mysql://127.0.0.3:3306/jdbc";
        String username = "root";
        String password = "1234";
        return DriverManager.getConnection(url
            , username
            , password);
    }

    public void save(Connection connection, String textId, String messageBody) {
        String sql = "INSERT INTO storage (txt_id, message) VALUES(?,?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, textId);
            preparedStatement.setString(2, messageBody);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void update(Connection connection, String textId, String messageBody) {
        String sql = "UPDATE storage SET message=? WHERE txt_id=?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, messageBody);
            preparedStatement.setString(2, textId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public StorageDto findByTextId(Connection connection, String textId) {
        String sql = "SELECT * FROM storage WHERE txt_id=?";
        StorageDto storageDto = null;
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, textId);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    String id = resultSet.getString(2);
                    String message = resultSet.getString(3);
                    storageDto = new StorageDto(id, message);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return storageDto;
    }

    public void delete(Connection connection, String textId) {
        String sql = "DELETE FROM storage WHERE txt_id=?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, textId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
