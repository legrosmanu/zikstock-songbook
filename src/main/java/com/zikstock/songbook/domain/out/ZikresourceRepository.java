package com.zikstock.songbook.domain.out;

import com.zikstock.songbook.domain.Zikresource;

import java.util.concurrent.ExecutionException;

public interface ZikresourceRepository {

    Zikresource save(Zikresource zikresource) throws ExecutionException, InterruptedException;

}
