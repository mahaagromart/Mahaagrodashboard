import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  SimpleGrid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import Card from "../../../Component/Card";
import { MdCurrencyRupee } from "react-icons/md";
import CardBox from "../../../Component/Charts/CardBox";
import { Card as AntCard, Input } from "antd";
import { useNavigate  , useLocation} from "react-router-dom";



const EarningStatement = () => {

    const navigate = useNavigate();
    const location = useLocation(); 
    
    
    const { SL } = location.state || {}; 

     console.log(SL)
    useEffect(()=>{
        if(SL === null || SL === undefined){
            navigate("/");
        }
    },[SL])
    

  return (
    <>
      <Box marginTop="1%">
        <Box mx="auto" mt={2}>
          <CardBox>
            <Box mb={6}>
              <div style={{ paddingTop: "10px" }}>
                <span
                  style={{
                    marginLeft: "10px",
                    padding: "10px",
                    fontSize: "18px",
                    borderBottom: "1px solid Green",
                  }}
                >
                  {" "}
                  Delivery Man Information{" "}
                </span>
              </div>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} p={5}>
              <Card
                icon={<MdCurrencyRupee />}
                heading={"Cash in Hand"}
                money={"₹00.0"}
                ht={"100px"}
              />
              <Card
                icon={<MdCurrencyRupee />}
                heading={"Current Balance"}
                money={"₹00.0"}
                ht={"100px"}
              />

              <Card
                icon={<MdCurrencyRupee style={{ color: "yellowgreen" }} />}
                heading={"total withdrawn"}
                money={"₹00.0"}
                ht={"100px"}
              />
              <Card
                icon={<MdCurrencyRupee style={{ color: "yellowgreen" }} />}
                heading={"Pending Withdraw"}
                money={"₹00.0"}
                ht={"100px"}
              />
              <Card
                icon={<MdCurrencyRupee style={{ color: "green" }} />}
                heading={"Withdrawable Balance"}
                money={"₹00.0"}
                ht={"100px"}
              />
            </SimpleGrid>
          </CardBox>
        </Box>

        <Box marginTop="1%">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <CardBox>
              <AntCard
                title="Delivery Man Information"
                style={{
                  width: 500,
                  border: "none",
                  background: "transparent",
                  boxShadow: "none",
                }}
              >
                <p style={{ color: "green", fontWeight: "bold" }}>Active</p>
                <p>
                  <strong>Name:</strong> Sanjeev Kumar
                </p>
                <p>
                  <strong>Phone:</strong> 7633920927
                </p>
                <p>
                  <strong>Email:</strong> Sanjeevkrpd11@gmail.com
                </p>
              </AntCard>
            </CardBox>

            <CardBox>
              <AntCard
                title="Bank Information"
                style={{
                  width: 500,
                  border: "none",
                  background: "transparent",
                  boxShadow: "none",
                }}
              >
                <p style={{ color: "green", fontWeight: "bold" }}>Active</p>
                <p>
                  <strong>Bank Name:</strong> Punjab National Bank
                </p>
                <p>
                  <strong>Branch:</strong> Bhowra
                </p>
                <p>
                  <strong>Bank Holer Name:</strong> Sanjeev kumar
                </p>
                <p>
                  <strong>Account No:</strong> 6534134643468414
                </p>
              </AntCard>
            </CardBox>
          </SimpleGrid>
        </Box>

        <Box marginTop="1%">
          <CardBox>
            <SimpleGrid  spacing={6} p={5}>
              <FormControl>
                <FormLabel>Collect Cash</FormLabel>
                <Input type="number" 
                       size="md"
                />
              </FormControl>
              <GridItem
                display="flex"
                justifyContent="start"
                alignItems="center"
                mb={5}
              >
                <Box display="flex" >

                  <Button colorScheme="blue" type="submit">
                    Receive
                  </Button>
                </Box>
              </GridItem>
            </SimpleGrid>
          </CardBox>
        </Box>
      </Box>
    </>
  );
};

export default EarningStatement;

/*
http {
    upstream dotnet_backend {
        server 127.0.0.1:5000;  # .NET Core API running on port 5000
    }

    server {
        listen 80;
        server_name api.yourdomain.com;
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl;
        server_name api.yourdomain.com;

        ssl_certificate "C:/Certbot/live/yourdomain.com/fullchain.pem";
        ssl_certificate_key "C:/Certbot/live/yourdomain.com/privkey.pem";

        location / {
            proxy_pass http://dotnet_backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection keep-alive;
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }

    server {
        listen 80;
        server_name next.yourdomain.com;
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl;
        server_name next.yourdomain.com;

        ssl_certificate "C:/Certbot/live/yourdomain.com/fullchain.pem";
        ssl_certificate_key "C:/Certbot/live/yourdomain.com/privkey.pem";

        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection keep-alive;
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }

    server {
        listen 80;
        server_name react.yourdomain.com;
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl;
        server_name react.yourdomain.com;

        ssl_certificate "C:/Certbot/live/yourdomain.com/fullchain.pem";
        ssl_certificate_key "C:/Certbot/live/yourdomain.com/privkey.pem";

        location / {
            root C:/path/to/react-project/build;
            index index.html;
            try_files $uri /index.html;
        }
    }
}
*/
