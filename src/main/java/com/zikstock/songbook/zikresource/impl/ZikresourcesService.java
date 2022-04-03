package com.zikstock.songbook.zikresource.impl;

import com.zikstock.songbook.zikresource.IZikresourcesService;
import com.zikstock.songbook.zikresource.IZikresourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ZikresourcesService implements IZikresourcesService {

    private final IZikresourceRepository repository;

    @Override
    public Optional<Zikresource> getZikresource(UUID id){
        return this.repository.findById(id);
    }

    @Override
    public Zikresource updateZikresource(Zikresource zikresource) throws ResponseStatusException {
        Optional<Zikresource> existingZikresource = this.getZikresource(zikresource.getId());
        if (existingZikresource.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The zikresource to update has not been found.");
        }

        return this.repository.save(zikresource);
    }

    @Override
    public void deleteZikresource(UUID id) {
        Optional<Zikresource> existingZikresource = this.getZikresource(id);
        existingZikresource.ifPresent(this.repository::delete);
    }
}
