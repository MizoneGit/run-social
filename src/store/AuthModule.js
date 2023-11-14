import generateGuid from '@/utils/generateGuid'
import CustomError from '@/utils/CustomError'

export const AuthModule = {
  namespaced: true,
  state: () => ({
    isAuth: false,
    userGuid: generateGuid()
  }),
  getters: {
    getAuth(state) {
      return state.isAuth
    },
    getUserGuid(state) {
      return state.userGuid
    }
  },
  mutations: {
    setAuth(state, bool) {
      state.isAuth = bool
    },
    setUserGuid(state, guid) {
      state.userGuid = guid
    }
  },
  actions: {
    async registerUser({ getters, commit, dispatch }, { email, password }) {
      try {
        const users = (await dispatch('getUsersLocalStorage')) || []

        const candidate = users?.find((u) => u.email === email)

        if (candidate) {
          throw CustomError.BadRequest('Ошибка регистрации', [
            {
              value: email,
              msg: 'Пользователь с таким email уже зарегистрирован!',
              param: 'email'
            }
          ])
        }

        const user = { guid: getters.getUserGuid, email, password }
        users.push(user)

        localStorage.setItem('users', JSON.stringify(users))
        commit('setAuth', true)
        return { status: 'Success' }
      } catch (error) {
        return { status: 'Error', data: error }
      }
    },
    async loginUser({ commit, dispatch }, { email, password }) {
      try {
        const users = (await dispatch('getUsersLocalStorage')) || []

        const candidate = users?.find((u) => u.email === email)

        if (!candidate) {
          throw CustomError.BadRequest('Ошибка авторизации', [
            {
              value: email,
              msg: 'Такой пользователь не зарегистрирован!',
              param: 'email'
            }
          ])
        }

        if (candidate.password !== password) {
          throw CustomError.BadRequest('Ошибка авторизации', [
            {
              value: password,
              msg: 'Пароль введен не верно!',
              param: 'password'
            }
          ])
        }

        commit('setUserGuid', candidate.guid)
        commit('setAuth', true)
        return { status: 'Success' }
      } catch (error) {
        return { status: 'Error', data: error }
      }
    },
    async getUserLocalStorage({ dispatch }, email) {
      const users = await dispatch('getUsersLocalStorage')
      const candidate = users.find((u) => u.email === email)

      return candidate ?? false
    },
    async getUsersLocalStorage() {
      return JSON.parse(localStorage.getItem('users'))
    }
  }
}
