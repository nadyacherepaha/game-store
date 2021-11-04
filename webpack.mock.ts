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
    platform: Record<string, boolean>;
    name: string;
    rating: number;
  }

  const allGames = JSON.parse(fs.readFileSync(nodePath.join(__dirname, "./data/games.json"), "utf-8")) as Game[];
  const platforms = ["xbox", "pc", "playstation"];
  const route: string = `/games/categories=(${platforms.join("|")})$`; 
  const platformsRouteRegExp = new RegExp(route);
  
  app.get(["/games", platformsRouteRegExp], (_req, res) => {
    const route = _req.path;
    const matchesPlatform = route.match(platformsRouteRegExp);
    let matchedGames: Game[];

    if (matchesPlatform) {
      const [, platform] = matchesPlatform;
      matchedGames = allGames.filter((result) => result.platform[platform]);
      
    } else {
      const query = _req.query.search as string;
      matchedGames = allGames.filter((result) => result.name.toLowerCase().includes(query.toLowerCase()));
    }

    res.send(matchedGames);
  });
  app.get("/games-top", (_req, res) => {
    const topGames = allGames.filter((result) => result.rating === 5);
    res.send(topGames);
  });
});