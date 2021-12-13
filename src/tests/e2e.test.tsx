import puppeteer from "puppeteer";

describe("HomePage.tsx", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:8080");
  });

  it("loaded the search bar", async () => {
    await page.waitForSelector(".components-search-searchInput__searchInput");
  });

  it("displayed categories", async () => {
    await page.waitForSelector(".components-categories-categories__wrapper");
    const title = await page.$eval(".components-categories-categories__title", (e) => e.innerHTML);
    const button = await page.$eval(".components-categories-categories__items", (e) => !!e);
    const linkItems = await page.$$(".components-categories-category-item-categoryItem__item");

    expect(title).toContain("Categories");
    expect(button).toBeTruthy();
    expect(linkItems.length).toBe(3);
  });

  it("displayed top games", async () => {
    await page.waitForSelector(".components-categories-categories__wrapper");
    const topGames = await page.$eval(".components-games-card-game-cardGame__cards", (e) => !!e);
    const cardGame = await page.$$(".components-games-card-game-cardGame__card");
    const buttonAddToCart = await page.$eval(".styles-main__btn", (e) => !!e);

    expect(topGames).toBeTruthy();
    expect(cardGame.length).toBe(3);
    expect(buttonAddToCart).toBeTruthy();
  });

  afterAll(() => browser.close());
});
