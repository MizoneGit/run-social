import { createStore } from 'vuex';
import { ParticipantsModule } from "@/store/ParticipantsModule";
import { AuthModule } from "@/store/AuthModule";
export default createStore({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        participants: ParticipantsModule,
        auth: AuthModule
    }
})
