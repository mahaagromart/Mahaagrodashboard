import React from "react";
import CardBox from "../../Component/Charts/CardBox";
import { Button, Textarea } from "@chakra-ui/react";

const SupportTicketChatRoom = () => {
  return (
    <div>
      <CardBox>
        {/* Header */}
        <header
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            background: "white",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#f5f5f5",
              padding: "10px 15px",
              borderRadius: "15px",
            }}
          >
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
              alt="img"
              style={{
                height: "90px",
                width: "90px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>User Kumar</p>
              <p>12345464</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <p>WebSite problem</p>
            <p>Priority: Urgent</p>
          </div>
        </header>

        {/* Sticky Divider */}
        <hr
          style={{
            position: "sticky",
            top: "110px",
            zIndex: 1000,
            background: "gray",
            height: "2px",
            border: "none",
            width: "100%",
          }}
        />

{/* Chat Messages */}
<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    overflowY: "auto",
    maxHeight: "60vh",
    padding: "20px",
    gap: "10px",
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: "500px",
      minWidth: "250px",
      height: "auto",
      borderRadius: "30px",
      padding: "20px",
      textAlign: "center",
      background: "ghostwhite",
      alignSelf: "flex-start",
    }}
  >
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
  </div>

  <div
    style={{
      width: "100%",
      maxWidth: "500px",
      minWidth: "250px",
      height: "auto",
      borderRadius: "30px",
      padding: "20px",
      textAlign: "center",
      background: "lightblue",
      alignSelf: "flex-end",
    }}
  >
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
  </div>
</div>


        {/* Message Box */}
        <div
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
            marginTop: "18%",
            marginBottom: "8%"
          }}
        >
          <p>Leave a Message</p>
          <Textarea />
          <Button
            style={{
              backgroundColor: "blue",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            _hover={{ backgroundColor: "darkblue" }}
          >
            Reply
          </Button>
        </div>
      </CardBox>
    </div>
  );
};

export default SupportTicketChatRoom;
