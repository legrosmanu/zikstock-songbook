package com.zikstock.songbook.application;

import java.io.File;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.configuration2.Configuration;
import org.apache.commons.configuration2.builder.fluent.Configurations;

public class ConfigApp {

    private Configuration config;
    private static final Logger logger = Logger.getLogger(ConfigApp.class.getName());

    public ConfigApp() {
        var configs = new Configurations();
        try {
            config = configs.properties(new File("application.properties"));
        } catch (Exception e) {
            logger.log(Level.SEVERE, String.format("Failed to load configuration, null: %s", e.getMessage()), e);
        }
    }

    public String getGcpProjectId() {
        return config.getString("gcp.project-id");
    }

    public int getAppPort() {
        return config.getInt("app.port", 8080);
    }

}
