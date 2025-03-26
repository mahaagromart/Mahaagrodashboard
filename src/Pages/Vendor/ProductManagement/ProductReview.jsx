import React from 'react'
import ProductReviewTable from '../../../Component/VendorTable/ProductReviewTable'
import { Box } from '@chakra-ui/react'
import CardBox from '../../../Component/Charts/CardBox'

const ProductReview = () => {
  return (
    <>
   <Box scaleX={true}>
    <CardBox>
    <ProductReviewTable/>
    </CardBox>
   </Box>
    </>
  )
}

export default ProductReview