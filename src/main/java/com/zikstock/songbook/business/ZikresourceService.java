package com.zikstock.songbook.business;

import com.zikstock.songbook.dto.Zikresource;
import com.zikstock.songbook.repository.ZikresourceEntity;
import com.zikstock.songbook.repository.ZikresourceRepository;

import io.quarkus.panache.common.Sort;
import io.smallrye.mutiny.Uni;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ZikresourceService {
    final private ZikresourceRepository repository;

    public ZikresourceService(ZikresourceRepository repository) {
        this.repository = repository;
    }

    public Uni<List<Zikresource>> findAll() {
        return repository.listAll(Sort.by("artist"))
                .map(entities -> {
                    if (entities != null) {
                        return entities.stream().map(entity -> new Zikresource(entity)).toList();
                    } else {
                        return Collections.emptyList();
                    }
                });
    }

    public Uni<Zikresource> findOne(UUID id) {
        return repository.findById(id).map(entity -> entity == null ? null : new Zikresource(entity));
    }

    public Uni<Zikresource> createOne(Zikresource zikresourceToCreate) {
        return Uni.createFrom().item(zikresourceToCreate);
    }

    public Uni<Void> deleteOne(Zikresource zikresource) {
        if (zikresource == null) return null;
        return repository.delete(new ZikresourceEntity(zikresource));
    }
}
