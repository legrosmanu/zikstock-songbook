package com.zikstock.songbook.domain;

import com.zikstock.songbook.domain.out.ZikresourceRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;

public class ZikresourceServiceTest {

    ZikresourceRepository zikresourceRepository = mock(ZikresourceRepository.class);
    ZikresourceService service = new ZikresourceService(zikresourceRepository);

    @Test
    void should_return_custom_exception_when_getting_one_zikresource() throws ZikresourceRepositoryException {
        // GIVEN an exception during getting the zikresource
        BDDMockito.given(zikresourceRepository.findById(any())).willThrow(new ZikresourceRepositoryException("", null));

        // WHEN the service is call // THEN a custom exception is thrown
        Assertions.assertThatThrownBy(() -> service.findOne(any()))
                .isInstanceOf(ZikresourceRepositoryException.class);
    }
}
