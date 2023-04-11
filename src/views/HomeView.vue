<template>
  <main>
    <form action="" ref="formParticipants" class="v-form" @submit.prevent="submitHandler">
      <v-input v-model="form.name"
               label-text="ФИО"
               type="text"
               name="fio"
               :isError="v$.form.name.$invalid && v$.form.name.$error"
               :errorMessage="v$.form.name?.$errors[0]?.$message"
               @blur="v$.form.name.$touch"
      />
      <v-input v-model="form.date"
               label-text="Дата рождения"
               type="date"
               name="date"
               :isError="v$.form.date.$invalid && v$.form.date.$error"
               :errorMessage="v$.form.date?.$errors[0]?.$message"
               @blur="v$.form.date.$touch"
      />
      <v-input v-model="form.email"
               label-text="Email"
               type="email"
               name="email"
               :isError="v$.form.email.$invalid && v$.form.email.$error"
               :errorMessage="v$.form.email?.$errors[0]?.$message"
               @blur="v$.form.email.$touch"
      />
      <v-input v-model="form.phone"
               label-text="Телефон"
               type="text"
               name="phone"
               :isError="v$.form.phone.$invalid && v$.form.phone.$error"
               :errorMessage="v$.form.phone?.$errors[0]?.$message"
               @blur="v$.form.phone.$touch"
      />
      <v-select v-model="form.distance"
                label-text="Дистанция"
                :options="optionsDistance"
                name="distance"
                :isError="v$.form.distance.$invalid && v$.form.distance.$error"
                :errorMessage="v$.form.distance?.$errors[0]?.$message"
                @blur="v$.form.distance.$touch"
      />
      <v-input v-model="form.payment"
               label-text="Сумма взноса"
               type="text"
               name="payment"
               :isError="v$.form.payment.$invalid && v$.form.payment.$error"
               :errorMessage="v$.form.payment?.$errors[0]?.$message"
               @blur="v$.form.payment.$touch"
      />
      <v-checkbox
          v-model="isCreateProfile"
          label-text="Согласие на создание профиля "
          name="createProfile"
      />
      <v-button :disabled="isReadySendFormData"
                text="Отправить заявку"
                type="submit"
      />
    </form>
  </main>
</template>

<script>
import { useToast } from "vue-toastification";
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers, minLength, maxLength, maxValue, minValue, numeric } from '@vuelidate/validators';
import { mapMutations } from "vuex";
import VCheckbox from "@/components/UI/VCheckbox.vue";

export default {
  name: 'HomeView',
  components: {VCheckbox},
  data() {
    return {
      v$: useVuelidate(),
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
      isCreateProfile: false,
      toast: useToast()
    }
  },
  validations () {
    return {
      form: {
        name: {
          required: helpers.withMessage('Поле обязательно для заполнения', required),
          minLength: helpers.withMessage('Отображаемое имя должно быть больше 3 символов', minLength(4)),
          maxLength: helpers.withMessage('Отображаемое имя должно быть меньше 34 символов', maxLength(34)),
        },
        date: {
          required: helpers.withMessage('Поле обязательно для заполнения', required),
        },
        email: {
          required: helpers.withMessage('Поле обязательно для заполнения', required),
          email: helpers.withMessage('Email введён некорректно', email)
        },
        phone: {
          required: helpers.withMessage('Поле обязательно для заполнения', required),
        },
        distance: {
          required: helpers.withMessage('Поле обязательно для заполнения', required),
        },
        payment: {
          required: helpers.withMessage('Поле обязательно для заполнения', required),
          numeric: helpers.withMessage('Поле должно быть числовым', numeric),
          minLength: helpers.withMessage('Поле должено быть больше 100руб.', minValue(100)),
          maxLength: helpers.withMessage('Поле должено быть меньше или равно 10 000руб.', maxValue(10000)),
        },
      }
    }
  },
  computed: {
    isReadySendFormData() {
      return this.v$.form.name.$invalid && this.v$.form.name.$error
          || this.v$.form.email.$invalid && this.v$.form.email.$error
          || this.v$.form.payment.$invalid && this.v$.form.payment.$error
          || this.v$.form.distance.$invalid && this.v$.form.distance.$error
          || this.v$.form.phone.$invalid && this.v$.form.phone.$error
          || this.v$.form.date.$invalid && this.v$.form.date.$error;
    }
  },
  methods: {
    ...mapMutations({
      addParticipants: 'participants/addParticipants'
    }),
    submitHandler() {
      if (this.v$.form.$invalid) {
        this.v$.form.$touch();
        this.showErrorNotification('Не все поля заполнены верно!')
        return;
      }

      this.addParticipants(this.form);
      this.showSuccessNotification('Вы успешно зарегистрировались в забеге!');
      this.resetParticipantsForm();
    },
    resetParticipantsForm() {
      this.$refs.formParticipants.reset();
    },
    showErrorNotification(message) {
      this.toast.error(message);
    },
    showSuccessNotification(message) {
      this.toast.success(message);
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
