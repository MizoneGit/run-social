import axios from "axios";

export default class ParticipantsService {
    static async getParticipants() {
        return axios.get('/static/users.json');
    }
}