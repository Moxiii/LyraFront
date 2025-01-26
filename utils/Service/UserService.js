import {fetchUserData, uploadProfilePic} from "../Fetchs/userFetchs";
import {fetchUserProject} from "../Fetchs/projetFetch";
import {fetchUserTodo} from "../Fetchs/todoFetchs";
import {fetchUserCalendar} from "../Fetchs/calendarFetchs";
import {fetchUserContact} from "../Fetchs/ContactFetch";
import {fetchUserConversation} from "../Fetchs/ConversationFetch";

export const userService = {
    loadUserData: async () => {
        const data = await fetchUserData();
        return {
            ...data,
            profileImage: data.profileImage
                ? `data:image/png;base64,${data.profileImage}`
                : require("../../assets/img/ppplaceholder.png"),
        };
    },
    loadUserTodos: fetchUserTodo,
    loadUserProjects: fetchUserProject,
    loadUserCalendar: fetchUserCalendar,
    loadUserContact: fetchUserContact,
    loadUserConversation: fetchUserConversation,
    uploadProfilePic,
};
