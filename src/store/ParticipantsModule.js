import ParticipantsService from "@/service/ParticipantsService";

export const ParticipantsModule = {
    namespaced: true,
    state: () => ({
        participants: [],
        headers: [
            { text: "ФИО", value: "name", sortable: true },
            { text: "Дата создания заявки", value: "date", sortable: true },
            { text: "Email", value: "email", sortable: true },
            { text: "Дистанция", value: "distance", sortable: true },
            { text: "Сумма взноса", value: "payment", sortable: true },
        ]
    }),
    getters: {
        getParticipants(store) {
            return store.participants;
        },
        getHeaders(store) {
            return store.headers;
        }
    },
    mutations: {
        setParticipants(state, array) {
            state.participants = array;
            localStorage.setItem('participants', JSON.stringify(array));
        },
        addParticipants(state, participant) {
            state.participants.push(participant);
            localStorage.setItem('participants', JSON.stringify(state.participants));
        },

    },
    actions: {
        async loadDefaultParticipants({ commit, dispatch }) {
            try {
                const participants = await dispatch('getParticipantsFromLocalStorage');

                if (participants?.length) {
                    commit('setParticipants', participants);
                    return participants;
                }

                const response = await ParticipantsService.getParticipants();
                const users = response.data.users;
                commit('setParticipants', users);
            } catch (error) {
                console.error(error);
            }
        },
        async editParticipant({ commit, getters }, data) {
            try {
                const participants = getters.getParticipants;

                const indexParticipant = participants?.findIndex((p) => p.guid === data.guid);
                if (!indexParticipant) {
                    throw new Error('Произошла ошибка поиска заявки');
                }

                participants[indexParticipant] = data;
                commit('setParticipants', participants);
                return { status: 'Success' }
            } catch (e) {
                return { status: 'Error', message: e.message };
            }
        },
        async getParticipantsFromLocalStorage() {
            const participants = await JSON.parse(localStorage.getItem('participants'));
            return participants || [];
        },
        getUserParticipant({ state, rootGetters }) {
            const participants = state.participants;
            return participants?.find(p => p.guid === rootGetters['auth/getUserGuid']) || {};
        }
    }
}