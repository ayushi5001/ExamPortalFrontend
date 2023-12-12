import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {SubIdSplit} from '../utils/SubIdSplit'

// Define a service using a base URL and expected endpoints
// const baseUrl = " http://localhost:9090"
// const baseUrl = "https://exameasy-.onrender.com/"
const baseUrl = "http://192.168.0.237:9090"
// const baseUrl = "http://192.168.180.59:9090"
// const baseUrl = "http://192.168.1.188:9090"



export const adminApi = createApi({
    reducerPath: 'adminApi',
    tagTypes: ['getAllCourse','getAllAssissment','getOrgernization','submitExam'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers,{getState}) => {
            const accessToken = localStorage.getItem('accessToken');
            if(accessToken) {
                headers.set('Authorization',`Bearer ${accessToken}`);
            }
            headers.set('Content-Type','application/json');
            return headers;
        },
    }),

    endpoints: (builder) => ({
        getTest: builder.query({
            query: () => `posts`,
        }),
        getUser: builder.query({
            query: () => {
                const users = JSON.parse(localStorage.getItem('users'));
                const userId = SubIdSplit(users?.sub);
                return {
                    url: `/user/byid/${userId}`,
                    method: 'get',
                }

            }
        }),
        postOrganisationDetails: builder.mutation({
            query: (orgDetail) => {
                const {accessToken,...organisationDetails} = orgDetail;
                return {
                    url: `/createorgnization`,
                    method: 'POST',
                    body: organisationDetails,
                }
            },
            invalidatesTags: ['getOrgernization'],
        }),
        getOrgernization: builder.query({
            query: () => {
                const users = JSON.parse(localStorage.getItem('users'));
                const userId = SubIdSplit(users?.sub);
                return {
                    url: `/getOrgnizationByUserId/${userId}`,
                    method: 'get',
                }
            },
            providesTags: ['getOrgernization']
        }),
        getAllCourses: builder.query({
            query: ({userId,page,size,sortField,sortOrder}) => {
                let bysize = "",bysortField = "",bySortOrder = "",byPage = "";
                if(size) {
                    bysize = `&size=${size}`;
                }
                if(sortField) {
                    bysortField = `&sortField=${sortField}`;
                }
                if(page || page == 0) {
                    byPage = `?page=${page}`;
                }
                if(sortOrder) {
                    bySortOrder = `&sortOrder=${sortOrder}`;
                }
                return {
                    url: `course/byUserId/${userId}${byPage}${bysortField}${bysize}${bySortOrder}`,
                    method: "GET",
                }
            },
            providesTags: ['getAllCourse'],
        }),
        deleteCourse: builder.mutation({
            query: (payload) => {
                const {accessToken,id} = payload;
                return {
                    url: `course/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ['getAllCourse'],

        }),
        updateCourse: builder.mutation({
            query: (payload) => {
                const {accessToken,...updateCourseDetail} = payload;
                return {
                    url: `course/update`,
                    method: "PUT",
                    body: updateCourseDetail,
                }
            },
            invalidatesTags: ['getAllCourse'],
        }),
        addCourse: builder.mutation({
            query: (addCourse) => {
                const {accessToken,...addCourseDetails} = addCourse;
                return {
                    url: `/course/create`,
                    method: 'post',
                    body: addCourse,
                }
            },
            invalidatesTags: ['getAllCourse'],
        }),
        postAssignment: builder.mutation({
            query: (data) => {
                const {accessToken,...assignmentData} = data;
                return {
                    url: `/create/paper`,
                    method: 'post',
                    body: assignmentData,
                }
            },
            invalidatesTags: ['getAllAssissment'],
        }),
        getAssignment: builder.query({
            query: ({accessToken,paper_name,id,Active,createdDate,publishDate,pageno,pageSize,sortOrder,sortField}) => {

                let filter = Active == '' || Active == undefined ? "" : `&filter=is_Active:${Active}`
                let filterByname = (paper_name == "" || paper_name?.lenght == 0 || paper_name == null) ? "" : `filter=paper_name:${paper_name}`
                let filterByCreatedDate = createdDate = "" || createdDate == null ? "" : `filter=created_date:${(createdDate?.getFullYear()) + "/" + (createdDate?.getMonth() + 1) + "/" + (createdDate?.getDate())}`
                let filterByPublishDate = publishDate = "" || publishDate == null ? "" : `filter=created_date:${(publishDate?.getFullYear()) + "/" + (publishDate?.getMonth() + 1) + "/" + (publishDate?.getDate())}`
                let sortByOrder = "";
                let bypageSize = "";
                let bypageNo = ""
                if(sortOrder) {
                    sortByOrder = `&sortOrder=${sortOrder}`;
                }
                if(pageSize) {
                    bypageSize = `&pagesize=${pageSize}`;
                }
                if(pageno) {
                    bypageNo = `&pageno=${pageno}`
                }
                return {
                    url: `/getAllPaperbyUserId/${id}?${filterByname}${filterByCreatedDate}${filter}${sortByOrder}${bypageSize}${bypageNo}`,
                    // params: {Active,pageno,pagesize: pageSize,sortOrder,sortField},
                    method: 'get',
                }
            },
            providesTags: ['getAllAssissment'],
        }),
        deleteAssignment: builder.mutation({
            query: (payload) => {
                return {
                    url: `/deletePaperByPaperID/${payload}`,
                    method: "DELETE",

                }
            },
            invalidatesTags: ['getAllAssissment'],
        }),
        getStudentOnPerticularAssignment: builder.query(
            {
                query: (paperId) => {
                    return {
                        url: `/GetAllStudentByPaperId/${paperId}`,
                        method: 'get',
                    }
                }
            }
        ),
        getAllQuestionsFromPaperId: builder.query({
            query: (payload) => {
                return {
                    url: `/getPaperbyPaperId/${payload}`,
                    method: 'GET',
                }
            },
        }),
        postSaveResult: builder.mutation({
            query: (payload) => {
                return {
                    url: "/checkPaper",
                    method: "POST",
                    body: payload,
                }
            },
            invalidatesTags: ['submitExam'],
        }),
        getAllAssissmentOnstudentPage: builder.query(
            {
                query: (stdId) => {
                    return {
                        url: `/getAllAssessmentByStudentId/${stdId}`,
                        method: 'get',
                    }
                },
                providesTags: ['submitExam']
            }
        ),
        putActivePaper: builder.mutation({
            query: ({paperId,paperActive}) => {
                return {
                    url: `/activetPaper/${paperId}/${paperActive}`,
                    method: 'put',
                }
            },
            invalidatesTags: ['getAllAssissment'],
        }),
        invitedStudentByMail: builder.mutation({
            query: (payload) => {
                return {
                    url: `/inviteStudents/`,
                    method: 'post',
                    body: payload,
                }
            },
            invalidatesTags: ['getAllAssissment'],
        }),
        getTop5Assissment: builder.query(
            {
                query: (adminId) => {
                    return {
                        url: ` http://localhost:3000/getTop5Assesment`,
                        // url: `/getTop5Assesment/${adminId}`,
                        method: 'get',
                    }
                }
            }
        ),
        getTop3AssissmentStudents: builder.query(
            {
                query: (AssessmentId) => {
                    return {
                        url: `/getTopperByPaperId/${AssessmentId}`,
                        // url: `/getTop5Assesment/${adminId}`,
                        method: 'get',
                    }
                }
            }
        ),
        getTotalStudentAdmin: builder.query(
            {
                query: (organizationId) => {
                    return {
                        url: ` http://localhost:3000/totalStudent`,
                        method: 'get',
                    }
                }
            }
        ),
        getStudentAvidence: builder.query(
            {
                query: ({paperId,stdId}) => {
                    return {
                        url: `/getresultby/student/${stdId}/paperId/${paperId}`,
                        method: 'get',
                    }
                },
                providesTags: ['submitExam']
            }
        ),
        getTotalAssessmentAdmin: builder.query(
            {
                query: (organizationId) => {
                    return {
                        url: ` http://localhost:3000/totalAssessment`,
                        // url: `/getTop5Assesment/${adminId}`,
                        method: 'get',
                    }
                }
            }
        ),
        getTop5AssesmentScoreByStudentId: builder.query(
            {
                query: (organizationId) => {
                    return {
                        url: ` http://localhost:3000/getTop5ExamScoreHigh`,
                        // url: `/getTop5Assesment/${adminId}`,
                        method: 'get',
                    }
                }
            }
        ),
        refreshAccessToken: builder.mutation({
            query: (refreshToken) => {
                return {
                    url: '/oauth/token',
                    method: 'POST',
                    body: {
                        grant_type: 'refresh_token',
                        client_id: 'lA9qLAs5xQxoBuCVM1AJERQoPIsopevs',
                        client_secret: 'LvKHmQdAdkZ-wj2RWrq32VTZq4GuK_XACwrh9KvUaKdTOYE3UbiwlnI1TPFhU08N',
                        refresh_token: refreshToken,
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };
            },
        }),
    }),


})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetStudentAvidenceQuery,useRefreshAccessTokenMutation,useInvitedStudentByMailMutation,useGetTestQuery,usePutActivePaperMutation,useGetAllAssissmentOnstudentPageQuery,useDeleteAssignmentMutation,useGetAllCoursesQuery,useDeleteCourseMutation,useUpdateCourseMutation,usePostOrganisationDetailsMutation,useAddCourseMutation,useGetOrgernizationQuery,usePostAssignmentMutation,useGetAssignmentQuery,useGetStudentOnPerticularAssignmentQuery,useGetUserQuery,useGetAllQuestionsFromPaperIdQuery,usePostSaveResultMutation,useGetTop3AssissmentStudentsQuery,useGetTop5AssissmentQuery,useGetTotalAssessmentAdminQuery,useGetTotalStudentAdminQuery,useGetTop5AssesmentScoreByStudentIdQuery} = adminApi;
