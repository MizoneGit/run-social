import generateGuid from "@/utils/generateGuid";

export const AuthModule = {
    namespaced: true,
    state: () => ({
        isAuth: false,
        userGuid: generateGuid()
    }),
    getters: {
        getAuth(state) {
            return state.isAuth;
        },
        getUserGuid(state) {
            return state.userGuid;
        }
    },
    mutations: {
        setAuth(state, bool) {
            state.isAuth = bool;
        },
        setUserGuid(state, guid) {
            state.userGuid = guid;
        }
    },
    actions: {
        async registerUser({ getters , commit, dispatch }, { email, password }) {
            try {
                const users = await dispatch('getUsersLocalStorage') || [];

                const candidate = users?.find(u => u.email === email);

                if (candidate) {
                    throw Error('Такой пользователь уже зарегистрирован');
                }

                const user = { guid: getters.getUserGuid, email, password };
                users.push(user)

                localStorage.setItem('users', JSON.stringify(users));
                commit('setAuth', true);
                return { status: 'Success' };
            } catch (e) {
                return { status: 'Error', message: e.message };
            }
        },
        async loginUser({ commit, dispatch }, { email, password }) {
            try {
                const users = await dispatch('getUsersLocalStorage') || [];

                const candidate = users?.find(u => u.email === email);

                if (!candidate) {
                    throw new Error('Такой пользователь не зарегистрирован');
                }

                if (candidate.password !== password) {
                    throw new Error('Пароль введен не верно');
                }

                commit('setUserGuid', candidate.guid);
                commit('setAuth', true);
                return { status: 'Success' };
            } catch (e) {
                return { status: 'Error', message: e.message };
            }

        },
        getUserLocalStorage({ dispatch }, email) {
            const users = dispatch('getUsersLocalStorage');
            const candidate = users.find(u => u.email === email);

            return candidate ?? false;
        },
        async getUsersLocalStorage() {
            return JSON.parse(localStorage.getItem('users'));
        }
    }
}