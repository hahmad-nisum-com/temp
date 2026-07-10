// MISSING DEPENDENCY: org.seleniumhq.selenium:selenium-java
// MISSING DEPENDENCY: io.github.bonigarcia:webdrivermanager
package com.boilerplate.ui.tests.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class GoogleSearchPage {

    private final WebDriver driver;
    private final WebDriverWait wait;

    @FindBy(id = "APjFqb")
    private WebElement searchInput;

    @FindBy(xpath = "//*[text()='Are You Ready (AC/DC song)']")
    private WebElement acdcSongLink;

    public GoogleSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        PageFactory.initElements(driver, this);
    }

    public void fillSearchInput(String text) {
        wait.until(ExpectedConditions.visibilityOf(searchInput));
        searchInput.clear();
        searchInput.sendKeys(text);
    }
    
    public void clickAcdcSongLink() {
        wait.until(ExpectedConditions.elementToBeClickable(acdcSongLink));
        acdcSongLink.click();
    }
}
