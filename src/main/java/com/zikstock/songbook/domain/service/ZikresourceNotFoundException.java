package com.zikstock.songbook.domain.service;

public class ZikresourceNotFoundException extends RuntimeException {
    public ZikresourceNotFoundException(String message) {
        super(message);
    }
}
