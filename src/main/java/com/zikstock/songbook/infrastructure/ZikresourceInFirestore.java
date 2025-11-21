package com.zikstock.songbook.infrastructure;

import com.google.cloud.firestore.annotation.PropertyName;

import java.util.List;

public record ZikresourceInFirestore(String id,
                                     String url,
                                     String title,
                                     String artist,
                                     List<ZikresourceTagInFirestore> tags,
                                     @PropertyName("created-by")
                                     String createBy) {
}
