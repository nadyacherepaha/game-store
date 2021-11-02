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
  app.get("/games", (_req, res) => {
    const games = JSON.parse(fs.readFileSync(nodePath.join(__dirname, "./data/games.json"), "utf-8"));
    res.send(games);
  });
});
