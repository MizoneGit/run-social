<template>
  <main>
    <form action="" ref="formParticipants" class="v-form" @submit.prevent="submitHandler">
      <v-input v-model="form.name"
               label-text="ФИО"
               type="text"
               name="fio"
      />
      <v-input v-model="form.date"
               label-text="Дата рождения"
               type="date"
               name="date"
      />
      <v-input v-model="form.email"
               label-text="Email"
               type="email"
               name="email"
      />
      <v-input v-model="form.phone"
               label-text="Телефон"
               type="text"
               name="phone"
      />
      <v-select v-model="form.distance"
                label-text="Дистанция"
                :options="optionsDistance"
                name="distance"
      />
      <v-input v-model="form.payment"
               label-text="Сумма взноса"
               type="text"
               name="payment"
      />
      <v-button text="Отправить заявку" type="submit"/>
    </form>
  </main>
</template>

<script>
import { useToast } from "vue-toastification";
import { mapMutations } from "vuex";

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      optionsDistance: [
        { value: 3, text: '3 км' },
        { value: 5, text: '5 км' },
        { value: 10, text: '10 км' },
      ],
      form: {
        name: '',
        date: '',
        email: '',
        phone: '',
        distance: '',
        payment: '',
      },
      toast: useToast()
    }
  },
  methods: {
    ...mapMutations({
      addParticipants: 'participants/addParticipants'
    }),
    submitHandler() {
      this.addParticipants(this.form);
      this.toast.success('Вы успешно зарегистрировались в забеге!');
      this.resetParticipantsForm();
    },
    resetParticipantsForm() {
      this.$refs.formParticipants.reset();
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px;
    border: 1px solid var(--neutral-dark-gray-background-color);
    border-radius: 12px;
  }
</style>
