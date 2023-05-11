package com.example.librarymanagementsystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    // private List<User> userList;

    @Autowired
    private UserRepository userRepository;

    // public UserService() {
    //     userList = new ArrayList<>();
    // }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> userById(String id){
        return userRepository.findUserByIdRegex(id);
    }
    
    public Optional<User> userByEmail(String email){
        return userRepository.findUserByEmailRegex(email);
    
    }
    public User addUser(User user) {
        try{
        user.setPassword(user.getPassword());}catch(Exception e){
            System.out.println(e);
        }
        return userRepository.save(user);
    }

    public void deleteUserById(String id) {
        // userList.removeIf(user -> Objects.equals(user.getId(), id));
        userRepository.deleteById(id);
    }
}
