package com.grocery.booking.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grocery.booking.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}

