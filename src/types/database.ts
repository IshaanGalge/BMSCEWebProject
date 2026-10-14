/**
 * BMSCE Hub - Database & Domain Entities Type Definitions
 * Maps cleanly to Supabase PostgreSQL schema tables and client states.
 */

export type StudentBranch =
  | "CSE"
  | "ISE"
  | "AIML"
  | "ECE"
  | "EEE"
  | "ME"
  | "CV"
  | "BT"
  | "CH"
  | "ETE"
  | "AIDS";

export type UserRole = "student" | "club_lead" | "faculty" | "admin";

export interface UserProfile {
  id: string;
  usn: string; // e.g., "1BM22CS089"
  full_name: string;
  email: string;
  branch: StudentBranch;
  semester: number; // 1 to 8
  avatar_url?: string;
  role: UserRole;
  bio?: string;
  created_at: string;
}

export interface Subject {
  id: string;
  code: string; // e.g., "21CS51"
  title: string;
  branch: StudentBranch;
  semester: number;
  scheme: string; // e.g., "2022 Scheme"
}

export interface NoteResource {
  id: string;
  title: string;
  description: string;
  subject_code: string;
  subject_name: string;
  branch: StudentBranch;
  semester: number;
  module_no: number | "Full Syllabus" | "Previous Papers";
  file_url: string;
  file_size: string;
  file_type: "pdf" | "zip" | "docx";
  author_name: string;
  author_usn: string;
  author_avatar?: string;
  downloads_count: number;
  upvotes_count: number;
  created_at: string;
}

export interface CampusClub {
  id: string;
  name: string;
  slug: string;
  category: "Technical" | "Cultural" | "Sports" | "Social" | "Motorsports";
  description: string;
  logo_url: string;
  cover_url?: string;
  member_count: number;
  coordinator_name: string;
  contact_email: string;
}

export interface CampusEvent {
  id: string;
  club_id: string;
  club_name: string;
  title: string;
  slug: string;
  description: string;
  banner_url?: string;
  venue: string; // e.g., "BSN Auditorium", "Mechanical Seminar Hall", "Indoor Stadium"
  date_time: string;
  registration_deadline: string;
  category: "Hackathon" | "Workshop" | "Cultural" | "Competitions" | "Sports" | "Social";
  is_registered?: boolean;
  max_seats: number;
  registered_count: number;
  fee: number; // 0 for free
}

export interface CanteenPlace {
  id: string;
  name: string;
  slug: string;
  category: "On-Campus Canteen" | "Campus Kiosk" | "Nearby Legend" | "Quick Bites";
  timing: string;
  location: string; // e.g., "Near Mech Block", "Opposite Library", "Gandhi Bazaar"
  distance_walk: string; // e.g. "On campus (1 min)", "350m (4 mins)"
  rating: number;
  is_open: boolean;
  price_range: "₹" | "₹₹" | "₹₹₹";
  image_url: string;
  specialties: string[];
  crowd_level: "Low" | "Moderate" | "Busy" | "Peak Lunch Rush";
}

export interface QAQuestion {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_usn: string;
  author_branch: StudentBranch;
  author_sem: number;
  tags: string[];
  upvotes_count: number;
  answers_count: number;
  is_resolved: boolean;
  created_at: string;
  top_answer?: {
    author_name: string;
    author_role: string;
    content: string;
    upvotes: number;
  };
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  original_price?: number;
  condition: "Brand New" | "Like New" | "Good Condition" | "Usable";
  category: "Textbooks" | "Drafters & Tools" | "Calculators" | "Electronics" | "Hostel Gear";
  seller_name: string;
  seller_usn: string;
  seller_contact: string;
  preferred_location: string; // e.g., "Library lawns", "Nescafe kiosk"
  status: "Available" | "Reserved" | "Sold";
  image_url: string;
  created_at: string;
}

export interface LostFoundItem {
  id: string;
  type: "Lost" | "Found";
  title: string;
  description: string;
  category: "ID Cards & Wallets" | "Calculators & Electronics" | "Keys" | "Bottles & Bags" | "Books";
  location: string; // e.g. "Classroom 402, PG Block", "Library 2nd Floor"
  date_reported: string;
  reporter_name: string;
  reporter_usn: string;
  contact_info: string;
  status: "Open" | "Claimed";
  image_url?: string;
  created_at: string;
}

export interface StudentNotification {
  id: string;
  title: string;
  message: string;
  type: "academic" | "event" | "marketplace" | "qa" | "lost_found";
  time_ago: string;
  read: boolean;
  link: string;
}
