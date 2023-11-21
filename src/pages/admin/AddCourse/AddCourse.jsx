import React from 'react';
import SideNavBar from '../../../components/SideNavBar/SideNavBar';
import Header from '../../../components/Header/Header';
import { Button, Form, Row } from 'react-bootstrap';
import learning from '../assets/Learning-cuate.svg';

import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { InputField } from '../../../theme/InputField/InputField';
import { CustomButton } from '../../../theme/Button/Buttons';
const style = { backgroundColor: '#f6f6f6' };

const InputFieldData = [
  {
    inputId: 'add-course-name',
    inputName: 'add-course-name',
    formGroupId: 'add-course-group-name',
    placeholder: 'enter course name',
    labelText: 'Course Name',
  },
  {
    inputId: 'add-course-email',
    inputName: 'add-course-email',
    formGroupId: 'add-course-group-email',
    placeholder: `enter HOD's email`,
    labelText: 'HOD Email',
  },
];

export default function AddCourse() {
  const navigate = useNavigate();

  return (
    <>
      <div className="row w-100 h-100  m-0 p-0">

     <div className=" col-md-6 ">
          <div className="p-3 pe-lg-5 mt-lg-2">
              <p className="text-capitalize fw-bold fs-4 ">Add course</p>
              <p>
                Adding a course is easy! Just provide the course name and the
                Head of Department's (HOD) email, and you're good to go.
              </p>
            </div>
            <Formik
              initialValues={{ 'add-course-name': '', 'add-course-email': '' }}
              onSubmit={(values) => {}}
            >
            <Form >
                {InputFieldData.map((inputData) => (
                  <InputField
                    inputId={inputData.inputId}
                    inputName={inputData.inputName}
                    rowClassName=" my-0 mx-1"
                    formGroupId={inputData.formGroupId}
                    placeholder={inputData.placeholder}
                    labelText={inputData.labelText}
                  />
                ))}

                <CustomButton
                onButtonClick={() => navigate('/admin/create-assessment')}
                  buttonText={'Submit'}
                  rowClassName={
                    'mt-3 m-0 mx-2 p-3 p-md-5 p-md-0  mb-md-0'
                  }
                  className={'m-md-3'}
                />
              </Form>
            </Formik>
          </div>

        <div className="col-md-6 h-100 d-none d-md-flex  align-items-center  justify-content-center">
            <img src={learning} alt="" className="img-fluid w-75" />
        </div>
     </div>
    </>
  );
}
