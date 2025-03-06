package com.zikstock.songbook.domain.service;

import com.zikstock.songbook.domain.out.ZikresourceRepository;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.BDDAssertions.thenExceptionOfType;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

public class ZikresourceServiceTest {

    ZikresourceRepository zikresourceRepository = mock(ZikresourceRepository.class);
    ZikresourceService service = new ZikresourceService(zikresourceRepository);

    @Test
    void should_return_custom_exception_when_getting_one_zikresource() throws ZikresourceRepositoryException {
        // GIVEN an exception during getting the zikresource
        given(zikresourceRepository.findById(any())).willThrow(new ZikresourceRepositoryException("", null));

        // WHEN the service is call // THEN a custom exception is thrown
        thenExceptionOfType(ZikresourceRepositoryException.class)
                .isThrownBy(() -> service.findOne(any()));
    }
}
