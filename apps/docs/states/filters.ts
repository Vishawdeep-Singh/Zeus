import { atom } from "recoil";

export const GymFilterState = atom<string | null>({
    key:"gymFilter",
    default:null
})