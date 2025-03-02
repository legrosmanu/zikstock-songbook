package com.zikstock.songbook.domain.in;

import com.zikstock.songbook.domain.Zikresource;
import com.zikstock.songbook.domain.ZikresourceRepositoryException;

import java.util.Optional;
import java.util.UUID;

public interface CrudZikresource {

    Optional<Zikresource> findOne(UUID zikresourceId) throws ZikresourceRepositoryException;

    Zikresource create(Zikresource zikresource);

}
