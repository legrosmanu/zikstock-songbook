package com.zikstock.songbook.infrastructure.in;

import com.zikstock.songbook.domain.Zikresource;
import com.zikstock.songbook.domain.ZikresourceNotFoundException;
import com.zikstock.songbook.domain.ZikresourceRepositoryException;
import com.zikstock.songbook.domain.in.CrudZikresource;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import org.jboss.resteasy.reactive.ResponseStatus;

import java.util.UUID;

@Path("/zikresources")
public class ZikresourceHttp {

    @Inject
    CrudZikresource crudZikresource;

    @GET
    @Path("/{id}")
    public Zikresource getOne(UUID id) throws ZikresourceRepositoryException {
        return crudZikresource.findOne(id).orElseThrow(() -> new NotFoundException("zikresource not found"));
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
