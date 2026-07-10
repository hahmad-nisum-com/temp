// MISSING DEPENDENCY: org.seleniumhq.selenium:selenium-java
// MISSING DEPENDENCY: io.github.bonigarcia:webdrivermanager
package com.boilerplate.uitest;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class GoogleSearchTest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    public void recordedFlowPositiveTest() {
        // 1. Navigate to https://www.google.com/
        driver.get("https://www.google.com/");

        // 2. Fill the "Search" field with "hi"
        WebElement searchBox = driver.findElement(By.name("q"));
        searchBox.sendKeys("hi");

        // 3. Fill the "Search" field with "are you ready"
        searchBox.clear();
        searchBox.sendKeys("are you ready");
        searchBox.sendKeys(Keys.ENTER);

        // 4. Click the "Are You Ready (AC/DC song)" heading
        WebElement resultLink = wait.until(ExpectedConditions.elementToBeClickable(By.partialLinkText("Are You Ready (AC/DC song)")));
        resultLink.click();

        // Assertion
        wait.until(ExpectedConditions.urlContains("wikipedia") );
        String currentUrl = driver.getCurrentUrl();
        assertTrue(currentUrl.contains("Are_You_Ready_(AC/DC_song)"), "URL should contain 'Are_You_Ready_(AC/DC_song)'. Actual URL: " + currentUrl);
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
