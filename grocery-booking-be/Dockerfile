# Use a base image for Java Spring Boot
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the backend application jar file
COPY target/grocery-booking-be-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
