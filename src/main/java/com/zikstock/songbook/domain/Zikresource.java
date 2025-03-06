package com.zikstock.songbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record Zikresource(
        UUID id,

        @NotEmpty(message = "The url field is mandatory")
        @Size(min = 10, max = 2048, message = "The url field can't be longer than 2048 characters.")
        String url,

        @NotEmpty(message = "The url field is mandatory")
        @Size(min = 1, max = 255, message = "The url field can't be longer than 255 characters.")
        String title,

        String artist,

        @Size(max = 10, message = "Maximum 10 tags are allowed.")
        List<ZikresourceTag> tags,

        @JsonProperty("created-by")
        String createBy) {

    public Zikresource withId(UUID id) {
        return new Zikresource(id, this.url, this.title, this.artist, this.tags, this.createBy);
    }

}
