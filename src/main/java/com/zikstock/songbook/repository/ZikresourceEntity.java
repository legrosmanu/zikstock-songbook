package com.zikstock.songbook.repository;

import java.util.List;
import java.util.UUID;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.zikstock.songbook.dto.Zikresource;
import com.zikstock.songbook.dto.ZikresourceTag;

import io.quarkiverse.hibernate.types.json.JsonTypes;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "zikresources")
@Entity
@Cacheable
@NoArgsConstructor
@Getter
@Setter
public class ZikresourceEntity {
        private @Id @GeneratedValue(strategy = GenerationType.AUTO) UUID _id;

        private String url;

        private String title;

        private String artist;

        private @Type(type = JsonTypes.JSON_BIN) @Column(name = "tags", columnDefinition = JsonTypes.JSON_BIN)
        List<ZikresourceTag> tags;

    public ZikresourceEntity(Zikresource zikresource) {
        this._id = zikresource._id();
        this.url = zikresource.url();
        this.artist = zikresource.artist();
        this.tags = (zikresource.tags() != null) ? List.copyOf(zikresource.tags()) : null;
    }
}
