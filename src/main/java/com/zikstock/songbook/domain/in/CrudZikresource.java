package com.zikstock.songbook.domain.in;

import com.zikstock.songbook.domain.Zikresource;

import java.util.concurrent.ExecutionException;

public interface CrudZikresource {

    Zikresource createZikresource(Zikresource zikresource) throws ExecutionException, InterruptedException;

}
