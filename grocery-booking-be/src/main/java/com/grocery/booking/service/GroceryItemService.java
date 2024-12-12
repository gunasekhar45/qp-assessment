package com.grocery.booking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grocery.booking.model.GroceryItem;
import com.grocery.booking.repositories.GroceryItemRepository;

@Service
public class GroceryItemService {

    @Autowired
    private GroceryItemRepository groceryItemRepository;

    public GroceryItem addGroceryItem(GroceryItem groceryItem) {
        return groceryItemRepository.save(groceryItem);
    }

    public List<GroceryItem> getAllGroceryItems() {
        return groceryItemRepository.findAll();
    }

    public GroceryItem getGroceryItemById(Long id) {
        return groceryItemRepository.findById(id).orElse(null);
    }

    public GroceryItem updateGroceryItem(Long id, GroceryItem groceryItem) {
        GroceryItem existingItem = groceryItemRepository.findById(id).orElse(null);
        if (existingItem != null) {
            existingItem.setName(groceryItem.getName());
            existingItem.setPrice(groceryItem.getPrice());
            existingItem.setInventory(groceryItem.getInventory());
            return groceryItemRepository.save(existingItem);
        }
        return null;
    }

    public void deleteGroceryItem(Long id) {
        groceryItemRepository.deleteById(id);
    }

    public GroceryItem updateInventory(Long id, Integer quantity) {
        GroceryItem existingItem = groceryItemRepository.findById(id).orElse(null);
        if (existingItem != null) {
            existingItem.setInventory(existingItem.getInventory() + quantity);
            return groceryItemRepository.save(existingItem);
        }
        return null;
    }
}

