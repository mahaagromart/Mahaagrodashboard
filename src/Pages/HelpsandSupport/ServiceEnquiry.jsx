import React, { useState } from "react";
import { Table, Input } from "antd";
import { MdSearch } from "react-icons/md";
import CardBox from "../../Component/Charts/CardBox";

const { Column } = Table;

const initialData = [
  {
    id: "1", // ✅ Added unique ID
    service: "Drone Service",
    Name: "Himanshu Vishwakarma",
    Email: "himanshu123@gmail.com",
    phone: "82340238402",
    Address: "Nallasopara",
    message: "I need some guidance",
  },
  {
    id: "2",
    service: "Agro Tourism", // ✅ Changed key to match the first object
    Name: "Rahul Sharma",
    Email: "rahul@example.com",
    phone: "9876543210",
    Address: "Mumbai",
    message: "Looking for more details",
  },
];

const ServiceEnquiry = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(initialData);

  // ✅ Filter Data Based on Search
  const filteredData = data.filter((item) =>
    item.service.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
<CardBox>
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
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Services Enquiry</h2>
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
        <Column title="Service" dataIndex="service" key="service" align="center" />
        <Column title="Name" dataIndex="Name" key="Name" align="center" />
        <Column title="Email" dataIndex="Email" key="Email" align="center" />
        <Column title="Phone" dataIndex="phone" key="phone" align="center" />
        <Column title="Address" dataIndex="Address" key="Address" align="center" />
        <Column title="Message" dataIndex="message" key="message" align="center" />
      </Table>
    </div>
</CardBox>
  );
};

export default ServiceEnquiry;
