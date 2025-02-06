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

const BroadcastNotification = () => {
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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={6} alignItems="center" p={5}>
          <FormControl>
            <FormLabel fontWeight="bold" color="gray.600">
              Title
            </FormLabel>
            <Input
              type="text"
              placeholder="Ex- Sale Sale Sale"
              focusBorderColor="blue.500"
              size="md"
              borderRadius="md"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="bold" color="gray.600">
              Message
            </FormLabel>
            <Input
              type="text"
              placeholder="Ex- Grab this limited time offer"
              focusBorderColor="blue.500"
              size="md"
              borderRadius="md"
            />
          </FormControl>

        </SimpleGrid>



        <Box mt={6} display="flex" justifyContent="flex-start" gap={4} p={3} paddingRight={5}>
          <Button colorScheme="gray">
            Reset
          </Button>
          <Button colorScheme="blue" >
            Send
          </Button>
        </Box>

      </CardBox>

    </Box>



        <Box mt={4}>
            <CardBox>
                  <BroadcastTable/>
            </CardBox>          
         </Box>                            

  </Box>
  )
}

export default BroadcastNotification
