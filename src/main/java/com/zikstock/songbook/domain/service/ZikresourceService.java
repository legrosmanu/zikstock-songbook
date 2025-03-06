package com.zikstock.songbook.domain.service;

import com.zikstock.songbook.domain.Zikresource;
import com.zikstock.songbook.domain.in.CrudZikresource;
import com.zikstock.songbook.domain.out.ZikresourceRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@ApplicationScoped
public class ZikresourceService implements CrudZikresource {

    private final ZikresourceRepository repository;

    public ZikresourceService(ZikresourceRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Zikresource> findOne(UUID zikresourceId) throws ZikresourceRepositoryException {
        return repository.findById(zikresourceId);
    }

    @Override
    public List<Zikresource> findByCreatedBy(String username) throws ExecutionException, InterruptedException {
        return repository.findByCreatedBy(username);
    }

    @Override
    @Transactional
    public Zikresource create(Zikresource zikresource) {
        return repository.save(zikresource);
    }

    @Override
    @Transactional
    public void delete(UUID zikresourceId) throws ZikresourceRepositoryException {
        var optOfZikresource = findOne(zikresourceId);
        if (optOfZikresource.isEmpty()) {
            return;
        }

        repository.delete(zikresourceId);
    }
}
