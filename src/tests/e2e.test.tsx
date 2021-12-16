import puppeteer from "puppeteer";

process.env.BASE_URL = "http://localhost:8080";

describe("HomePage.tsx tests", () => {
  let browser;
  let page;
  const componentsCategoriesClassName = "components-categories-categories";
  const componentsGamesClassName = "components-games-card-game-cardGame";

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(process.env.BASE_URL);
  });

  it("should load the search bar", async () => {
    await page.waitForSelector(".components-search-searchInput__searchInput");
  });

  it("should display categories", async () => {
    await page.waitForSelector(`.${componentsCategoriesClassName}__wrapper`);
    const title = await page.$eval(`.${componentsCategoriesClassName}__title`, (e) => e.innerHTML);
    const button = await page.$eval(`.${componentsCategoriesClassName}__items`, (e) => !!e);
    const linkItems = await page.$$(".components-categories-category-item-categoryItem__item");
    const expectedLinkItemsQuantity = 3;
    const categoriesTitle = "Categories";

    expect(title).toContain(categoriesTitle);
    expect(button).toBeTruthy();
    expect(linkItems.length).toBe(expectedLinkItemsQuantity);
  });

  it("should display top games", async () => {
    await page.waitForSelector(`.${componentsCategoriesClassName}__wrapper`);
    const topGames = await page.$eval(`.${componentsGamesClassName}__cards`, (e) => !!e);
    const cardGame = await page.$$(`.${componentsGamesClassName}__card`);
    const buttonAddToCart = await page.$eval(".styles-main__btn", (e) => !!e);
    const expectedCardGameQuantity = 3;

    expect(topGames).toBeTruthy();
    expect(cardGame.length).toBe(expectedCardGameQuantity);
    expect(buttonAddToCart).toBeTruthy();
  });

  afterAll(() => browser.close());
});
