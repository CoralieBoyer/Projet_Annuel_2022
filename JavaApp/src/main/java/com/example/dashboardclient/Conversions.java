package com.example.dashboardclient;

import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.text.Text;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class Conversions extends SceneController {

    @FXML
    Text contentToParseField = new Text();
    @FXML
    Text resultEuros = new Text();
    @FXML
    TextField inputInPoints = new TextField();

    @FXML
    Button accueilButton = new Button();
    //function that disable the accueil button

    public void disableAccueilButton() {
        accueilButton.setDisable(true);
    }

    public Conversions() {
        super();
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        super.initialize(url, resourceBundle);
    }

    public void initData(String id) {
        super.id = id;
        disableAccueilButton();
        inputInPoints.setPromptText("Entrez le nombre de points");
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

    public Object conversionEuro(ActionEvent event) throws IOException {
        if (inputInPoints.getText() == null || inputInPoints.getText().isEmpty()) {
            resultEuros.setText("Veuillez remplir les 2 champs");
            return null;
        }

        try {
            Double points = Double.valueOf(inputInPoints.getText());
            resultEuros.setText(String.valueOf(points / 5) + " euros");
        } catch (NumberFormatException e) {
            inputInPoints.setText("");
            resultEuros.setText("Veuillez entrer un nombre");
        }


        return null;
    }

    @FXML
    protected void onLeaveButtonClick() {
        super.onLeaveButtonClick();
    }


}


