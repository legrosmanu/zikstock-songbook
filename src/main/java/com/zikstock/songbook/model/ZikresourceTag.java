package com.zikstock.songbook.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record ZikresourceTag(
        @NotEmpty @Size(min = 0, max = 255, message = "The label of a tag can't be longer than 255 characters.")
        String label,
        @NotEmpty @Size(min = 0, max = 255, message = "The value of a tag can't be longer than 255 characters.")
        String value) {
}
