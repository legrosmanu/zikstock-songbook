package com.zikstock.songbook.domain.out;

import com.zikstock.songbook.domain.model.Zikresource;
import com.zikstock.songbook.domain.service.ZikresourceRepositoryException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

public interface ZikresourceRepository {

    Optional<Zikresource> findById(UUID zikresourceId) throws ZikresourceRepositoryException;

    List<Zikresource> findByCreatedBy(String username) throws ExecutionException, InterruptedException;

    Zikresource save(Zikresource zikresource);

    void delete(UUID zikresourceId) throws ZikresourceRepositoryException;

}
