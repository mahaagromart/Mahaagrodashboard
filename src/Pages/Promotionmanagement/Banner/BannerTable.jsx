import React, { useEffect, useState } from "react";
import { Button, Space, Table, Input } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";

const { Column } = Table;

const BannerTable = ({ reload }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");

  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [updateLocal,setUpdateLocal] = useState(false);
  const getAllBanners = () => {
    axios
      .post(`${apiUrl}Banner/GetAllBannerAdmin`,{}, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data[0].code === 200) {
          const banners = response.data[0].dataset.$values.map((element) => ({
            id: element.id,
            image: element.url,
            bannerType: element.bannerType,
            status: element.isdelete ? "Inactive" : "Active",
          }));
          setInitialData(banners);
          setData(banners); 
        } else {
          Swal.fire("Error", "Error getting banner table", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Error getting banner table", "error");
      });
  };

  useEffect(() => {
    getAllBanners();
  }, [reload]);

  useEffect(() => {
    setData(
      initialData.filter((item) =>
        item.bannerType.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, initialData]);

  const handleToggleStatus = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${record.status === "Active" ? "deactivate" : "activate"} this banner.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      axios
      .post(`${apiUrl}Banner/ToggleBannerStatus`,{
        Id:record.id.toString()
      }, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      })
      .finally(()=>{
        getAllBanners()
      })
    });
  };

  const handleDelete = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this banner!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) => prevData.filter((item) => item.id !== record.id));
        Swal.fire("Deleted!", "The banner has been deleted.", "success");
      }
    });
  };

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
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Banner List</h2>

        <Input
          placeholder="Search by banner type"
          style={{ width: "300px", paddingLeft: "30px" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<MdSearch style={{ marginRight: "10px" }} />}
        />
      </div>

      <Table
        dataSource={data}
        rowKey="id"
        bordered={false}
        pagination={{ pageSize: 5 }}
        style={{ border: "none" }}
      >
        <Column title="ID" dataIndex="id" key="id" align="center" />

        <Column
          title="Image"
          dataIndex="image"
          key="image"
          align="center"
          render={(text) => (
            
            <img
              src={`${apiUrl}${text}`}
              alt="Banner"
              style={{ alignItems:"center", width: "75px", height: "75px", objectFit: "cover", borderRadius: "8px" }}
            />
          )}
        />

        <Column title="Banner Type" dataIndex="bannerType" key="bannerType" align="center" />

        <Column
          title="Status"
          dataIndex="status"
          key="status"
          align="center"
          render={(_, record) => (
            <Button
              onClick={() => handleToggleStatus(record)}
              style={{
                background: record.status === "Active" ? "#f5222d" : "#52c41a",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
              }}
            >
              {record.status === "Active" ? "Deactivate" : "Activate"}
            </Button>
          )}
        />


      </Table>
    </div>
  );
};

export default BannerTable;



// <Column
// title="Action"
// key="action"
// align="center"
// render={(_, record) => (
//   <Space size="middle">
//     <Button
//       icon={<MdEdit />}
//       type="primary"
//       style={{ display: "flex", alignItems: "center" }}
//       onClick={() => alert(`Edit item with ID: ${record.id}`)}
//     />
//     {/* <Button
//       icon={<MdDelete />}
//       type="primary"
//       danger
//       style={{ display: "flex", alignItems: "center" }}
//       onClick={() => handleDelete(record)}
//     /> */}
//   </Space>
// )}
// />
