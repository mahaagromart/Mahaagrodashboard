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
    SL: "1",
    Amount: "100",
    Name: "Sanjeev kumar",
    RequestTime: "2025-02-10 12:11:18",
    Status: "Approved",
  },
  {
    SL: "2",
    Amount: "300",
    Name: "Himanshu Vishwakarma",
    RequestTime: "2025-02-10 12:11:18",
    Status: "Pending",
  }
];

const WithdrawsTable = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();




  const filteredData = data.filter((item) =>
    item.Name.toLowerCase().includes(searchText.toLowerCase())
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
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Withdraw Request List</h2>
        <Input
          placeholder="Search by Name"
          style={{ width: "300px", paddingLeft: "30px" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<MdSearch />}
        />
      </div>

      <Table dataSource={filteredData} rowKey="id" pagination={{ pageSize: 5 }}>
        <Column title="SL" dataIndex="SL" key="SL" align="center" />
        <Column title="Name" dataIndex="Name" key="Name" align="center" />
        <Column title="RequestTime" dataIndex="RequestTime" key="RequestTime" align="center" />
        <Column title="Status" dataIndex="Status" key="Status" align="center" />

        <Column
          title="Action"
          key="action"
          align="center"
          render={(_, record) => (
            <Space size="middle">
              <Tooltip title="View Details">
                <Button icon={<FaEye />} type="primary" />
              </Tooltip>
            </Space>
          )}
        />
      </Table>


    </div>
  );
};



export default WithdrawsTable