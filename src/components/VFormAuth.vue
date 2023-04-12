<template>
  <form class="v-form-auth" action="" @submit.prevent="submitHandler">
    <v-input
        v-model="form.email"
        name="email"
        type="email"
        label-text="Email"
        :readonly="settingsForm.readOnlyFields.email"
        :isError="v$.form.email.$invalid && v$.form.email.$error"
        :errorMessage="v$.form.email?.$errors[0]?.$message"
        @blur="v$.form.email.$touch"
    />
    <v-input
        v-model="form.password"
        type="password"
        label-text="Пароль"
        :readonly="settingsForm.readOnlyFields.password"
        :isError="v$.form.password.$invalid && v$.form.password.$error"
        :errorMessage="v$.form.password?.$errors[0]?.$message"
        @blur="v$.form.password.$touch"
    />
    <v-button :text="settingsForm.buttonText" :disabled="isReadyFormData"/>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers, minLength, maxLength } from '@vuelidate/validators';

export default {
  name: 'VFormAuth',
  props: {
    formObject: {
      type: Object,
      default: () => ({ email: '', password: '' })
    },
    settingsForm: {
      type: Object,
      default: () => (
          {
            readOnlyFields: {
              email: false,
              password: false
            },
            buttonText: 'Отправить'
          }
      )
    }
  },
  data() {
    return {
      v$: useVuelidate(),
      form: { ...this.formObject }
    }
  },
  validations () {
    return {
      form: {
        email: {
          required: helpers.withMessage('Поле обязательно для заполнения', required),
          email: helpers.withMessage('Email введён некорректно', email)
        },
        password: {
          required: helpers.withMessage('Поле обязательно для заполнения', required),
          minLength: helpers.withMessage('Поле должно быть больше 2 символов ', minLength(3)),
          maxLength: helpers.withMessage('Поле должно быть меньше или равно 10 символам', maxLength(10)),
        },
      }
    }
  },
  computed: {
    isReadyFormData() {
      return Object.keys(this.v$.form).some(key => this.v$.form[key].$invalid && this.v$.form[key].$error);
    }
  },
  methods: {
    submitHandler() {
      if (this.v$.form.$invalid) {
        this.v$.form.$touch();
        this.$emit('error', 'Не все поля заполнены верно!');
        return;
      }

      this.$emit('success', this.form);
    }
  }
}
</script>

<style scoped lang="scss">
  .v-form-auth {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px;
    border: 1px solid var(--neutral-dark-gray-background-color);
    border-radius: 12px;
  }
</style>