import React, { useState } from "react";
import { Button, Space, Table, Input, Tooltip, Modal, Form } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { IoBarcode } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BiSend } from "react-icons/bi";
import axios from "axios";

const { Column } = Table;

const initialData = [
  {
    id: "1",
    userImage: "https://via.placeholder.com/51",
    name: "Sanjeev",
    mobile: "7633920927",
    email: "sanjeevkrpd11@gmail.com",
  },
  {
    id: "2",
    userImage: "https://via.placeholder.com/523",
    name: "Pavan",
    mobile: "239847237",
    email: "pavan01@gmail.com",
  },
  {
    id: "3",
    userImage: "https://via.placeholder.com/5023",
    name: "Himanshu",
    mobile: "3403409823",
    email: "himanshu@gmail.com",
  },
];

const UserTable = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleToggleStatus = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        record.status === "Active" ? "deactivate" : "activate"
      } this product.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === record.id
              ? { ...item, status: record.status === "Active" ? "Inactive" : "Active" }
              : item
          )
        );
        Swal.fire(
          "Updated!",
          `The product is now ${
            record.status === "Active" ? "Inactive" : "Active"
          }.`,
          "success"
        );
      }
    });
  };

  const handleToggleVerified = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        record.verified === "Active" ? "deactivate" : "activate"
      } certification for this product.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === record.id
              ? { ...item, verified: record.verified === "Active" ? "Inactive" : "Active" }
              : item
          )
        );
        Swal.fire(
          "Updated!",
          `The certification status is now ${
            record.verified === "Active" ? "Inactive" : "Active"
          }.`,
          "success"
        );
      }
    });
  };

  const handleSendNotification = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      axios
        .post("/api/send-notification", {
          user: selectedUser,
          title: values.title,
          message: values.message,
        })
        .then((response) => {
          Swal.fire("Success!", "Notification sent successfully.", "success");
          setIsModalVisible(false);
          form.resetFields();
        })
        .catch((error) => {
          Swal.fire("Error!", "Failed to send notification.", "error");
        });
    });
  };

  const handleDelete = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) => prevData.filter((item) => item.id !== record.id));
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      }
    });
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Product List</h2>
        <Input
          placeholder="Search by name"
          style={{ width: "300px", paddingLeft: "30px" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<MdSearch />}
        />
      </div>

      <Table dataSource={filteredData} rowKey="id" pagination={{ pageSize: 5 }}>
        <Column title="ID" dataIndex="id" key="id" align="center" />
        <Column
          title="Image"
          dataIndex="userImage"
          key="userImage"
          align="center"
          render={(text) => (
            <img
              src={text}
              alt="image"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "8px",
                marginLeft: "10px",
              }}
            />
          )}
        />
        <Column title="Name" dataIndex="name" key="name" align="center" />
        <Column title="Mobile" dataIndex="mobile" key="mobile" align="center" />
        <Column title="Email" dataIndex="email" key="email" align="center" />

        <Column
          title="Action"
          key="action"
          align="center"
          render={(_, record) => (
            <Space size="middle">
              <Tooltip title="Send Notification">
                <Button
                  icon={<BiSend />}
                  type="primary"
                  onClick={() => handleSendNotification(record)}
                />
              </Tooltip>
              <Tooltip title="View Details">
                <Button icon={<FaEye />} type="primary" />
              </Tooltip>

              <Tooltip title="Delete">
                <Button
                  icon={<MdDelete />}
                  type="primary"
                  danger
                  onClick={() => handleDelete(record)}
                />
              </Tooltip>
            </Space>
          )}
        />
      </Table>

      <Modal
        title="Send Notification"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please enter a message" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserTable;
