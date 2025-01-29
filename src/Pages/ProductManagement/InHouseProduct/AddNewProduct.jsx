import React, { useState } from "react";
import {
  Box,
  SimpleGrid,
  Select,
  FormControl,
  FormLabel,
  Input,
  Button,
  Tooltip,
  Tag,
  TagLabel,
  TagCloseButton,
  Image
} from "@chakra-ui/react";
import CardBox from "../../../Component/Charts/CardBox";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdInfo, MdSettings } from "react-icons/md";
import Logo1 from "../../../assets/1.png"
import Logo2 from "../../../assets/2.png"
import CenterBox from "../../../Component/Charts/CenterBox";
import UploadImages from "./UploadImages";


const AddNewProduct = () => {
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [mrp, setMrp] = useState();
  const [sellingPrice, setSellingPrice] = useState();
  const [minimumOrderQty, setMinimumOrderQty] = useState();
  const [currentStockQty, setCurrentStockQty] = useState();
  const [discountType, setDiscountType] = useState("Flat");
  const [discountAmount, setDiscountAmount] = useState();
  const [taxAmount, setTaxAmount] = useState();
  const [taxCalculation, setTaxCalculation] = useState();
  const [showPrice, setShowPrice] = useState(false);

  const [shape, setShape] = useState("cuboid");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [diameter, setDiameter] = useState("");
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState(null);

  const handleShapeChange = (e) => {
    setShape(e.target.value);
  };
  const calculateVolume = () => {
    if (shape === "cuboid") {

      if (length && width && height) {
        const vol = parseFloat(length) * parseFloat(width) * parseFloat(height);
        setVolume(vol);
      }
    } else if (shape === "cylinder") {
    
      if (radius && height) {
        const vol = Math.PI * Math.pow(parseFloat(radius), 2) * parseFloat(height);
        setVolume(vol);
      }
    }
  };

  const [errorFields, setErrorFields] = useState({
    mrp: false,
    sellingPrice: false,
    minimumOrderQty: false,
    currentStockQty: false,
    discountAmount: false,
    taxAmount: false,
  });

  const handleInputChange = (e, fieldName, setValue) => {
    const value = e.target.value;
    if (value === "" || Number(value) >= 0) {
      setErrorFields((prev) => ({ ...prev, [fieldName]: false }));
      setValue(value === "" ? 0 : Number(value));
    } else {
      setErrorFields((prev) => ({ ...prev, [fieldName]: true }));
    }
  };


  const calculateDiscountedPrice = () => {
    let finalPrice = sellingPrice;

    if (discountType === "Flat") {
      finalPrice -= discountAmount;
    } else if (discountType === "Percentage") {
      finalPrice -= (finalPrice * discountAmount) / 100;
    }

    if (taxCalculation === "Exclude with product") {
      finalPrice += (finalPrice * taxAmount) / 100;
    }

    return finalPrice;
  };

  const handlePriceCalculation = () => {
    if (mrp && sellingPrice && discountAmount >= 0) {
      setShowPrice(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag.trim()]);
      setInputValue("");
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const generateCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    setSku(randomCode.toString());
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
            Add New Product
          </h2>
        </Box>

        <Box mx="auto" mt={2}>
          <CardBox>
            <Box mb={6}></Box>
            <SimpleGrid
              columns={{ base: 1 }}
              spacing={6}
              alignItems="center"
              gap={10}
              p={3}
            >
              <CardBox>
                <FormControl mb={4}>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Product Name
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter product name"
                    focusBorderColor="blue.500"
                    size="lg"
                    borderRadius="md"
                  />
                </FormControl>
              </CardBox>

              {/* React Quill Editor */}
              <CardBox>
                <FormControl>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Product Description
                  </FormLabel>
                  <div
                    style={{
                      marginBottom: "16px",
                      paddingBottom: "10px",
                      minHeight: "200px",
                    }}
                  >
                    <ReactQuill
                      value={description}
                      onChange={handleDescriptionChange}
                      theme="snow"
                      modules={{
                        toolbar: [
                          [{ header: "1" }, { header: "2" }, { font: [] }],
                          [{ list: "ordered" }, { list: "bullet" }],
                          [{ align: [] }],
                          ["bold", "italic", "underline"],
                          ["link", "image"],
                          ["blockquote", "code-block"],
                          ["clean"],
                        ],
                      }}
                      style={{
                        height: "200px",
                        resize: "vertical",
                        overflow: "auto",
                        border: "1px solid black",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </FormControl>
              </CardBox>
            </SimpleGrid>
          </CardBox>
        </Box>

        <Box mt={4}>
          <CardBox>
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
                General Setup{" "}
              </span>
            </div>

            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={6}
              alignItems="center"
              p={3}
              mb={1}
            >
              <CardBox>
                <FormControl>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <Select
                    placeholder="Select category"
                    name="category"
                    id="category"
                  ></Select>
                </FormControl>
              </CardBox>
              <CardBox>
                <FormControl>
                  <FormLabel htmlFor="subCategory">Sub Category</FormLabel>
                  <Select
                    placeholder="Select Sub category"
                    name="subCategory"
                    id="subCategory"
                  ></Select>
                </FormControl>
              </CardBox>
              <CardBox>
                <FormControl>
                  <FormLabel htmlFor="subSubCategory">Sub Category</FormLabel>
                  <Select
                    placeholder="Select Sub category"
                    name="subSubCategory"
                    id="subSubCategory"
                  ></Select>
                </FormControl>
              </CardBox>
              <CardBox>
                <FormControl>
                  <FormLabel htmlFor="brand">Brand</FormLabel>
                  <Select
                    placeholder="Select Brand"
                    name="brand"
                    id="brand"
                  ></Select>
                </FormControl>
              </CardBox>

              <CardBox>
                <FormControl>
                  <FormLabel htmlFor="sku" display="flex" alignItems="center">
                    Product SKU{" "}
                    <Tooltip
                      label="Create a unique product code by clicking on the 'Generate Code' button"
                      aria-label="Info Tooltip"
                      hasArrow
                      placement="top"
                      style={{marginLeft : "10% !important" }}
                    >
                      <span style={{  cursor: "pointer" }}>
                        <MdInfo />
                      </span>
                    </Tooltip>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={generateCode}
                      style={{ marginLeft: "10%" }}
                    >
                      Generate Code
                    </Button>
                  </FormLabel>
                  <Input
                    type="text"
                    id="sku"
                    name="sku"
                    value={sku}
                    readOnly
                    placeholder="Click 'Generate Code' to create a unique SKU"
                  />
                </FormControl>
              </CardBox>
              <CardBox>
                <FormControl>
                  <FormLabel htmlFor="unit">Unit</FormLabel>
                  <Select
                    placeholder="Select Unit"
                    name="unit"
                    id="unit"
                  ></Select>
                </FormControl>
              </CardBox>

              <CardBox>
                <FormControl>
                  <FormLabel htmlFor="tags" display="flex" alignItems="center">
                    Product Tags{" "}
                    <Tooltip
                      label="Enter Tags Separated by ',' so that customers will be able to find the products easily"
                      aria-label="Info Tooltip"
                      hasArrow
                      placement="top"
                    >
                      <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                        <MdInfo />
                      </span>
                    </Tooltip>
                  </FormLabel>
                  <Input
                    type="text"
                    id="tags"
                    name="tags"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter tags and press Enter or ',' to add"
                  />
                  <div style={{ marginTop: "10px" }}>
                    {tags.map((tag, index) => (
                      <Tag
                        size="md"
                        key={index}
                        marginRight="5px"
                        marginBottom="5px"
                        variant="solid"
                        colorScheme="blue"
                      >
                        <TagLabel>{tag}</TagLabel>
                        <TagCloseButton onClick={() => removeTag(tag)} />
                      </Tag>
                    ))}
                  </div>
                </FormControl>
              </CardBox>
            </SimpleGrid>
          </CardBox>
        </Box>
        <Box>
          <CardBox>
            <div style={{ paddingTop: "10px" }}>
              <span
                style={{
                  marginLeft: "10px",
                  padding: "10px",
                  fontSize: "18px",
                  borderBottom: "1px solid Green",
                }}
              >
                Pricing & others
              </span>
            </div>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 2, "2xl": 4 }}
              spacing={6}
              alignItems="center"
              p={3}
              mb={1}
              pb={10}
            >
              {/* MRP */}
              <CardBox>
                <FormLabel htmlFor="mrp" display="flex" alignItems="center">
                  MRP ₹{" "}
                  <Tooltip
                    label="Add the purchase price for this product"
                    aria-label="Info Tooltip"
                    hasArrow
                    placement="top"
                  >
                    <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                      <MdInfo />
                    </span>
                  </Tooltip>
                </FormLabel>
                <Input
                  type="number"
                  value={mrp}
                  onChange={(e) => handleInputChange(e, "mrp", setMrp)}
                  style={{
                    borderColor: errorFields.mrp ? "red" : "initial",
                  }}
                />
              </CardBox>

              {/* Selling Price */}
              <CardBox>
                <FormLabel
                  htmlFor="sellingPrice"
                  display="flex"
                  alignItems="center"
                >
                  Selling Price ₹{" "}
                  <Tooltip
                    label="Add the selling price for this product"
                    aria-label="Info Tooltip"
                    hasArrow
                    placement="top"
                  >
                    <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                      <MdInfo />
                    </span>
                  </Tooltip>
                </FormLabel>
                <Input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) =>
                    handleInputChange(e, "sellingPrice", setSellingPrice)
                  }
                  style={{
                    borderColor: errorFields.sellingPrice ? "red" : "initial",
                  }}
                />
              </CardBox>

              {/* Minimum Order Qty */}
              <CardBox>
                <FormLabel
                  htmlFor="minimumOrderQty"
                  display="flex"
                  alignItems="center"
                >
                  Minimum Order Qty{" "}
                  <Tooltip
                    label="Set the min order quantity that customer must choose"
                    aria-label="Info Tooltip"
                    hasArrow
                    placement="top"
                  >
                    <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                      <MdInfo />
                    </span>
                  </Tooltip>
                </FormLabel>
                <Input
                  type="number"
                  value={minimumOrderQty}
                  onChange={(e) =>
                    handleInputChange(e, "minimumOrderQty", setMinimumOrderQty)
                  }
                  style={{
                    borderColor: errorFields.minimumOrderQty
                      ? "red"
                      : "initial",
                  }}
                />
              </CardBox>

              {/* Current Stock Qty */}
              <CardBox>
                <FormLabel
                  htmlFor="currentStockQty"
                  display="flex"
                  alignItems="center"
                >
                  Current Stock Qty{" "}
                  <Tooltip
                    label="Set the current stock quantity available"
                    aria-label="Info Tooltip"
                    hasArrow
                    placement="top"
                  >
                    <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                      <MdInfo />
                    </span>
                  </Tooltip>
                </FormLabel>
                <Input
                  type="number"
                  value={currentStockQty}
                  onChange={(e) =>
                    handleInputChange(e, "currentStockQty", setCurrentStockQty)
                  }
                  style={{
                    borderColor: errorFields.currentStockQty
                      ? "red"
                      : "initial",
                  }}
                />
              </CardBox>

              {/* Discount Type */}
              <CardBox>
                <FormLabel
                  htmlFor="discountType"
                  display="flex"
                  alignItems="center"
                >
                  Discount Type{" "}
                  <Tooltip
                    label="Select Flat or Percentage discount"
                    aria-label="Info Tooltip"
                    hasArrow
                    placement="top"
                  >
                    <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                      <MdInfo />
                    </span>
                  </Tooltip>
                </FormLabel>
                <Select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                >
                  <option>Flat</option>
                  <option>Percentage</option>
                </Select>
              </CardBox>

              {/* Discount Amount */}
              <CardBox>
                <FormLabel
                  htmlFor="discountAmount"
                  display="flex"
                  alignItems="center"
                >
                  Discount {discountType === "Flat" ? "₹" : "%"}{" "}
                  <Tooltip
                    label="If 'flat' then enter the amount if 'Percentage' then enter percentage"
                    aria-label="Info Tooltip"
                    hasArrow
                    placement="top"
                  >
                    <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                      <MdInfo />
                    </span>
                  </Tooltip>
                </FormLabel>
                <Input
                  type="number"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(Number(e.target.value))}
                />
              </CardBox>

              <CardBox>
                <FormLabel
                  htmlFor="taxCalculation"
                  display="flex"
                  alignItems="center"
                >
                  Tax Calculation{" "}
                  <Tooltip
                    label="If Included the price will remain same after the discount. If Excluded the tax will be added after the discount."
                    aria-label="Info Tooltip"
                    hasArrow
                    placement="top"
                  >
                    <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                      <MdInfo />
                    </span>
                  </Tooltip>
                </FormLabel>
                <Select
                  name="taxCalculation"
                  id="taxCalculation"
                  value={taxCalculation}
                  onChange={(e) => setTaxCalculation(e.target.value)} // To track the value
                >
                  <option>Include with product</option>
                  <option>Exclude with product</option>
                </Select>
              </CardBox>

              {/* Tax Amount */}
              <CardBox>
                <FormLabel
                  htmlFor="taxAmount"
                  display="flex"
                  alignItems="center"
                >
                  Tax Amount (%){" "}
                  <Tooltip
                    label="Set the Tax Amount."
                    aria-label="Info Tooltip"
                    hasArrow
                    placement="top"
                  >
                    <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                      <MdInfo />
                    </span>
                  </Tooltip>
                </FormLabel>
                <Input
                  type="number"
                  value={taxAmount}
                  onChange={(e) => setTaxAmount(Number(e.target.value))}
                  disabled={taxCalculation === "Include with product"} 
                  style={{
                    backgroundColor:
                      taxCalculation === "Include with product"
                        ? "#f0f0f0"
                        : "white", 
                    opacity:
                      taxCalculation === "Include with product" ? 0.6 : 1, 
                  }}
                />
              </CardBox>

              <CardBox>
                <Box mt={8}>
                  <Button onClick={handlePriceCalculation}>
                    Calculate Price
                  </Button>
                </Box>
              </CardBox>
              {/* Conditionally render price and buttons */}
              {showPrice && (
                <CardBox>
                  <Box mt={6}>
                    <span style={{ fontWeight: "bold" }}>
                      Final Price: ₹ {calculateDiscountedPrice().toFixed(2)}
                    </span>
                  </Box>
                </CardBox>
              )}

              {/* Calculate Button */}
            </SimpleGrid>
          </CardBox>
        </Box>

        <Box>
          <CardBox>
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
                Logistic Setup{" "}
              </span>
            </div>

            <SimpleGrid
  columns={{ base: 1, md: 2, lg: 2 }} 
  spacing={6}
  alignItems="center" 
  p={3} 
  pb={10} 
