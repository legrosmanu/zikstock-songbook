package com.zikstock.songbook.infrastructure.out;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.zikstock.songbook.domain.Zikresource;
import com.zikstock.songbook.domain.service.ZikresourceRepositoryException;
import org.junit.jupiter.api.Test;

import java.util.UUID;
import java.util.concurrent.ExecutionException;

import static org.assertj.core.api.BDDAssertions.then;
import static org.assertj.core.api.BDDAssertions.thenExceptionOfType;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

public class ZikresourceRepositoryFromFirestoreTest {

    Firestore firestore = mock(Firestore.class);
    ZikresourceRepositoryFromFirestore repository = new ZikresourceRepositoryFromFirestore(firestore);

    @Test
    void should_return_custom_exception_when_error_on_getting_one_zikresource() throws ExecutionException, InterruptedException {
        // GIVEN a Firestore exception
        var documentReference = mockDocumentReference();
        var documentSnapshotAsFuture = mock(ApiFuture.class);
        given(documentReference.get()).willReturn(documentSnapshotAsFuture);
        given(documentSnapshotAsFuture.get()).willThrow(new InterruptedException());

        // WHEN a get one zikresource // THEN a custom exception is thrown
        thenExceptionOfType(ZikresourceRepositoryException.class)
                        .isThrownBy(() -> repository.findById(UUID.randomUUID()));
    }

    @Test
    void should_return_optional_empty_if_getting_one_zikresource_has_no_result() throws ZikresourceRepositoryException, ExecutionException, InterruptedException {
        var documentReference = mockDocumentReference();
        var documentSnapshotAsFuture = mock(ApiFuture.class);
        given(documentReference.get()).willReturn(documentSnapshotAsFuture);
        var documentSnapshot = mock(DocumentSnapshot.class);
        given(documentSnapshotAsFuture.get()).willReturn(documentSnapshot);
        given(documentSnapshot.exists()).willReturn(false);

        var result = repository.findById(UUID.randomUUID());

        then(result).isEmpty();
    }

    @Test
    void should_return_custom_exception_when_error_on_deleting_one_zikresource() throws ExecutionException, InterruptedException {
        // GIVEN a known zikresource
        var zikresourceId = UUID.randomUUID();
        var zikresource =  new Zikresource(zikresourceId,
                "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
                "Sober",
                "Tool",
                null,
                null);
        // AND a Firestore exception during the deletion
        var documentReference = mockDocumentReference();
        var writeResult = mock(ApiFuture.class);
        given(documentReference.delete()).willReturn(writeResult);
        given(writeResult.get()).willThrow(new InterruptedException());

        // WHEN a get one zikresource // THEN a custom exception is thrown
        thenExceptionOfType(ZikresourceRepositoryException.class)
                .isThrownBy(() -> repository.delete(zikresourceId));
    }

    private DocumentReference mockDocumentReference() {
        CollectionReference collectionReference = mock(CollectionReference.class);
        given(firestore.collection(anyString())).willReturn(collectionReference);
        var documentReference = mock(DocumentReference.class);
        given(collectionReference.document(anyString())).willReturn(documentReference);
        return documentReference;
    }


}
