package com.zikstock.songbook.domain;

import com.zikstock.songbook.domain.in.CrudZikresource;
import com.zikstock.songbook.domain.out.ZikresourceRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.concurrent.ExecutionException;

@ApplicationScoped
public class ZikresourceService implements CrudZikresource {

    @Inject
    ZikresourceRepository repository;

    @Transactional
    public Zikresource createZikresource(Zikresource zikresource) throws ExecutionException, InterruptedException {
        return repository.save(zikresource);
    }

}
