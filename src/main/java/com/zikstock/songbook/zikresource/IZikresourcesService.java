package com.zikstock.songbook.zikresource;

import com.zikstock.songbook.zikresource.impl.Zikresource;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.UUID;

public interface IZikresourcesService {
    Optional<Zikresource> getZikresource(UUID id);

    Zikresource updateZikresource(Zikresource zikresource) throws ResponseStatusException;

    void deleteZikresource(UUID id);
}
