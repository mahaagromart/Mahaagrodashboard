import React, { useState } from "react";
import { Table, Button, Space, Input, Tooltip } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";
import CardBox from "../../Component/Charts/CardBox";


const { Column } = Table;

// Initial coupon data
const initialData = [
  {
    SL: "1",
    posterName : "Cotton (Bulk Selling )",
    userName : "sanjeev",
    mobileNumber: "324234234",
    email: "sanjeevkrpd11@gmail.com",
    comment: "2025-01-01 to 2025-01-31",
   
  },
  {
    SL: "2",
    posterName : "Animal feed",
    userName : "Pavan Bagwe",
    mobileNumber: "09237947340",
    email: "pavanbagwe@gmail.com",
    comment: "2025-01-01 to 2025-01-31",
 
  },
  {
    SL: "3",
    posterName : "Cotton",
    userName : "Himanshu Vishwkarma",
    mobileNumber: "973498734",
    email: "himanshuvishakarma@gmail.com",
    comment: "2025-01-01 to 2025-01-31",

  },
];

const BusinessToBusiness = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");


  const handleDelete = async()=>{

  }

  const filteredData = data.filter((item) =>
    item.posterName.toLowerCase().includes(searchText.toLowerCase())
  );

  return(
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
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Customer Message Table</h2>

        <Input
          placeholder="Search by Titile"
          style={{
            width: "300px",
            paddingLeft: "30px",
          }}
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

      <Table
        dataSource={filteredData}
        rowKey="SL"bordered={false} pagination={{ pageSize: 5 }}>
        <Column title="SL" dataIndex="SL" key="SL" align="center" />
        <Column title="Poster Name" dataIndex="posterName" key="posterName" align="center" />
        <Column title="User Name" dataIndex="userName" key="userName" align="center" />
        <Column title="Mobile Number" dataIndex="mobileNumber" key="mobileNumber" align="center" />
        <Column
          title="Email"
          dataIndex="email"
          key="email"
          align="center"
        />
         <Column
          title="Action"
          key="action"
          align="center"
          render={(_, record) => (
            <Space size="middle">
              
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

export default BusinessToBusiness;

















