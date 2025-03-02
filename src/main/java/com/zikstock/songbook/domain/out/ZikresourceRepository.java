package com.zikstock.songbook.domain.out;

import com.zikstock.songbook.domain.Zikresource;
import com.zikstock.songbook.domain.ZikresourceRepositoryException;

import java.util.Optional;
import java.util.UUID;

public interface ZikresourceRepository {

    Optional<Zikresource> findById(UUID zikresourceId) throws ZikresourceRepositoryException;

    Zikresource save(Zikresource zikresource);

}
