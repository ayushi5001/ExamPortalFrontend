import React, { useEffect, useRef, useState } from 'react';
import { PiHandWaving } from 'react-icons/pi';
// import Countdown from 'react-countdown-now';
import { CustomButton } from '../../../theme/Button/Buttons';
import { Button, Modal, Spinner } from 'react-bootstrap';
import {
  useGetAllQuestionsFromPaperIdQuery,
  usePostSaveResultMutation,
} from '../../../apis/Service';
import { Loader } from '../../../components/Loader/Loader';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

export default function StudentPaper({
  paperId,
  decodedData,
  isLoading,
  handleSubmit,
  paperSubmit,
  cameraStop,
}) {
  const [showSubmit, setShowSubmit] = useState(false);
  const handleSubmitClose = () => setShowSubmit(false);
  const handleSubmitShow = () => setShowSubmit(true);
  // const { data, isSuccess, isLoading } =
  //   useGetAllQuestionsFromPaperIdQuery(paperId);
  const [saveResult, { isSucess, isLoading: submitPaperLoading }] =
    usePostSaveResultMutation();
  // const timeString = '01:45:15';
  const timeString = decodedData?.examDetails.examDuration;
  const [targetTime, setTargetTime] = useState(null);
  const progressBar = useRef(null);
  const [count, setCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(
    new Array(decodedData?.questions?.length)
  );

  const imagesArray = useSelector((state) => state.admin.image);

  useEffect(() => {
    const convertTimeStringToMillis = (timeString) => {
      const [hours, minutes, seconds] = timeString.split(':').map(Number);
      return ((hours * 60 + minutes) * 60 + seconds) * 1000;
    };
    const milliseconds = convertTimeStringToMillis(timeString);
    const currentTimestamp = Date.now();
    const target = currentTimestamp + milliseconds;
    setTargetTime(target);
  }, [timeString]);

  function getUserAnswereWithQuestion() {
    const questionsJson = JSON.stringify(decodedData?.questions);
    let questions = JSON.parse(questionsJson);
    console.log('before ', questions);
    decodedData?.questions.forEach((value, index) => {
      questions[index].userAns = selectedOption[index];
    });
    console.log('after ', questions);
    return questions;
  }

  const stdData = JSON.parse(localStorage.getItem('stdData'));
  async function submitPaperDetails(params) {
    console.log(imagesArray, 'IMageArraay =====================');
    // const randomImg = JSON.parse(localStorage.getItem('capturedImage'));
    // const ss = localStorage.getItem('ss');
    // imagesArray.push(ss);
    const questions = getUserAnswereWithQuestion();

    const result = {
      studentId: stdData.userId,
      paperId: paperId,
      questions: questions,
      cheating: {
        studentId: stdData.userId,
        paperId: paperId,
        images: imagesArray,
        audios: null,
        paperId: paperId,
      },
    };
    cameraStop();
    console.log('result in submit :  ', result);
    saveResult(result).then(() => {
      handleSubmit();
      handleSubmitClose();
    });
  }

  function isChecked(id) {
    console.log('selected option :- ', selectedOption[id]);
    return selectedOption[id] ? true : false;
  }
  function updateProgressBar() {
    const progress = ((count + 1) / decodedData?.questions?.length) * 100;
    progressBar.current.style.width = progress + '%';
  }
  function handleChecked(e, id) {
    if (!isChecked(id)) {
      setCount(count + 1);
      updateProgressBar();
      console.log('updated progressbar');
    }
    const update = selectedOption;
    console.log(e.target.value);
    console.log(id);
    update[id] = e.target.value;
    console.log('update ========================', update);
  }

  return (
    <>
      {isLoading ? (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
       <p>hello</p>
      )}
      {showSubmit && (
        <Modal
          show={showSubmit}
          onHide={handleSubmitClose}
          backdrop="static"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {' '}
              Are You Sure ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>confirm you want Submit </p>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex w-100 gap-3">
              <Button
                variant="dark"
                className="rounded-4 w-100"
                onClick={handleSubmitClose}
              >
                Cancel
              </Button>
              <Button
                variant="success"
                className="rounded-4 w-100"
                onClick={submitPaperDetails}
              >
                {submitPaperLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
