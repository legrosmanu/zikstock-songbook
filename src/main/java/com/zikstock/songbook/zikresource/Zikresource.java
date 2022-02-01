package com.zikstock.songbook.zikresource;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Zikresource {

    @NonNull @NotNull  @Size(min=10, max=2048)
    private String url;

    @NonNull @NotNull @Size(min=1, max=255)
    private String title;

    @Size(max=25)
    private String type;
    @Size(max=50)
    private String artist;

    @Size(max = 10)
    private ZikresourceTag[] tags;

    // TODO: addedBy?: AddedByUser;

}
