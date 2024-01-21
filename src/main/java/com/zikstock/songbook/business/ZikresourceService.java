package com.zikstock.songbook.business;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import com.zikstock.songbook.dto.Zikresource;
import com.zikstock.songbook.repository.ZikresourceEntity;
import com.zikstock.songbook.repository.ZikresourceRepository;

import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ZikresourceService {
    final private ZikresourceRepository repository;

    public ZikresourceService(ZikresourceRepository repository) {
        this.repository = repository;
    }

    public List<Zikresource> findAll() {
        return repository.listAll(Sort.by("artist")).stream()
                .filter(Objects::nonNull)
                .map(entity -> new Zikresource(entity))
                .toList();
    }

    public Zikresource findOne(UUID id) {
        var zikresourceFromDb = repository.findByIdOptional(id);
        if (zikresourceFromDb.isEmpty()) return null;
        return new Zikresource(zikresourceFromDb.get());
    }

    public Zikresource createOne(Zikresource zikresourceToCreate) {
        // TODO
        return null;
    }

    public boolean deleteOne(UUID id) {
        var existingZikresource = findOne(id);
        if (existingZikresource != null) {
            repository.delete(new ZikresourceEntity(existingZikresource));
            return true;
        }
        return false;
    }
}
