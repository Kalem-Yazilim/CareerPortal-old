export interface PersonnelJobAnnouncement {
  Oid: number;
  JobAnnouncementDesc: string;
  AnnouncementStartDate: Date;
  AnnouncementEndDate: Date;
  Integration: boolean;
  JobAnnouncementTitle: string;
  JobLocation: string;
  PersonnelRequirement: any; // PersonnelRequirement;
  PersonnelCareerCompany: any; // PersonnelCareerCompany;
  PersonnelJobApplications: any[]; // Array<PersonnelJobApplication>;
}
