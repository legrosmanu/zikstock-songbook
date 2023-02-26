package com.zikstock.songbook.api;

import java.util.List;
import java.util.UUID;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.reactive.ResponseStatus;
import com.zikstock.songbook.business.ZikresourceService;
import com.zikstock.songbook.dto.Zikresource;

import io.quarkus.hibernate.reactive.panache.common.runtime.ReactiveTransactional;
import io.smallrye.mutiny.Uni;

@Path("/zikresources")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ZikresourceApi {

    final private ZikresourceService zikresourceService;

    public ZikresourceApi(ZikresourceService zikresourceService) {
        this.zikresourceService = zikresourceService;
    }

    @GET
    public Uni<List<Zikresource>> getAll() {
        return zikresourceService.findAll();
    }

    @GET
    @Path("/{id}")
    public Uni<Zikresource> getOne(UUID id) {
        return zikresourceService.findOne(id);
    }

    @POST
    @ResponseStatus(201)
    public Uni<Zikresource> create(@Valid Zikresource zikresourceToCreate) {
        return zikresourceService.createOne(zikresourceToCreate);
    }

    @DELETE
    @Path("/{id}")
    @ReactiveTransactional
    public Uni<Response> delete(UUID id) {
        return zikresourceService.findOne(id)
                .onItem().ifNotNull().transform(zikresource -> {
                    zikresourceService.deleteOne(zikresource);
                    return Response.noContent().build();
                })
                .onItem().ifNull().continueWith(Response.status(404)::build);
    }

}