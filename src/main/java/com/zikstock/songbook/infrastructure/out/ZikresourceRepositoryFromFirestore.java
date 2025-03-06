package com.zikstock.songbook.infrastructure.out;

import com.google.cloud.firestore.Firestore;
import com.zikstock.songbook.domain.Zikresource;
import com.zikstock.songbook.domain.out.ZikresourceRepository;
import com.zikstock.songbook.domain.service.ZikresourceRepositoryException;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
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
            var docAsFuture = docRef.get();
            var expectedZikresource = docAsFuture.get().toObject(ZikresourceInFirestore.class);

            if (expectedZikresource == null) {
                return Optional.empty();
            }

            return Optional.of(mapToZikresource(expectedZikresource));
        } catch (ExecutionException | InterruptedException ex) {
            throw new ZikresourceRepositoryException("‼ Error when finding a zikresource by id", ex);
        }
    }

    @Override
    public List<Zikresource> findByCreatedBy(String username) throws ExecutionException, InterruptedException {
        var collection = firestore.collection(ZIKRESOURCE_COLLECTION_NAME);

        var queryAsFuture = collection.whereEqualTo("created-by", username).get();
        var zikresourcesInDb = queryAsFuture.get().toObjects(ZikresourceInFirestore.class);

        return zikresourcesInDb.stream().map(this::mapToZikresource).toList();
    }

    @Override
    public Zikresource save(Zikresource zikresource) {
        var collection = firestore.collection(ZIKRESOURCE_COLLECTION_NAME);

        var newZikresourceId = UUID.randomUUID();
        var zikResourceToCreate = zikresource.withId(newZikresourceId);

        var zikresourceToCreateInDb = mapToZikresourceInFirestore(zikResourceToCreate);

        collection.document(zikresourceToCreateInDb.id()).set(zikresourceToCreateInDb);

        return zikResourceToCreate;
    }

    @Override
    public void delete(UUID zikresourceId) throws ZikresourceRepositoryException {
        try {
            var collection = firestore.collection(ZIKRESOURCE_COLLECTION_NAME);

            var writeResult = collection.document(zikresourceId.toString()).delete();

            writeResult.get();
        } catch (ExecutionException | InterruptedException ex) {
            throw new ZikresourceRepositoryException("‼ Error when deleting a zikresource by id", ex);
        }
    }

    private Zikresource mapToZikresource(ZikresourceInFirestore zikresourceInDb) {
        if (zikresourceInDb == null) return null;

        return new Zikresource(
                UUID.fromString(zikresourceInDb.id()),
                zikresourceInDb.url(),
                zikresourceInDb.title(),
                zikresourceInDb.artist(),
                null,
                zikresourceInDb.createBy()
        );
    }

    private ZikresourceInFirestore mapToZikresourceInFirestore(Zikresource zikresource) {
        if (zikresource == null) return null;

        return new ZikresourceInFirestore(
                zikresource.id().toString(),
                zikresource.url(),
                zikresource.title(),
                zikresource.artist(),
                null,
                zikresource.createBy()
        );
    }
}
