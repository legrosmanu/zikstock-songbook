package com.zikstock.songbook.infrastructure.spi;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchException;
import static org.mockito.BDDMockito.given;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.zikstock.songbook.domain.model.ZikResource;
import com.zikstock.songbook.domain.model.ZikResourceId;

@ExtendWith(MockitoExtension.class)
class QueryZikResourceFirestoreRepositoryTest {

    @Mock
    private Firestore firestore;
    
    @Mock
    private CollectionReference collectionReference;
    
    @Mock
    private DocumentReference documentReference;
    
    @Mock
    private DocumentSnapshot documentSnapshot;
    
    @Mock
    private ApiFuture<DocumentSnapshot> future;

    private QueryZikResourceFirestoreRepository repository;
    private UUID testId;
    private ZikResourceId zikResourceId;

    @BeforeEach
    void setUp() {
        repository = new QueryZikResourceFirestoreRepository(firestore);
        testId = UUID.randomUUID();
        zikResourceId = new ZikResourceId(testId);
    }

    @Test
    void should_find_existing_zikresource() throws InterruptedException, ExecutionException {
        // GIVEN
        String title = "Test Song";
        String artist = "Test Artist";
        given(firestore.collection("zikresources")).willReturn(collectionReference);
        given(collectionReference.document(testId.toString())).willReturn(documentReference);
        given(documentReference.get()).willReturn(future);
        given(future.get()).willReturn(documentSnapshot);
        given(documentSnapshot.exists()).willReturn(true);
        given(documentSnapshot.getId()).willReturn(testId.toString());
        given(documentSnapshot.getString("title")).willReturn(title);
        given(documentSnapshot.getString("artist")).willReturn(artist);

        // WHEN
        Optional<ZikResource> result = repository.findById(zikResourceId);

        // THEN
        assertThat(result).isPresent();
        ZikResource zikResource = result.get();
        assertThat(zikResource.id().value()).isEqualTo(testId);
        assertThat(zikResource.title()).isEqualTo(title);
        assertThat(zikResource.artist()).isEqualTo(artist);
    }

    @Test
    void should_not_find_unknown_zikresource() throws InterruptedException, ExecutionException {
        // GIVEN
        given(firestore.collection("zikresources")).willReturn(collectionReference);
        given(collectionReference.document(testId.toString())).willReturn(documentReference);
        given(documentReference.get()).willReturn(future);
        given(future.get()).willReturn(documentSnapshot);
        given(documentSnapshot.exists()).willReturn(false);

        // WHEN
        Optional<ZikResource> result = repository.findById(zikResourceId);

        // THEN
        assertThat(result).isNotPresent();
    }

    @Test
    void should_throw_ExecutionException() throws InterruptedException, ExecutionException {
        // GIVEN
        given(firestore.collection("zikresources")).willReturn(collectionReference);
        given(collectionReference.document(testId.toString())).willReturn(documentReference);
        given(documentReference.get()).willReturn(future);
        given(future.get()).willThrow(new ExecutionException("Test exception", new RuntimeException()));

        // GIVEN
        var exception = catchException(() -> repository.findById(zikResourceId));

        // THEN - Exception should be thrown
        assertThat(exception).isInstanceOf(ExecutionException.class);
    }

    @Test
    void should_throw_InterruptedException() throws InterruptedException, ExecutionException {
        // GIVEN
        given(firestore.collection("zikresources")).willReturn(collectionReference);
        given(collectionReference.document(testId.toString())).willReturn(documentReference);
        given(documentReference.get()).willReturn(future);
        given(future.get()).willThrow(new InterruptedException("Test interruption"));

        // GIVEN
        var exception = catchException(() -> repository.findById(zikResourceId));

        // THEN - Exception should be thrown
        assertThat(exception).isInstanceOf(InterruptedException.class);
    }
}
