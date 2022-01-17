package com.zikstock.songbook.zikresource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/zikresources")
public class ZikresourceController {

    @GetMapping
    public Zikresource[] getZikresources() {
        Zikresource[] zikresources = {new Zikresource("http://test.fr", "test")};
        return zikresources;
    }
}
