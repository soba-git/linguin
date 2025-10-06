import {create} from "zustand";

type PracticeModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const usePracticeModal = create<PracticeModalState>((set)=> ({
    isOpen: false, // start closed
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));