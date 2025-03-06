package com.zikstock.songbook.infrastructure.in;

import com.zikstock.songbook.domain.Zikresource;
import com.zikstock.songbook.domain.service.ZikresourceNotFoundException;
import com.zikstock.songbook.domain.service.ZikresourceRepositoryException;
import com.zikstock.songbook.domain.in.CrudZikresource;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import org.jboss.resteasy.reactive.ResponseStatus;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Path("/zikresources")
public class ZikresourceHttp {

    @Inject
    CrudZikresource crudZikresource;

    @GET
    @Path("/{id}")
    public Zikresource getOne(UUID id) throws ZikresourceRepositoryException {
        return crudZikresource.findOne(id).orElseThrow(() -> new NotFoundException("zikresource not found"));
    }

    @GET
    public List<Zikresource> getZikresourcesCreatedBy(@QueryParam("created-by") String username) throws ExecutionException, InterruptedException {
        return crudZikresource.findByCreatedBy(username);
    }

    @POST
    @ResponseStatus(201)
    public Zikresource create(@Valid Zikresource zikresource) {
        return crudZikresource.create(zikresource);
    }

    @DELETE
    @Path("/{zikresourceId}")
    public void delete(UUID zikresourceId) throws ZikresourceRepositoryException {
        try {
            crudZikresource.delete(zikresourceId);
        } catch (ZikresourceNotFoundException e) {
            throw new NotFoundException();
        }

    }

}
