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

  interface IGame {
    platform: IPlatform;
    name: string;
    rating: number;
    genre: string;
    id: number;
    image: string;
    price: number;
    description: string;
    ageLimit: number;
    alt: string;
    amount: number;
  }

  interface INewGame extends IGame {
    playstation: boolean;
    pc: boolean;
    xbox: boolean;
  }

  interface IUser {
    login: string;
    password: string;
    avatar: string;
    username: string;
    description: string;
    isAdmin: boolean;
  }

  interface IPlatform {
    platform: { xbox: boolean; playstation: boolean; pc: boolean };
  }

  let allGames: IGame[] = JSON.parse(fs.readFileSync(nodePath.join(__dirname, "./data/games.json"), "utf-8"));
  const allUsers: IUser[] = JSON.parse(fs.readFileSync(nodePath.join(__dirname, "./data/users.json"), "utf-8"));
  const platforms = ["xbox", "pc", "playstation"];

  app.get("/games", (_req, res) => {
    const query = _req.query.search as string;
    const { type, criteria, genre, age, categories } = _req.query;
    const ascending = "ascending";

    let matchedGames: IGame[] = [];
    if (categories && platforms.some((result) => result === categories)) {
      const existingPlatform = platforms.find((result) => result === categories) as string;
      matchedGames = allGames.filter((result) => result.platform[existingPlatform as keyof IPlatform]);
    }

    if (genre) {
      matchedGames = matchedGames.filter((result) => result.genre === genre);
    }

    if (age) {
      matchedGames = matchedGames.filter((result) => result.ageLimit === +age);
    }

    if (query) {
      matchedGames = allGames.filter((result) => result.name.toLowerCase().includes(query.toLowerCase()));
    }

    if (type === ascending) {
      matchedGames = matchedGames.sort((prevGame, nextGame) =>
        prevGame[criteria as keyof IGame] < nextGame[criteria as keyof IGame] ? -1 : 1
      );
    } else {
      matchedGames = matchedGames.sort((prevGame, nextGame) =>
        nextGame[criteria as keyof IGame] < prevGame[criteria as keyof IGame] ? -1 : 1
      );
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
  app.post("/registration", (_req, res) => {
    try {
      const { login } = _req.body;
      const user = allUsers.find((result) => result.login === login);

      if (user) {
        return res.status(400).json({ message: `User with login ${login} already exist` });
      }
      allUsers.push(_req.body);

      return res.json({ message: "User was create" });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  });
  app.post("/login", (_req, res) => {
    try {
      const { login, password } = _req.body;
      const user = allUsers.find((result) => result.login === login);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (password !== user.password) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const admin = user?.isAdmin;

      return res.json({ login, password, admin });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  });
  app.get("/get-profile", (_req, res) => {
    const { user } = _req.query;
    const userLogin = allUsers.find((result) => result.login === user);

    if (!userLogin) {
      res.status(404).json({ message: "User not found" });
    }

    if (userLogin) {
      res.send(userLogin);
    }
  });
  app.post("/save-profile", (_req, res) => {
    const { username, description, login } = _req.body;

    const user = allUsers.find((result) => result.login === login);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    if (user?.username) {
      user.username = username;
    }

    if (user?.description) {
      user.description = description;
    }

    res.send(user);
  });
  app.post("/change-password", (_req, res) => {
    const { password, login } = _req.body;
    const user = allUsers.find((result) => result.login === login);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    if (user?.password) {
      user.password = password;
    }

    res.status(200).json({ message: "Password has been updated" });
  });
  app.post("/product", (_req, res) => {
    const { id, image, description, amount, price, name, rating, genre, ageLimit, alt, platform } =
      _req.body as INewGame;
    const existingGame = allGames.find((result) => result.id === id);

    if (existingGame) {
      res.status(400).json({ message: `Game with login ${id} already exist` });
    }
    allGames.push({ id, image, description, amount, price, name, rating, genre, ageLimit, alt, platform });
    res.send(_req.body);
  });
  app.put("/product", (_req, res) => {
    const { id, image, description, amount, price, name, rating, genre, ageLimit, alt, platform } =
      _req.body as INewGame;
    const existingGameIndex = allGames.findIndex((result) => result.id === +id);

    allGames[existingGameIndex] = {
      id: +id,
      name,
      ageLimit,
      alt,
      amount,
      price,
      rating,
      platform,
      description,
      genre,
      image,
    };
    res.status(200).json({ message: "Game was update" });
    res.json(allGames[existingGameIndex]);
  });
  app.delete("/product/:id", (_req, res) => {
    const { id } = _req.params;

    allGames = allGames.filter((result) => result.id !== +id);
    res.status(200).json({ message: "Game was deleted" });
  });
});
