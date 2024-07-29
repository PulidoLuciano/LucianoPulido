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
    });

    test.describe("Content", () => {
        test("Has title", async ({page}) => {
            await expect(page).toHaveTitle("Luciano Pulido");
        });

        test("Has About me section", async ({page}) => {
            await expect(page.getByRole("heading", {name: "About me"})).toBeVisible();
        });

        test("Has projects section", async ({page}) => {
            await expect(page.getByRole("heading", {name: "Projects"})).toBeVisible();
        });

        test("Has contact section", async ({page}) => {
            await expect(page.getByRole("heading", {name: "Contact me!"})).toBeVisible();
        });
    });

    test.describe("Form validation", () => {
        test("Show error messages when fields are empty", async ({page}) => {
            await page.getByRole("button", {name: "Send"}).click();
            await expect(page.getByText("Name is required", {exact: false})).toBeVisible();
            await expect(page.getByText("Email is required", {exact: false})).toBeVisible();
            await expect(page.getByText("Subject is required", {exact: false})).toBeVisible();
            await expect(page.getByText("Message is required", {exact: false})).toBeVisible();
        });

        test("Show successful message when send and empty inputs", async ({page}) => {
            const nameInput = await page.getByLabel("Your name");
            await nameInput.fill("John Snow");
            const emailInput = await page.getByLabel("Your e-mail address");
            await emailInput.fill("JohnSnow@gmail.com");
            const subjectInput = await page.getByLabel("Subject");
            await subjectInput.fill("Conquer the north");
            const messageInput = await page.getByLabel("Message");
            await messageInput.fill("Hey, I want to defeat the White walkers with you!");
            await page.getByRole("button", {name: "Send"}).click();
            await expect(page.getByText("Message sended successfully", {exact: false})).toBeVisible();
            await expect(nameInput).toBeEmpty();
            await expect(emailInput).toBeEmpty();
            await expect(subjectInput).toBeEmpty();
            await expect(messageInput).toBeEmpty();
        });

        test("Show error if e-mail does not match format", async ({page}) => {
            const emailInput = await page.getByLabel("Your e-mail address");
            await emailInput.fill("JohnSnow.com");
            await page.getByRole("button", {name: "Send"}).click();
            await expect(page.getByText("Email does not seem like an email", {exact: false})).toBeVisible();
        });
    });
})