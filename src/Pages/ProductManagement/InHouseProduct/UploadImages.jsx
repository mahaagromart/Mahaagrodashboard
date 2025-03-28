import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Modal, message } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImages = ({ values, index, setFieldValue }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  // Sync fileList with varientsData[index].imagesValues when component mounts or updates
  useEffect(() => {
    const images = values.varientsData[index]?.imagesValues || [];
    const newFileList = images.map((img, idx) => ({
      uid: idx.toString(),
      name: img.name || `image-${idx}`,
      url: img.preview || (img instanceof File ? URL.createObjectURL(img) : img),
      originFileObj: img instanceof File ? img : undefined,
    }));
    setFileList(newFileList);
  }, [values.varientsData, index]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
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

    setFileList(newFileList); // Update local state
    const images = newFileList.map((f) => f.originFileObj || f);
    // Update only the imagesValues field for this index
    setFieldValue(`varientsData[${index}].imagesValues`, images);
  };

  const handleRemove = (file) => {
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList); // Update local state
    const images = updatedFileList.map((f) => f.originFileObj || f);
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

export default UploadImages;