package com.zikstock.songbook.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public record ZikresourceTag(
                @NotEmpty @Size(min = 0, max = 255, message = "The label of a tag can't be longer than 255 caracters.") String label,
                @NotEmpty @Size(min = 0, max = 255, message = "The value of a tag can't be longer than 255 caracters.") String value) {
}
