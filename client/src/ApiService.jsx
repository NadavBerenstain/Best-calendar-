const BASE_URL = "http://localhost:3000/calendar";

const apiService = {};

apiService.getList = () => {
  return fetch(BASE_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      throw error;
    });
};

export default apiService;
