package com.example.librarymanagementsystem;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Document(collection="books")
@Data
@NoArgsConstructor
public class Book {
    @Id
    private String id;
    private String title;
    private String author;
    private String categories;
    private String year;
    private String edition;
    private String pages;
    private String cover;
    private boolean available;
    @DocumentReference private Borrow borrowRecord;

    public Book(@JsonProperty("id") String id, @JsonProperty("title") String title,
                @JsonProperty("author") String author, @JsonProperty("categories") String categories,
                @JsonProperty("year") String year, @JsonProperty("edition") String edition,
                @JsonProperty("pages") String pages, @JsonProperty("cover") String cover) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.categories = categories;
        this.year = year;
        this.edition = edition;
        this.pages = pages;
        this.cover = cover;
        this.available=true;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategories() {
        return categories;
    }

    public void setCategories(String categories) {
        this.categories = categories;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getEdition() {
        return edition;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public String getPages() {
        return pages;
    }

    public void setPages(String pages) {
        this.pages = pages;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public boolean isAvailable() {
        // a book is available if it has no borrow record or its borrow record has been returned
        return borrowRecord == null || borrowRecord.getReturnDate() != null;
    }
}
