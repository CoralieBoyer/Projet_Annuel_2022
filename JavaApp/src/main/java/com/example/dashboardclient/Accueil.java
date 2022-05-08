package com.example.dashboardclient;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;

import javafx.scene.control.*;
import javafx.scene.text.Text;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.*;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;


public class Accueil extends SceneController {
    StringBuilder content;

    @FXML
    Button accueilButton = new Button();
    @FXML
    Text HttpsTextField = new Text();
    @FXML
    TextField EmailTextField = new TextField();
    @FXML
    TextField PasswordTextField = new TextField();
    @FXML
    Text userExistOrNot = new Text();

    public Accueil() throws IOException {
        super();
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        super.initialize(url, resourceBundle);
    }

    public void initData(String id) {
        super.id = id;
    }

    public void disableAccueilButton() {
        accueilButton.setDisable(true);
    }

    FileWriter logfile = new FileWriter("src/main/resources/logfile.txt", true);

    //function that disable the accueil button
    public void writeLogFile(String message) throws IOException {
        try {
            //ajout du message dans le fichier logfile avec la date et l'heure
            logfile.write(message + " " + "à" + " " + new Date().toString() + " " + "lorsque le user(" + EmailTextField.getText() + ") à tenté de se connecter " + "\n");
            logfile.close();
        } catch (IOException e) {
            System.out.println("Erreur d'écriture dans le fichier logfile");
        }

    }

    public void switchToAccueil(ActionEvent event) throws IOException {
        super.switchToAccueil(event);
    }

    public void switchToPrestations(ActionEvent event) throws IOException {
        //si l'id n'est pas null, on est redirigé vers la page des prestations
        if (super.id == null) {
            super.switchToPrestations(event);
        } else {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Erreur,Veuillez vous connecter");
            alert.setContentText("Vous n'êtes pas connécté !!");
            alert.showAndWait();
            disableAccueilButton();
            super.switchToAccueil(event);
        }
    }

    public void switchToProfil(ActionEvent event) throws IOException {
        if (super.id == null) {
            super.switchToProfil(event);
        } else {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Erreur,Veuillez vous connecter");
            alert.setContentText("Vous n'êtes pas connécté !!");
            alert.showAndWait();
            super.switchToAccueil(event);
        }
    }

    public void switchToConversions(ActionEvent event) throws IOException {
        if (super.id == null) {
            super.switchToConversions(event);
        } else {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Erreur,Veuillez vous connecter");
            alert.setContentText("Vous n'êtes pas connécté !!");
            alert.showAndWait();
            super.switchToAccueil(event);
        }
    }

    public void switchToHelp(ActionEvent event) throws IOException {
        if (super.id == null) {
            super.switchToHelp(event);
        } else {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Erreur,Veuillez vous connecter");
            alert.setContentText("Vous n'êtes pas connécté !!");
            alert.showAndWait();
            super.switchToAccueil(event);
        }
    }

    public String parsePostConnectResponse(String content, ActionEvent event) throws IOException {

        JSONObject albums = new JSONObject(content);
        try {
            String id = albums.getString("id");
            String user = albums.getString("user");
            if (user.equals("partner")) {
                return id;
            } else {
                userExistOrNot.setText("Vous n'êtes pas un partenaire");
            }
        } catch (Exception e) {
            userExistOrNot.setText("L'utilisateur n'existe pas");
        }

        return null;
    }

    public String JavaPostRequest(ActionEvent event) throws IOException {
        HttpURLConnection con = null;
        var url = "http://localhost:8888/API/customers/connexion";
        if (EmailTextField.getText() == null || EmailTextField.getText().isEmpty() || PasswordTextField.getText() == null || PasswordTextField.getText().isEmpty()) {
            userExistOrNot.setText("Veuillez remplir les 2 champs");
            return null;
        }
        var urlParameters = "name=" + EmailTextField.getText() + "&password=" + PasswordTextField.getText();
        byte[] postData = urlParameters.getBytes(StandardCharsets.UTF_8);

        try {

            var myurl = new URL(url);
            con = (HttpURLConnection) myurl.openConnection();

            con.setDoOutput(true);
            con.setRequestMethod("POST");
            con.setRequestProperty("User-Agent", "Java client");
            con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            try (var wr = new DataOutputStream(con.getOutputStream())) {

                wr.write(postData);
            }

            try (var br = new BufferedReader(
                    new InputStreamReader(con.getInputStream()))) {

                String line;
                this.content = new StringBuilder();

                while ((line = br.readLine()) != null) {
                    this.content.append(line);
                    this.content.append(System.lineSeparator());
                }
            }
            String content;
            content = parsePostConnectResponse(String.valueOf(this.content), event);
            if (content != null) {
                HttpsTextField.setText(content);
                super.id = content;
                super.switchToPrestations(event);
            }
        } catch (IOException e) {
            writeLogFile(e.getMessage());
            userExistOrNot.setText("Erreur de connexion avec le serveur");
        } finally {

            con.disconnect();
        }

        return url;
    }


    //parser la reponse
    public static String[][] parseConnectResponse(String responseBody) {

        JSONArray albums = new JSONArray(responseBody);
        String[][] infos = new String[5][albums.length()];
        for (int i = 0; i < albums.length(); i++) {
            JSONObject album = albums.getJSONObject(i);
            int id = album.getInt("id");
            infos[0][i] = album.getString("id");
            infos[1][i] = album.getString("name");
            infos[2][i] = album.getString("description");
            infos[3][i] = album.getString("price");

            //affichez
            System.out.println(infos[0][i] + " " + infos[1][i] + " " + infos[2][i] + " " + infos[3][i]);
        }
        return infos;
    }

    public String onHttpGet(ActionEvent event) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8888/API/controllers/java.php"))
                .build();

        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());

        String[][] parsedInfos = parseConnectResponse(response.body().toString());

        //rangez les infos dans les textfields
        for (int i = 0; i < parsedInfos[0].length; i++) {
            HttpsTextField.setText(parsedInfos[0][i] + " " + parsedInfos[1][i] + " " + parsedInfos[2][i] + " " + parsedInfos[3][i]);
        }

        return response.body();
    }


}
