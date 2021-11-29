import axios from 'axios';

export default {
  methods: {
    postUserTrack(json) {
      axios.post('https://da.tingmimi.net/user-track/receive/', json);
    }
  }
}
