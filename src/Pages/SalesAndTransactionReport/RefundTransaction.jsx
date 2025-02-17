import { Box } from '@chakra-ui/react'
import React from 'react'
import CardBox from "../../Component/Charts/CardBox"
import RefundTransactionTable from '../../Component/Table/RefundTransactionTable'

const RefundTransaction = () => {
  return (
    <>
      <Box>
        
        <CardBox>
         <RefundTransactionTable/>
        </CardBox>
      </Box>
    </>
  )
}

export default RefundTransaction