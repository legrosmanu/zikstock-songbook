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

    @Override
    @Transactional
    public void delete(UUID zikresourceId) throws ZikresourceRepositoryException {
        var optOfZikresource = findOne(zikresourceId);
        if (optOfZikresource.isEmpty()) {
            throw new ZikresourceNotFoundException("Impossible to delete the unknown resource" + zikresourceId);
        }

        repository.delete(optOfZikresource.get());
    }
}
