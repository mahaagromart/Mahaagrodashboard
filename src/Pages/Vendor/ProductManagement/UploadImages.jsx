// import React, { useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { Image, Upload, Modal } from "antd";

// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

// const UploadImages = ({ setFieldValue }) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [previewTitle, setPreviewTitle] = useState("");
//   const [fileList, setFileList] = useState([]);


//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setPreviewImage(file.url || file.preview);
//     setPreviewOpen(true);
//     setPreviewTitle(file.name || "Preview");
//   };

//   const handleUpload = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//     setFieldValue("images", newFileList);
//   };

//   const handleRemove = (file) => {
//     const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
//     setFileList(updatedFileList);
//     setFieldValue("images", updatedFileList);
//   };

//   return (
//     <>
//       <Upload
//         listType="picture-card"
//         fileList={fileList}
//         onPreview={handlePreview} 
//         onChange={handleUpload}
//         onRemove={handleRemove}
//         beforeUpload={() => false}
//       >
//         {fileList.length >= 8 ? null : (
//           <div>
//             <PlusOutlined />
//             <div style={{ marginTop: 8 }}>Upload</div>
//           </div>
//         )}
//       </Upload>


//       <Modal
//         open={previewOpen}
//         title={previewTitle}
//         footer={null}
//         onCancel={() => setPreviewOpen(false)}
//       >
//         <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
//       </Modal>
//     </>
//   );
// };

// export default UploadImages;


// this is right

// import React, { useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { Upload, Modal } from "antd";

// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

// const UploadImages = ({ setFieldValue }) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [previewTitle, setPreviewTitle] = useState("");
//   const [fileList, setFileList] = useState([]);

//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setPreviewImage(file.url || file.preview);
//     setPreviewOpen(true);
//     setPreviewTitle(file.name || "Preview");
//   };

//   const handleUpload = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//     setFieldValue("images", newFileList);
//   };

//   const handleRemove = (file) => {
//     const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
//     setFileList(updatedFileList);
//     setFieldValue("images", updatedFileList);
//   };

//   return (
//     <>
//       <Upload
//         listType="picture-card"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleUpload}
//         onRemove={handleRemove}
//         beforeUpload={() => false}
//       >
//         {fileList.length >= 8 ? null : (
//           <div>
//             <PlusOutlined />
//             <div style={{ marginTop: 8 }}>Upload</div>
//           </div>
//         )}
//       </Upload>

//       {/* Display the number of uploaded images */}
//       <p style={{ textAlign: "center", marginTop: 10 , fontWeight : "bold" }}>
//          {fileList.length} / 8 images uploaded
//       </p>

//       <Modal
//         open={previewOpen}
//         title={previewTitle}
//         footer={null}
//         onCancel={() => setPreviewOpen(false)}
//       >
//         <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
//       </Modal>
//     </>
//   );
// };

// export default UploadImages;


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
  const [fileList, setFileList] = useState([]); // Maintain state for images

  // Sync fileList with varientsData[index].images when component mounts or updates
  useEffect(() => {
    if (values.varientsData[index]?.images) {
      const newFileList = values.varientsData[index].images.map((img, idx) => ({
        uid: idx.toString(),
        name: img.name || `image-${idx}`,
        url: img.preview || (img instanceof File ? URL.createObjectURL(img) : img),
        originFileObj: img instanceof File ? img : undefined, // Store File object
      }));
      setFileList(newFileList);
    }
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

    setFileList(newFileList); // Update state
    const updatedVariants = [...values.varientsData];

    // Ensure the variant exists
    if (!updatedVariants[index]) {
      updatedVariants[index] = { images: [] };
    }

    updatedVariants[index].images = newFileList.map((f) => f.originFileObj || f); // Store files
    setFieldValue("varientsData", updatedVariants);
  };

  const handleRemove = (file) => {
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList); // Update state

    const updatedVariants = [...values.varientsData];
    updatedVariants[index].images = updatedFileList.map((f) => f.originFileObj || f);
    setFieldValue("varientsData", updatedVariants);
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleUpload}
        onRemove={handleRemove}
        beforeUpload={() => false} // Prevent auto-upload
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

      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadImages;
