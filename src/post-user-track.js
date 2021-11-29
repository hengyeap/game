import axios from "axios";

export default function postUserTrack(json) {
  axios.post("https://da.tingmimi.net/user-track/receive/", json);
}
