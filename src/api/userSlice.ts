import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category, Game, RankedRun } from 'src-ts/lib/types';
import testData from "../testOptions/options.json"
import { FinalRun } from '../helpers/types';

//Maybe change to request options if decided to not post anything back to sr.com
export interface UserState {
    apiKey: string;
    runs: FinalRun[];
}

const initialState: UserState = {
    //TODO: Change this!!
    apiKey: testData.apiKey,
    runs: []

};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setApi: (state, action) => {
            state.apiKey = action.payload;
        }
    },

    extraReducers(builder){
        builder
            .addCase(fetchRuns.fulfilled, (state, action) => {
                state.runs = action.payload;
            })
    }

});

export const { setApi } = userSlice.actions;

export const fetchRuns = createAsyncThunk<FinalRun[]>(
    'user/fetchRuns',
    async (_) => {
        const options = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "User-Agent": "VojtasRuns/1.0",
            }
        };
    
        return await fetch("https://www.speedrun.com/api/v1/users/vojtas131/personal-bests", options).then(async response => {
            const responseJson = (await response.json()).data as RankedRun[];
            console.log(responseJson);
            return await Promise.all(responseJson.map(async x => {
                return {
                    game: await fetch("https://www.speedrun.com/api/v1/games/" + x.run.game, options).then(response => response.json().then(value => (value.data as Game).names.international)),
                    category: await fetch("https://www.speedrun.com/api/v1/categories/" + x.run.category, options).then(response => response.json().then(value => (value.data as Category).name)),
                    link: x.run.videos?.links[0].uri,
                    comment: x.run.comment,
                    time: x.run.times.primary_t
                }
            }))
        })
    }
);


export default userSlice.reducer;
