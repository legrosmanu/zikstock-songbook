package com.zikstock.songbook.domain;

import com.zikstock.songbook.domain.in.CrudZikresource;
import com.zikstock.songbook.domain.out.ZikresourceRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.Optional;
import java.util.UUID;

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
    @Transactional
    public Zikresource create(Zikresource zikresource) {
        return repository.save(zikresource);
    }

}
