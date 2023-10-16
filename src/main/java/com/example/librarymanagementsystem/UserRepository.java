package com.example.librarymanagementsystem;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findUserByIdRegex(String id);
    Optional<User> findUserByEmailRegex(String email);
    
    @Query("delete User u where u.id= :id")
    void deleteById(@Param("id") String id);
}