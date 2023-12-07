import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';
import { path } from '../../../routes/RoutesConstant';
import Ima from '../../../assets/rules.jpg';
import { CustomButton } from '../../../theme/Button/Buttons';

export default function TermandConditionPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  return (
    <div className="row w-100 h-100">
      <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
        <img src={Ima} className="img-fluid" alt="Rules" />
      </div>
      <div className="col-lg-6    col-md-12">
        <div className="text-center">
          <h3>Online Exam Rules</h3>
        </div>
        <section className="instructions">
          <h3>General Instructions:</h3>
          <ul>
            <li>
              Students must log in using their provided credentials before
              accessing the exam.
            </li>
            <li>
              Ensure a stable internet connection to avoid disruptions during
              the exam.
            </li>
            <li>
              Do not refresh the exam page during the test to prevent data loss.
            </li>
            <li>Follow the instructions for each question carefully.</li>
          </ul>
        </section>
        <section className="conduct">
          <h3>Exam Conduct:</h3>
          <ul>
            <li>
              Once the exam begins, focus on answering the questions
              independently.
            </li>
            <li>
              Avoid using any external resources or communication tools during
              the exam.
            </li>
            <li>Submit your answers before the allotted time expires.</li>
            <li>Refrain from any form of plagiarism or cheating.</li>
          </ul>
        </section>
        <section className="penalties">
          <h3>Penalties for Violation:</h3>
          <p>
            Any violation of the exam rules may result in disqualification and
            further actions as per institution policy.
          </p>
          <p>
            By proceeding to the exam, you agree to abide by these rules and
            regulations.
          </p>
          <p>
            <em>
              Note: Rules and regulations are subject to change as per exam
              authority's discretion.
            </em>
          </p>
        </section>
        <div className="form-check">
          <input
            className="form-check-input border-black"
            type="checkbox"
            id="flexCheckDefault"
            value={checked}
            onChange={() => setChecked(!checked)}
          />
          <label className="form-check-label">
            Accept All Terms and Conditions
          </label>
        </div>
        <div className="start-button text-end mt-3">
          <CustomButton
            className={'rounded-4'}
            buttonText={'Let Started'}
            onButtonClick={() => {
              if (checked) navigate(path.examVerify.path);
            }}
          />
        </div>
      </div>
    </div>
  );
}