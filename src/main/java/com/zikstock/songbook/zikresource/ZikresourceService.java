package com.zikstock.songbook.zikresource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.UUID;

@Service
public class ZikresourceService {

    @Autowired
    private ZikresourceRepository repository;

    Optional<Zikresource> getZikresource(UUID id){
        return this.repository.findById(id);
    }

    Zikresource updateZikresource(Zikresource zikresource) throws ResponseStatusException {
        Optional<Zikresource> existingZikresource = this.getZikresource(zikresource.getId());
        if (existingZikresource.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The zikresource to update has not been found.");
        }

        return this.repository.save(zikresource);
    }
}
