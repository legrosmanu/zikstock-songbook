package com.zikstock.songbook.infrastructure.in;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.zikstock.songbook.domain.Zikresource;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.BDDAssertions.then;

@QuarkusTest
class ZikresourceHttpTest {

    @Inject
    Firestore firestore;

    private static final String COLLECTION_NAME = "zikresources";

    @BeforeEach
    public void setupTestData() throws ExecutionException, InterruptedException {
        injectData();
    }

    @AfterEach
    public void cleanupTestData() throws ExecutionException, InterruptedException {
        deleteCollection();
    }

    @Test
    @DisplayName("Should get the zikresource about Tool")
    void shouldGetZikresource() {
        var response = given().when().get("/zikresources/9da93f5e-f52d-44c6-bc59-299fabacfc6b")
                .then()
                .statusCode(200)
                .extract()
                .as(Zikresource.class);

        then(response.url()).isEqualTo("https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2");
        then(response.title()).isEqualTo("Sober");
        then(response.artist()).isEqualTo("Tool");
        then(response.id()).isEqualTo(UUID.fromString("9da93f5e-f52d-44c6-bc59-299fabacfc6b"));
    }

    @Test
    @DisplayName("Should tell that the zikresource is unknown")
    void shouldReturnAnUnknownErrorWhenGettingOneZikresource() {
        given().when().get("/zikresources/9da93f5e-f52d-44c6-bc59-000fabacfc0b")
                .then()
                .statusCode(404);
    }

    @Test
    @DisplayName("If the zikresource contains all the mandatory fields, the zikresource should be created.")
    void shouldCreateZikresource() {
        var body = """
                {
                  "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
                  "title": "Sober",
                  "artist": "Tool"
                }
                """;
        var response = given()
                .request().contentType("application/json").body(body)
                .when().post("zikresources")
                .then()
                .statusCode(201)
                .extract()
                .as(Zikresource.class);

        // THEN
        then(response.url()).isEqualTo("https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2");
        then(response.title()).isEqualTo("Sober");
        then(response.artist()).isEqualTo("Tool");
        then(response.id()).isNotNull();
    }

    @Test
    @DisplayName("If one of the the mandatory fields is missing in the zikresource, the user should have a 400 error.")
    void shouldThrowsAnErrorBecauseMandatoryFieldIsMissingDuringCreation() {
        var body = """
                {
                  "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2"
                }
                """;
        given()
                .request().contentType("application/json").body(body)
                .when().post("zikresources")
                .then()
                .statusCode(400);

        body = """
                {
                  "title": "Sober"
                }
                """;
        given()
                .request().contentType("application/json").body(body)
                .when().post("zikresources")
                .then()
                .statusCode(400);
    }

    @Test
    @DisplayName("Should not accept too much tags")
    void shouldNotAcceptTooMuchTags() {
        var body = """
                {
                  "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
                  "title": "Sober",
                  "artist": "Tool",
                  "tags" : [
                    { "label": "label1", "value": "value1" },
                    { "label": "label2", "value": "value2" },
                    { "label": "label3", "value": "value3" },
                    { "label": "label4", "value": "value4" },
                    { "label": "label5", "value": "value5" },
                    { "label": "label7", "value": "value6" },
                    { "label": "label6", "value": "value7" },
                    { "label": "label8", "value": "value8" },
                    { "label": "label9", "value": "value9" },
                    { "label": "label11", "value": "value10" },
                    { "label": "label10", "value": "value11" }
                  ]
                }
                """;

        var response = given()
                .request().contentType("application/json").body(body)
                .when().post("zikresources")
                .then()
                .statusCode(400)
                .extract()
                .asString();

        then(response).contains("Maximum 10 tags are allowed");
    }

    @Test
    void should_delete_the_expected_zikresource() throws ExecutionException, InterruptedException {
        // GIVEN a delete of a known zikresource
        // WHEN the HTTP endpoint for the delete is called
        // THEN a 204 is returned
        given()
                .when().delete("/zikresources/9da93f5e-f52d-44c6-bc59-299fabacfc6b")
                .then().statusCode(204);

        // AND one of the two zikresource has been deleted
        then(countDocumentsInCollection()).isEqualTo(1);
    }

    @Test
    void should_not_delete_the_unknown_zikresource() throws ExecutionException, InterruptedException {
        // GIVEN a delete of an unknown zikresource
        // WHEN the HTTP endpoint for the delete is called
        // THEN a 404 is returned
        given()
                .when().delete("/zikresources/56d4ff88-6606-4b48-b430-ab4cf9be061b")
                .then().statusCode(404);

        // AND the both zikresource are still in the DB
        then(countDocumentsInCollection()).isEqualTo(2);
    }

    private void injectData() throws ExecutionException, InterruptedException {
        var collection = firestore.collection(COLLECTION_NAME);

        var idTool = UUID.fromString("9da93f5e-f52d-44c6-bc59-299fabacfc6b");
        var toolZikresource = new Zikresource(idTool,
                "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
                "Sober",
                "Tool",
                null);
        var idHendrix = UUID.fromString("71ff37cb-42c4-4d9d-a710-da4e3013c723");
        var hendrixZikresource = new Zikresource(idHendrix,
                "https://www.songsterr.com/a/wsa/jimi-hendrix-hey-joe-tab-s22556",
                "Hey Joe",
                "Jimi Hendrix",
                null);

        collection.document(idTool.toString()).set(toolZikresource).get();
        collection.document(idHendrix.toString()).set(hendrixZikresource).get();
    }

    private void deleteCollection() throws ExecutionException, InterruptedException {
        var collection = firestore.collection(COLLECTION_NAME);
        ApiFuture<QuerySnapshot> future = collection.limit(100).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            document.getReference().delete().get();
        }
    }

    private long countDocumentsInCollection() throws ExecutionException, InterruptedException {
        var collection = firestore.collection(COLLECTION_NAME);
        return collection.count().get().get().getCount();
    }

}
