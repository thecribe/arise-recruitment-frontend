import { instance } from "@/api/client";
import type { ApplicantDashboard } from "../types/applicant-dashboard";

export const dashboardApi ={
    getApplicantDashboard:  async(): Promise<ApplicantDashboard> =>{
const response = await instance.get("/dashboard/applicant")

return response.data.data
    },

    getManagerDashboard: null,
    getAdminDashboard:null
}