>
  {/* CardBox for Image */}
  <CardBox>
    <CenterBox>
      <Image 
        src={Logo1} 
        maxW={{ base: "50%", md: "70%", lg: "50%" }} 
        objectFit="contain" 
        alt="Logo" 
      />
    </CenterBox>
  </CardBox>

  <CardBox>
    <CenterBox>
      <Image 
        src={Logo2} 
        maxW={{ base: "50%", md: "70%", lg: "50%" }} 
        objectFit="contain" 
        alt="Logo" 
      />
    </CenterBox>
  </CardBox>
</SimpleGrid>

            <SimpleGrid
              columns={{ base: 1, md: 2 , lg: 4 }}
              spacing={6}
              alignItems="center"
              p={3}
              pb={10}
            >
              {/* Shipping Details */}
              <CardBox>
        <FormLabel htmlFor="shape" display="flex" alignItems="center">
          Package Shape
          <Tooltip
            label="Select the shape of the package."
            aria-label="Info Tooltip"
            hasArrow
            placement="top"
          >
            <span style={{ marginLeft: "10px", cursor: "pointer" }}>
              <MdInfo />
            </span>
          </Tooltip>
        </FormLabel>
        <Select
          id="shape"
          name="shape"
          value={shape}
          onChange={handleShapeChange}
          style={{ padding: "8px", width: "100%" }}
        >
          <option value="cuboid">Cuboid</option>
          <option value="cylinder">Cylinder</option>
        </Select>
      </CardBox>

      {/* Length for Cuboid */}
      {shape === "cuboid" && (
        <CardBox>
          <FormLabel htmlFor="length" display="flex" alignItems="center">
            Length (cm)
            <Tooltip
              label="Enter the package length in cm, including the packaging material."
              aria-label="Info Tooltip"
              hasArrow
              placement="top"
            >
              <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                <MdInfo />
              </span>
            </Tooltip>
          </FormLabel>
          <Input
            type="number"
            name="length"
            id="length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </CardBox>
      )}

      {/* Width for Cuboid */}
      {shape === "cuboid" && (
        <CardBox>
          <FormLabel htmlFor="width" display="flex" alignItems="center">
            Width (cm)
            <Tooltip
              label="Enter the package width in cm, including the packaging material."
              aria-label="Info Tooltip"
              hasArrow
              placement="top"
            >
              <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                <MdInfo />
              </span>
            </Tooltip>
          </FormLabel>
          <Input
            type="number"
            name="width"
            id="width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </CardBox>
      )}

      {/* Height */}
      <CardBox>
        <FormLabel htmlFor="height" display="flex" alignItems="center">
          Height (cm)
          <Tooltip
            label="Enter the package height in cm, including the packaging material."
            aria-label="Info Tooltip"
            hasArrow
            placement="top"
          >
            <span style={{ marginLeft: "10px", cursor: "pointer" }}>
              <MdInfo />
            </span>
          </Tooltip>
        </FormLabel>
        <Input
          type="number"
          name="height"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </CardBox>


      {/* Radius for Cylinder */}
      {shape === "cylinder" && (
        <CardBox>
          <FormLabel htmlFor="diameter" display="flex" alignItems="center">
            Diameter (cm)
            <Tooltip
              label="Enter the radius of the package (only for cylinder)."
              aria-label="Info Tooltip"
              hasArrow
              placement="top"
            >
              <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                <MdInfo />
              </span>
            </Tooltip>
          </FormLabel>
          <Input
            type="number"
            name="diameter"
            id="diameter"
            value={radius}
            onChange={(e) => setDiameter(e.target.value)}
          />
        </CardBox>
      )}
      
      {/* Weight */}
      <CardBox>
        <FormLabel htmlFor="weight" display="flex" alignItems="center">
          Weight (gram)
          <Tooltip
            label="Enter the package Weight in gram"
            aria-label="Info Tooltip"
            hasArrow
            placement="top"
          >
            <span style={{ marginLeft: "10px", cursor: "pointer" }}>
              <MdInfo />
            </span>
          </Tooltip>
        </FormLabel>
        <Input
          type="number"
          name="weight"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </CardBox>

      {/* Volume Calculation Button */}
      <CardBox>
       <Box mt={8}>
       <Button
          onClick={calculateVolume}
          
        >
          Calculate Volume
        </Button>
       </Box>
      </CardBox>

      {/* Display Volume */}
      {volume !== null && (
        <CardBox>
            <Box mt={6}>
              <span style={{fontWeight : "bold"}}>
               Calculated Volume: {volume.toFixed(2)} cm³ </span> 
             
            </Box>

   
        </CardBox>
      )}
            
            </SimpleGrid>
          </CardBox>
        </Box>

        {/* Product Varients */}

        {/* Product Image Uploads  */}

        <Box>
          <CardBox>
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
                Image Setup{" "}
              </span>
            </div>
           <SimpleGrid
                         columns={{ base: 1, md: 2  }}
                         spacing={6}
                         alignItems="center"
                         p={3}
                         pb={10}
                         mt={10}
           >
           <UploadImages/>
           </SimpleGrid>
          </CardBox>
        </Box>
      </Box>
    </>
  );
};

export default AddNewProduct;

