package com.zikstock.songbook.repository;

import java.util.UUID;

import javax.enterprise.context.ApplicationScoped;

import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;

@ApplicationScoped
public class ZikresourceRepository implements PanacheRepositoryBase<ZikresourceEntity, UUID> {
    
}
