package com.example.librarymanagementsystem;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends MongoRepository<Book, ObjectId> {
    Optional<Book> findBookById(String id);
    List<Book> findBooksByTitleRegex(String title);
    List<Book> findBooksByAuthorRegex(String author);
    List<Book> findBooksByCategoriesRegex(String categories);

    @Query("update Book b set b.borrowed = true where b.id = :bookId")
    void markBookAsBorrowed(@Param("bookId") String bookId);

    @Query("update Book b set b.borrowed = false where b.id = :bookId")
    void markBookAsReturned(@Param("bookId") String bookId);

    @Query("delete Book b where b.id= :id")
    void deleteById(@Param("id") String id);
}
