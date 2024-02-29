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
apiService.addEvent = async (eventData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    if (!res.ok) {
      throw new Error("bad response");
    }
    // setEventList(prev => {[...prev, response.json()]});
    return await res.json(); //??
  } catch (error) {
    throw new Error(error);
  }
};
export default apiService;
