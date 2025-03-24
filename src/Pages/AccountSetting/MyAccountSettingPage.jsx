// import { useState,useEffect } from "react";
// import { 
//   Box, SimpleGrid, FormLabel, FormControl, Input, Button, 
//   Select, Image, useBreakpointValue, Text 
// } from "@chakra-ui/react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import CardBox from "../../Component/Charts/CardBox";

// import { useDispatch , useSelector } from "react-redux";
// import { startLoading , stopLoading } from "../../redux/Features/LoadingSlice";
// import Swal from "sweetalert2";
// import axios from "axios";
// const MyAccountSettingPage = () => {

//   const apiUrl = import.meta.env.VITE_API_URL;
//   const { token,UserId } = useSelector((state) => state.auth);
//   const storedToken = token || localStorage.getItem("token");
//   const dispatch = useDispatch();
//   const [previewImage, setPreviewImage] = useState(null);
//   const [initialValues, setInitialValues] = useState({
//     userName: "",
//     mobile: "",
//     email: "",
//     profilePicture: null,
//   });

//   const logoSize = useBreakpointValue({ base: "150px", md: "300px" });

//     useEffect(() => {
//       fetchUserProfile();
//     }, []);
  
//     const fetchUserProfile = async () => {
//       try {
//         const url = `${apiUrl}Authentication/GetUserProfile`;
//         const response = await axios.post(
//           `${url}?UserId=${UserId}`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${storedToken}`,
//             },
//           }
//         );
//         const userProfile = response.data?.userProfilesEntity?.$values?.[0];
//         if (userProfile) {
//           setInitialValues({
//             userName: `${userProfile.firstName} ${userProfile.lastName}` || "",
//             mobile: userProfile.phoneNumber || "",
//             email: userProfile.emailId || "",
//             profilePicture: userProfile.profileImage || null,
//           });
//           setPreviewImage(`${apiUrl}${userProfile.profileImage}`);
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };
  
//     const validationSchema = Yup.object().shape({
//       userName: Yup.string().required("Username is required"),
//     });
  
//     const handleImageChange = (event, setFieldValue) => {
//       const file = event.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           setPreviewImage(reader.result);
//           setFieldValue("profilePicture", file);
//         };
//         reader.readAsDataURL(file);
//       }
//     };
  

//   const uploadImage = async (imageFile, folderType) => {
//     try {
//       if (!imageFile) {
//         throw new Error("No image file selected");
//       }
  
//       const formData = new FormData();
//       formData.append("Image", imageFile.originFileObj || imageFile); 
//       formData.append("folderType", folderType); 
  
//       console.log("Uploading Image:", imageFile.name); 
  
//       const response = await axios.post(`${apiUrl}SaveFile/SaveImage`, formData, {
//         headers: {
//           Authorization: `Bearer ${storedToken}`,
//           "Content-Type": "multipart/form-data", 
//         },
//       });
  
//       if (response.data.success) {
//         return response.data.path; 
//       } else {
//         throw new Error(response.data.message || "Image upload failed");
//       }
//     } catch (error) {
//       console.error(" Error uploading image:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Image Upload Failed",
//         text: error.message || "Failed to upload image",
//       });
//       return null;
//     }
//   };


//   const submitFormData = async (values) => {
//     try {
//       dispatch(startLoading());
  
//       let imagePath = "";
//       if (values.categoryIcon) {
//         try {
        
//           imagePath = await uploadImage(values.categoryIcon, "ProfilePicture");
//           if (!imagePath) {
//             throw new Error("Image upload failed.");
//           }
//         } catch (err) {
//           Swal.fire({
//             icon: "error",
//             title: "Image Upload Failed",
//             text: "Could not upload the image. Please try again.",
//           });
//           dispatch(stopLoading());
//           return;
//         }
//       }
  
   
//       try {
//         const res = await axios.post(`${apiUrl}Category/InsertProductCategory`, payload, {
//           headers: {
//             Authorization: `Bearer ${storedToken}`,
//           },
//         });

//         if (res.data.message === "SUCCESS" || res.data.code == 200) {
//           Swal.fire({
//             icon: "success",
//             title: "Success",
//             text: "category inserted successfully!",
//           });
//         } else {
//           Swal.fire({
//             icon: "warning",
//             title: "Warning",
//             text: res.data?.message || res.data?.[0]?.message || "Unexpected response from server",
//           });
//         }
//       } catch (error) {
//         console.error("❌ Error submitting form:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: error?.response?.data?.message || error?.response?.data?.Message || "Failed to insert  category",
//         });
//       }
//     } catch (err) {
//       console.error("Unexpected Error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "An unexpected error occurred. Please try again.",
//       });
//     } finally {
//       dispatch(stopLoading());
//     }
//   };
  

//   const handleSubmit = async (values, { resetForm }) => {

//     await submitFormData(values);

//     setPreviewImage(null);
//   };

