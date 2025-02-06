import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Box, SimpleGrid, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { Card, Button } from "antd";
import CardBox from "../../Component/Charts/CardBox";

const MessageView = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access the location state

  const { ContactInfo, ContactEmail, CustomerName, subject, message, isChecked } = location.state || {};
  const [checked, setChecked] = useState(isChecked);
  const [adminMessage, setAdminMessage] = useState({
    isReplied: true,
    Subject: "Test",
    Message: "this is no good",
  });

  useEffect(() => {
    if (!ContactInfo || !CustomerName || !subject || !message) {
      Swal.fire({
        icon: "error",
        title: "Missing Customer Information",
        text: "Customer Info is required.",
      });
      navigate("/Message"); // Redirect to ProductList if missing data
    }
  }, [ContactInfo, CustomerName, subject, message, navigate]);

  const handleCheck = () => {
    setChecked(true);
    Swal.fire({
      icon: "success",
      title: "Checked",
      text: "The message has been marked as checked.",
    });
  };

  return (
    <>
      <Box marginTop="1%">
        <Box mb={6}>
          <h2
            className="content-title"
            style={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: "20px",
              color: "#4A5568",
            }}
          >
            Message View
          </h2>
        </Box>

        <Box mx="auto" mt={4}>
          <SimpleGrid columns={{ base: 1, sm: 1, md: 2 }} spacing={6} p={3}>
            {/* USER CARD */}
            <Card
              title="User Details"
              extra={
                <Button
                  type="primary"
                  style={{ fontSize: "16px", padding: "10px 20px" }}
                  onClick={handleCheck}
                  disabled={checked}
                >
                  {checked ? "Checked" : "Check"}
                </Button>
              }
              style={{
                width: "100%",
                background: "#FFFFFF",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                marginTop: "1%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p style={{ marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                  <span style={{ paddingLeft: "20px" }}>{CustomerName}</span>
                </p>
                <p style={{ marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold" }}>Mobile No:</span>{" "}
                  <span style={{ paddingLeft: "20px" }}>{ContactInfo}</span>
                </p>
                <p style={{ marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold" }}>Email Id:</span>{" "}
                  <span style={{ paddingLeft: "20px" }}>{ContactEmail}</span>
                </p>
                <p style={{ marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold" }}>Subject:</span>{" "}
                  <span style={{ paddingLeft: "20px" }}>{subject}</span>
                </p>
                <p style={{ marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold" }}>Message:</span>{" "}
                  <span style={{ paddingLeft: "20px" }}>{message}</span>
                </p>
              </div>
            </Card>

            {/* Send Mail Card */}
            <CardBox
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <h1 style={{ paddingTop: "2%", textAlign: "center" }}>Send Mail</h1>

              <FormControl p="20px">
                <FormLabel>Subject</FormLabel>
                <Input />
              </FormControl>

              <FormControl p="20px">
                <FormLabel>Mail Body</FormLabel>
                <Textarea />
              </FormControl>

              <Button type="primary" style={{ margin: "20px" }}>
                Send
              </Button>
            </CardBox>

            {/* Message Log Card */}
            <CardBox
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <h1 style={{ paddingTop: "2%", textAlign: "center" }}>Message Log</h1>

              <Box
                style={{
                  backgroundColor: "lightBlue",
                  padding: "10px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              >
                <h2 style={{ margin: "0" }}>{CustomerName}</h2>
                <p style={{ margin: "0" }}>
                  <span style={{ fontWeight: "bold" }}>Subject:</span> {subject}
                </p>
                <p style={{ margin: "0" }}>
                  <span style={{ fontWeight: "bold" }}>Message:</span> {message}
                </p>
              </Box>

              {adminMessage.isReplied ? (
                <Box
                  style={{
                    backgroundColor: "lightGreen",
                    padding: "10px",
                    borderRadius: "10px",
                    marginBottom : "10px"
                  }}
                >
                  <h2 style={{ margin: "0" }}>Admin</h2>
                  <p style={{ margin: "0" }}>
                    <span style={{ fontWeight: "bold" }}>Subject:</span> {adminMessage.Subject}
                  </p>
                  <p style={{ margin: "0"  }}>
                    <span style={{ fontWeight: "bold" }}>Message:</span> {adminMessage.Message}
                  </p>
                </Box>
              ) : null}
            </CardBox>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

export default MessageView;
