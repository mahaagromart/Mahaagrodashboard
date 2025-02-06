import React, { useState } from "react";
import { Button, Space, Table, Input, Tooltip } from "antd";
import { MdDelete, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CardBox from "../../Component/Charts/CardBox";
import "./Message.css";
const { Column } = Table;

const initialData = [
  {
    sl: "1",
    customerName: "Apple",
    contactInfo: "464646464",
    contactEmail: "sanjeevkrpd11@gmail.com",
    subject: "120",
    message: "this is a message",
    isChecked: false
  },
  {
    sl: "2",
    customerName: "Banana",
    contactInfo: "464646434",
    contactEmail: "sanjeevkrpd11@gmail.com",
    subject: "130",
    message: "this is a message",
    isChecked: false
  },
  {
    sl: "3",
    customerName: "Pineapple",
    contactInfo: "46464646433",
    contactEmail: "sanjeevkrpd11@gmail.com",
    subject: "150",
    message: "this is a message",
    isChecked: false
  },
];

const Message = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleView = (record) => {
    navigate("/MessageView", {
      state: {
        CustomerName: record.customerName,
        ContactInfo: record.contactInfo,
        ContactEmail: record.contactEmail,
        subject: record.subject,
        message: record.message,
        isChecked: record.isChecked,
      },
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
        setData((prevData) => prevData.filter((item) => item.sl !== record.sl));
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      }
    });
  };

  const filteredData = data.filter((item) =>
    item.customerName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <CardBox>
      <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Messages List</h2>
          <Input
            placeholder="Search by customer name"
            style={{ width: "300px", paddingLeft: "30px" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<MdSearch />}
          />
        </div>

        <Table 
          dataSource={filteredData} 
          rowKey="sl" 
          pagination={{ pageSize: 5 }}
          rowClassName={(record) => (record.isChecked ? 'checked-row' : 'unchecked-row')}
        >
          <Column title="SL" dataIndex="sl" key="sl" align="center" />
          <Column title="Customer Name" dataIndex="customerName" key="customerName" align="center" />
          <Column title="Contact Info" dataIndex="contactInfo" key="contactInfo" align="center" />
          <Column title="Subject" dataIndex="subject" key="subject" align="center" />

          <Column
            title="Action"
            key="action"
            align="center"
            render={(_, record) => (
              <Space size="middle">
                <Tooltip title="View">
                  <Button
                    icon={<FaEye />}
                    type="primary"
                    onClick={() => handleView(record)}
                  />
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
      </div>
    </CardBox>
  );
};

export default Message;
