"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react";

export default function ProfileCard() {
  const [profile, setProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previousImageId, setPreviousImageId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const fileInputRef = useRef(null);

  const API_URL = "http://localhost:1337";

  // Fetch profile data
  useEffect(() => {
    axios
      .get(`${API_URL}/api/users?filters[id][$eq]=5&populate=*`)
      .then((res) => {
        const user = res.data[0];
        if (user) {
          setProfile(user);
          setInputValue(user.username || "");
          if (user.image) setPreviousImageId(user.image.id);
        } else {
          console.warn("User not found");
        }
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  // File selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/bmp"].includes(file.type)
    ) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert("Please select a valid image file.");
    }
  };

  // Open hidden file input
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Upload image & update profile
  const handleUpload = async () => {
    if (!selectedFile || !profile) return;

    try {
      const formData = new FormData();
      formData.append("files", selectedFile);

      // 1. Upload image to Strapi
      const uploadRes = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedFile = uploadRes.data[0];
      const uploadedImageId = uploadedFile.id;

      // 2. Update user with new image relation
      const updateRes = await axios.put(`${API_URL}/api/users/${profile.id}`, {
        data: { image: uploadedImageId },
      });

      // 3. Delete old image if replaced
      if (previousImageId && previousImageId !== uploadedImageId) {
        await axios.delete(`${API_URL}/api/upload/files/${previousImageId}`);
      }

      // 4. Update frontend
      const newImage = updateRes.data.image?.url;
      setProfile((prev) => ({
        ...prev,
        image: { id: uploadedImageId, url: newImage ? API_URL + newImage : "" },
      }));
      setPreviousImageId(uploadedImageId);
      setSelectedFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  // Edit username
  const handleSubmit = async () => {
    if (!profile) return;

    try {
      const res = await axios.put(`${API_URL}/api/users/${profile.id}`, {
        data: { username: inputValue },
      });
      setProfile(res.data);
      setInputValue(res.data.username);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating username:", err);
    }
  };

  if (!profile) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="p-3 w-full h-full bg-white flex flex-col items-center">
      {/* Profile Image */}
      <div className="relative w-full flex flex-col items-center">
        <img
          src={
            profile.image
              ? `${API_URL}${profile.image.formats.large.url}`
              : "/default-avatar.png"
          }
          alt="Profile"
          className="w-70 h-60 lg:w-60 lg:h-50 object-cover rounded-full border-2 border-gray-200 shadow-md"
        />
        <hr className="w-full border-t border-gray-300 my-4" />

        {/* Styled Upload Button  */}
        <div className="w-full m-5 flex items-center justify-center">
          <button
            onClick={handleUploadClick}
            className="p-2 flex justify-center items-center rounded shadow-md bg-gray-200 hover:bg-gray-300  transition"
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

        {/* Upload Action */}
        {selectedFile && (

          <div className="mb-5 w-full flex justify-center">
              {/* <Button onClick={handleUpload} variant="secondary" className="w-[120px]">Upload</Button> */}
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

      {/* Editable Username */}
      <div className="w-full ">
        <label className="text-xl text-black w-full mb-2 font-bold">Username</label>
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
          <div className="mt-2 flex justify-between items-center ">
            <h2 className="text-xl w-full text-wrap break-all font-semibold">{profile.username}</h2>
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
      <div className="w-full flex flex-col ">
        <label className="text-xl text-black w-full m-1 font-bold">Email</label>
          <h2 className="text-xl text-blue-600 w-full p-1 text-wrap break-all">{profile.email}</h2>
      </div>

    </div>
  );
}
