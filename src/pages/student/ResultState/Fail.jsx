import React from 'react';
import result from '../../../assets/work_hard.svg';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../routes/RoutesConstant';

export const Fail = ({ paperId, stdId ,data}) => {
  const navigate = useNavigate();

  return (
    <div className="h-100 w-100 bg-white">
      <div className="h-100 w-100 result-bg d-flex justify-content-center align-items-center overflow-auto">
        <div className="result-container text-center">
          <h1 className="mb-3">💪Keep Going!</h1>
          <img src={result} />
          <h5 className="mt-5">Keep pushing forward! </h5>
          <span className="display-3 fw-bolder">{data.percentage}</span>
          <h5 className="mt-3">Doesn't define your potential. </h5>
          <h5 className="mt-3">
            Embrace this setback as a setup for a powerful comeback!
          </h5>
          <Button
            variant="dark me-4 mt-5"
            onClick={() => navigate(path.StudentDashboard.path)}
          >
            View Certificate
          </Button>
          <Button
            variant="dark mt-5"
            onClick={() =>
              navigate(`${path.examReport.path}/${paperId}/${stdId.userId}`)
            }
          >
            View Exam Evidence
          </Button>
        </div>
      </div>
    </div>
  );
};
