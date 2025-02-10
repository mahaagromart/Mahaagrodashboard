import React, { useState } from "react";
import { Button, Space, Table, Input, Tooltip, Modal, Form } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";

const { Column } = Table;

const initialData = [
  {
    id: "1",
    name: "Drone Services",
    Image: "apc.jpg",
    Description: "Dron facilities are best",
    Price: "600",
    AddedBy: "Admin",
  },
  {
    id: "2",
    name: "Agro Tourism",
    Image: "apc.jpg",
    Description: "Dron facilities are best",
    Price: "600",
    AddedBy: "Admin",
  },
];

const ServiceTable = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form] = Form.useForm();

  // Handle Edit Click
  const handleEdit = (record) => {
    setSelectedProduct(record);
    form.setFieldsValue(record); // Set initial form values
    setIsModalVisible(true);
  };

  // Handle Modal Close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  // Handle Form Submission (Update Data)
  const handleSaveChanges = () => {
    form.validateFields().then((values) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === selectedProduct.id ? { ...item, ...values } : item
        )
      );
      handleModalClose();
    });
  };

  // Filter Data Based on Search
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
      {/* Search Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Services List</h2>
        <Input
          placeholder="Search by service name"
          style={{ width: "300px", paddingLeft: "30px" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<MdSearch />}
        />
      </div>

      {/* Table */}
      <Table dataSource={filteredData} rowKey="id" pagination={{ pageSize: 5 }}>
        <Column title="Name" dataIndex="name" key="name" align="center" />
        <Column
          title="Image"
          dataIndex="Image"
          key="Image"
          align="center"
          render={(text) => (
            <img
              src={text}
              alt="Product"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}
        />
        <Column title="Description" dataIndex="Description" key="Description" align="center" />
        <Column title="Price" dataIndex="Price" key="Price" align="center" />
        <Column title="AddedBy" dataIndex="AddedBy" key="AddedBy" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(_, record) => (
            <Space size="middle">
              <Tooltip title="Edit">
                <Button icon={<MdEdit />} type="primary" onClick={() => handleEdit(record)} />
              </Tooltip>
              <Tooltip title="Delete">
                <Button icon={<MdDelete />} type="primary" danger />
              </Tooltip>
            </Space>
          )}
        />
      </Table>

      {/* Edit Modal */}
      <Modal
        title="Edit Service"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>,
        ]}
      >
        {selectedProduct && (
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="Service Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="Description" label="Description" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="Price" label="Price" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default ServiceTable;
