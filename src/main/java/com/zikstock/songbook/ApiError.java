package com.zikstock.songbook;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.sql.Timestamp;
import java.time.Instant;

@Data
public class ApiError {

    private Timestamp timestamp;
    private int status;
    private String error;
    private String message;

    public ApiError(HttpStatus status, String error, String message) {
        this.timestamp = Timestamp.from(Instant.now());
        this.status = status.value();
        this.error = error;
        this.message = message;
    }

}
