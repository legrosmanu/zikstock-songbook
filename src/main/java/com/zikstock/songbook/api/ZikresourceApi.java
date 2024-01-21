package com.zikstock.songbook.api;

import java.util.List;
import java.util.UUID;

import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import io.smallrye.common.annotation.RunOnVirtualThread;

import org.jboss.resteasy.reactive.ResponseStatus;
import com.zikstock.songbook.business.ZikresourceService;

import com.zikstock.songbook.dto.Zikresource;

@Path("/zikresources")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@RunOnVirtualThread
public class ZikresourceApi {

    final private ZikresourceService zikresourceService;

    public ZikresourceApi(ZikresourceService zikresourceService) {
        this.zikresourceService = zikresourceService;
    }

    @GET
    public List<Zikresource> getAll() {
        return zikresourceService.findAll();
    }

    @GET
    @Path("/{id}")
    public Zikresource getOne(UUID id) {
        return zikresourceService.findOne(id);
    }

    @POST
    @ResponseStatus(201)
    public Zikresource create(@Valid Zikresource zikresourceToCreate) {
        return zikresourceService.createOne(zikresourceToCreate);
    }

    @DELETE
    @Path("/{id}")
    public void delete(UUID id) {
        zikresourceService.deleteOne(id);
    }

}