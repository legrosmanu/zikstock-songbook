package com.zikstock.songbook.zikresource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/zikresources")
public class ZikresourceController {

    @Autowired
    private ZikresourceRepository repository;

    @PostMapping()
    public Zikresource createZikresource(@RequestBody @Valid Zikresource zikresource){
        return this.repository.save(zikresource);
    }

    @GetMapping
    public Collection<Zikresource> getZikresources() {
        List<Zikresource> zikresources = new ArrayList<>();
        this.repository.findAll().forEach(zikresources::add);
        return zikresources;
    }

    @GetMapping("/{id}")
    public Zikresource getZikresource(@PathVariable UUID id) {
        Optional<Zikresource> zikresource = this.repository.findById(id);
        if (!zikresource.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.join(" ", "the zikresource", id.toString(),"doesn't exist."));
        }
        return zikresource.get();
    }

    @PutMapping("/{id}")
    public Zikresource updateZikresource(@PathVariable UUID id, @RequestBody @Valid Zikresource zikresource) {
        if (!id.equals(zikresource.getId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "the zikresource in the body must have the same id than the id in uri");
        }
        return this.repository.save(zikresource);
    }

    @DeleteMapping("/{id}")
    public void deleteZikresource(@PathVariable UUID id) {
        Optional<Zikresource> zikresource = this.repository.findById(id);
        zikresource.ifPresent(this.repository::delete);
    }

}