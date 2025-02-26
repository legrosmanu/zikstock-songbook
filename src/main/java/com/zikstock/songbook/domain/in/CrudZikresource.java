package com.zikstock.songbook.domain.in;

import com.zikstock.songbook.domain.Zikresource;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

public interface CrudZikresource {

    Optional<Zikresource> findOne(UUID zikresourceId) throws ExecutionException, InterruptedException;

    Zikresource create(Zikresource zikresource) throws ExecutionException, InterruptedException;

}
