package com.example.librarymanagementsystem;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Document(collection="users")
@Data
@NoArgsConstructor

public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String phone;
    private String password;

    public User(@JsonProperty("id") String id, @JsonProperty("name") String name, @JsonProperty("email") String email, @JsonProperty("phone") String phone,@JsonProperty("password") String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password=password;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }


    // getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) throws NoSuchAlgorithmException {
        this.password = encryptPassword(password);
    }

    protected String encryptPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(password.getBytes());
        byte[] bytes = md.digest();
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
