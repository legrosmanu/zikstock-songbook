package com.zikstock.songbook.zikresource;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
public class ZikresourceTag {
    @Id
    @GeneratedValue
    private UUID id;

    @NonNull @NotNull
    private String label;

    @NonNull @NotNull
    private String value;
}
