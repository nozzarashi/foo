import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

interface GameT {
  background_image: string;
  comment: string | null;
  description_raw: string;
  developers: string;
  id: number | string;
  name: string;
  rating: string | number;
  released: string;
  status: string;
  fbDocId: string;
}

interface GamesListState {
  gamesList: GameT[];
  status: 'idle' | 'loading' | 'fulfilled' | 'failed';
  error: string | null;
}

const initialState: GamesListState = {
  gamesList: [],
  status: 'idle',
  error: null,
};
const gamesCollectionRef = collection(db, 'myGames');

export const getAllGames = createAsyncThunk('games/getAllGames', async function () {
  const gamesSnapshot = await getDocs(gamesCollectionRef);

  const games: GameT[] = [];

  gamesSnapshot.forEach((doc) => {
    games.push({ ...(doc.data() as GameT), fbDocId: doc.id });
  });
  return games;
});

export const addGameToFirebase = createAsyncThunk('games/addGameToFirebase', async function (gameData: GameT) {
  const docRef = await addDoc(gamesCollectionRef, gameData);
  return { ...gameData, fbDocId: docRef.id };
});

export const deleteGameFromFirebase = createAsyncThunk(
  'games/deleteGameFromFirebase',
  async function (fbDocId: string, { rejectWithValue }) {
    try {
      const docRef = doc(db, 'myGames', fbDocId);
      await deleteDoc(docRef);
      return fbDocId;
    } catch (error) {
      console.error('Ошибка при удалении игры:', error);
      return rejectWithValue('Не удалось удалить игру.');
    }
  }
);

export const gamesListSlice = createSlice({
  name: 'gamesListFirebase',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGames.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllGames.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.gamesList = action.payload;
      })
      .addCase(getAllGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка загрузки игр';
      })
      .addCase(addGameToFirebase.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addGameToFirebase.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.gamesList.push(action.payload);
      })
      .addCase(addGameToFirebase.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка добавления игры';
      })
      .addCase(deleteGameFromFirebase.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteGameFromFirebase.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.gamesList = state.gamesList.filter((game) => game.fbDocId !== action.payload);
      })
      .addCase(deleteGameFromFirebase.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Ошибка добавления игры';
      });
  },
  selectors: {
    selectGamesList: (state) => state.gamesList,
    selectError: (state) => state.error,
    selectFetchStatus: (state) => state.status,
  },
});

export const { selectError, selectFetchStatus, selectGamesList } = gamesListSlice.selectors;

export const selectGameIdsInCollection = createSelector(selectGamesList, (gamesList) => {
  return new Set(gamesList.map((game) => game.id));
});
export default gamesListSlice.reducer;
