package com.zikstock.songbook.zikresource;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/zikresources")
public class ZikresourceController {

    @PostMapping()
    public Zikresource createZikresource(@RequestBody @Valid Zikresource zikresource){
        return new Zikresource("http://test.fr", "test");
    }

    @GetMapping
    public Zikresource[] getZikresources() {
        return new Zikresource[] { new Zikresource("http://test.fr", "test") };
    }

    @GetMapping("/{id}")
    public Zikresource getZikresource(@PathVariable String id) {
        return new Zikresource("http://test.fr", "test");
    }

    @PutMapping("/{id}")
    public Zikresource updateZikresource(@PathVariable String id) {
        return new Zikresource("http://test.fr", "test");
    }

    @DeleteMapping("/{id}")
    public void deleteZikresource(@PathVariable String id) {

    }

}