import { test, expect } from '@playwright/test';
import path from "path";
const UI_URL = "http://localhost:5173/"

test.beforeEach(async ({page})=> {
  await page.goto(UI_URL); 
  await page.getByRole("link", {name: "Sign In"}).click();
  await expect(page.getByRole("heading", {name: "Create an Account"})).toBeVisible();
  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");
  await page.getByRole("button", {name: "Login"}).click();
  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("should allow user to add a hotel", async ({page}) => {
    await page.goto(`${UI_URL}add-hotel`);
    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("Test Description");
    await page.locator('[name="pricePerNight"]').fill("200");
    await page.selectOption('select[name="starRating"]', "3")

    await page.getByText("Luxury").click();

    await page.getByLabel("Free WiFi").check();
    await page.getByLabel("Parking").check();

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("3");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "2.jpg"),
    ])

    await page.getByRole("button", {name:"Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible()

})