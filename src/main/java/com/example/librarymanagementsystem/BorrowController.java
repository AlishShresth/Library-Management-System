package com.example.librarymanagementsystem;

import com.example.librarymanagementsystem.exception.ResourceNotFoundException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/borrows")
public class BorrowController {

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private BorrowService borrowService;

    @GetMapping
    public ResponseEntity<List<Borrow>> getAllBorrows() {
        return new ResponseEntity<List<Borrow>>(borrowService.allBorrows(),HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Optional<List<Borrow>>> getBorrowById(@PathVariable("userId") String userId)  {
        // ObjectId objectId = new ObjectId(id);
        // return borrowRepository.findBorrowById(objectId)
        //         .orElseThrow(() -> new ResourceNotFoundException("Borrow not found with id: " + id));
        return new ResponseEntity<Optional<List<Borrow>>>(borrowService.borrowsByUserId(userId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Borrow> addBorrow(@RequestBody Borrow borrow) {
        borrowService.borrowBook(borrow);
        Borrow addedBorrow = borrowRepository.save(borrow);
        return new ResponseEntity<>(addedBorrow, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Borrow> updateBorrow(@PathVariable("id") String id, @RequestBody Borrow borrowData) throws ResourceNotFoundException {
        ObjectId objectId = new ObjectId(id);
        System.out.println(objectId);
        System.out.println(borrowData);
        Borrow borrow = borrowService.borrowsById(objectId)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow not found with id: " + id));
        borrow.setBookId(borrowData.getBookId());
        borrow.setUserId(borrowData.getUserId());
        borrow.setBorrowDate(borrowData.getBorrowDate());
        borrow.setReturnDate(borrowData.getReturnDate());
        return new ResponseEntity<Borrow>( borrowRepository.save(borrow),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBorrow(@PathVariable("id") String id) throws ResourceNotFoundException {
        ObjectId objectId = new ObjectId(id);
        Borrow borrow = borrowService.borrowsById(objectId)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow not found with id: " + id));
        borrowService.returnBook(borrow);
        borrowRepository.delete(borrow);
        return ResponseEntity.noContent().build();
    }
}
