import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Form Submit Condition
  personalInformation: false,
  academic: false,
  guardian: false,
  fee: false,

  // Assign Value
  studentName: null,
  branchName: null,
  branchId: null,

  // Ids
  studentId: null,
  academicId: null,
  guardianId: null,

  // Form Submit Data
  personalData: null,
  guardianData: null,
  academicData: null,
};

const enrollStudentSlice = createSlice({
  name: "enrollStudentState",
  initialState,
  reducers: {
    setEnrollStudentState: (state, action) => {
      // Form Submit Condition
      state.personalInformation = action.payload.personalInformation;
      state.academic = action.payload.academic;
      state.family = action.payload.family;
      state.fee = action.payload.fee;
      state.guardian = action.payload.guardian;

      // Assign Value
      state.studentName = action.payload.studentName;
      state.branchName = action.payload.branchName;

      // Ids
      state.studentId = action.payload.studentId;
      state.branchId = action.payload.branchId;
      state.academicId = action.payload.academicId;
      state.guardianId = action.payload.guardianId;

      // Form Submit Data
      state.personalData = action.payload.personalData;
      state.familyData = action.payload.familyData;
      state.academicData = action.payload.academicData;
      state.guardianData = action.payload.guardianData;
    },
  },
});
export const { setEnrollStudentState } = enrollStudentSlice.actions;
export default enrollStudentSlice.reducer;
