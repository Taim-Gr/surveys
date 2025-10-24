import { useAuthStore } from "../store/authStore";

export const apiCall = async (url, options = {}) => {
  const { getAuthHeaders } = useAuthStore.getState();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status}`);
  }

  return response.json();
};

export const fetchUserData = async () => {
  try {
    const data = await apiCall(
      "https://poll-rs4it-test.rs-developing.com/api/user/"
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};

export const submitSurvey = async (surveyData) => {
  try {
    const data = await apiCall(
      "https://poll-rs4it-test.rs-developing.com/api/surveys/",
      {
        method: "POST",
        body: JSON.stringify(surveyData),
      }
    );
    return data;
  } catch (error) {
    console.error("Failed to submit survey:", error);
    throw error;
  }
};
