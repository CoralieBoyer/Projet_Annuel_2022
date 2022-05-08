package com.example.dashboardclient;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.text.Text;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ResourceBundle;

public class Profil extends SceneController {
    @FXML
    TextField nameField = new TextField();
    @FXML
    TextField emailField = new TextField();
    @FXML
    TextField passwordField = new TextField();
    @FXML
    TextField siretField = new TextField();
    @FXML
    Text userExistOrNo = new Text();
    @FXML
    Text changedOrNot = new Text();
    @FXML
    Button accueilButton = new Button();

    StringBuilder content;

    //function that disable the accueil button
    public void disableAccueilButton() {
        accueilButton.setDisable(true);
    }

    public Profil() {
        super();
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        super.initialize(url, resourceBundle);
    }

    public void initData(String id, ActionEvent event) throws IOException {
        super.id = id;
        disableAccueilButton();
        fillUserInfosField(event);
    }

    public void switchToAccueil(ActionEvent event) throws IOException {
        super.switchToAccueil(event);
    }

    public void switchToPrestations(ActionEvent event) throws IOException {
        super.switchToPrestations(event);
    }

    public void switchToProfil(ActionEvent event) throws IOException {
        super.switchToProfil(event);
    }

    public void switchToConversions(ActionEvent event) throws IOException {
        super.switchToConversions(event);
    }

    public void switchToHelp(ActionEvent event) throws IOException {
        super.switchToHelp(event);
    }

    public String modifyInfosUser(ActionEvent event) throws IOException {
        HttpURLConnection con = null;
        var url = "http://localhost:8888/API/java/profile";
        if (nameField.getText() == null || nameField.getText().isEmpty() || emailField.getText() == null || emailField.getText().isEmpty() || passwordField.getText() == null || passwordField.getText().isEmpty()) {
            userExistOrNo.setText("Veuillez remplir tous les champs");
            return null;
        }
        var urlParameters = "action=" + "modifyUserInfos" + "&name=" + nameField.getText() + "&email=" + emailField.getText() + "&password=" + passwordField.getText() + "&id=" + super.id;

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

            try (var br = new BufferedReader(new InputStreamReader(con.getInputStream()))) {

                String line;
                this.content = new StringBuilder();

                while ((line = br.readLine()) != null) {
                    this.content.append(line);
                    this.content.append(System.lineSeparator());
                }
            }

        } finally {

            con.disconnect();
        }
        userExistOrNo.setText("Changements éffectués");
        return url;
    }


    public String modifySiretPartner(ActionEvent event) throws IOException {
        HttpURLConnection con = null;
        var url = "http://localhost:8888/API/java/profile";

        if (siretField.getText() == null || siretField.getText().isEmpty()) {
            changedOrNot.setText("Veuillez remplir le champ");
            return null;
        }
        //il faut que le siret soit un nombre
        else if (!siretField.getText().matches("[0-9]+")) {
            siretField.setText("");
            changedOrNot.setText("Veuillez entrer un nombre");
        } else {
            var urlParameters = "action=" + "modifyPartnerInfos" + "&siret=" + siretField.getText() + "&status=" + 1 + "&id_user=" + super.id;
            //afficher le contenu de la requête
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

                try (var br = new BufferedReader(new InputStreamReader(con.getInputStream()))) {

                    String line;
                    this.content = new StringBuilder();

                    while ((line = br.readLine()) != null) {
                        this.content.append(line);
                        this.content.append(System.lineSeparator());
                    }
                }
                changedOrNot.setText("Changements éffectués");

            } finally {

                con.disconnect();
            }

            return url;
        }
        return url;
    }

    public static String[][] parseUserInfos(String contentToParse) {

        JSONObject albums = new JSONObject(contentToParse);
        String[][] infos = new String[5][albums.length()];

        infos[0][0] = albums.getString("name");
        infos[1][0] = albums.getString("email");
        infos[2][0] = albums.getString("siret");
        return infos;
    }

    public String fillUserInfosField(ActionEvent event) throws IOException {
        HttpURLConnection con = null;
        var url = "http://localhost:8888/API/java/profile";

        var urlParameters = "action=" + "getAllWithIdUser" + "&id=" + super.id;

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


            try (var br = new BufferedReader(new InputStreamReader(con.getInputStream()))) {

                String line;
                this.content = new StringBuilder();

                while ((line = br.readLine()) != null) {
                    this.content.append(line);
                    this.content.append(System.lineSeparator());
                }
            }
            String[][] contentParsed;
            //rangez les infos dans un tableau
            contentParsed = parseUserInfos(this.content.toString());
            //remplis les champs

            nameField.setPromptText(contentParsed[0][0]);
            emailField.setPromptText(contentParsed[1][0]);
            siretField.setPromptText(contentParsed[2][0]);


        } finally {

            con.disconnect();
        }


        return url;
    }


}


