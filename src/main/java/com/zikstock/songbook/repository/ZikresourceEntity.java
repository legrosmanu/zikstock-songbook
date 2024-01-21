package com.zikstock.songbook.repository;

import java.util.UUID;

import com.zikstock.songbook.dto.Zikresource;

import jakarta.persistence.Cacheable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
        @Id
        @Column(name = "id")
        @GeneratedValue(strategy = GenerationType.AUTO)
        private UUID id;

        private String url;

        private String title;

        private String artist;

    public ZikresourceEntity(Zikresource zikresource) {
        this.id = zikresource.id();
        this.url = zikresource.url();
        this.artist = zikresource.artist();
    }
}
