package com.example.librarymanagementsystem;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BorrowRepository extends MongoRepository<Borrow, ObjectId> {
    Optional<List<Borrow>> findBorrowsByUserIdRegex(String userId);
    Optional<Borrow> findBorrowById(ObjectId id);

}