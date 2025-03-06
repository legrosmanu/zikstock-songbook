package com.zikstock.songbook.domain.service;

public class ZikresourceRepositoryException extends Exception {
    public ZikresourceRepositoryException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }
}
