import puppeteer from "puppeteer";

process.env.BASE_URL = "http://localhost:8080";

describe("HomePage.tsx tests", () => {
  let browser;
  let page;
  const componentsCategories = "components-categories-categories";
  const componentsGames = "components-games-card-game-cardGame";

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(process.env.BASE_URL);
  });

  it("should load the search bar", async () => {
    await page.waitForSelector(".components-search-searchInput__searchInput");
  });

  it("should display categories", async () => {
    await page.waitForSelector(`.${componentsCategories}__wrapper`);
    const title = await page.$eval(`.${componentsCategories}__title`, (e) => e.innerHTML);
    const button = await page.$eval(`.${componentsCategories}__items`, (e) => !!e);
    const linkItems = await page.$$(".components-categories-category-item-categoryItem__item");
    const linkItemsQuantity = 3;
    const categoriesTitle = "Categories";

    expect(title).toContain(categoriesTitle);
    expect(button).toBeTruthy();
    expect(linkItems.length).toBe(linkItemsQuantity);
  });

  it("should display top games", async () => {
    await page.waitForSelector(`.${componentsCategories}__wrapper`);
    const topGames = await page.$eval(`.${componentsGames}__cards`, (e) => !!e);
    const cardGame = await page.$$(`.${componentsGames}__card`);
    const buttonAddToCart = await page.$eval(".styles-main__btn", (e) => !!e);
    const cardGameQuantity = 3;

    expect(topGames).toBeTruthy();
    expect(cardGame.length).toBe(cardGameQuantity);
    expect(buttonAddToCart).toBeTruthy();
  });

  afterAll(() => browser.close());
});
