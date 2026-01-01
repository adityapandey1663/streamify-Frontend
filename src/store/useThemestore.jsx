import {create} from 'zustand'

export const useThemestore = create((set)=>({

    theme: "coffee",
    setTheme: (theme)=> set({theme})
}))