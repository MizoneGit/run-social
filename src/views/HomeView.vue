<template>
  <main>
    <VFormRun
        v-if="!stepAuth"
        @error="showErrorNotification"
        @success="formRunSuccessHandler"
        @reset="formRunResetHandler"
        :participant="formRun"
        :settings-form="{ buttonText: 'Отправить заявку' }"
        ref="VFormRun"
    />
    <form-auth
        v-else
        :form-object="formAuth"
        :settings-form="{ readOnlyFields: { email: true, password: false }, buttonText: 'Зарегистрироваться' }"
        @success="formAuthSuccessHandler"
        @error="showErrorNotification"
    />
  </main>
</template>

<script>
import { useToast } from "vue-toastification";
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers, minLength, maxLength, maxValue, minValue, numeric } from '@vuelidate/validators';
import { mapMutations } from "vuex";
import FormAuth from "@/components/formAuth.vue";
import VFormRun from "@/components/VFormRun.vue";

export default {
  name: 'HomeView',
  components: {VFormRun, FormAuth },
  data() {
    return {
      v$: useVuelidate(),
      optionsDistance: [
        { value: 3, text: '3 км' },
        { value: 5, text: '5 км' },
        { value: 10, text: '10 км' },
      ],
      formAuth: {
        email: '',
        password: ''
      },
      formRun: {
        name: '',
        date: '',
        email: '',
        phone: '',
        distance: '',
        payment: '',
        isCreateProfile: false
      },
      toast: useToast(),
      stepAuth: false
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
      return Object.keys(this.v$.form).some(key => this.v$.form[key].$invalid && this.v$.form[key].$error);
    }
  },
  methods: {
    ...mapMutations({
      addParticipants: 'participants/addParticipants'
    }),
    formRunSuccessHandler(formData) {
      this.formAuth.email = formData.email;
      this.formRun = formData;
      this.addParticipants(formData);
      this.showSuccessNotification('Вы успешно зарегистрировались в забеге!');
      if (formData.isCreateProfile) {
        this.stepAuth = true;
      }
      this.$refs.VFormRun.resetForm();
    },
    formRunResetHandler() {
      this.formRun = { name: '', date: '', email: '', phone: '', distance: '', payment: '', isCreateProfile: false };
    },

    formAuthSuccessHandler(formData) {
      console.log(formData)
      //TODO создать AuthModule В store и добавлять пользователей в localStorage для будущей авторизации через страницу profile
    },

    showErrorNotification(message) {
      this.toast.error(message);
    },
    showSuccessNotification(message) {
      this.toast.success(message);
    },
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
