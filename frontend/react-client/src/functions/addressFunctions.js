import axios from "axios";

const fetchAddressFromCoordinates = async (coords) => {
  const [latitude, longitude] = coords;
  const apiKey = "78f10438-fb7e-4516-a20a-41c29d8f3b01";
  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${longitude},${latitude}&format=json`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error requesting address:", error);
  }
};

const extractDetailedAddress = (data) => {
  const featureMembers = data?.response?.GeoObjectCollection?.featureMember;

  if (featureMembers && featureMembers.length > 0) {
    const firstGeoObject = featureMembers[0]?.GeoObject;
    const components =
      firstGeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components;

    if (components) {
      const city = components.find((comp) => comp.kind === "locality")?.name;
      const district = components.find((comp) => comp.kind === "district")?.name;
      const suburb = components.find((comp) => comp.kind === "suburb")?.name;
      const street = components.find((comp) => comp.kind === "street")?.name;
      const house = components.find((comp) => comp.kind === "house")?.name;

      return {
        city: city || "-",
        district: district || "-",
        suburb: suburb || "-",
        street: street || "-",
        house: house || "-",
        fullAddress: [city, district || suburb, street, house]
          .filter(Boolean)
          .join(", ") || "Адрес не найден",
      };
    }
  }
  return {
    city: "-",
    district: "-",
    suburb: "-",
    street: "-",
    house: "-",
    fullAddress: "Адрес не найден",
  };
};

export { fetchAddressFromCoordinates, extractDetailedAddress };