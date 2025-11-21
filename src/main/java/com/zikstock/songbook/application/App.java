package com.zikstock.songbook.application;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.zikstock.songbook.domain.service.QueryZikResourceService;
import com.zikstock.songbook.infrastructure.api.QueryZikResourceHttp;
import com.zikstock.songbook.infrastructure.spi.QueryZikResourceFirestoreRepository;

import io.vertx.core.Vertx;

public class App {

    private static final Logger logger = Logger.getLogger(App.class.getName());

    public static void main(String... args) throws IOException {
        logger.info("******** Starting zikstock-songbook application ********");
        var configApp = new ConfigApp();

        var projectId = configApp.getGcpProjectId();
        logger.log(Level.INFO, "******** Starting the Firestore database with the project id {0} ********", projectId);
        var database = initFirestoreDb(projectId);

        var zikResourceRepository = new QueryZikResourceFirestoreRepository(database);
        var queryZikResourceService = new QueryZikResourceService(zikResourceRepository);

        logger.log(Level.INFO, "******** Starting http server with port {0} ********", configApp.getAppPort());
        var httpServerHandler = new HttpServerVerticle(configApp.getAppPort());

        new QueryZikResourceHttp(httpServerHandler, queryZikResourceService);

        Vertx vertx = Vertx.vertx();
        vertx.deployVerticle(httpServerHandler);
    }

    private static Firestore initFirestoreDb(String projectId) throws IOException {
        var firestoreOptions = FirestoreOptions.getDefaultInstance().toBuilder()
                .setProjectId(projectId)
                .setCredentials(GoogleCredentials.getApplicationDefault())
                .build();
        return firestoreOptions.getService();
    }

}
