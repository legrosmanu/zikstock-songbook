package com.zikstock.songbook.domain;

public class ZikresourceRepositoryException extends Exception {
    public ZikresourceRepositoryException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }
}
