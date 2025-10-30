package com.zikstock.songbook.domain.spi;

import java.util.Optional;
import java.util.concurrent.ExecutionException;

import com.zikstock.songbook.domain.model.ZikResource;
import com.zikstock.songbook.domain.model.ZikResourceId;

public interface ZikResourceRepository {

    Optional<ZikResource> findById(ZikResourceId id) throws InterruptedException, ExecutionException;

}
