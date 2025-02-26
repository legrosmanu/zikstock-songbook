package com.zikstock.songbook.domain;

import com.zikstock.songbook.domain.in.CrudZikresource;
import com.zikstock.songbook.domain.out.ZikresourceRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@ApplicationScoped
public class ZikresourceService implements CrudZikresource {

    @Inject
    ZikresourceRepository repository;

    @Override
    public Optional<Zikresource> findOne(UUID zikresourceId) throws ExecutionException, InterruptedException {
        return repository.findById(zikresourceId);
    }

    @Override
    @Transactional
    public Zikresource create(Zikresource zikresource) throws ExecutionException, InterruptedException {
        return repository.save(zikresource);
    }

}
