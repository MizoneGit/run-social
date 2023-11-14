<template>
  <div class="profile">
    <v-form-auth
      v-if="!isAuth"
      :form-object="formAuth"
      :settings-form="{
        readOnlyFields: { email: false, password: false },
        buttonText: 'Войти'
      }"
      @success="formAuthSuccessHandler"
      @error="showErrorNotification"
      ref="VFormAuth"
    />
    <v-form-run
      v-else-if="isAuth && !isLoading"
      :participant="formRun"
      :settings-form="{ buttonText: 'Сохранить', disableCheckbox: true }"
      @success="formRunSuccessHandler"
      @error="showErrorNotification"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import VFormAuth from '@/components/VFormAuth.vue'
import VFormRun from '@/components/VFormRun.vue'
import { useToast } from 'vue-toastification'

export default {
  name: 'ProfileView',
  components: { VFormRun, VFormAuth },
  data() {
    return {
      toast: useToast(),
      isLoading: false,
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
      }
    }
  },
  computed: {
    ...mapGetters({
      isAuth: 'auth/getAuth'
    }),
    ...mapState({
      isAuth: (state) => state.auth.isAuth
    })
  },
  methods: {
    ...mapActions({
      loginUser: 'auth/loginUser',
      editParticipant: 'participants/editParticipant',
      getUserParticipant: 'participants/getUserParticipant'
    }),
    async formAuthSuccessHandler(formData) {
      const res = await this.loginUser(formData)
      if (res.status === 'Error') {
        const errors = res.data?.errors
        errors?.forEach((error) => {
          this.$refs.VFormAuth.vuelidateExternalResults.form[error.param] = error.msg
        })
        this.showErrorNotification('Не все поля заполнены верно!')
      } else {
        await this.fetchParticipant()
        this.showSuccessNotification('Вы успешно авторизовались!')
      }
    },
    async formRunSuccessHandler(formData) {
      const res = await this.editParticipant(formData)
      if (res.status === 'Error') {
        this.showErrorNotification(res.message)
      } else {
        this.showSuccessNotification('Вы успешно изменили данные заявки!')
      }
    },
    showErrorNotification(message) {
      this.toast.error(message)
    },
    showSuccessNotification(message) {
      this.toast.success(message)
    },
    async fetchParticipant() {
      this.isLoading = true
      this.formRun = await this.getUserParticipant()
      this.isLoading = false
    }
  },
  mounted() {
    if (this.isAuth) {
      this.fetchParticipant()
    }
  }
}
</script>

<style></style>
