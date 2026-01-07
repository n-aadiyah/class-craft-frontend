// src/utils/levelUtils.js

export function getAvatarKeyByLevel(level = 1) {
  if (level >= 13) return "master";
  if (level >= 8) return "warrior";
  if (level >= 4) return "apprentice";
  return "beginner";
}

export function getLevelRangeLabel(level = 1) {
  if (level >= 13) return "Master";
  if (level >= 8) return "Warrior";
  if (level >= 4) return "Apprentice";
  return "Beginner";
}
