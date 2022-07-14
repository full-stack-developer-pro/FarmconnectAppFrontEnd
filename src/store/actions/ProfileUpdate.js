import { axiosPost } from "../axiosHelper";

import { USER_UPDATE_PROFILE } from "./actionType";
import { Alert } from "react-native";
export function ProfileUpdate(post) {
    return (dispatch) => {
      return axiosPost(
        { url: "/user/profile/update", reqBody: post },
        (response) => {
         
          dispatch({
            type: USER_UPDATE_PROFILE,
            [USER_UPDATE_PROFILE]: response.data,
          });
        }
      );
    };
  }
  