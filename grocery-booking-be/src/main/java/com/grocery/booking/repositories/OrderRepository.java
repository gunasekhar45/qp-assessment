package com.grocery.booking.repositories;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.grocery.booking.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
}

