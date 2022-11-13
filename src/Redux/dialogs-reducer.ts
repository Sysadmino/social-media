import { InferActionsTypes } from "./redux-store";

export type DialogType = {
  id: number;
  name: string;
};

export type MessageType = {
  id: number;
  message: string;
};

export type InitialStateType = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
};

let initialState: InitialStateType = {
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
};

type ActionsTypes = InferActionsTypes<typeof actions>;

const dialogsReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "social-network/dialogsPage/SEND_MESSAGE": {
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: 6,
            message: action.newMessageBody,
          },
        ],
      };
    }
    default:
      return state;
  }
};

export const actions = {
  sendMessage: (newMessageBody: string) =>
    ({
      type: "social-network/dialogsPage/SEND_MESSAGE",
      newMessageBody,
    } as const),
};

export default dialogsReducer;
