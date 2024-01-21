package com.zikstock.songbook.api;

import io.quarkus.test.junit.QuarkusTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.zikstock.songbook.dto.Zikresource;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
class ZikresourceApiTest {

  @Test
  void shouldGetAllZikresources() {
    given()
        .when().get("/zikresources")
        .then()
        .statusCode(200)
        .assertThat()
        .body("size()", is(2));
  }

  @Test
  void shouldGetZikresource() {
    var response = given().when().get("/zikresources/c5d027da-1689-4217-8309-edd8283e99fe")
        .then()
        .statusCode(200)
        .extract()
        .as(Zikresource.class);

    assertEquals("https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2", response.url());
    assertEquals("Sober", response.title());
    assertEquals("Tool", response.artist());
  }

  @Test
  @DisplayName("If the zikresource contains all the mandatory fields, the zikresource should be created.")
  void shouldCreateZikresource() {
    var body = """
        {
          "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
          "title": "Sober",
          "artist": "Tool"
        }
          """;
    var response = given()
        .request().contentType("application/json").body(body)
        .when().post("zikresources")
        .then()
        .statusCode(201)
        .extract()
        .as(Zikresource.class);

    assertEquals("https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2", response.url());
    assertEquals("Sober", response.title());
    assertEquals("Tool", response.artist());
  }

  @Test
  @DisplayName("If one of the the mandatory fields is missing in the zikresource, the user should have a 400 error.")
  void shouldThrowsAnErrorBecauseMandatoryFieldIsMissingDuringCreation() {
    var body = """
        {
          "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2"
        }
        """;
    given()
        .request().contentType("application/json").body(body)
        .when().post("zikresources")
        .then()
        .statusCode(400);

    body = """
        {
          "title": "Sober"
        }
        """;
    given()
        .request().contentType("application/json").body(body)
        .when().post("zikresources")
        .then()
        .statusCode(400);
  }

  @Test
  @DisplayName("Should not accept too much tags")
  void shouldNotAcceptTooMuchTags() {
    var body = """
        {
          "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
          "title": "Sober",
          "artist": "Tool",
          "tags" : [
            { "label": "label1", "value": "value1" },
            { "label": "label2", "value": "value2" },
            { "label": "label3", "value": "value3" },
            { "label": "label4", "value": "value4" },
            { "label": "label5", "value": "value5" },
            { "label": "label7", "value": "value6" },
            { "label": "label6", "value": "value7" },
            { "label": "label8", "value": "value8" },
            { "label": "label9", "value": "value9" },
            { "label": "label11", "value": "value10" },
            { "label": "label10", "value": "value11" }
          ]
        }
          """;

    var response = given()
        .request().contentType("application/json").body(body)
        .when().post("zikresources")
        .then()
        .statusCode(400)
        .extract()
        .asString();

    assertTrue(response.contains("Maximum 10 tags are allowed"));
  }

  @Test
  @DisplayName("Should delete the zikresource that must be deleted")
  void shouldDeleteTheExpedResource() {
    given()
        .when().delete("/zikresources/e337298e-eec1-4443-b0b7-77e9f307dec9")
        .then().statusCode(204);
  }

  @Test
  @DisplayName("Should return a 204 on the delete because indempotent, even if the resource doesn't exist")
  void shouldNotDeleteTheUnknownResource() {
    given()
        .when().delete("/zikresources/56d4ff88-6606-4b48-b430-ab4cf9be061b")
        .then().statusCode(204);
  }

}
