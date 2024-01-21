package com.zikstock.songbook.repository;

import jakarta.enterprise.context.ApplicationScoped;

import java.util.UUID;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

@ApplicationScoped
public class ZikresourceRepository implements PanacheRepositoryBase<ZikresourceEntity, UUID> {
    
}
