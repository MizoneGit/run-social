<template>
  <div class="profile">
    <h1>This is an profile page</h1>
    <v-form-auth
        v-if="!isAuth"
        :form-object="formAuth"
        :settings-form="{ readOnlyFields: { email: false, password: false }, buttonText: 'Войти' }"
        @success="formAuthSuccessHandler"
        @error="showErrorNotification"
    />
    <v-form-run v-else/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import VFormAuth from "@/components/VFormAuth.vue";
import VFormRun from "@/components/VFormRun.vue";
import { useToast } from "vue-toastification";

  export default {
    name: 'ProfileView',
    components: { VFormRun, VFormAuth },
    data() {
      return {
        toast: useToast(),
        formAuth: {
          email: '',
          password: ''
        },
      }
    },
    computed: {
      ...mapGetters({
        isAuth: 'auth/getAuth'
      }),
      ...mapState({
        isAuth: state => state.auth.isAuth
      }),
    },
    methods: {
      ...mapActions({
        loginUser: 'auth/loginUser'
      }),
      formAuthSuccessHandler(formData) {
        const res = this.loginUser(formData);
        if (res.status === 'Error') {
          this.showErrorNotification(res.message);
        } else {
          this.showSuccessNotification('Вы успешно авторизовались');
        }
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

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
