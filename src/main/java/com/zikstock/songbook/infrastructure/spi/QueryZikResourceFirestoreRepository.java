package com.zikstock.songbook.infrastructure.spi;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.zikstock.songbook.domain.model.ZikResource;
import com.zikstock.songbook.domain.model.ZikResourceId;
import com.zikstock.songbook.domain.spi.ZikResourceRepository;

public class QueryZikResourceFirestoreRepository implements ZikResourceRepository {

    private static final String COLLECTION_NAME = "zikresources";
    private final Firestore firestore;

    public QueryZikResourceFirestoreRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public Optional<ZikResource> findById(ZikResourceId id) throws InterruptedException, ExecutionException {
        var zikResourceId = id.value();
        DocumentReference docRef = getCollection().document(zikResourceId.toString());
        DocumentSnapshot document = docRef.get().get();
        
        if (document.exists()) {
            return Optional.of(entityToDomain(documentToEntity(document)));
        }
        return Optional.empty();
    }

    private ZikResourceEntity documentToEntity(DocumentSnapshot document) {
        return new ZikResourceEntity(
            UUID.fromString(document.getId()),
            document.getString("title"),
            document.getString("artist")
        );
    }

    private ZikResource entityToDomain(ZikResourceEntity entity) {
        return new ZikResource(
            new ZikResourceId(entity.id()),
            entity.title(),
            entity.artist()
        );
    }

    private CollectionReference getCollection() {
        return firestore.collection(COLLECTION_NAME);
    }

}
