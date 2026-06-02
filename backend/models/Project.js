const mongoose = require('mongoose');

const urlValidator = {
  validator(value) {
    return !value || /^https?:\/\/.+/i.test(value);
  },
  message: 'Links must start with http:// or https://',
};

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 420,
    },
    techStack: {
      type: [{ type: String, trim: true }],
      default: [],
    },
    slug: {
      type: String,
      trim: true,
    },
    githubId: {
      type: String,
      trim: true,
      index: true,
      sparse: true,
    },
    language: {
      type: String,
      trim: true,
      default: 'Code',
    },
    category: {
      type: String,
      trim: true,
      default: 'Full-stack',
    },
    repoLink: {
      type: String,
      trim: true,
      validate: urlValidator,
    },
    liveLink: {
      type: String,
      trim: true,
      validate: urlValidator,
    },
    imageUrl: {
      type: String,
      trim: true,
      validate: urlValidator,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    year: {
      type: Number,
      default: () => new Date().getFullYear(),
    },
    stars: {
      type: Number,
      default: 0,
    },
    forks: {
      type: Number,
      default: 0,
    },
    pushedAt: {
      type: Date,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
