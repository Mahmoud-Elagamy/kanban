import { create } from "zustand";
import { produce } from "immer";
import isEqual from "fast-deep-equal";
import { BoardState, BoardStoreState } from "@/lib/types/stores/board";

const initialState: BoardState = {
  boards: {},
  activeBoardId: null,
};
const useBoardStore = create<BoardStoreState>((set) => ({
  ...initialState,

  setBoards: (boards) => {
    set((state) => {
      const updatedBoards = {
        ...state.boards,
        ...(typeof boards === "function" ? boards(state.boards) : boards),
      };

      if (isEqual(state.boards, updatedBoards)) return state;

      return { boards: updatedBoards };
    });
  },

  setActiveBoardId: (boardId) => set({ activeBoardId: boardId }),

  createBoard: (board) => {
    set(
      produce((state: BoardState) => {
        state.boards[board.id] = board;
        state.activeBoardId = board.id;
      }),
    );
  },

  updateBoard: (boardId, updates) => {
    set(
      produce((state: BoardState) => {
        if (state.boards[boardId]) {
          Object.assign(state.boards[boardId], updates);
        }
      }),
    );
  },

  deleteBoard: (boardId) => {
    set(
      produce((state: BoardState) => {
        delete state.boards[boardId];
        if (state.activeBoardId === boardId) {
          state.activeBoardId = null;
        }
      }),
    );
  },

  updateBoardId: (tempId, realId) => {
    set(
      produce((state: BoardState) => {
        if (state.boards[tempId]) {
          state.boards[realId] = { ...state.boards[tempId], id: realId };
          delete state.boards[tempId];

          if (state.activeBoardId === tempId) {
            state.activeBoardId = realId;
          }
        }
      }),
    );
  },
}));

export default useBoardStore;
