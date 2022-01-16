package com.zikstock.songbook.zikresource;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Zikresource {

    @NonNull private String url;
    @NonNull private String title;
    private String type;
    private String artist;
    // TODO: tags?: Tag[];
    // TODO: addedBy?: AddedByUser;

}
