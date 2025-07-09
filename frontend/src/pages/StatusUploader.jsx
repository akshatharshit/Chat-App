import { useState } from "react";
import { useStatusStore } from "../store/useStatusStore";
import { ImagePlus, Loader2, Trash2, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";

export default function StatusUploader() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const postStatus = useStatusStore((s) => s.postStatus);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
    }
  };

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl(null);
    setCaption("");
    setShowEmojiPicker(false);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await postStatus(file, caption);
      handleClear();
      toast.success("✅ Status posted!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setCaption((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-5 rounded-2xl shadow-xl bg-base-200 space-y-4 border border-base-300 mt-24">
      <h2 className="text-center text-xl font-semibold">🟢 New Status</h2>

      {/* File Upload Area */}
      {!previewUrl && (
        <div
          className="border-2 border-dashed border-primary rounded-xl p-6 flex flex-col items-center justify-center bg-base-100 hover:bg-base-300 cursor-pointer transition"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <ImagePlus className="w-10 h-10 text-primary mb-2" />
          <p className="text-sm text-gray-500 mb-2">Drag & drop or select a file</p>
          <input
            type="file"
            hidden
            id="fileInput"
            accept="image/*,video/*"
            onChange={handleFileSelect}
          />
          <label htmlFor="fileInput" className="btn btn-sm btn-outline btn-primary">
            Choose File
          </label>
        </div>
      )}

      {/* Preview */}
      {previewUrl && (
        <div className="relative rounded-lg overflow-hidden border border-base-300">
          {file?.type?.startsWith("video") ? (
            <video
              src={previewUrl}
              controls
              className="w-full max-h-64 object-cover rounded-lg"
            />
          ) : (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-h-64 object-cover rounded-lg"
            />
          )}
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 btn btn-sm btn-circle btn-error"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Caption & Emoji */}
      <div className="relative">
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={2}
          placeholder="Write a caption... 😊"
          className="textarea textarea-bordered w-full resize-none pr-10"
        />
        <button
          type="button"
          className="absolute bottom-2 right-2 text-gray-500 hover:text-primary"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        >
          <Smile className="w-5 h-5" />
        </button>
        {showEmojiPicker && (
          <div className="absolute right-0 z-50 mt-2">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              theme="light"
              height={300}
              width={250}
              emojiStyle="native"
            />
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!file || uploading}
        className="btn btn-primary w-full flex items-center justify-center gap-2"
      >
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Post Status"}
      </button>
    </div>
  );
}
