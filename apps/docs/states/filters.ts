import { atom } from "recoil";
import { DateRange } from "react-day-picker";
export const GymFilterState = atom<string | null>({
    key:"gymFilter",
    default:null
})

export const dateRange = atom<DateRange | undefined>({
    key:"dateRange", 
    default:undefined
});