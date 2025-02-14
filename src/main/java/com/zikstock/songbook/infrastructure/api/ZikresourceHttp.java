package com.zikstock.songbook.infrastructure.api;

import com.zikstock.songbook.domain.Zikresource;
import jakarta.validation.Valid;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import org.jboss.resteasy.reactive.ResponseStatus;

@Path("/zikresources")
public class ZikresourceHttp {

    @POST
    @ResponseStatus(201)
    public Zikresource createZikresource(@Valid Zikresource zikresource) {
        return zikresource;
    }

}
