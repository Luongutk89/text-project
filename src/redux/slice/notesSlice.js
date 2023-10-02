import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postNote, getNotes, deleteNoteApi, updateNoteApi } from '../../services/api';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    try {
        const res = await getNotes();
        return res.data;
    } catch (error) {
        throw error;
    }
});


export const createNote = createAsyncThunk('notes/createNote', async (noteData) => {
    try {
        const { title, status, description } = noteData;
        const res = await postNote(title, description, status);
        return res.data;
    } catch (error) {
        throw error;
    }
});


export const updateNote = createAsyncThunk('notes/updateNote', async ({ id, updatedNoteData }) => {
    try {
        const res = await updateNoteApi(id, updatedNoteData);
        return res.data;
    } catch (error) {
        throw error;
    }
});



export const deleteNote = createAsyncThunk('notes/deleteNote', async (noteId) => {
    try {
        const res = await deleteNoteApi(noteId);
        return res.data;
    } catch (error) {
        throw error;
    }
});



// export const searchNotes = createAsyncThunk('notes/searchNotes', async (searchQuery) => {
//     try {
//         const res = await searchNotesApi(searchQuery);
//         return res.data;
//     } catch (error) {
//         throw error;
//     }
// });



const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        list: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(createNote.pending, (state) => {
                state.status = 'loading';
                state.newNote = {};
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list.unshift(action.payload);
            })
            .addCase(createNote.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateNote.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedNote = action.payload;
                state.list = state.list.map((note) =>
                    note._id === updatedNote._id ? { ...note, ...updatedNote } : note
                );
            })

            .addCase(updateNote.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteNote.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const noteIdToDelete = action.payload._id;
                state.list = state.list.filter((note) => note._id !== noteIdToDelete);
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default notesSlice.reducer;









