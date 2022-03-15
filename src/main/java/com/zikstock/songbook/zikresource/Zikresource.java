package com.zikstock.songbook.zikresource;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.*;
import org.hibernate.annotations.Type;

import java.util.UUID;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
@Table(name = "zikresources")
public class Zikresource {

    @Id
    @Type(type="uuid-char")
    @GeneratedValue
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
    @OneToMany(cascade=CascadeType.ALL)
    @JoinColumn(name="zikresource_id")
    @OrderColumn(name="tag_index")
    private ZikresourceTag[] tags;

    // TODO: addedBy?: AddedByUser;

}
