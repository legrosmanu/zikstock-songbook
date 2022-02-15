package com.zikstock.songbook.zikresource;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
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
