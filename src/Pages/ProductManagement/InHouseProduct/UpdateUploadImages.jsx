import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Modal, message } from "antd";

const apiUrl = import.meta.env.VITE_API_URL;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UpdateUploadImages = ({ values, index, setFieldValue }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const images = values.varientsData[index]?.imagesValues || [];
    const newFileList = images.map((img, idx) => {
      let url = "";
      if (typeof img === "string") {
        url = img.startsWith("http") ? img : `${apiUrl}${img}`;
      } else if (img instanceof File) {
        url = URL.createObjectURL(img);
      } else {
        console.error("Invalid image entry in useEffect:", img);
        url = "https://via.placeholder.com/150?text=Invalid+Image";
      }

      return {
        uid: `${idx}-${Date.now()}`,
        name: img instanceof File ? img.name : `image-${idx}`,
        status: "done",
        url,
        originFileObj: img instanceof File ? img : undefined,
      };
    });

    setFileList(newFileList);

    return () => {
      newFileList.forEach((file) => {
        if (file.url && file.url.startsWith("blob:")) {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, [values.varientsData, index]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      if (!file.originFileObj) {
        console.error("No originFileObj for preview:", file);
        return;
      }
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || "Preview");
  };

  const handleUpload = ({ fileList: newFileList }) => {
    if (newFileList.length > 8) {
      message.error("You can upload a maximum of 8 images.");
      return;
    }

    const formattedFileList = newFileList.map((file, idx) => {
      let url = typeof file.url === "string" ? file.url : "";
      if (!url && file.originFileObj) {
        url = URL.createObjectURL(file.originFileObj);
      } else if (!url) {
        url = "https://via.placeholder.com/150?text=Upload+Failed";
      }

      return {
        ...file,
        uid: file.uid || `${idx}-${Date.now()}`,
        name: file.name || `image-${idx}`,
        status: "done",
        url,
        originFileObj: file.originFileObj || undefined,
      };
    });

    setFileList(formattedFileList);
    const images = formattedFileList.map((f) =>
      f.originFileObj || (typeof f.url === "string" ? f.url : "")
    );
    setFieldValue(`varientsData[${index}].imagesValues`, images);
  };

  const handleRemove = (file) => {
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);
    const images = updatedFileList.map((f) => f.originFileObj || f.url);
    setFieldValue(`varientsData[${index}].imagesValues`, images);
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleUpload}
        onRemove={handleRemove}
        beforeUpload={() => false}
      >
        {fileList.length >= 8 ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>

      <p style={{ textAlign: "center", marginTop: 10, fontWeight: "bold" }}>
        {fileList.length} / 8 images uploaded
      </p>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UpdateUploadImages;