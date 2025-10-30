package com.zikstock.songbook.application;

import java.util.logging.Level;
import java.util.logging.Logger;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.http.HttpServer;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;

public class HttpServerHandler extends AbstractVerticle {

    private HttpServer server;
    
    private final ObjectMapper jsonMapper;
    private final int port;

    private static final Logger logger = Logger.getLogger(HttpServerHandler.class.getName());
    private static final String CONTENT_TYPE_HEADER = "content-type";
    private static final String APPLICATION_JSON = "application/json";

    private Router router;
    public Router getRouter() {
        return router;
    }

    public HttpServerHandler(final int port) {
        this.router = Router.router(vertx);
        this.jsonMapper = createObjectMapper();
        this.port = port;
    }

    @Override
    public void start(Promise<Void> startPromise) {
        // Add body handler for POST/PUT requests
        this.router.route().handler(BodyHandler.create());

        server = vertx.createHttpServer();
        server.requestHandler(this.router)
            .listen(port)
            .onSuccess(unused -> {
                logger.info("HTTP server started on port " + port);
                startPromise.complete();
            })
            .onFailure(startPromise::fail);
    }

    @Override
    public void stop(Promise<Void> stopPromise) {
        if (server != null) {
            server.close().onComplete(stopPromise);
        } else {
            stopPromise.complete();
        }
    }

    public void sendNotFound(RoutingContext context) {
        context.response()
                .setStatusCode(404)
                .putHeader(CONTENT_TYPE_HEADER, APPLICATION_JSON)
                .end("{\"error\": \"Resource not found\"}");
    }

    public void sendResponse(int statusCode, RoutingContext context, Object objectToSend) {
        try {
            String jsonResponse = jsonMapper.writeValueAsString(objectToSend);
            context.response()
                    .setStatusCode(statusCode)
                    .putHeader(CONTENT_TYPE_HEADER, APPLICATION_JSON)
                    .end(jsonResponse);
        } catch (JsonProcessingException e) {
            handleError(500, context, e);
        }

    }

    public void handleError(int statusCode, RoutingContext context, Exception e) {
        logger.log(Level.SEVERE, e.getMessage(), e);
        context.response()
                .setStatusCode(statusCode)
                .putHeader(CONTENT_TYPE_HEADER, APPLICATION_JSON)
                .end();
    }

    private ObjectMapper createObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.INDENT_OUTPUT, true);
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return mapper;
    }

}
