package com.zikstock.songbook.zikresource;

import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface ZikresourceRepository extends CrudRepository<Zikresource, UUID> {
}
