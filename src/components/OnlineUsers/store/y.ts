import { Doc } from "yjs";
import { WebsocketProvider } from "y-websocket";
import { create } from "zustand";
import { User } from "../types";
import { createAnonymousUser } from "../utils/createAnonymousUser";

export const doc = new Doc();

export const provider = new WebsocketProvider(
    "wss://demos.yjs.dev",
    "y-presence-example",
    doc,
    { connect: true }
);

export const awareness = provider.awareness;

type UserState = {
    users: User[];
}

type UserStore = UserState;

export const useUserStore = create<UserStore>(() => ({
    users: [createAnonymousUser()]
}))