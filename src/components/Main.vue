<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <h1>Connections</h1>
    <ul id="connections">
      <li v-for="connection in connections" v-bind:key="connection">
        {{ connection.from_person }}
        From Person: {{ people.filter(person => person.id == connection.from_person)[0].first_name }}
        To Person: {{ people.filter(person => person.id == connection.to_person)[0].first_name }}
        Connection Type: {{ connection.connection_type }}
      </li>
    </ul>

    <h1>Add Connection</h1>
    <form id="app" v-on:submit.prevent="addConnections(connections_form)">
      <p>
        <label for="from_person_id">From Person ID</label>
        <input
          id="from_person_id"
          v-model="connections_form.from_person_id"
          type="number"
          name="from_person_id"
        />
      </p>

      <p>
        <label for="to_person_id">To Person ID</label>
        <input
          id="to_person_id"
          v-model="connections_form.to_person_id"
          type="number"
          name="to_person_id"
        />
      </p>

      <p>
        <label for="connection_type">Connection Type</label>
        <select
          id="connection_type"
          v-model="connections_form.connection_type"
          name="connection_type"
        >
          <option
            v-for="connection_type in connection_types"
            v-bind:key="connection_type"
          >{{ connection_type}}</option>
        </select>
      </p>

      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>

    <h1>People</h1>
    <ul id="people">
      <li v-for="person in people" v-bind:key="person">
        ID: {{ person.id }}
        Name: {{ person.first_name }}, {{ person.last_name }}
        Email: {{ person.email }}
      </li>
    </ul>

    <h1>Add Person</h1>
    <form v-on:submit.prevent="addPerson(people_form)">
      <p>
        <label for="first_name">First Name</label>
        <input id="first_name" v-model="people_form.first_name" type="text" name="first_name" />
      </p>

      <p>
        <label for="last_name">Last Name</label>
        <input id="first_name" v-model="people_form.last_name" type="text" name="first_name" />
      </p>

      <p>
        <label for="email">Email</label>
        <input id="email" v-model="people_form.email" type="text" name="email" />
      </p>

      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
    connections: [],
    people: []
  },
  data: function() {
    return {
      connection_types: [
        "mother",
        "father",
        "son",
        "daughter",
        "husband",
        "wife",
        "brother",
        "sister",
        "friend",
        "coworker"
      ],
      people_form: {
        first_name: "",
        last_name: "",
        email: ""
      },
      connections_form: {
        from_person_id: "",
        to_person_id: "",
        relationship: ""
      }
    };
  },

  created() {
    this.updatePeople().then(() => {
      this.updateConnections();
    });
  },

  methods: {
    getPeople() {
      return axios.get("http://localhost:5000/people");
    },

    getConnections() {
      return axios.get("http://localhost:5000/connections");
    },

    updatePeople() {
      var session = this.getPeople().then(result => {
        this.people = result.data;
      });
      return session;
    },

    updateConnections() {
      var session = this.getConnections().then(result => {
        this.connections = result.data;
      });
      return session;
    },
    addPerson(data) {
      let first_name = data.first_name;
      let last_name = data.last_name;
      let email = data.email;

      axios
        .post("http://localhost:5000/people", {
          first_name,
          last_name,
          email
        })
        .then(() => {
          this.updatePeople();
        })
        .catch(function(error) {
          alert(error);
        });
    },

    addConnections(data) {
      let from_person_id = data.from_person_id;
      let to_person_id = data.to_person_id;
      let connection_type = data.connection_type;

      axios
        .post("http://localhost:5000/connections", {
          from_person_id,
          to_person_id,
          connection_type
        })
        .then(() => {
          this.updateConnections();
        })
        .catch(function(error) {
          alert(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
