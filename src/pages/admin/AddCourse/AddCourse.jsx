import React from 'react'
import SideNavBar from '../components/SideNavBar'
import Header from '../components/Header'
import {Button,Form,Row} from 'react-bootstrap'
import learning from '../assets/Learning-cuate.svg'

import {useNavigate} from 'react-router-dom'
import {Formik} from 'formik'
import {InputField} from '../components/InputField'
import {CustomButton} from '../components/Buttons'
const style = {backgroundColor: "#f6f6f6"}

export default function AddCourse() {
    const navigate = useNavigate();

    return (
        <>
            <SideNavBar />
            <Header />

            <div className='container-body row w-100 rounded-5 m-0 p-0 justify-content-end ms-lg-5 w-auto  bg-white '>

                <div className='col-12 row m-0 d-flex  pt-2 p-2   ms-lg-5 ps-lg-4  w-100' style={style}>

                    <div className=' col-md-6 bg-white'>
                        <div className='p-3 pe-lg-5 ms-lg-5 mt-lg-2'>
                            <p className='text-capitalize fw-bold fs-4 '>Add course</p>
                            <p>Adding a course is easy! Just provide the course name and the Head of Department's (HOD) email, and you're good to go.</p>
                        </div>
                        <Formik initialValues={{"add-course-name": "","add-course-email": ""}} onSubmit={(values) => {

                        }} >

                            <Form className='mx-lg-5' >

                                <InputField
                                    rowClassName={" my-2"}
                                    inputId={"add-course-name"}
                                    inputName={"add-course-name"}
                                    placeholder={"Enter Course Name"}
                                    labelText={"course name "}

                                />
                                <InputField
                                    rowClassName={" my-2"}
                                    inputId={"add-course-email"}
                                    inputName={"add-course-email"}
                                    placeholder={"Enter Course email"}
                                    labelText={`HOD email`}

                                />
                                <CustomButton
                                    onButtonClick={(e) => {navigate('/create-assessment')}}
                                    buttonText={"Submit"}
                                    rowClassName={"mt-3 m-0 mx-2 p-3 p-md-5 pb-md-0  m-md-5 mb-md-0"}
                                    className={"m-md-3"}
                                />

                            </Form >
                        </Formik>
                    </div>

                    <div className='col-md-6  d-flex align-items-center  justify-content-center p-3 bg-white '>
                        <img src={learning} alt="" className='img-fluid w-75' />
                    </div>
                </div>
            </div>
        </>
    )
}
