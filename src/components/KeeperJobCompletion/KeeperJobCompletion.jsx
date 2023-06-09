import "./KeeperJobCompletion.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import JobItemChecklist from "../JobItem/JobItemChecklist/JobItemChecklist";
import CompletionModal from "./CompletionModal/CompletionModal";

function KeeperJobCompletion() {
  const params = useParams();
  const jobId = params.id;

  const dispatch = useDispatch();
  const details = useSelector((store) => store.job.job_detail);
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleButtonClick() {
    setIsModalOpen(true);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
  }
  function completeJobHandler() {
    dispatch({ type: "COMPLETE_JOB", payload: { id: jobId } });
    handleCloseModal();
  }

  useEffect(() => {
    dispatch({ type: "FETCH_JOB_DETAIL", payload: { id: jobId } });
  }, []);

  if (!Object.keys(details).length) {
    return <p>loading ...</p>;
  }
  return (
    <div className="job-details-body">
      {/* overview module */}
      <div className="job-details-overview">
        <div className="job-detail-title">
          <p>Overview</p>
        </div>
        <div className="job-detail-info">
          <div className="job-detail-name">
            <p>{details.username}</p>
          </div>
          <div className="job-detail-location">
            <p className="job-address">{details.street}</p>
            <div className="location-dot"></div>
            <p className="job-city">{details.city},</p>
            <p className="job-state">
              {details.state} {details.zipcode}
            </p>
          </div>
          <div className="job-detail-date">
            <p>{details.date_completed_by}</p>
          </div>
          <div className="job-detail-price">
            <p>${details.price}</p>
          </div>

          {/* button module */}
          {details.status === "incomplete" ? (
            <button
              onClick={handleButtonClick}
              className="btn job-detail-button-price"
            >
              complete
            </button>
          ) : (
            <button className="btn job-detail-button-price">
              processing...
            </button>
          )}
        </div>
      </div>

      {/* checklist module */}
      <div className="job-details-checklist">
        {details.job_checklist.filter((task) => task.standard).length ? (
          <JobItemChecklist
            job_checklist={details.job_checklist.filter(
              (task) => task.standard
            )}
            checklist_type={"standard"}
            jobId={jobId}
            pageType={"change"}
          />
        ) : (
          <></>
        )}

        {details.job_checklist.filter((task) => !task.standard).length ? (
          <JobItemChecklist
            job_checklist={details.job_checklist.filter(
              (task) => !task.standard
            )}
            checklist_type={"custom"}
            jobId={jobId}
            pageType={"change"}
          />
        ) : (
          <></>
        )}
      </div>

      {/* description module */}

      <div className="keeper-complete-textarea-body">
        <div className="job-detail-title">
          <p>Description</p>
        </div>
        <textarea
          className="keeper-complete-textarea"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>

      {/* modal module */}
      <CompletionModal
        isModalOpen={isModalOpen}
        onCloseModal={handleCloseModal}
        title="Review"
        page="complete"
      >
        <div className="job-details-body" style={{ marginBottom: "2rem" }}>
          <h1 style={{ marginBottom: "-1rem" }}>Review</h1>
          <div className="job-details-overview" style={{ width: "32rem" }}>
            <div className="job-detail-title">
              <p>Overview</p>
            </div>
            <div className="job-detail-info">
              <div className="job-detail-name">
                <p>{details.username}</p>
              </div>
              <div className="job-detail-location">
                <p className="job-address">{details.street}</p>
                <div className="location-dot"></div>
                <p className="job-city">{details.city},</p>
                <p className="job-state">
                  {details.state} {details.zipcode}
                </p>
              </div>
              <div className="job-detail-date">
                <p>{details.date_completed_by}</p>
              </div>
              <div className="job-detail-price">
                <p>${details.price}</p>
              </div>

              {/* button module */}
              <button
                className="btn btn job-detail-button-price"
                onClick={completeJobHandler}
              >
                submit
              </button>
            </div>
          </div>

          {/* checklist module */}
          <div className="job-details-checklist" style={{ width: "32rem" }}>
            {details.job_checklist.filter((task) => task.standard).length ? (
              <JobItemChecklist
                job_checklist={details.job_checklist.filter(
                  (task) => task.standard
                )}
                checklist_type={"standard"}
                jobId={jobId}
                pageType={"view"}
                isModal={true}
              />
            ) : (
              <></>
            )}

            {details.job_checklist.filter((task) => !task.standard).length ? (
              <JobItemChecklist
                job_checklist={details.job_checklist.filter(
                  (task) => !task.standard
                )}
                checklist_type={"custom"}
                jobId={jobId}
                pageType={"view"}
                isModal={true}
              />
            ) : (
              <></>
            )}

            <div className="keeper-complete-textarea-body">
              <div className="job-detail-title">
                <p>Description</p>
              </div>
              <textarea
                style={{ outline: "none", width: "26rem" }}
                className="keeper-complete-textarea"
                value={description}
              />
            </div>
          </div>
        </div>
      </CompletionModal>
    </div>
  );
}

export default KeeperJobCompletion;
