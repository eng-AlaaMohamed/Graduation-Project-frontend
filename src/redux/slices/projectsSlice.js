import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
    name: 'project',
    initialState:{
        projects: [],
        projectsCount: null,
        projectsCate: [], 
        project: null,
    },
    reducers: {
        setProjects(state, action) {
            state.projects = action.payload;
        },
        setProjectsCount(state, action) {
            state.projectsCount = action.payload;
        },
        setprojectsCate(state, action) {
            state.projectsCate = action.payload;
        },
        setProject(state, action) {
            state.project = action.payload;
        },
        addApplicantToProject(state, action) {
            state.project.applicants.push(action.payload);
        },
        deleteProject(state, action){
            state.projects = state.projects.filter(p => p._id !== action.payload);
        }
    }
});

const projectReducer = projectSlice.reducer;
const projectActions = projectSlice.actions;

export{ projectActions, projectReducer };