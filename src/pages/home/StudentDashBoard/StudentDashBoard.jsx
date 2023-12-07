import React,{useEffect,useState} from 'react';
import {Accordion} from 'react-bootstrap';
import '../component/Chart.css'
import {FaUsers,FaThumbsUp} from "react-icons/fa";

import {MdOutlineAssignment} from "react-icons/md";
import {CustomButton} from '../../../theme/Button/Buttons'
import {useGetAllAssissmentOnstudentPageQuery,useGetAssignmentQuery,useGetTop5AssissmentQuery} from '../../../apis/Service';
import {SubIdSplit} from '../../../utils/SubIdSplit';
import BarChart from '../component/BarChart';
import DoughnutChart from '../component/DoughnutChart';
// import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';
import PieChart from '../component/PieChart';
import {Loader} from '../../../components/Loader/Loader';
import {StudentCertificate} from '../../student/StudentCertificate/StudentCertificateDownload';



const info = [
    {
        id: 1,
        infoText: "given Assessement",
        infoNumber: "10,333",
        icon: <FaUsers size={50} />,
        iconClassName: "bg-warning",
    },
    {
        id: 2,
        infoText: " Pending Assessment",
        infoNumber: "10,333",
        icon: <MdOutlineAssignment size={50} />,
        iconClassName: "bg-danger",
    },{
        id: 3,
        infoText: "Passed Assessment",
        infoNumber: "10,333",
        icon: <FaThumbsUp size={50} />,
        iconClassName: "bg-success",

    }
];

function TotalComponent({infoText,infoNumber,icon,iconClassName}) {
    return <>
        <div class="col-12 col-sm-6 h-7 col-md-4 p-2 m-0" style={{height: "150px"}}>
            <div class=" w-100  d-flex align-items-center gap-2   border m-1 p-2 rounded-2" style={{backgroundColor: "var(--main-div)"}} >
                <span class={` d-flex justify-content-center align-items-center rounded-2   elevation-1 ${iconClassName}  `} style={{width: "80px ",height: "80px"}}>{icon}</span>
                <div class="  d-flex flex-column">
                    <span class="info-box-text fs-4 fw-bold">{infoText}</span>
                    <span class="info-box-number fs-5">{infoNumber}</span>
                </div>
            </div>
        </div>
    </>
}


export const StudentDashBoard = () => {
    let userId = JSON.parse(localStorage.getItem('users'));
    userId = SubIdSplit(userId.sub);
    const {data} = useGetAllAssissmentOnstudentPageQuery(userId);
    useEffect(() => {
        console.log("data of student page all assessment ",data);
    },[data]);
    const {
        data: xy,
        isLoading,
        isError,
        isSuccess,
    } = useGetAssignmentQuery({id: userId});
    const {data: top5Assessment
        ,isLoading: isTop5AssessmentLoading
        ,isError: isTop5AssessmentError} = useGetTop5AssissmentQuery(5);

    // console.log("data :-  ",data);
    // console.log("userId :-  ",userId);

    const [barChatData,setBarChatData] = useState();
    const [barChartLabels,setBarChatLabels] = useState();
    // const data = [
    //     {
    //         id: 1,
    //         assessmentName: " given assessment",
    //         assessmentDate: " 22-08-2022",
    //         assessmentDuration: " 22:08:20",
    //     },{
    //         id: 2,
    //         assessmentName: " given assessment2",
    //         assessmentDate: " 22-08-2022",
    //         assessmentDuration: " 22:08:20",
    //     },{
    //         id: 3,
    //         assessmentName: " given assessment3",
    //         assessmentDate: " 22-08-2022",
    //         assessmentDuration: " 22:08:20",
    //     }
    // ]
    useEffect(() => {
        const chartData = [];
        const chartLabels = [];
        if(top5Assessment) {
            top5Assessment?.forEach((value) => {
                chartLabels.push(value.assessmentName);
                chartData.push(value.marks);
            });
        }
        console.log("chart data ",chartData);
        console.log("chart labels",chartLabels);
        setBarChatData(chartData);
        setBarChatLabels(chartLabels);
        console.log(top5Assessment);
    },[top5Assessment]);
    return (
        <>

            {/* {isError && <SomethingWentWrong />} */}
            {/* {console.log(data)} */}
            {
                isLoading ? (
                    <div className=" position-absolute top-50 start-50  translate-middle " >
                        <Loader />
                    </div >
                ) : (
                    <>
                        <div className=" w-100 h-100 m-0  p-0 g-md-0 overflow-auto bg-transparent">
                            <div className="row w-100  chart-box   p-0 m-0 " style={{height: "20rem"}}>
                                <div className="col-12 col-md-4  d-flex  flex-column flex-lg-row    align-items-center   justify-content-center rounded-3">
                                        {barChatData && barChartLabels && <div className=' chart-parent w-100 h-75  d-flex align-items-center   rounded-3 py-3 justify-content-center ' style={{backgroundColor: "var(--main-div)"}}>
                                        <BarChart chartLabels={barChartLabels} chartData={barChatData} />
                                    </div>}
                                </div>
                                <div className="col-12 col-md-4 h-auto  d-flex   align-items-center    justify-content-center    rounded-3">

                                        {barChatData && barChartLabels && <div className=' chart-parent w-100 h-75  d-flex   align-items-center  rounded-3 py-3  justify-content-center ' style={{backgroundColor: "var(--main-div)"}}>
                                        <DoughnutChart DoughnutChartData={barChatData} DoughnutChartLabels={barChartLabels} />
                                    </div>}

                                </div>
                                <div className="col-12 col-md-4 d-flex   align-items-center   justify-content-center    rounded-3">
                                        {barChatData && barChartLabels && <div className=' chart-parent w-100 h-75   d-flex   align-items-center   rounded-3 py-3 justify-content-center ' style={{backgroundColor: "var(--main-div)"}}>
                                        <PieChart PieChartData={barChatData} PieChartLabels={barChartLabels} />
                                    </div>}
                                </div>
                            </div>
                            <div class="row m-0 p-0 d-flex justify-content-around w-100  " >
                                {info && info.map((value) => {
                                    return <>
                                        <TotalComponent key={value.id} infoText={value.infoText} infoNumber={value.infoNumber} icon={value.icon} iconClassName={value.iconClassName} />
                                    </>
                                })
                                }

                            </div>

                            {data?.length ? <div className="row m-0  d-flex justify-content-between bg-white  rounded-3 w-100  p-2   ">
                                <div className=' w-100 py-3 p-md-2   fw-bold '>
                                    <h4 className=' ps-3'> Taken Assessment</h4>
                                </div>
                                <Accordion className='  my-2 p-0 p-md-2 ' >

                                    {data && data?.map((value,index) => {
                                        return <>
                                            <div className=' border rounded py-3 px-2 my-1'>   <div className=' row gap-2 gap-md-0 w-100  fw-bold '>
                                                <div className=' col-md-6 col-lg-3  text-capitalize'>{value?.assessmentName} </div>
                                                <div className=' col-md-6 col-lg-3  text-capitalize'>{value?.examDuration} </div>
                                                <div className=' col-md-6 col-lg-3  text-capitalize' >{value?.assessmentDate} </div>
                                                <div className=' col-md-6 col-lg-3  d-flex  justify-content-around  gap-2'>
                                                    <CustomButton buttonText={"Check Result"} />
                                                    <StudentCertificate />
                                                </div>
                                            </div></div>
                                        </>

                                    })
                                    }

                                </Accordion>
                            </div> : null}


                        </div>
                    </>
                )
            }

        </>
    );
}
