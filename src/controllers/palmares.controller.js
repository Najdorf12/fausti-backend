import Palmares from "../models/palmares.model.js";

export const getPalmares = async (req, res) => {
  try {
    const palmares = await Palmares.find();
    res.json(palmares);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createPalmares = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newPalmares = new Palmares({
      title,
      description,
    });

    const savedPalmares = await newPalmares.save();
    res.json(savedPalmares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deletePalmares = async (req, res) => {
  try {
    const palmares = await Palmares.findByIdAndDelete(req.params.id);
    if (!palmares) {
      return res.status(404).json({ message: error.message });
    }
    res.json(palmares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updatePalmares = async (req, res) => {
  try {
    const palmares = await Palmares.findById(req.params.id);
    if (!palmares) {
      return res.status(404).json({ message: "Palmares not found" });
    }
    // Actualiza el torneo con los nuevos datos
    const updatedPalmares = await Palmares.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedPalmares);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
