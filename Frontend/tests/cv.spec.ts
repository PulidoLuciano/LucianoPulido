import {test, expect} from "@playwright/test";

const BASE_URL = "http://localhost:5173";

test.describe("Main page", () => {
    test.beforeEach(async ({page}) => {
        await page.goto(BASE_URL);
    });

    test.describe("Navigation", () => {
        
        test.describe("Header", () => {
            test("Logo link", async ({page}) => {
                //Click on logo
                await page.locator("header").getByRole("link", {name: "Luciano Pulido"}).click();
                //Expect to be on main page
                await expect(page).toHaveURL(BASE_URL);
            });
    
            test("About link", async ({page}) => {
                //Click link
                await page.locator("header").getByRole("link", {name: "About"}).click();
                //Expect to be on main page
                await expect(page).toHaveURL(BASE_URL);
            });
    
            test("Articles link", async ({page}) => {
                //Click link
                await page.locator("header").getByRole("link", {name: "Articles"}).click();
                //Expect to be on main page
                await expect(page).toHaveURL(BASE_URL + "/articles");
            });

            test("Login button", async ({page}) => {
                //Click link
                await page.locator("header").getByRole("link", {name: "Log in"}).click();
                //Expect to be on main page
                await expect(page).toHaveURL(BASE_URL + "/login");
            })
        });

        test.describe("Footer", () => {
            test("About link", async ({page}) => {
                //Click link
                await page.locator("footer").getByRole("link", {name: "About"}).click();
                //Expect to be on main page
                await expect(page).toHaveURL(BASE_URL);
            });
    
            test("Articles link", async ({page}) => {
                //Click link
                await page.locator("footer").getByRole("link", {name: "Articles"}).click();
                //Expect to be on main page
                await expect(page).toHaveURL(BASE_URL + "/articles");
            });

            test("X link", async ({page, context}) => {
                //Promise waiting for a new blank
                const pagePromise = context.waitForEvent("page");
                //Click link
                await page.locator("footer").getByAltText("X's icon").click();
                //Assign new blank on the variable
                const profilePage = await pagePromise;
                //Expect to be on X profile page
                await expect(profilePage).toHaveURL("https://x.com/luciano_pulido");
            });

            test("Github link", async ({page, context}) => {
                //Promise waiting for a new blank
                const pagePromise = context.waitForEvent("page");
                //Click link
                await page.locator("footer").getByAltText("GitHub's icon").click();
                //Assign new blank on the variable
                const profilePage = await pagePromise;
                //Expect to be on LinkedIn profile page
                await expect(profilePage).toHaveURL("https://github.com/PulidoLuciano");
            });

            test("LinkedIn link", async ({page, context}) => {
                //Promise waiting for a new blank
                const pagePromise = context.waitForEvent("page");
                //Click link
                await page.locator("footer").getByAltText("LinkedIn's icon").click();
                //Assign new blank on the variable
                const profilePage = await pagePromise;
                //Expect to be on LinkedIn profile page
                await expect(profilePage).toHaveURL("https://www.linkedin.com/in/lucianopulido/");
            });
        })
    })
})