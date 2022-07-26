import { Alert } from "react-native";
import { axiosPost } from "../axiosHelper";
import { FARMER_RECORD } from "./actionType";

export function CreateFarmerRecord(post) {
  return (dispatch) => {
    return axiosPost(
      { url: "/farmer/record/create", reqBody: post },
      (response) => {
        console.log(response.data.message);
        dispatch({
          type: FARMER_RECORD,
          [FARMER_RECORD]: response.data,
        });
        if (response.data?.status === true) {
          Alert.alert('Success',response.data.message, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
        if (response.data?.status === false) {
          errorNotification(response.data?.message);
        }
      }
    );
  };
}
