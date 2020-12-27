import io.restassured.RestAssured;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static io.restassured.config.EncoderConfig.encoderConfig;

public class tests {

    static String bearerToken = "eOw6p-bZQCwAAAAAAAAAAW7-w1SdQcoE0SoSNdL0xluBd4Cax7qRUqavuUib2WTi";

    @Test
    public void uploadTest() {
        RestAssured.config = RestAssured.config().encoderConfig(encoderConfig().appendDefaultContentCharsetToContentTypeIfUndefined(false));

        File file = new File("src/test/resources/success.jpg");
        String arg = "{\"mode\":\"add\",\"autorename\":true,\"mute\":false,\"path\":\"/success.jpg\"}";

        given()
                .headers("Authorization","Bearer " + bearerToken, "Content-Type", "application/octet-stream",	"Dropbox-API-Arg", arg)
                .body(file)
                .when()
                .post("https://content.dropboxapi.com/2/files/upload")
                .then()
                .statusCode(200);
    }

    @Test
    public void metadataTest() {
        Map<String,String> path = new HashMap<String, String>();
        path.put("path", "/success.jpg");
        given()
                .headers("Authorization","Bearer " + bearerToken,	"Content-Type", "application/json")
                .body(path)
                .when()
                .post("https://api.dropboxapi.com/2/files/get_metadata")
                .then()
                .statusCode(200);
    }


    @Test
    public void deleteTest() {
        Map<String,String> path = new HashMap<String, String>();
        path.put("path", "/success.jpg");
        given()
                .headers("Authorization","Bearer " + bearerToken, "Content-Type", "application/json")
                .body(path)
                .when()
                .post("https://api.dropboxapi.com/2/files/delete_v2")
                .then()
                .statusCode(200);
    }

}
