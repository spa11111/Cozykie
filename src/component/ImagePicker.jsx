import { useRef, useState } from "react";
import { FiImage, FiUpload } from "react-icons/fi";

const MAX_BYTES = 90_000; // stay under json-server's 100KB body limit with headroom

const resizeImage = (file, maxDimension, quality) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const dataUrlBytes = (dataUrl) => Math.round((dataUrl.length * 3) / 4);

const compressUntilUnderLimit = async (file) => {
  const attempts = [
    [1000, 0.75],
    [800, 0.65],
    [600, 0.55],
    [500, 0.45],
    [400, 0.4],
  ];
  let result = null;
  for (const [maxDimension, quality] of attempts) {
    result = await resizeImage(file, maxDimension, quality);
    if (dataUrlBytes(result) <= MAX_BYTES) return { dataUrl: result, ok: true };
  }
  return { dataUrl: result, ok: false };
};

const ImagePicker = ({ name = "image", value, onChange, label = "Image" }) => {
  const [warning, setWarning] = useState("");
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef(null);

  const setValue = (val) => {
    onChange({ target: { name, value: val } });
  };

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setWarning("Please choose an image file.");
      return;
    }
    setCompressing(true);
    setWarning("");
    try {
      const { dataUrl, ok } = await compressUntilUnderLimit(file);
      setValue(dataUrl);
      if (!ok) {
        setWarning("This image is still large even after compression — try a simpler/smaller photo.");
      }
    } catch {
      setWarning("Couldn't process that image. Try a different file.");
    } finally {
      setCompressing(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-primary mb-2">{label}</label>

      <div className="w-full aspect-video rounded-xl border border-border bg-primary/5 overflow-hidden mb-3 flex items-center justify-center">
        {value ? (
          <img src={value} alt="Selected" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center text-text/50 text-sm">
            <FiImage size={22} className="mb-1" />
            No image selected
          </div>
        )}
      </div>

      <div
        onClick={() => !compressing && fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (!compressing) handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`border-2 border-dashed border-border rounded-xl py-6 flex flex-col items-center justify-center text-text/60 text-sm transition ${
          compressing ? "opacity-60 cursor-wait" : "cursor-pointer hover:border-accent hover:text-primary"
        }`}
      >
        <FiUpload size={18} className="mb-1.5" />
        {compressing
          ? "Compressing..."
          : value
          ? "Drag a new image here, or click to replace"
          : "Drag an image here, or click to browse"}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {warning && <p className="text-xs text-amber-600 mt-2">{warning}</p>}
    </div>
  );
};

export default ImagePicker;