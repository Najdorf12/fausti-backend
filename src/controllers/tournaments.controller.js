import Tournament from "../models/tournament.model.js";
import { deleteImage } from "../libs/cloudinary.js";

export const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createTournament = async (req, res) => {
  const { title, description, content, location, time, images, isActive } =
    req.body;

  try {
    const newTournament = new Tournament({
      title,
      description,
      content,
      location,
      time,
      images,
      isActive,
    });

    const savedTournament = await newTournament.save();
    res.json(savedTournament);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);

    if (!tournament) {
      return res.status(404).json({ message: error.message });
    }

    if (tournament.images.length > 0) {
      for (const img of tournament.images) {
        try {
          await deleteImage(img.public_id); // Delete each image one by one
          console.log(`Deleted image with id: ${img.public_id}`);
        } catch (error) {
          console.error(
            `Failed to delete image ${img.public_id}: ${error.message}`
          );
        }
      }
    }

    res.json(tournament);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getTournament = async (req, res) => {
  const tournament = await Tournament.findById(req.params.id);
  try {
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });
    res.json(tournament);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });
    res.json(tournament);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};


