import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "New post", likesCount: 12 },
        { id: 2, message: "it is my first post", likesCount: 11 },
      ],
      newPostText: "Текст из стейта по дефолту",
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Ivan" },
        { id: 2, name: "Inna" },
        { id: 3, name: "Sveta" },
        { id: 4, name: "Igor" },
        { id: 5, name: "Artem" },
      ],
      messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "I love you Inna" },
        { id: 3, message: "Year boy" },
        { id: 4, message: "Hello" },
        { id: 5, message: "Salam" },
      ],
      newMessageBody: "bro",
    },
    sidebar: {},
  },
  _callSubscriber() {
    console.log("State changed");
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  },
};

export default store;
