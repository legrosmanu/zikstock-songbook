package com.zikstock.songbook.infrastructure.api;

import com.zikstock.songbook.application.App;
import com.zikstock.songbook.application.HttpServerVerticle;
import com.zikstock.songbook.domain.api.QueryZikResource;
import io.vertx.core.Vertx;
import io.vertx.junit5.VertxExtension;
import io.vertx.junit5.VertxTestContext;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(VertxExtension.class)
@ExtendWith(MockitoExtension.class)
class QueryZikResourceHttpTest {

    private static final int PORT = 8080;

    @Mock
    QueryZikResource queryZikResource;

    //@Test
    void testServer(Vertx vertx, VertxTestContext testContext) {

        var app = new App();
        var httpServerVerticle = HttpServerVerticle.getInstance();
/*
        var zikresourceIdAsString = "288621d9-ebc2-402c-b8f7-b90a052add9a";
        var zikresourceId = new ZikResourceId(UUID.fromString(zikresourceIdAsString));
        given(queryZikResource.findById(zikresourceId))
                .willReturn(Optional.of(new ZikResource(zikresourceId, "Test Song", "Test Artist")));

        vertx.deployVerticle(httpServerVerticle)
                .onComplete(testContext.succeeding(id -> {

                    WebClient client = WebClient.create(vertx);

                    var endpoint = "/api/zikresources/" + id;

                    client.get(httpServerVerticle.getPort(), "localhost", endpoint)
                            .send()
                            .onComplete(testContext.succeeding(response -> {
                                testContext.verify(() -> assertEquals(200, response.statusCode()));
                                testContext.completeNow();
                            }));

                }));*/
    }

}
