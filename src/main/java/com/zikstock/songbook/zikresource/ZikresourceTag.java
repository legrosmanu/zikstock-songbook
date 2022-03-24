package com.zikstock.songbook.zikresource;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "zikresources_tags")
public class ZikresourceTag {
    @Id
    @GeneratedValue
    @Column(name = "id", columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @NonNull @NotNull
    private String label;

    @NonNull @NotNull
    private String value;

    @Version
    private Long version;
}
