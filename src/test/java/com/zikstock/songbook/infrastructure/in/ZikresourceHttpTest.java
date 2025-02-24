package com.zikstock.songbook.infrastructure.in;

import com.zikstock.songbook.domain.Zikresource;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.BDDAssertions.then;

@QuarkusTest
class ZikresourceHttpTest {

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

    // THEN
    then(response.url()).isEqualTo("https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2");
    then(response.title()).isEqualTo("Sober");
    then(response.artist()).isEqualTo("Tool");
    then(response.id()).isNotNull();
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

    then(response).contains("Maximum 10 tags are allowed");
  }

}
