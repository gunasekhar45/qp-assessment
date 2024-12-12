package com.grocery.booking.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.grocery.booking.model.GroceryItem;

public interface GroceryItemRepository extends JpaRepository<GroceryItem, Long> {
}


