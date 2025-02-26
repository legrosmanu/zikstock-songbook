package com.zikstock.songbook.domain.out;

import com.zikstock.songbook.domain.Zikresource;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

public interface ZikresourceRepository {

    Optional<Zikresource> findById(UUID zikresourceId) throws ExecutionException, InterruptedException;

    Zikresource save(Zikresource zikresource) throws ExecutionException, InterruptedException;

}
