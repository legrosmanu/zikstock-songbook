package com.zikstock.songbook.infrastructure.out;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.zikstock.songbook.domain.ZikresourceRepositoryException;
import org.junit.jupiter.api.Test;

import java.util.UUID;
import java.util.concurrent.ExecutionException;

import static org.assertj.core.api.BDDAssertions.thenExceptionOfType;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

public class ZikresourceRepositoryFromFirestoreTest {

    Firestore firestore = mock(Firestore.class);
    ZikresourceRepositoryFromFirestore repository = new ZikresourceRepositoryFromFirestore(firestore);

    @Test
    void should_return_custom_exception_when_getting_one_zikresource() throws ExecutionException, InterruptedException {
        // GIVEN a Firestore exception
        var documentReference = mockDocumentReference();
        var documentSnapshot = mock(ApiFuture.class);
        given(documentReference.get()).willReturn(documentSnapshot);
        given(documentSnapshot.get()).willThrow(new InterruptedException());

        // WHEN a get one zikresource // THEN a custom exception is thrown
        thenExceptionOfType(ZikresourceRepositoryException.class)
                        .isThrownBy(() -> repository.findById(UUID.randomUUID()));
    }

    private DocumentReference mockDocumentReference() {
        CollectionReference collectionReference = mock(CollectionReference.class);
        given(firestore.collection(anyString())).willReturn(collectionReference);
        var documentReference = mock(DocumentReference.class);
        given(collectionReference.document(anyString())).willReturn(documentReference);
        return documentReference;
    }


}
