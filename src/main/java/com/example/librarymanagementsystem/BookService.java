package com.example.librarymanagementsystem;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> allBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> singleBookById(String id){
     return bookRepository.findBookById(id);
    }

    public List<Book> booksByTitleRegex(String title) {
        return bookRepository.findBooksByTitleRegex(title);
    }

    public List<Book> booksByAuthorRegex(String author) {
        return bookRepository.findBooksByAuthorRegex(author);
    }

    public List<Book> booksByCategoriesRegex(String categories) {
        return bookRepository.findBooksByCategoriesRegex(categories);
    }

    public Book addBook(Book book){
        return bookRepository.save(book);
    }

    public void deleteBookById(String id) {
        bookRepository.deleteById(id);
    }

}
