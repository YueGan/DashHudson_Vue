import axios from "axios";

export default {
    async getPeople({ commit }) {
        const response = await axios.get("http://localhost:5000/people");

        const people = response.data;
        commit("people", people);
    },
    async getConnections({ commit }) {
        const response = await axios.get("http://localhost:5000/connections");

        const connections = response.data;
        commit("connections", connections);
    },

    async addPeople(state, [first_name, last_name, email]) {
        await axios.post("http://localhost:5000/people", {
            first_name,
            last_name,
            email
        });

        this.$store.dispatch("getPeople");
    },

    async addConnections(
        state,
        [from_person_id, to_person_id, connection_type]
    ) {
        await axios.post("http://localhost:5000/connections", {
            from_person_id,
            to_person_id,
            connection_type
        });

        this.$store.dispatch("getConnections");
    }
}