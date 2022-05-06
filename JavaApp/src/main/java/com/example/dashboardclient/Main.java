package com.example.dashboardclient;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class Main extends Application {

    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("Accueil.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 1280, 800);

        Accueil accueilController = fxmlLoader.getController();
        accueilController.initData("");

        fxmlLoader.setController(accueilController);


        stage.setTitle("SACFidelity");
        stage.setScene(scene);
        stage.show();

    }

    public static void main(String[] args) {
        launch();
    }
}
