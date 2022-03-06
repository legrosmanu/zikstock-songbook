package com.zikstock.songbook;

import com.zikstock.songbook.zikresource.ZikresourceController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class SongbookApplicationTests {

	@Autowired
	private ZikresourceController zikresourceController;

	@Test
	void contextLoads() {
		assertThat(zikresourceController).isNotNull();
	}

}
