import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SeedType } from '../component/Seed'

interface SeedsState {
    seeds: SeedType[]
}

const initialState = { seeds: [] } as SeedsState

const seedsSlice = createSlice({
    name: 'seeds',
    initialState,
    reducers: {
        addSeed(state, action: PayloadAction<SeedType>) {
            state.seeds.push(action.payload)
        },
        removeSeed(state, action: PayloadAction<SeedType>) {
            state.seeds = state.seeds.filter(s => s.id !== action.payload.id)
        },
        initSeeds(state, action: PayloadAction<SeedType[]>) {
            state.seeds = action.payload
        }
    },
})

export const { addSeed, initSeeds, removeSeed } = seedsSlice.actions
export default seedsSlice.reducer