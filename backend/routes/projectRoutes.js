const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Project = require('../models/Project');
const { fetchGithubProjects } = require('../services/githubProjects');

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const githubProjects = await fetchGithubProjects();
      return res.json(githubProjects);
    }

    const projects = await Project.find().sort({
      featured: -1,
      sortOrder: 1,
      pushedAt: -1,
      createdAt: -1,
    });

    if (projects.length === 0) {
      const githubProjects = await fetchGithubProjects();
      return res.json(githubProjects);
    }

    return res.json(projects);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.json(project);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const project = new Project(req.body);

  try {
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.json(updatedProject);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.json({ message: 'Project deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
