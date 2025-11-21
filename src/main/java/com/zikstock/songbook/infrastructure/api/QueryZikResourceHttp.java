package com.zikstock.songbook.infrastructure.api;

import java.util.UUID;

import com.zikstock.songbook.application.HttpServerVerticle;
import com.zikstock.songbook.domain.api.QueryZikResource;
import com.zikstock.songbook.domain.model.ZikResourceId;

import io.vertx.ext.web.RoutingContext;

public class QueryZikResourceHttp {

    private final HttpServerVerticle httpServerHandler;
    private final QueryZikResource queryZikResource;

    public QueryZikResourceHttp(HttpServerVerticle httpServerHandler, QueryZikResource queryZikResource) {
        this.httpServerHandler = httpServerHandler;
        this.queryZikResource = queryZikResource;
        setupRoutes();
    }

    private void setupRoutes() {
        httpServerHandler.getRouter()
                .get("/api/zikresources/:id").handler(this::getZikResourceById);
    }

    // ******** GET /api/zikresources/:id ********
    private void getZikResourceById(RoutingContext context) {
        try {
            var zikResourceId = new ZikResourceId(UUID.fromString(context.pathParam("id")));

            var optZikResource = queryZikResource.findById(zikResourceId);

            if (optZikResource.isEmpty()) {
                httpServerHandler.sendNotFound(context);
                return;
            }

            var zikResource = optZikResource.get();
            httpServerHandler.sendResponse(200, context, zikResource);

        } catch (Exception e) {
            httpServerHandler.handleError(500, context, e);
        }
    }

}
