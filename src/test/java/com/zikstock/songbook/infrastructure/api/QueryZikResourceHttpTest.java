package com.zikstock.songbook.infrastructure.api;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.zikstock.songbook.application.HttpServerVerticle;

import io.vertx.core.Vertx;
import io.vertx.ext.web.client.WebClient;
import io.vertx.junit5.VertxExtension;
import io.vertx.junit5.VertxTestContext;

@ExtendWith(VertxExtension.class)
class QueryZikResourceHttpTest {

    private static final int PORT = 8080;

    @Test
    void testServer(Vertx vertx, VertxTestContext testContext) {

        vertx.deployVerticle(new HttpServerVerticle(PORT))
            .onComplete(testContext.succeeding(id -> {

                WebClient client = WebClient.create(vertx);

                var endpoint = "/api/zikresources/288621d9-ebc2-402c-b8f7-b90a052add9a";

                client.get(PORT, "localhost", endpoint)
                    .send()
                    .onComplete(testContext.succeeding(response -> {
                        testContext.verify(() -> assertEquals(200, response.statusCode()));
                        testContext.completeNow();
                    }));

            }));
    }

}