//   return (
//     <Box marginTop="1%">
//       <Box mb={6}>
//         <h2 className="content-title" style={{ textAlign: "center", fontWeight: "600", fontSize: "20px", color: "#4A5568" }}>
//           Profile Setting
//         </h2>
//       </Box>

//       <Box mx="auto" mt={5}>
//         <CardBox>
//           <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
//             {({ setFieldValue }) => (
//               <Form>
//                 <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} alignItems="center">
//                   <Box w="100%" px={{ base: 2, md: 6 }}>
                    
//                   {/* User Name */}
//                   <FormControl mb={4} mt={5}>
//                     <FormLabel fontWeight="bold" color="gray.600">Name</FormLabel>
//                     <Field 
//                       as={Input}
//                       type="text"
//                       name="userName"
//                       value={initialValues.userName}
//                       placeholder="Enter Username"
//                       focusBorderColor="blue.500"
//                       size="lg"
//                       borderRadius="md"
//                     />
//                     <Text color="red.500" fontSize="sm" minH="20px" display="block">
//                       <ErrorMessage name="userName" />
//                     </Text>
//                   </FormControl>
                   
//                         {/* Mobile Number */}
//                         <FormControl mb={4}>
//                           <FormLabel fontWeight="bold" color="gray.600">Mobile No</FormLabel>
//                           <Field 
//                             as={Input}
//                             type="text"
//                             name="mobile"
//                             value={initialValues.mobile}
//                             focusBorderColor="blue.500"
//                             size="lg"
//                             borderRadius="md"
//                             readOnly
//                           />
//                         </FormControl>

//                     {/* Email */}
//                     <FormControl mb={4}>
//                       <FormLabel fontWeight="bold" color="gray.600">Email</FormLabel>
//                       <Field 
//                         as={Input}
//                         type="text"
//                         name="email"
//                         value={initialValues.email}
//                         focusBorderColor="blue.500"
//                         size="lg"
//                         borderRadius="md"
//                         readOnly
//                       />
//                     </FormControl>


//               <FormControl mb={4}>
//                 <FormLabel fontWeight="bold" color="gray.600">
//                   Upload New Profile Picture{" "}
//                   <span style={{ color: "green", fontSize: "sm" }}>
//                     (Picture must be 1:1 ratio)
//                   </span>
//                 </FormLabel>
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   onChange={(event) => handleImageChange(event, setFieldValue)}
//                   focusBorderColor="blue.500"
//                   size="lg"
//                   borderRadius="md"
//                   p={2}
//                 />
//                 <Text color="red.500" fontSize="sm" minH="20px" display="block">
//                   <ErrorMessage name="profilePicture" /> 
//                 </Text>
//               </FormControl>


//                     {/* Buttons */}
//                     <Box textAlign="center" mt={4} mb={5}>
//                       <Button type="submit" bg="blue.500" color="white" _hover={{ bg: "blue.600" }} size="lg" borderRadius="md" mr={3}>
//                         Update
//                       </Button>
//                     </Box>
//                   </Box>

//                   {/* Image Preview */}
//                   <Box textAlign={{ base: "center", md: "right" }} display="flex" justifyContent="center" alignItems="center">
//                     {previewImage ? (
//                       <Image
//                         src={previewImage}
//                         alt="Preview"
//                         boxSize={logoSize}
//                         objectFit="cover"
//                         borderRadius="full"
//                         border="2px solid #ccc"
//                       />
//                     ) : (
//                       <p style={{ color: "#aaa" }}>No Profile Image Found</p>
//                     )}
//                   </Box>
//                 </SimpleGrid>
//               </Form>
//             )}
//           </Formik>
//         </CardBox>
//       </Box>

//     </Box>
//   );
// };




// export default MyAccountSettingPage

