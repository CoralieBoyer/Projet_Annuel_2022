package com.example.dashboardclient;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

import javafx.application.Platform;
import java.io.IOException;
import java.net.URL;
import java.util.Objects;
import java.util.ResourceBundle;



public class SceneController implements Initializable {
    private Stage stage;
    private Scene scene;
    private Parent root;

    public String id;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
    }

    public void switchToAccueil(ActionEvent event) throws IOException {
        Platform.runLater(() -> {
            try {

                FXMLLoader accueil = new FXMLLoader(getClass().getResource("Accueil.fxml"));
                Parent accueilScene = accueil.load();

                Accueil accueilController = accueil.getController();
                accueilController.initData(this.id);
                accueil.setController(accueilController);

                stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
                scene = new Scene(accueilScene);
                stage.setScene(scene);
                stage.show();
            }catch (Exception e){
                e.printStackTrace();
            }
        });
    }

    public void switchToPrestations(ActionEvent event) throws IOException {


        Platform.runLater(() -> {
            try {

                FXMLLoader prestations = new FXMLLoader(getClass().getResource("Prestations.fxml"));
                Parent prestationsScene = prestations.load();

                Prestations prestationsController = prestations.getController();
                prestationsController.initData(this.id);
                prestations.setController(prestationsController);

                stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
                scene = new Scene(prestationsScene);
                stage.setScene(scene);
                stage.show();
            }catch (Exception e){
                e.printStackTrace();
            }
        });
    }

    //switch to Profil
    public void switchToProfil(ActionEvent event) throws IOException {
        Platform.runLater(() -> {
            try {

                FXMLLoader profil = new FXMLLoader(getClass().getResource("Profil.fxml"));
                Parent profilScene = profil.load();

                Profil profilController = profil.getController();
                profilController.initData(this.id,event);
                profil.setController(profilController);

                stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
                scene = new Scene(profilScene);
                stage.setScene(scene);
                stage.show();
            }catch (Exception e){
                e.printStackTrace();
            }
        });
    }

    //switch to Conversions
    public void switchToConversions(ActionEvent event) throws IOException {
        Platform.runLater(() -> {
            try {

                FXMLLoader conversions = new FXMLLoader(getClass().getResource("Conversions.fxml"));
                Parent conversionsScene = conversions.load();

                Conversions conversionsController = conversions.getController();
                conversionsController.initData(this.id);
                conversions.setController(conversionsController);

                stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
                scene = new Scene(conversionsScene);
                stage.setScene(scene);
                stage.show();
            }catch (Exception e){
                e.printStackTrace();
            }
        });
    }

    //switch to Help
    public void switchToHelp(ActionEvent event) throws IOException {
        Platform.runLater(() -> {
            try {

                FXMLLoader help = new FXMLLoader(getClass().getResource("Help.fxml"));
                Parent helpScene = help.load();

                Help helpController = help.getController();
                helpController.initData(this.id);
                help.setController(helpController);

                stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
                scene = new Scene(helpScene);
                stage.setScene(scene);
                stage.show();
            }catch (Exception e){
                e.printStackTrace();
            }
        });
    }

    @FXML
    protected void onLeaveButtonClick() {
        //quittez l'application
        System.exit(0);
    }
}





