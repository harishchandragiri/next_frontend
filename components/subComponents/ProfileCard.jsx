"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react";
import { useMyContext } from "@/app/context/MyContext";

export default function ProfileCard() {
  const { user, setUser, image, setImage, fetchUser } = useMyContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [imagePreview, setImagePreview] = useState("/default-avatar.png");
  const [showUploadButton, setShowUploadButton] = useState(false);

  const fileInputRef = useRef(null);
  const API_URL = "http://localhost:1337";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

  useEffect(() => {
    if (user) {
      setInputValue(user.username || "");
      setImagePreview(
        user.image ? `${user.image.url}` : "/default-avatar.png"
      );
    }
  }, [user]);

  if (!user) return <p className="text-center p-4">Loading...</p>;

  // ===== Image Upload =====
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      ["image/jpeg", "image/jpg", "image/png", "image/bmp"].includes(file.type)
    ) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setShowUploadButton(true);
    } else {
      setSelectedFile(null);
      alert("Please select a valid image file.");
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      // 1️⃣ Upload file to Strapi
      const formData = new FormData();
      formData.append("files", selectedFile);

      const uploadRes = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowUploadButton(false);

      if (!uploadRes.data[0]) {
        console.error("Upload failed, no file returned.");
        return;
      }

      const uploadedFile = uploadRes.data[0];
      const newImageId = uploadedFile.id;

      // Keep previous image id if exists
      const previousImageId = user.image?.id;

      // 2️⃣ Update user with new image
      await axios.put(
        `${API_URL}/api/users/${user.id}`,
        { image: newImageId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Refetch user so we always have populated image
      await fetchUser();

      // 3️⃣ Delete previous image
      if (previousImageId && previousImageId !== newImageId) {
        try {
          await axios.delete(`${API_URL}/api/upload/files/${previousImageId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Previous image deleted successfully");
        } catch (err) {
          console.warn(
            "Failed to delete previous image:",
            err.response?.data || err.message
          );
        }
      }

      console.log("Image updated successfully!");
      setSelectedFile(null);
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
    }
  };

  // ===== Username Update =====
  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    try {
      await axios.put(
        `${API_URL}/api/users/${user.id}`,
        { username: inputValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Refetch user instead of overwriting with incomplete data
      await fetchUser();

      setIsEditing(false);
      console.log("Username updated successfully!");
    } catch (err) {
      console.error("Error updating username:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-3 w-full h-full bg-white flex flex-col items-center">
      {/* Image Section */}
      <div className="relative w-full flex flex-col items-center">
        <img
          src={imagePreview}
          alt="Profile"
          className="w-70 h-60 lg:w-60 lg:h-50 object-cover rounded-full border-2 border-gray-200 shadow-md"
        />
        <hr className="w-full border-t border-gray-300 my-4" />
        <div className="w-full m-5 flex items-center justify-center">
          <button
            onClick={handleUploadClick}
            className="p-2 flex justify-center items-center rounded shadow-md bg-gray-200 hover:bg-gray-300 transition"
          >
            <UploadCloud className="w-5 h-5" />
            <span>Select Image</span>
          </button>
          <input
            type="file"
            accept=".jpeg,.jpg,.png,.bmp"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {showUploadButton && (
          <div className="mb-5 w-full flex justify-center">
            <button
              onClick={handleUpload}
              className="bg-blue-500 w-[120px] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Upload
            </button>
          </div>
        )}
      </div>

      <hr className="w-full border-t border-gray-300 my-3" />

      {/* Username Section */}
      <div className="w-full">
        <label className="text-xl text-black w-full mb-2 font-bold">
          Username
        </label>
        {isEditing ? (
          <div className="w-full mt-2 flex flex-col justify-center gap-2 items-center">
            <input
              type="text"
              className="border m-1 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 w-[120px] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="mt-2 flex justify-between items-center">
            <h2 className="text-xl w-full text-wrap break-all font-semibold">
              {user.username}
            </h2>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 w-[70px] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <hr className="w-full border-t border-gray-300 my-3" />

      {/* Email Section */}
      <div className="w-full flex flex-col">
        <label className="text-xl text-black w-full m-1 font-bold">Email</label>
        <h2 className="text-xl text-blue-600 w-full p-1 text-wrap break-all">
          {user.email}
        </h2>
      </div>
    </div>
  );
}
