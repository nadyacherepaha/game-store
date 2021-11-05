// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import nodePath from "path";
import fs from "fs";
import cors from "cors";

export default webpackMockServer.add((app, helper) => {
  app.use(cors());
  app.get("/testMock", (_req, res) => {
    const response = {
      id: helper.getUniqueIdInt(),
      randomInt: helper.getRandomInt(),
      lastDate: new Date(),
    };

    res.json(response);
  });
  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });

  interface Game {
    platform: Platform;
    name: string;
    rating: number;
  }

  interface Platform {
    platform: { xbox: boolean; playstation: boolean; pc: boolean };
  }

  const allGames: Game[] = JSON.parse(fs.readFileSync(nodePath.join(__dirname, "./data/games.json"), "utf-8"));
  const platforms = ["xbox", "pc", "playstation"];

  app.get("/games", (_req, res) => {
    const category = _req.query.categories as string;
    const query = _req.query.search as string;
    let matchedGames: Game[] = [];
    if (category && platforms.some((result) => result === category)) {
      const existingPlatform = platforms.find((result) => result === category) as string;
      matchedGames = allGames.filter((result) => result.platform[existingPlatform as keyof Platform]);
    }
    if (query) {
      matchedGames = allGames.filter((result) => result.name.toLowerCase().includes(query.toLowerCase()));
    }

    res.send(matchedGames);
  });
  app.get("/games-top", (_req, res) => {
    const topGames = allGames
      .filter((result) => result.rating === 5)
      .sort()
      .slice(0, 3);
    res.send(topGames);
  });
});
