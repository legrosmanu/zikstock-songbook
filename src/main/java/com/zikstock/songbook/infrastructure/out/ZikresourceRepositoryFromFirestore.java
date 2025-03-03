package com.zikstock.songbook.infrastructure.out;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.zikstock.songbook.domain.Zikresource;
import com.zikstock.songbook.domain.ZikresourceRepositoryException;
import com.zikstock.songbook.domain.out.ZikresourceRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@ApplicationScoped
public class ZikresourceRepositoryFromFirestore implements ZikresourceRepository {

    private final Firestore firestore;

    public ZikresourceRepositoryFromFirestore(Firestore firestore) {
        this.firestore = firestore;
    }

    private final String ZIKRESOURCE_COLLECTION_NAME = "zikresources";

    @Override
    public Optional<Zikresource> findById(UUID zikresourceId) throws ZikresourceRepositoryException {
        try {
            var collection = firestore.collection(ZIKRESOURCE_COLLECTION_NAME);

            var docRef = collection.document(zikresourceId.toString());
            var doc = docRef.get();
            var expectedZikresource = mapDocumentToZikresource(doc.get());

            if (expectedZikresource == null) {
                return Optional.empty();
            }

            return Optional.of(expectedZikresource);
        } catch (ExecutionException | InterruptedException ex) {
            throw new ZikresourceRepositoryException("‼ Error when finding a zikresource by id", ex);
        }
    }

    @Override
    public Zikresource save(Zikresource zikresource) {
        var collection = firestore.collection(ZIKRESOURCE_COLLECTION_NAME);

        var newZikresourceId = UUID.randomUUID();
        var zikResourceToCreate = zikresource.withId(newZikresourceId);

        collection.document(zikResourceToCreate.id().toString()).set(zikResourceToCreate);

        return zikResourceToCreate;
    }

    @Override
    public void delete(Zikresource zikresource) throws ZikresourceRepositoryException {
        try {
            var collection = firestore.collection(ZIKRESOURCE_COLLECTION_NAME);

            var writeResult = collection.document(zikresource.id().toString()).delete();

            writeResult.get();
        } catch (ExecutionException | InterruptedException ex) {
            throw new ZikresourceRepositoryException("‼ Error when deleting a zikresource by id", ex);
        }
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
