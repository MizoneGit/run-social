<template>
  <form action="" ref="formParticipants" class="v-form" @submit.prevent="submitHandler">
    <v-input
      v-model="form.name"
      label-text="ФИО"
      type="text"
      name="name"
      :isError="v$.form.name.$invalid && v$.form.name.$error"
      :errorMessage="v$.form.name?.$errors[0]?.$message"
      @blur="v$.form.name.$touch"
    />
    <v-input
      v-model="form.date"
      label-text="Дата рождения"
      type="date"
      name="date"
      :max="maxBirthdate"
      :isError="v$.form.date.$invalid && v$.form.date.$error"
      :errorMessage="v$.form.date?.$errors[0]?.$message"
      @blur="v$.form.date.$touch"
    />
    <v-input
      v-model="form.email"
      label-text="Email"
      type="email"
      name="email"
      :isError="v$.form.email.$invalid && v$.form.email.$error"
      :errorMessage="v$.form.email?.$errors[0]?.$message"
      @blur="v$.form.email.$touch"
    />
    <v-input
      v-model="form.phone"
      label-text="Телефон"
      type="text"
      name="phone"
      mask="+7 ### ### ## ##"
      :isError="v$.form.phone.$invalid && v$.form.phone.$error"
      :errorMessage="v$.form.phone?.$errors[0]?.$message"
      @blur="v$.form.phone.$touch"
    />
    <v-select
      v-model="form.distance"
      label-text="Дистанция"
      :options="optionsDistance"
      name="distance"
      :isError="v$.form.distance.$invalid && v$.form.distance.$error"
      :errorMessage="v$.form.distance?.$errors[0]?.$message"
      @blur="v$.form.distance.$touch"
    />
    <v-input
      v-model="form.payment"
      label-text="Сумма взноса"
      type="text"
      name="payment"
      :isError="v$.form.payment.$invalid && v$.form.payment.$error"
      :errorMessage="v$.form.payment?.$errors[0]?.$message"
      @blur="v$.form.payment.$touch"
    />
    <v-checkbox
      v-if="!settingsForm.disableCheckbox"
      v-model="form.isCreateProfile"
      label-text="Согласие на создание профиля "
      name="createProfile"
    />
    <v-button :disabled="isReadySendFormData" :text="settingsForm.buttonText" type="submit" />
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import {
  required,
  email,
  helpers,
  minLength,
  maxLength,
  maxValue,
  minValue,
  numeric
} from '@vuelidate/validators'

export default {
  name: 'VFormRun',
  props: {
    participant: {
      type: Object,
      default: () => ({
        name: '',
        date: new Date().toISOString().substr(0, 10),
        email: '',
        phone: '',
        distance: '',
        payment: '',
        isCreateProfile: false
      })
    },
    settingsForm: {
      type: Object,
      default: () => ({
        buttonText: 'Отправить',
        disableCheckbox: false
      })
    }
  },
  data() {
    return {
      v$: useVuelidate(),
      maxBirthdate: this.getMaxBirthdate(),
      optionsDistance: [
        { value: 3, text: '3 км' },
        { value: 5, text: '5 км' },
        { value: 10, text: '10 км' }
      ],
      form: { ...this.participant }
    }
  },
  validations() {
    return {
      form: {
        name: {
          required: helpers.withMessage('Поле обязательно для заполнения', required),
          minLength: helpers.withMessage(
            'Отображаемое имя должно быть больше 3 символов',
            minLength(4)
          ),
          maxLength: helpers.withMessage(
            'Отображаемое имя должно быть меньше 34 символов',
            maxLength(34)
          )
        },
        date: {
          required: helpers.withMessage('Поле обязательно для заполнения', required)
        },
        email: {
          required: helpers.withMessage('Поле обязательно для заполнения', required),
          email: helpers.withMessage('Email введён некорректно', email)
        },
        phone: {
          required: helpers.withMessage('Поле обязательно для заполнения', required)
        },
        distance: {
          required: helpers.withMessage('Поле обязательно для заполнения', required)
        },
        payment: {
          required: helpers.withMessage('Поле обязательно для заполнения', required),
          numeric: helpers.withMessage('Поле должно быть числовым', numeric),
          minLength: helpers.withMessage('Поле должено быть больше 100руб.', minValue(100)),
          maxLength: helpers.withMessage(
            'Поле должено быть меньше или равно 10 000руб.',
            maxValue(10000)
          )
        }
      }
    }
  },
  computed: {
    isReadySendFormData() {
      return Object.keys(this.v$.form).some(
        (key) => this.v$.form[key].$invalid && this.v$.form[key].$error
      )
    }
  },
  methods: {
    submitHandler() {
      if (this.v$.form.$invalid) {
        this.v$.form.$touch()
        this.$emit('error', 'Не все поля заполнены верно!')
        return
      }

      this.$emit('success', this.form)
    },
    resetForm() {
      this.form = {
        name: '',
        date: '',
        email: '',
        phone: '',
        distance: '',
        payment: '',
        isCreateProfile: false
      }
      this.v$.form.$reset()
    },
    getMaxBirthdate() {
      const today = new Date()
      const maxBirthdate = new Date(today.getFullYear() - 14, today.getMonth(), today.getDate() + 5)
      return maxBirthdate.toISOString().substr(0, 10)
    }
  }
}
</script>

<style scoped lang="scss">
.v-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  border: 1px solid var(--neutral-dark-gray-background-color);
  border-radius: 12px;
}
</style>
