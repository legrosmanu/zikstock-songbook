package com.zikstock.songbook.domain.spi;

import java.util.Optional;

import com.zikstock.songbook.domain.model.QueryZikResourceException;
import com.zikstock.songbook.domain.model.ZikResource;
import com.zikstock.songbook.domain.model.ZikResourceId;

public interface ZikResourceRepository {

    Optional<ZikResource> findById(ZikResourceId id) throws QueryZikResourceException;

}
