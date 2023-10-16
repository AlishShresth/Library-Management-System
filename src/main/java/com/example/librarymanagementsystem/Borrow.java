package com.example.librarymanagementsystem;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="borrows")
@Data
@NoArgsConstructor
public class Borrow {
    @Id
    private String id;
    private String bookId;
    private String userId;
    private Date borrowDate;
    private Date returnDate;

    public Borrow(@JsonProperty("id")String id, @JsonProperty("bookId") String bookId, @JsonProperty("userId") String userId, @JsonProperty("borrowDate") LocalDate borrowDate, @JsonProperty("returnDate") LocalDate returnDate) {
        this.id=id;
        this.bookId = bookId;
        this.userId = userId;
        this.borrowDate = Date.from(borrowDate.atStartOfDay().toInstant(ZoneOffset.UTC));
        this.returnDate = Date.from(returnDate.atStartOfDay().toInstant(ZoneOffset.UTC));
    }

    public Borrow(String bookId, String userId, LocalDate borrowDate) {
        this.bookId = bookId;
        this.userId = userId;
        this.borrowDate = Date.from(borrowDate.atStartOfDay().toInstant(ZoneOffset.UTC));
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDate getBorrowDate() {
        return borrowDate.toInstant().atZone(ZoneOffset.UTC).toLocalDate();
    }

    public void setBorrowDate(LocalDate borrowDate) {
        this.borrowDate = Date.from(borrowDate.atStartOfDay().toInstant(ZoneOffset.UTC));
    }

    public LocalDate getReturnDate() {
        return returnDate.toInstant().atZone(ZoneOffset.UTC).toLocalDate();
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = Date.from(returnDate.atStartOfDay().toInstant(ZoneOffset.UTC));
    }
}
