const Link = require('../models/link.model');
const { nanoid } = require('nanoid');

const createLink = async (req, res) => {
  const { originalUrl, customCode } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ message: 'Original URL is required.' });
  }

  try {
    let shortCode = customCode;

    if (shortCode) {
      const existingLink = await Link.findOne({ shortCode });
      if (existingLink) {
        return res.status(409).json({ message: 'Short code is already in use.' });
      }
    } else {
      shortCode = nanoid(7);
    }

    const newLink = new Link({
      originalUrl,
      shortCode,
    });

    await newLink.save();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllLinks = async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getLinkStats = async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ shortCode: code });

    if (!link) {
      return res.status(404).json({ message: 'Link not found.' });
    }

    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteLink = async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOneAndDelete({ shortCode: code });

    if (!link) {
      return res.status(404).json({ message: 'Link not found.' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const handleRedirect = async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ shortCode: code });

    if (!link) {
      return res.status(404).send('URL Not Found');
    }

    link.clickCount++;
    link.lastClickedAt = new Date();
    await link.save();

    return res.redirect(302, link.originalUrl);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink,
  handleRedirect,
};