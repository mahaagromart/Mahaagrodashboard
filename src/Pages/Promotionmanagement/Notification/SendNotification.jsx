import {
  Box,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Tooltip,
  Button,
  Select
} from "@chakra-ui/react";
import CardBox from "../../../Component/Charts/CardBox";
import BroadcastTable from "../../../Component/Table/BroadcastTable";
import UserTable from "../../../Component/Table/UserTable";
import SendNotificationTable from "../../../Component/Table/SendNotificationTable";

const sendNotification = () => {
  return (
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
        Broadcast Notification 
      </h2>
    </Box>

    <Box>
      <CardBox>
          <UserTable/>
      </CardBox>

    </Box>



        <Box mt={4}>
            <CardBox>
                  <SendNotificationTable/>
            </CardBox>          
         </Box>                            

  </Box>
  )
}



export default sendNotification
