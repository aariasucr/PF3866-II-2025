import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://websitedemos.net/brandstore-02/");
  await page.getByRole("heading", { name: "% Off On All Products" }).click();
  await expect(
    page.getByRole("heading", { name: "% Off On All Products" })
  ).toBeVisible();
  await page.getByRole("link", { name: "DNK Yellow Shoes" }).first().click();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "View cart" }).click();
  await page.getByRole("link", { name: "Checkout" }).click();
  await page.getByRole("button", { name: " Place Order  $" }).click();
  await expect(
    page.getByText(
      "Billing First name is a required field. Billing Last name is a required field."
    )
  ).toBeVisible();

  await page.getByRole("textbox", { name: "First name" }).fill("Andres");
  await page.getByRole("textbox", { name: "First name" }).press("Tab");
  await page.getByRole("textbox", { name: "Last name" }).fill("Arias");
  await page.getByRole("textbox", { name: "Last name" }).press("Tab");
  await page.getByRole("combobox", { name: "Country / Region" }).press("Tab");
  await page.getByRole("textbox", { name: "Street address" }).fill("San Jose");
  await page.getByRole("textbox", { name: "Street address" }).press("Tab");
  await page
    .getByRole("textbox", { name: "Apartment, suite, unit, etc" })
    .fill("San Josse");
  await page
    .getByRole("textbox", { name: "Apartment, suite, unit, etc" })
    .press("Tab");
  await page.getByRole("textbox", { name: "Town / City" }).fill("San Jose");
  await page.getByRole("textbox", { name: "Town / City" }).press("Shift+Tab");
  await page
    .getByRole("textbox", { name: "Apartment, suite, unit, etc" })
    .press("ArrowRight");
  await page
    .getByRole("textbox", { name: "Apartment, suite, unit, etc" })
    .press("ArrowLeft");
  await page
    .getByRole("textbox", { name: "Apartment, suite, unit, etc" })
    .fill("San Jose");
  await page
    .getByRole("textbox", { name: "Apartment, suite, unit, etc" })
    .press("Tab");
  await page.getByRole("textbox", { name: "Town / City" }).press("Tab");
  await page.getByRole("combobox", { name: "Province" }).click();
  await page.getByRole("combobox").filter({ hasText: /^$/ }).fill("costa");
  await page
    .getByRole("combobox")
    .filter({ hasText: /^$/ })
    .press("ControlOrMeta+a");
  await page.getByRole("combobox").filter({ hasText: /^$/ }).fill("");
  await page.getByRole("option", { name: "San José" }).click();
  await page.getByRole("textbox", { name: "Postcode / ZIP" }).click();
  await page.getByRole("textbox", { name: "Postcode / ZIP" }).fill("12345");
  await page.locator("#billing_phone_field").click();
  await page.getByRole("textbox", { name: "Phone" }).click();
  await page.getByRole("textbox", { name: "Phone" }).fill("77778888");
  await page.getByRole("textbox", { name: "Order notes (optional)" }).click();
  await page
    .getByRole("textbox", { name: "Order notes (optional)" })
    .fill("Gift package");
  await page.getByRole("button", { name: " Place Order  $" }).click();
  await page.getByRole("textbox", { name: "Email Address" }).click();
  await page.getByRole("textbox", { name: "Email Address" }).click();
  await page
    .getByRole("textbox", { name: "Email Address" })
    .fill("patito@patito.com");
  await page.getByRole("button", { name: " Place Order  $" }).click();
  await page.getByRole("heading", { name: "Thank you, Andres!" }).click();
  await expect(
    page.getByRole("heading", { name: "Thank you, Andres!" })
  ).toBeVisible();
});
