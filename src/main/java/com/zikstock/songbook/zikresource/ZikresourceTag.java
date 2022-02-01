package com.zikstock.songbook.zikresource;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ZikresourceTag {
    @NonNull private String label;
    @NonNull private String value;
}
