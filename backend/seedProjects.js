const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project');
const { fetchGithubProjects } = require('./services/githubProjects');

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

async function seedProjects() {
  await mongoose.connect(mongoUri);
  const githubProjects = await fetchGithubProjects();

  const operations = githubProjects.map((project) => ({
    updateOne: {
      filter: { githubId: project.githubId },
      update: { $set: project },
      upsert: true,
    },
  }));

  const result = await Project.bulkWrite(operations);
  console.log(
    `Imported ${githubProjects.length} GitHub projects: ${result.upsertedCount} inserted, ${result.modifiedCount} updated.`
  );

  await mongoose.disconnect();
}

seedProjects().catch(async (err) => {
  console.error('Seed failed:', err.message);
  await mongoose.disconnect();
  process.exit(1);
});
