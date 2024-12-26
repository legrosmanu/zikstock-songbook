package com.zikstock.songbook.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record Zikresource(
        @NotEmpty(message = "The url field is mandatory")
        @Size(min = 10, max = 2048, message = "The url field can't be longer than 2048 characters.")
        String url,

        @NotEmpty(message = "The url field is mandatory")
        @Size(min = 1, max = 255, message = "The url field can't be longer than 255 characters.")
        String title,

        String artist,

        @Size(max = 10, message = "Maximum 10 tags are allowed.")
        List<ZikresourceTag> tags) {
}
