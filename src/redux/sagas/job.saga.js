import axios from "axios";
import { put, take, takeLatest } from "redux-saga/effects";

// watcher function
function* jobSaga() {
  yield takeLatest("FETCH_JOBS", fetchJobs); // GET all jobs
  yield takeLatest("FETCH_JOB", fetchJob); // GET one job
  yield takeLatest("FETCH_JOB_DETAIL", fetchJobDetail); // GET one job detail
  yield takeLatest("FETCH_USER_JOBS", fetchUserJobs); // GET user's jobs

  yield takeLatest("ADD_JOB", addJob);

  yield takeLatest("APPLY_TO_JOB", applyToJob); // UPDATE claimed to true and keeper id
}

// fetch all jobs
function* fetchJobs() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const jobsData = yield axios.get("/api/job");
    yield put({ type: "SET_JOBS", payload: jobsData.data });
  } catch (err) {
    console.log("Error with fetching jobs: ", err);
  }
}

// fetch job by id
function* fetchJob() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    yield put({ type: "SET_JOB" });
  } catch (err) {
    console.log("Error with fetching jobs: ", err);
  }
}

// fetch job detail
function* fetchJobDetail(action) {
  try {
    const jobDetail = yield axios.get(`/api/job/detail/${action.payload.id}`);
    yield put({ type: "SET_JOB_DETAIL", payload: jobDetail.data[0] });
  } catch (err) {
    console.log("Error with getting job detail: ", err);
  }
}

// fetch user's jobs
function* fetchUserJobs() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const userJobs = yield axios.get(`/api/job/user/`);
    yield put({ type: "SET_USER_JOBS", payload: userJobs.data });
  } catch (err) {
    console.log("Error with getting user's jobs: ", err);
  }
}

// post job
function* addJob(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    console.log(action.payload);
    const response = yield axios.post("/api/job", action.payload, config);
  } catch (err) {
    console.log("Error with posting jobs: ", err);
  }
}

// Apply to Job (UPDATE)
function* applyToJob(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const response = yield axios.put(`/api/job/apply`, action.payload, config);
    yield put({ type: "FETCH_JOBS" });
  } catch (err) {
    console.log("Error with applying to job: ", err);
  }
}

export default jobSaga;
