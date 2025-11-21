// src/api/uploads.js
import API from "./axiosInstance";

/**
 * Upload avatar file.
 * @param {File} file - image file from input
 * @param {Function} onProgress - optional progress callback (percent 0-100)
 * @returns {Promise<Object>} - server response JSON (avatarUrl, avatarFullUrl...)
 */
export async function uploadAvatar(file, onProgress) {
  if (!file) throw new Error("No file provided");
  const fd = new FormData();
  fd.append("avatar", file);

  // Important: do NOT allow a global 'application/json' header to override multipart.
  // Setting 'Content-Type': 'multipart/form-data' here tells axios to let the browser
  // set the proper boundary. Axios will add the boundary automatically.
  const res = await API.post("/users/me/avatar", fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (evt) => {
      try {
        if (typeof onProgress === "function" && evt && evt.total) {
          const percent = Math.round((evt.loaded * 100) / evt.total);
          onProgress(percent);
        }
      } catch (e) {
        // ignore
      }
    },
    timeout: 60_000,
  });

  return res.data;
}

export default uploadAvatar;
