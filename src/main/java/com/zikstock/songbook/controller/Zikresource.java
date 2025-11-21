package com.zikstock.songbook.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.zikstock.songbook.domain.model.ZikresourceTag;

import java.util.List;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record Zikresource(UUID id,
                          String url,
                          String title,
                          String artist,
                          List<ZikresourceTag> tags,
                          @JsonProperty("created-by")
                          String createBy) {

    public Zikresource(com.zikstock.songbook.domain.model.Zikresource zikresource) {
        this(zikresource.id(),
             zikresource.url(),
             zikresource.title(),
             zikresource.artist(),
             zikresource.tags(),
             zikresource.createBy());
    }
}
