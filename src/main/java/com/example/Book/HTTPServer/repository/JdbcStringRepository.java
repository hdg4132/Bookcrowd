package com.example.Book.HTTPServer.repository;

import com.example.Book.HTTPServer.dto.BookDto;
import com.example.Book.HTTPServer.dto.RentDto;
import com.example.Book.HTTPServer.dto.StorageDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Objects;

@Repository
@RequiredArgsConstructor
public class JdbcStringRepository {

    public Connection connectJdbc() throws SQLException {
        String url = "jdbc:mysql://127.0.0.3:3306/jdbc";
        String username = "root";
        String password = "jaexhae03!2";
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

    public BookDto findByISBN(Connection connection, String ISBN) {
        String sql = "SELECT * FROM book WHERE ISBN=? and avilable = 1";
        BookDto bookDto = new BookDto(ISBN, null);
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, ISBN);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
//                System.out.println(resultSet);
//                JSONObject jsonObj1 = new JSONObject();
                JSONArray arr = new JSONArray();
//                ArrayList<JSONObject> arrayJson = new ArrayList<JSONObject>();
                while (resultSet.next()) {
                    String bookname = resultSet.getString(3);
                    String bookdonator = resultSet.getString(5);
                    String author = resultSet.getString(6);
                    String date = resultSet.getString(7);

                    JSONObject data1 = new JSONObject();
                    data1.put("bookname", bookname);
                    data1.put("bookdonator", bookdonator);
                    data1.put("author", author);
                    data1.put("date", date);
                    arr.add(data1);

                    ArrayList<JSONObject> arrayJson = new ArrayList<JSONObject>();
                    for (int k = 0; k < arr.size(); k++) {
                        JSONObject tempJson = (JSONObject) arr.get(k);
                        arrayJson.add(tempJson);
                    }
                    JSONObject[] jsons = new JSONObject[arrayJson.size()];
                    arrayJson.toArray(jsons);
//                    System.out.println(Arrays.toString(jsons));
                    bookDto.setBookbody(arrayJson.toString());

                }
            }
            catch (SQLException e) {
                e.printStackTrace();
            }
            return bookDto;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    public void saveBook(Connection connection, String ISBN, String messageBody) {
        String sql = "INSERT INTO book (ISBN, bookname, bookdonator, author, date) VALUES(?,?,?,?,?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, ISBN);
//            System.out.println(messageBody);
            JSONParser parser = new JSONParser();
            JSONObject book = (JSONObject) parser.parse(messageBody);
//            System.out.println(book);

            String bookname = String.valueOf(book.get("bookname"));
            String author = String.valueOf(book.get("author"));
            String bookdonator = String.valueOf(book.get("bookdonator"));
            String date = String.valueOf(book.get("date"));

            preparedStatement.setString(2, bookname);
            preparedStatement.setString(3, author);
            preparedStatement.setString(4, bookdonator);
            preparedStatement.setString(5, date);
            preparedStatement.executeUpdate();
        } catch (SQLException | ParseException ex) {
            throw new RuntimeException(ex);
        }
    }

    public void updateBook(Connection connection, String ISBN, String bookbody) {
        String sql = "UPDATE book SET avilable=? WHERE (ISBN=? and avilable=1) limit 1";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            JSONParser parser = new JSONParser();
            JSONObject book = (JSONObject) parser.parse(bookbody);
            String avilable = String.valueOf(book.get("avilable"));
            preparedStatement.setString(1, String.valueOf(avilable));
            preparedStatement.setString(2, ISBN);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    public void saveRent(Connection connection, String messageBody) {
        String sql = "INSERT INTO rent (username, bookname, ISBN, date) VALUES(?,?,?,?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
//            System.out.println(messageBody);
            JSONParser parser = new JSONParser();
            JSONObject rentsheeet = (JSONObject) parser.parse(messageBody);

            String rent = String.valueOf(rentsheeet.get("rentSheet"));
            JSONObject book = (JSONObject) parser.parse(rent);
//            System.out.println(book);

            String username = String.valueOf(book.get("username"));
            String bookname = String.valueOf(book.get("bookname"));
            String ISBN13 = String.valueOf(book.get("ISBN13"));
            String date = String.valueOf(book.get("date"));

            preparedStatement.setString(1, username);
            preparedStatement.setString(2, bookname);
            preparedStatement.setString(3, ISBN13);
            preparedStatement.setString(4, date);
            preparedStatement.executeUpdate();
        } catch (SQLException | ParseException ex) {
            throw new RuntimeException(ex);
        }
    }

    public RentDto findByApproval(Connection connection, String approval) {
        String sql = "SELECT * FROM rent WHERE approval=?";
        RentDto rentDto = new RentDto(approval, null);
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, approval);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                JSONArray arr = new JSONArray();
                while (resultSet.next()) {
                    String id = resultSet.getString(1);
                    String username = resultSet.getString(2);
                    String bookname = resultSet.getString(3);
                    String ISBN13 = resultSet.getString(4);
                    String date = resultSet.getString(5);

                    JSONObject data1 = new JSONObject();
                    data1.put("id", id);
                    data1.put("username", username);
                    data1.put("bookname", bookname);
                    data1.put("ISBN13", ISBN13);
                    data1.put("date", date);
                    data1.put("approval", approval);
                    arr.add(data1);

                    ArrayList<JSONObject> arrayJson = new ArrayList<JSONObject>();
                    for (int k = 0; k < arr.size(); k++) {
                        JSONObject tempJson = (JSONObject) arr.get(k);
                        arrayJson.add(tempJson);
                    }
                    JSONObject[] jsons = new JSONObject[arrayJson.size()];
                    arrayJson.toArray(jsons);
//                    System.out.println(Arrays.toString(jsons));
                    rentDto.setRentbody(arrayJson.toString());

                }
            }
            catch (SQLException e) {
                e.printStackTrace();
            }
            return rentDto;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void saveRentAdmin(Connection connection, String rentId, String messageBody) {
        String sql = "update rent set approval = ?, cause=? where id = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(3, rentId);
//            System.out.println(messageBody);
            JSONParser parser = new JSONParser();
            JSONObject req = (JSONObject) parser.parse(messageBody);

            String approval = String.valueOf(req.get("approval"));
            String cause = String.valueOf(req.get("cause"));
            preparedStatement.setString(1, approval);
            preparedStatement.setString(2, cause);
            preparedStatement.executeUpdate();
            // approval==3 > 반려처리되었을 경우 가능수량 추가를 위해 1개 가능으로 바꿈
            if (Objects.equals(approval, "3")) {
                String sql2 = "UPDATE book SET avilable=1 WHERE (ISBN=? and avilable=2) limit 1";
                try (PreparedStatement preparedStatement2 = connection.prepareStatement(sql2)) {
                    String ISBN13 = String.valueOf(req.get("ISBN13"));
                    preparedStatement2.setString(1, ISBN13);
                    preparedStatement2.executeUpdate();
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }
        } catch (SQLException | ParseException ex) {
            throw new RuntimeException(ex);
        }
    }

    public void saveWishlist(Connection connection, String messageBody) {
        String sql = "INSERT INTO wishlist (userid, bookname, ISBN) VALUES(?,?,?)";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            JSONParser parser = new JSONParser();
            JSONObject wishlistsheet = (JSONObject) parser.parse(messageBody);
//            System.out.println(wishlistsheet);
            String wishlist = String.valueOf(wishlistsheet.get("wishlistSheet"));
//            System.out.println(wishlist);
            JSONObject book = (JSONObject) parser.parse(wishlist);
//            System.out.println(book);

            String userid = String.valueOf(book.get("userid"));
            String bookname = String.valueOf(book.get("bookname"));
            String ISBN13 = String.valueOf(book.get("ISBN13"));

            preparedStatement.setString(1, userid);
            preparedStatement.setString(2, bookname);
            preparedStatement.setString(3, ISBN13);
            preparedStatement.executeUpdate();
        } catch (SQLException | ParseException ex) {
            throw new RuntimeException(ex);
        }
    }
}