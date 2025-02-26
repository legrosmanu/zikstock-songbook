package com.zikstock.songbook.infrastructure.in;

import com.zikstock.songbook.domain.Zikresource;
import com.zikstock.songbook.domain.in.CrudZikresource;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import org.jboss.resteasy.reactive.ResponseStatus;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Path("/zikresources")
public class ZikresourceHttp {

    @Inject
    CrudZikresource crudZikresource;

    @GET
    @Path("/{id}")
    public Optional<Zikresource> getOne(UUID id) throws ExecutionException, InterruptedException {
        return crudZikresource.findOne(id);
    }

    @POST
    @ResponseStatus(201)
    public Zikresource createZikresource(@Valid Zikresource zikresource) throws ExecutionException, InterruptedException {
        return crudZikresource.create(zikresource);
    }

}
