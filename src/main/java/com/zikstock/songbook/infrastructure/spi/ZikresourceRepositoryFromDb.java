package com.zikstock.songbook.infrastructure.spi;

import com.google.cloud.firestore.Firestore;
import com.zikstock.songbook.domain.spi.ZikresourceRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ZikresourceRepositoryFromDb implements ZikresourceRepository {

    @Inject
    Firestore firestore;

}
