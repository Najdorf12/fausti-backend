import New from "../models/new.model.js";
import { deleteImage } from "../libs/cloudinary.js";

export const getNews = async (req, res) => {
  try {
    const news = await New.find();
    res.json(news);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createNew = async (req, res) => {
  const { title, description, content, category, images, isActive } = req.body;

  try {
    const newNew = new New({
      title,
      description,
      content,
      category,
      isActive,
      images,
    });

    const savedNew = await newNew.save();
    res.json(savedNew);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteNew = async (req, res) => {
  try {
    const notice = await New.findByIdAndDelete(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: error.message });
    }

    if (notice.images.length > 0) {
      for (const img of notice.images) {
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

    res.json(notice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getNew = async (req, res) => {
  const notice = await New.findById(req.params.id);
  try {
    if (!notice) return res.status(404).json({ message: "New not found" });
    res.json(notice);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateNew = async (req, res) => {
  console.log(req.body)
  try {
    const notice = await New.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }

    // Verifica si se han subido nuevas imágenes
  /*   if (req.body.images) {
      // Si hay imágenes existentes, elimina las anteriores solo si hay nuevas imágenes
      for (const image of notice.images) {
        await deleteImage(image.public_id); // Eliminar la imagen anterior de Cloudinary
      }
    }  */

    // Actualiza la noticia, incluyendo las imágenes
    notice.title = req.body.title;
    notice.description = req.body.description;
    notice.content = req.body.content;
    notice.category = req.body.category;
    notice.isActive = req.body.isActive;
    notice.images =
      req.body.images.length > 0 ? req.body.images : notice.images; // Conservar imágenes anteriores si no hay nuevas

    const updatedNotice = await notice.save();
    res.json(updatedNotice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la noticia" });
  }
};

export const deleteOneImage = async (req, res) => {
  try {
    console.log("Public ID recibido:", req.params.img);
    const { img: public_id } = req.params;

    if (!public_id) {
      return res.status(400).json({ message: "Falta el public_id de la imagen" });
    }

    await deleteImage(public_id);

    return res.status(200).json({ message: "Imagen eliminada correctamente" });
  } catch (error) {
    console.error("Error al procesar la eliminación de la imagen:", error);
    return res.status(500).json({ message: "Error al eliminar la imagen" });
  }
};

export const getNewsByCategory = async (req, res) => {
  const category = req.params.categoryName;
  try {
    const notices = await New.find();
    const noticesFilter = notices.filter(
      (notice) => notice.category === category
    );
    if (!noticesFilter)
      return res.status(404).json({ message: "News not found" });

    res.json(noticesFilter);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
