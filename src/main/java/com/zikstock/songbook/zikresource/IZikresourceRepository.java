package com.zikstock.songbook.zikresource;

import com.zikstock.songbook.zikresource.impl.Zikresource;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface IZikresourceRepository extends CrudRepository<Zikresource, UUID> {
}
