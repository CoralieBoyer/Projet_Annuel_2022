package com.example.dashboardclient;

import javafx.beans.Observable;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.text.Text;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ResourceBundle;

public class Prestations extends SceneController {

    @FXML
    TextField nameField = new TextField();
    @FXML
    TextField priceField = new TextField();
    @FXML
    TextField descriptionField = new TextField();
    @FXML
    TextField quantityField = new TextField();
    @FXML
    Text userExistOrNo = new Text();
    @FXML
    Button accueilButton = new Button();

    @FXML
    private TableView<PrestationsModel> tableView;
    @FXML
    public TableColumn<PrestationsModel, String> price;
    @FXML
    public TableColumn<PrestationsModel, String> name;
    @FXML
    public TableColumn<PrestationsModel, String> description;
    @FXML
    public TableColumn<PrestationsModel, String> quantity;

    StringBuilder content;

    //function that disable the accueil button
    public void disableAccueilButton() {
        accueilButton.setDisable(true);
    }

    public Prestations() {
        super();
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        super.initialize(url, resourceBundle);
    }

    //pour faire passer des infos + lancé des que la page est chargée
    public void initData(String id) {
        disableAccueilButton();
        super.id = id;
        try {
            postToGetPrestations();
        } catch (IOException e) {
            e.printStackTrace();
        }
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

    //parser le get pour récupérer les prestations et les produits
    public static String[][] parseGetProductAndPrestations(String responseBody) {

        JSONArray albums = new JSONArray(responseBody);
        String[][] infos = new String[5][albums.length()];
        for (int i = 0; i < albums.length(); i++) {
            JSONObject album = albums.getJSONObject(i);
            int id = album.getInt("id");
            infos[0][i] = album.getString("name");
            infos[1][i] = album.getString("price");
            infos[2][i] = album.getString("description");
            infos[3][i] = album.getString("quantity");
        }
        return infos;
    }

    //fonction pour récupérer les prestations et les produits et les ranger dans une table
    public String postToGetPrestations() throws IOException {
        HttpURLConnection con = null;
        var url = "http://localhost:8888/API/java/prestation";
        var urlParameters = "action=" + "getInfos" + "&id=" + super.id;
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
            String[][] contentParsed;
            contentParsed = parseGetProductAndPrestations(String.valueOf(this.content));

            ObservableList<PrestationsModel> prestationsModels = FXCollections.observableArrayList();

            price.setCellValueFactory(new PropertyValueFactory<>("Price"));
            name.setCellValueFactory(new PropertyValueFactory<>("Name"));
            description.setCellValueFactory(new PropertyValueFactory<>("Description"));
            quantity.setCellValueFactory(new PropertyValueFactory<>("Quantity"));
            //add your data to the table here.
            for (int i = 0; i < contentParsed[0].length; i++) {
                prestationsModels.add(new PrestationsModel(contentParsed[0][i], contentParsed[1][i], contentParsed[2][i], contentParsed[3][i]));
            }
            tableView.setItems(prestationsModels);


        } finally {

            con.disconnect();
        }

        return url;
    }

    //fonction pour ajouter des prestations et des produits
    public String addProductOrPrestation(ActionEvent event) throws IOException {
        HttpURLConnection con = null;
        var url = "http://localhost:8888/API/java/product";
        if (nameField.getText() == null || nameField.getText().isEmpty() || priceField.getText() == null || priceField.getText().isEmpty() || descriptionField.getText() == null || descriptionField.getText().isEmpty() || quantityField.getText() == null || quantityField.getText().isEmpty()) {
            userExistOrNo.setText("Veuillez remplir tous les champs");
            return null;
        }
        var urlParameters = "action=" + "insertNewProductOrPrestation" + "&name=" + nameField.getText() + "&actual_price=" + priceField.getText() + "&description=" + descriptionField.getText() + "&quantity=" + quantityField.getText() + "&id=" + super.id;
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
            userExistOrNo.setText(nameField.getText() + "" + "a été ajouté");
            postToGetPrestations();
        } finally {
            con.disconnect();
        }


        return url;
    }

    @FXML
    protected void onLeaveButtonClick() {
        super.onLeaveButtonClick();
    }

}


