package com.example.dashboardclient;

import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.text.Text;
import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class Help extends SceneController{


    @FXML
    Text contentToParseField = new Text();
    @FXML
    Button accueilButton = new Button();
    //function that disable the accueil button

    public void disableAccueilButton(){
        accueilButton.setDisable(true);
    }
    public Help() {
        super();
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        super.initialize(url, resourceBundle);
    }

    public void initData(String id){
        super.id = id;
        disableAccueilButton();
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

    public void printContentToParse(ActionEvent event) throws IOException {
        contentToParseField.setText(super.id);
    }
    @FXML
    protected void onLeaveButtonClick() {
        super.onLeaveButtonClick();
    }






}


