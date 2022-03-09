package com.zikstock.songbook;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = SongbookApplication.class)
@AutoConfigureMockMvc
public class ZikresourceControllerTests {

    @Autowired
    private MockMvc mvc;

    @Test
    public void creationIsOk() throws Exception {
        // GIVEN the simplest zikresource
        var newZikresource = new JSONObject();
        newZikresource.put("url", "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2");
        newZikresource.put("title", "Sober");

        // WHEN we add it into our system
        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/api/zikresources")
                .contentType(MediaType.APPLICATION_JSON)
                .content(newZikresource.toString())).andReturn();

        // THEN we have a 201 AND the response contains de zikresource created
        assertEquals(HttpStatus.CREATED.value(), result.getResponse().getStatus());
        assertTrue(result.getResponse().getContentAsString().contains("{\"id\":"));
    }

    @Test
    public void creationFailsWithMissedMandatoryData() throws Exception {
        // GIVEN a zikresource with a missed mandatory information
        var newZikresource = new JSONObject();
        newZikresource.put("url", "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2");

        // WHEN we add it into our system
        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/api/zikresources")
                .contentType(MediaType.APPLICATION_JSON)
                .content(newZikresource.toString())).andReturn();

        // THEN we have a 400 AND the response contains a message to explain the error
        assertEquals(HttpStatus.BAD_REQUEST.value(), result.getResponse().getStatus());
        assertTrue(result.getResponse().getContentAsString().contains("\"message\":\"Validation failed"));
    }

    @Test
    public void creationFailsWithTooMuchTags() {

    }

    @Test
    public void getIsOkForKnownZikresource() {

    }

    @Test
    public void getIsNotFoundForUnknownZikresource() {

    }

    @Test
    public void deleteIsOkForKnownZikresource() {

    }

    @Test
    public void deleteHasNoEffectForUnknownZikresource() {

    }

    @Test
    public void updateIsOk() {

    }

    @Test
    public void updateFailsWithMissedMandatoryData() {

    }

    @Test
    public void updateFailsWithTooMuchTags() {

    }

}
