package com.example.librarymanagementsystem;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BorrowService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Borrow> allBorrows() {
        return borrowRepository.findAll();
    }
    
    public Optional<List<Borrow>> borrowsByUserId(String userId){
        return borrowRepository.findBorrowsByUserIdRegex(userId);
    }
    
    public Optional<Borrow> borrowsById(ObjectId id){
        return borrowRepository.findBorrowById(id);
    }
    
    public void borrowBook(Borrow borrow) {
        bookRepository.markBookAsBorrowed(borrow.getBookId());
        borrow.setBorrowDate(LocalDate.now());
        borrow.setReturnDate(borrow.getBorrowDate().plusDays(14)); // assume a 2-week borrowing period
        borrowRepository.save(borrow);
    }

    public boolean borrowBook(String userId, String bookId) {
        Optional<User> userOptional = userRepository.findUserByIdRegex(userId);
        Optional<Book> bookOptional = bookRepository.findBookById(bookId);

        if (userOptional.isPresent() && bookOptional.isPresent()) {
            User user = userOptional.get();
            Book book = bookOptional.get();

            if (book.isAvailable()) {
                // mark the book as borrowed
                book.setAvailable(false);
                bookRepository.save(book);

                // create a new Borrow object
                Borrow borrow = new Borrow();
                borrow.setBookId(bookId);
                borrow.setUserId(userId);
                borrow.setBorrowDate(LocalDate.now());
                borrowRepository.save(borrow);

                return true;
            }
        }

        return false;
    }

    public void saveBorrow(Borrow borrow) {
        borrowRepository.save(borrow);
    }

    public void returnBook(Borrow borrow) {
        bookRepository.markBookAsReturned(borrow.getBookId());
        borrow.setReturnDate(LocalDate.now());
        borrowRepository.save(borrow);
    }
}
