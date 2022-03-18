package com.zikstock.songbook.zikresource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/zikresources")
public class ZikresourceController {

    @Autowired
    private ZikresourceRepository repository;

    @Autowired
    private ZikresourceService service;

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Zikresource createZikresource(@RequestBody @Valid Zikresource zikresource) {
        if (zikresource.getId() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Avoid to add an id in the body of the request during creation");
        }
        // TODO: catch to log ObjectOptimisticLockingFailureException
        return this.repository.save(zikresource);
    }

    @GetMapping
    public Iterable<Zikresource> getZikresources() {
        // TODO: will be modified later with business rules and pagination.
        return this.repository.findAll();
    }

    @GetMapping("/{id}")
    public Zikresource getZikresource(@PathVariable UUID id) {
        Optional<Zikresource> zikresource = this.service.getZikresource(id);
        if (zikresource.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.join(" ", "the zikresource", id.toString(), "doesn't exist."));
        }
        return zikresource.get();
    }

    @PutMapping("/{id}")
    public Zikresource updateZikresource(@PathVariable UUID id, @RequestBody @Valid Zikresource zikresource) {
        if (zikresource.getId() != null && !id.equals(zikresource.getId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "the zikresource in the body must have the same id than the id in the uri");
        }
        return this.service.updateZikresource(zikresource);
    }

    @DeleteMapping("/{id}")
    public void deleteZikresource(@PathVariable UUID id) {
        this.service.deleteZikresource(id);
    }

}