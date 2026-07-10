// MISSING DEPENDENCY: org.seleniumhq.selenium:selenium-java
// MISSING DEPENDENCY: io.github.bonigarcia:webdrivermanager
package com.boilerplate.ui.tests;

import com.boilerplate.ui.tests.pages.GoogleSearchPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class RecordedFlowTest {

    private WebDriver driver;
    private GoogleSearchPage googleSearchPage;

    @BeforeEach
    void setUp() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless"); // Run in headless mode
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");
        driver = new ChromeDriver(options);
        googleSearchPage = new GoogleSearchPage(driver);
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    void recordedFlow() {
        driver.get("https://www.google.com/");

        googleSearchPage.fillSearchInput("hi");
        googleSearchPage.fillSearchInput("are you ready");
        googleSearchPage.clickAcdcSongLink();

        // Add assertions here to verify the next page or state
    }
}
