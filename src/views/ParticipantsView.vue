<template>
  <div>
    <easy-data-table
        :headers="headers"
        :items="participants"
        sort-by="date"
        sort-type="desc"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "ParticipantsView",
  components: { EasyDataTable: window['vue3-easy-data-table'] },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      participants: 'participants/getParticipants',
      headers: 'participants/getHeaders'
    })
  },
  methods: {
    ...mapActions({
      loadDefaultParticipants: "participants/loadDefaultParticipants"
    }),
    ...mapMutations({
      addParticipants: 'participants/addParticipants'
    })
  }
}
</script>

<style scoped>

</style>