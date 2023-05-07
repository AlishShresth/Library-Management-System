package com.example.librarymanagementsystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @Autowired
    private BorrowService borrowService;
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks(){
        return new ResponseEntity<List<Book>>(bookService.allBooks(),HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Book>> getSingleBookById(@PathVariable String id){
        return new ResponseEntity<Optional<Book>>(bookService.singleBookById(id),HttpStatus.OK);
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<List<Book>> getBooksByTitleRegex(@PathVariable String title) {
        return new ResponseEntity<List<Book>>(bookService.booksByTitleRegex(title), HttpStatus.OK);
    }

    @GetMapping("/author/{author}")
    public ResponseEntity<List<Book>> getBooksByAuthorRegex(@PathVariable String author) {
        return new ResponseEntity<List<Book>>(bookService.booksByAuthorRegex(author), HttpStatus.OK);
    }

    @GetMapping("/categories/{categories}")
    public ResponseEntity<List<Book>> getBooksByCategoriesRegex(@PathVariable String categories) {
        return new ResponseEntity<List<Book>>(bookService.booksByCategoriesRegex(categories), HttpStatus.OK);
    }

    // add a book
    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book){
        Book addedBook = bookService.addBook(book);
        return new ResponseEntity<>(addedBook, HttpStatus.CREATED);
    }

    // update a book
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable String id, @RequestBody Book book){
        Optional<Book> existingBook = bookService.singleBookById(id);
        if(existingBook.isPresent()){
            Book updatedBook = existingBook.get();
            updatedBook.setTitle(book.getTitle());
            updatedBook.setAuthor(book.getAuthor());
            updatedBook.setCategories(book.getCategories());
            updatedBook.setYear(book.getYear());
            updatedBook.setEdition(book.getEdition());
            updatedBook.setPages(book.getPages());
            updatedBook.setCover(book.getCover());
            bookRepository.save(updatedBook);
            return new ResponseEntity<Book>(updatedBook, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookById(@PathVariable String id){
        Optional<Book> book = bookRepository.findBookById(id);
        if(book.isPresent()){
            bookRepository.delete(book.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{bookId}/borrow/{userId}")
    public ResponseEntity<Borrow> borrowBook(@PathVariable("bookId") String bookId,
                                             @PathVariable("userId") String userId,
                                             @RequestParam(name="dueDate") LocalDate dueDate){
        Optional<Book> optionalBook = bookService.singleBookById(bookId);
        Optional<User> optionalUser = userService.userById(userId);

        if(optionalBook.isPresent() && optionalUser.isPresent()){
            Book book = optionalBook.get();
            User user = optionalUser.get();

            // Check if book is already borrowed
            if(!book.isAvailable()){
                return ResponseEntity.badRequest().build();
            }

            // Create a new borrow instance
            Borrow borrow = new Borrow(bookId, userId, dueDate);
            borrowService.saveBorrow(borrow);

            // Mark book as borrowed and save to database
            book.setAvailable(false);
            bookService.addBook(book);

            return ResponseEntity.ok(borrow);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

}
