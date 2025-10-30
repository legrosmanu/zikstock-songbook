package com.zikstock.songbook.domain;

import java.util.Optional;
import java.util.concurrent.ExecutionException;

import com.zikstock.songbook.domain.api.QueryZikResource;
import com.zikstock.songbook.domain.model.ZikResource;
import com.zikstock.songbook.domain.model.ZikResourceId;
import com.zikstock.songbook.domain.spi.ZikResourceRepository;

public class QueryZikResourceService implements QueryZikResource {

    private final ZikResourceRepository repository;

    public QueryZikResourceService(ZikResourceRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<ZikResource> findById(ZikResourceId id) throws InterruptedException, ExecutionException {
        return repository.findById(id);
        // TODO: handle exception properly with logging and custom exception
    }

}