import { useState, useEffect } from "react";
import {
  Box, SimpleGrid, FormLabel, FormControl, Input, Button,
  Image, useBreakpointValue, Text
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CardBox from "../../Component/Charts/CardBox";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../redux/Features/LoadingSlice";
import Swal from "sweetalert2";
import axios from "axios";

const MyAccountSettingPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token, UserId } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);

  const [initialValues, setInitialValues] = useState({
    userName: "",
    mobile: "",
    email: "",
    profilePicture: null,
    address: ""
  });

  const logoSize = useBreakpointValue({ base: "150px", md: "350px" });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const url = `${apiUrl}Authentication/GetUserProfile`;
      const response = await axios.post(`${url}?UserId=${UserId}`, {}, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const userProfile = response.data?.userProfilesEntity?.$values?.[0];
      if (userProfile) {
        setInitialValues({
          userName: `${userProfile.firstName} ${userProfile.lastName}` || "",
          mobile: userProfile.phoneNumber || "",
          email: userProfile.emailId || "",
          profilePicture: userProfile.profileImage || null,
          address: `${userProfile.cityName}, ${userProfile.stateName}, ${userProfile.countryName}` || ""
        });
        setPreviewImage(`${apiUrl}${userProfile.profileImage}`);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Please enter a username"),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setFieldValue("profilePicture", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (imageFile, folderType) => {
    try {
      if (!imageFile) {
        throw new Error("No image file selected");
      }

      const formData = new FormData();
      formData.append("Image", imageFile.originFileObj || imageFile);
      formData.append("folderType", folderType);

      console.log("Uploading Image:", imageFile.name);

      const response = await axios.post(
        `${apiUrl}SaveFile/SaveImage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        return response.data.path;
      } else {
        throw new Error(response.data.message || "Image upload failed");
      }
    } catch (error) {
      console.error(" Error uploading image:", error);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: error.message || "Failed to upload image",
      });
      return null;
    }
  };

  const submitFormData = async (values) => {
    try {
      dispatch(startLoading());
      let imagePath = "";

      if (values.profilePicture) {
        imagePath = await uploadImage(values.profilePicture, "profiles");

        if (imagePath) {
          const payload = {
            profilePath: imagePath,
          };

          const res = await axios.post(`${apiUrl}Authentication/UpdateUserProfile`, payload, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (res.data.code === 200 || res.data.retval === "Success") {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Profile updated successfully!",
            });
          } else {
            throw new Error("Failed to update profile.");
          }
        }

        if (!imagePath) throw new Error("Image upload failed.");
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    } finally {
      dispatch(stopLoading());
    }
  };


  const handleSubmit = (values) => {
    submitFormData(values);
    setPreviewImage(null);
  };

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={submitFormData}
    enableReinitialize
  >

    <Box marginTop="1%">
      <Box mb={6} textAlign="center">
        <h2 style={{ fontWeight: "600", fontSize: "20px", color: "#4A5568" }}>Profile Setting</h2>
      </Box>
      <Box mx="auto" mt={5}>
      <CardBox>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
          {({ setFieldValue }) => (
            <Form>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} alignItems="center">
                <Box w="100%" px={{ base: 2, md: 6 }}>
                  {/* User Name */}
                   <FormControl mb={4} mt={5}>
                     <FormLabel fontWeight="bold" color="gray.600">Name</FormLabel>
                     <Field 
                       as={Input}
                       type="text"
                       name="userName"
                      value={initialValues.userName}
                       placeholder="Enter Username"
                       focusBorderColor="blue.500"
                       size="lg"
                       borderRadius="md"
                     /> 
                     <Text color="red.500" fontSize="sm" minH="20px" display="block">
                      <ErrorMessage name="userName" />
                    </Text>
                   </FormControl>

                <FormControl mb={4}>
                  <FormLabel>Address</FormLabel>
                  <Field as={Input} name="address" readOnly />
                </FormControl>
                         {/* Mobile Number */}
                         <FormControl mb={4}>
                           <FormLabel fontWeight="bold" color="gray.600">Mobile No</FormLabel>
                           <Field 
                             as={Input}
                             type="text"
                             name="mobile"
                             value={initialValues.mobile}
                             focusBorderColor="blue.500"
                             size="lg"
                             borderRadius="md"
                             readOnly
                           />
                         </FormControl>

                   {/* Email */}
                   <FormControl mb={4}>
                       <FormLabel fontWeight="bold" color="gray.600">Email</FormLabel>
                       <Field 
                         as={Input}
                         type="text"
                         name="email"
                         value={initialValues.email}
                         focusBorderColor="blue.500"
                         size="lg"
                         borderRadius="md"
                         readOnly
                       />
                     </FormControl>

                  <FormControl mb={4}>
                 <FormLabel fontWeight="bold" color="gray.600">
                   Upload New Profile Picture{" "}
                   <span style={{ color: "green", fontSize: "sm" }}>
                     (Picture must be 1:1 ratio)
                   </span>
                 </FormLabel>
                <Input
                   type="file"
                   accept="image/*"
                   onChange={(e) => handleImageChange(e, setFieldValue)} 
                   focusBorderColor="blue.500"
                   size="lg"
                   borderRadius="md"
                   p={2}
                 />
                 <Text color="red.500" fontSize="sm" minH="20px" display="block">
                   <ErrorMessage name="profilePicture" /> 
                 </Text>
               </FormControl>
               <Box textAlign="start" mt={4} mb={5}>
                       <Button type="submit" bg="blue.500" color="white" _hover={{ bg: "blue.600" }} size="lg" borderRadius="md">
                         Update
                       </Button>
                     </Box>
              </Box>
              {/* Image Preview */}
                   <Box textAlign={{ base: "center", md: "right" }} display="flex" justifyContent="center" alignItems="center">
                     {previewImage ? (
                       <Image
                         src={previewImage}
                         alt="Preview"
                         boxSize={logoSize}
                         objectFit="cover"
                         borderRadius="full"
                         border="2px solid #ccc"
                       />
                     ) : (
                       <p style={{ color: "#aaa" }}>No Profile Image Found</p>
                     )}
                   </Box>


              </SimpleGrid>
            </Form>
          )}
        </Formik>
      </CardBox>
      </Box>
    </Box>
        </Formik>
  );
};

export default MyAccountSettingPage;
