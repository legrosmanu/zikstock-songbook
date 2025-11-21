package com.zikstock.songbook.controller;

import com.zikstock.songbook.domain.in.CrudZikresource;
import com.zikstock.songbook.domain.service.ZikresourceNotFoundException;
import com.zikstock.songbook.domain.service.ZikresourceRepositoryException;
import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.*;
import org.jboss.resteasy.reactive.ResponseStatus;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Path("/zikresources")
public class ZikresourceHttp {

    private final CrudZikresource crudZikresource;

    public ZikresourceHttp(CrudZikresource crudZikresource) {
        this.crudZikresource = crudZikresource;
    }

    @GET
    @Path("/{id}")
    public Zikresource getOne(UUID id) throws ZikresourceRepositoryException {
        return crudZikresource.findOne(id).map(Zikresource::new).orElseThrow(() -> new NotFoundException("zikresource not found"));
    }

    @GET
    public List<Zikresource> getZikresourcesCreatedBy(@QueryParam("created-by") String username) throws ExecutionException, InterruptedException {
        return crudZikresource.findByCreatedBy(username).stream().map(Zikresource::new).toList();
    }

    @POST
    @ResponseStatus(201)
    public Zikresource create(Zikresource zikresource) {
        try {

            var zikResourceCreated = crudZikresource.create(mapToDomain(zikresource));
            return new Zikresource(zikResourceCreated);

        } catch (ConstraintViolationException e) {
            throw new ClientErrorException(400, e);
        }
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

    private com.zikstock.songbook.domain.model.Zikresource mapToDomain(Zikresource zikresource) {
        return new com.zikstock.songbook.domain.model.Zikresource(
          zikresource.id(), zikresource.url(), zikresource.title(), zikresource.artist(), zikresource.tags(), zikresource.createBy()
        );
    }

}
