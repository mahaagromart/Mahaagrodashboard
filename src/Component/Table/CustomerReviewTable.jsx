import React, { useState } from "react";
import { Table, Input, Rate } from "antd";
import { MdSearch } from "react-icons/md";

const { Column } = Table;

// Initial coupon data
const initialData = [
  {
    SL: "1",
    product: "Noga Jam",
    customer: "Himanshu",
    rating: 4,
    review: "Very Tasty",
    date: "1 Feb 2025",
  },
  {
    SL: "2",
    product: "Pepsi",
    customer: "Kashyap",
    rating: 2,
    review: "Average",
    date: "1 Feb 2025",
  },
];

const CustomerReviewTable = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter((item) =>
    item.product.toLowerCase().includes(searchText.toLowerCase())
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
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Ratings</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input
            placeholder="Search by Product"
            style={{ width: "300px", paddingLeft: "30px" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={
              <MdSearch
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            }
          />
        </div>
      </div>

      <Table dataSource={filteredData} rowKey="SL" bordered={false} pagination={{ pageSize: 12 }}>
        <Column title="SL" dataIndex="SL" key="SL" align="center" />
        <Column title="Product" dataIndex="product" key="product" align="center" />
        <Column title="Customer" dataIndex="customer" key="customer" align="center" />
        {/* Updated Rating column */}
        <Column
          title="Rating"
          dataIndex="rating"
          key="rating"
          align="center"
          render={(rating) => <Rate allowHalf defaultValue={rating} disabled />}
        />
        <Column title="Review" dataIndex="review" key="review" align="center" />
        <Column title="Date" dataIndex="date" key="date" align="center" />
      </Table>
    </div>
  );
};

export default CustomerReviewTable;
