package com.zikstock.songbook.domain.in;

import com.zikstock.songbook.domain.Zikresource;
import com.zikstock.songbook.domain.service.ZikresourceRepositoryException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

public interface CrudZikresource {

    Optional<Zikresource> findOne(UUID zikresourceId) throws ZikresourceRepositoryException;

    List<Zikresource> findByCreatedBy(String username) throws ExecutionException, InterruptedException;

    Zikresource create(Zikresource zikresource);

    void delete(UUID zikresourceId) throws ZikresourceRepositoryException;

}
