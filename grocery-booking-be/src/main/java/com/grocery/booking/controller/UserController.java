package com.grocery.booking.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grocery.booking.model.GroceryItem;
import com.grocery.booking.model.Order;
import com.grocery.booking.service.GroceryItemService;
import com.grocery.booking.service.OrderService;

@RestController
@RequestMapping("/api")
@PreAuthorize("hasRole('USER')")
public class UserController {

    @Autowired
    private GroceryItemService groceryItemService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/grocery-items")
    public ResponseEntity<List<GroceryItem>> getAllGroceryItems() {
        return ResponseEntity.ok(groceryItemService.getAllGroceryItems());
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.createOrder(order));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getUserOrders() {
        // Assuming you have a way to get the current user's ID
        Long userId = getCurrentUserId();
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        }
        return ResponseEntity.notFound().build();
    }

    // Helper method to get the current user's ID (implementation depends on your authentication setup)
    private Long getCurrentUserId() {
        // Implement this method based on your authentication mechanism
        return null;
    }
}


