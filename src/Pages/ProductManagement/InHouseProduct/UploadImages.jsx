import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, message } from "antd";


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const resizeImage = (file, maxFileSize = 2) =>
  new Promise((resolve) => {
    const img = document.createElement("img");
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      img.src = event.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const { width, height } = img;

 
      let newWidth = width;
      let newHeight = height;


      if (file.size / 1024 / 1024 > maxFileSize) {
        const scaleFactor = Math.sqrt(
          maxFileSize / (file.size / 1024 / 1024)
        );
        newWidth = Math.round(width * scaleFactor);
        newHeight = Math.round(height * scaleFactor);
      }

      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);


      canvas.toBlob(
        (blob) => {
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(resizedFile);
        },
        file.type,
        1
      );
    };
  });

const UploadImages = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview); 
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    const processedFileList = await Promise.all(
      newFileList.map(async (file) => {
        if (file.originFileObj) {
          const resizedFile = await resizeImage(file.originFileObj);
          return {
            ...file,
            originFileObj: resizedFile,
            url: await getBase64(resizedFile),
          };
        }
        return file;
      })
    );
    setFileList(processedFileList);
  };

  const uploadButton = (
    <button
      style={{

        fontSize: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#999",
        borderRadius: 8,
      }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false} 
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Image
        preview={{
          visible: previewOpen,
          src: previewImage, 
          onVisibleChange: (visible) => setPreviewOpen(visible),
        }}
      />
    </>
  );
};

export default UploadImages;
