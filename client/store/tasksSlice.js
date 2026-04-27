import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchStats, fetchTasks, updateTaskStatus } from "../api/tasks";

export const loadDashboard = createAsyncThunk(
  "tasks/loadDashboard",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().tasks;
      const [tasksData, stats] = await Promise.all([
        fetchTasks(state.filters),
        fetchStats(),
      ]);

      return {
        items: tasksData.items,
        meta: tasksData.meta,
        stats,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const patchTaskStatus = createAsyncThunk(
  "tasks/patchTaskStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await updateTaskStatus(id, status);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  items: [],
  meta: {
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1,
  },
  stats: null,
  filters: {
    status: "all",
    search: "",
    page: 1,
    limit: 5,
  },
  loading: false,
  error: null,
  updateError: null,
  updatingIds: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setStatusFilter(state, action) {
      state.filters.status = action.payload;
      state.filters.page = 1;
    },
    setSearchFilter(state, action) {
      state.filters.search = action.payload;
      state.filters.page = 1;
    },
    setPage(state, action) {
      state.filters.page = action.payload;
    },
    optimisticStatusUpdate(state, action) {
      const { id, status } = action.payload;
      const task = state.items.find((item) => item.id === id);
      if (task) {
        task.status = status;
      }
    },
    rollbackItems(state, action) {
      state.items = action.payload;
    },
    clearUpdateError(state) {
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.meta = action.payload.meta;
        state.stats = action.payload.stats;
      })
      .addCase(loadDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load dashboard";
      })
      .addCase(patchTaskStatus.pending, (state, action) => {
        state.updateError = null;
        state.updatingIds.push(action.meta.arg.id);
      })
      .addCase(patchTaskStatus.fulfilled, (state, action) => {
        state.updatingIds = state.updatingIds.filter(
          (id) => id !== action.meta.arg.id,
        );
      })
      .addCase(patchTaskStatus.rejected, (state, action) => {
        state.updatingIds = state.updatingIds.filter(
          (id) => id !== action.meta.arg.id,
        );
        state.updateError = action.payload || "Failed to update task";
      });
  },
});

export const {
  setStatusFilter,
  setSearchFilter,
  setPage,
  optimisticStatusUpdate,
  rollbackItems,
  clearUpdateError,
} = tasksSlice.actions;

export default tasksSlice.reducer;
