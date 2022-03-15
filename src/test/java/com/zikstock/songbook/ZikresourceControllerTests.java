package com.zikstock.songbook;

import org.json.JSONArray;
import org.json.JSONException;
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
        String newZikresource = this.getSimpleZikresourceJson();

        // WHEN we add it into our system
        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/api/zikresources")
                .contentType(MediaType.APPLICATION_JSON)
                .content(newZikresource)).andReturn();

        // THEN we have a 201 AND the response contains de zikresource created
        assertEquals(HttpStatus.CREATED.value(), result.getResponse().getStatus());
        assertTrue(result.getResponse().getContentAsString().contains("{\"id\":"));
    }

    @Test
    public void creationFailsWithMissedMandatoryData() throws Exception {
        // GIVEN a zikresource with a missed mandatory information
        String newZikresource = this.getZikresourceJsonWithMissedMandatoryData();

        // WHEN we add it into our system
        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/api/zikresources")
                .contentType(MediaType.APPLICATION_JSON)
                .content(newZikresource)).andReturn();

        // THEN we have a 400 AND the response contains a message to explain the error
        assertEquals(HttpStatus.BAD_REQUEST.value(), result.getResponse().getStatus());
        assertTrue(result.getResponse().getContentAsString().contains("\"message\":\"Validation failed"));
    }

    @Test
    public void creationFailsWithTooMuchTags() throws Exception {
        // GIVEN a zikresource with 11 tags
        String newZikresource = this.getZikresourceJsonWithTooMuchTags();

        // WHEN we add it into our system
        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/api/zikresources")
                .contentType(MediaType.APPLICATION_JSON)
                .content(newZikresource)).andReturn();

        // THEN we have a 400 AND the response contains a message to explain the error
        assertEquals(HttpStatus.BAD_REQUEST.value(), result.getResponse().getStatus());
        assertTrue(result.getResponse().getContentAsString().contains("\"message\":\"Validation failed"));
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
    public void updateIsOk() throws Exception {
        // GIVEN an existing zikresource
        String existingZikresource = this.getExistingZikresourceJson();

        // WHEN we update it in our system
        MvcResult result = mvc.perform(MockMvcRequestBuilders.put("/api/zikresources/24705f60-7f2a-491b-a5d4-16467662cdd2")
                .contentType(MediaType.APPLICATION_JSON)
                .content(existingZikresource)).andReturn();

        // THEN we have a 200 AND the response contains de zikresource updated
        assertEquals(HttpStatus.OK.value(), result.getResponse().getStatus());
        assertTrue(result.getResponse().getContentAsString().contains("{\"id\":"));
    }

    @Test
    public void updateAnUnknownZikresourceFails() throws Exception {
        // GIVEN an unknown zikresource
        String unknownZikresource = this.getUnknownZikresourceJson();

        // WHEN we update it in our system
        MvcResult result = mvc.perform(MockMvcRequestBuilders.put("/api/zikresources/" + this.getUnknownZikresourceId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(unknownZikresource)).andReturn();

        // THEN we have a 404
        assertEquals(HttpStatus.NOT_FOUND.value(), result.getResponse().getStatus());
    }

    @Test
    public void updateAnotherZikresourceFails() throws Exception {
        // GIVEN a known zikresource id but a zikresource defined with another id
        String id = this.getExistingZikresourceId();
        String unknownZikresource = this.getUnknownZikresourceJson();

        // WHEN we update it in our system
        MvcResult result = mvc.perform(MockMvcRequestBuilders.put("/api/zikresources/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(unknownZikresource)).andReturn();

        // THEN we have a 400
        assertEquals(HttpStatus.BAD_REQUEST.value(), result.getResponse().getStatus());
    }

    @Test
    public void updateFailsWithMissedMandatoryData() {

    }

    @Test
    public void updateFailsWithTooMuchTags() {

    }

    private String getSimpleZikresourceJson() {
        return """
                {
                    "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
                    "title": "Sober"
                }
                """;
    }

    private String getExistingZikresourceId() {
        return "24705f60-7f2a-491b-a5d4-16467662cdd2";
    }

    private String getUnknownZikresourceId() {
        return "1904519e-7722-4add-a1b7-692ed14e9e72";
    }

    private String getUnknownZikresourceJson() {
        String unknownZikresource = """
            {
                "id": "%s",
                "url": "https://www.fake.fr/tabs-pdf/unknown-tab",
                "title": "Unknown zikresource"
            }
            """;
        return String.format(unknownZikresource, this.getUnknownZikresourceId());
    }

    private String getExistingZikresourceJson() {
        String existingZikresource = """
            {
                "id": "%s",
                "url": "https://www.guitare6.fr/tabs-pdf/tabs.php?pdf=JimiHendrix/LittleWing-1",
                "title": "Little wing"
            }
            """;
        return String.format(existingZikresource, this.getExistingZikresourceId());
    }

    private String getZikresourceJsonWithMissedMandatoryData() throws JSONException {
        return """
                {
                    "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2"
                }
                """;
    }

    private String getZikresourceJsonWithTooMuchTags() throws JSONException {
        var newZikresource = new JSONObject();
        newZikresource.put("url", "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2");
        newZikresource.put("title", "Sober");
        var tags = new JSONArray();
        for (int i = 0; i < 11; i++) {
            var tag = new JSONObject();
            tag.put("label", "tag" + i);
            tag.put("value", "value" + i);
            tags.put(tag);
        }
        newZikresource.put("tags", tags);
        return newZikresource.toString();
    }

}
