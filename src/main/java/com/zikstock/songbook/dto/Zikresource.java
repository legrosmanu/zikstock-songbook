package com.zikstock.songbook.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.zikstock.songbook.repository.ZikresourceEntity;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record Zikresource(
        @JsonProperty(access = Access.READ_ONLY)
        UUID id,

        @NotEmpty(message = "The url field is mandatory")
        @Size(min = 10, max = 2048, message = "The url field can't be longer than 2048 caracters.")
        String url,

        @NotEmpty(message = "The url field is mandatory")
        @Size(min = 1, max = 255, message = "The url field can't be longer than 255 caracters.")
        String title,

        String artist,

        @Size(max = 10, message = "Maximum 10 tags are allowed.")
        List<ZikresourceTag> tags) {

        public Zikresource(ZikresourceEntity entity) {
            this(entity.getId(), entity.getUrl(), entity.getTitle(), entity.getArtist(), null);
        }
}
