package com.zikstock.songbook.infrastructure.out;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.zikstock.songbook.domain.Zikresource;
import com.zikstock.songbook.domain.out.ZikresourceRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@ApplicationScoped
public class ZikresourceRepositoryFromFirestore implements ZikresourceRepository {

    @Inject
    Firestore firestore;

    private final String ZIKRESOURCE_COLLECTION_NAME = "zikresources";

    @Override
    public Optional<Zikresource> findById(UUID zikresourceId) throws ExecutionException, InterruptedException {
        var collection = firestore.collection(ZIKRESOURCE_COLLECTION_NAME);

        var docRef = collection.document(zikresourceId.toString());
        var doc = docRef.get().get();
        var expectedZikresource = mapDocumentToZikresource(doc);

        if (expectedZikresource == null) {
            return Optional.empty();
        }

        return Optional.of(expectedZikresource);

    }

    @Override
    public Zikresource save(Zikresource zikresource) throws ExecutionException, InterruptedException {

        var collection = firestore.collection(ZIKRESOURCE_COLLECTION_NAME);

        var newZikresourceId = UUID.randomUUID();
        var zikResourceToCreate = zikresource.withId(newZikresourceId);

        var command = collection.document(zikResourceToCreate.id().toString()).set(zikResourceToCreate);
        command.get();

        return zikResourceToCreate;
    }

    private Zikresource mapDocumentToZikresource(DocumentSnapshot document) {
        if (document == null || !document.exists()) {
            return null;
        }

        var id = UUID.fromString(Objects.requireNonNull(document.getId()));

        return new Zikresource(
                id,
                document.getString("url"),
                document.getString("title"),
                document.getString("artist"),
                null
        );
    }
}
