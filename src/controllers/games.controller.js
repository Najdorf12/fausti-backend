import Game from "../models/game.model.js";

export const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createGame = async (req, res) => {
  const { players, white, black, location, content, pgn } = req.body;

  try {
    const newGame = new Game({
      players,
      white,
      black,
      location,
      content,
      pgn,
    });

    const savedGame = await newGame.save();
    res.json(savedGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);

    if (!game) {
      return res.status(404).json({ message: error.message });
    }

    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getGame = async (req, res) => {
  const game = await Game.findById(req.params.id);
  try {
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
