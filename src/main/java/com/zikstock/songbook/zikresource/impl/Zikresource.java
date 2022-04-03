package com.zikstock.songbook.zikresource.impl;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.UUID;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
@Table(name = "zikresources")
public class Zikresource {

    @Id
    @GeneratedValue
    @Column(name = "id", columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @NonNull
    @NotNull
    @Size(min = 10, max = 2048)
    private String url;

    @NonNull
    @NotNull
    @Size(min = 1, max = 255)
    private String title;

    @Size(max = 25)
    private String type;
    @Size(max = 50)
    private String artist;

    @Size(max = 10)
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "zikresource_id")
    @OrderColumn(name = "tag_index")
    private ZikresourceTag[] tags;

    @Version
    private Long version;

    // TODO: addedBy?: AddedByUser;



}
