import axios from "axios";

export const getProvinces = async () => {
  try {
    const response = await axios.get(`https://vapi.vnappmob.com/api/province/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};

export const getDistricts = async (province_id) => {
  try {
    const response = await axios.get(
      `https://vapi.vnappmob.com/api/province/district/${province_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching districs:", error);
    throw error;
  }
};

export const getWards = async (district_id) => {
  try {
    const response = await axios.get(
      `https://vapi.vnappmob.com/api/province/ward/${district_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching wards:", error);
    throw error;
  }
};