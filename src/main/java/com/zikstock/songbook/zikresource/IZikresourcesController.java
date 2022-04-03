package com.zikstock.songbook.zikresource;

import com.zikstock.songbook.zikresource.impl.Zikresource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@RequestMapping("/api/zikresources")
public interface IZikresourcesController {
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    Zikresource createZikresource(@RequestBody @Valid Zikresource zikresource);

    @GetMapping
    Iterable<Zikresource> getZikresources();

    @GetMapping("/{id}")
    Zikresource getZikresource(@PathVariable UUID id);

    @PutMapping("/{id}")
    Zikresource updateZikresource(@PathVariable UUID id, @RequestBody @Valid Zikresource zikresource);

    @DeleteMapping("/{id}")
    void deleteZikresource(@PathVariable UUID id);
}
