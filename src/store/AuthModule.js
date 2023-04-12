import generateGuid from "@/utils/generateGuid";

export const AuthModule = {
    namespaced: true,
    state: () => ({
        isAuth: false,
        userGuid: generateGuid()
    }),
    getters: {

    },
    mutations: {

    },
    actions: {

    }
}