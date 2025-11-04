package com.zikstock.songbook.domain.service;

import java.util.Optional;

import com.zikstock.songbook.domain.api.QueryZikResource;
import com.zikstock.songbook.domain.model.QueryZikResourceException;
import com.zikstock.songbook.domain.model.ZikResource;
import com.zikstock.songbook.domain.model.ZikResourceId;
import com.zikstock.songbook.domain.spi.ZikResourceRepository;

public class QueryZikResourceService implements QueryZikResource {

    private final ZikResourceRepository repository;

    public QueryZikResourceService(ZikResourceRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<ZikResource> findById(ZikResourceId id) throws QueryZikResourceException {
        try {
            return repository.findById(id);
        } catch (Exception e) {
            throw new QueryZikResourceException("‼️ Failed to query ZikResource", e);
        }
    }

}
