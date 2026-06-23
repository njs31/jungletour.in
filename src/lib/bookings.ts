import { createAdminClient } from "@/lib/supabase/admin";

export interface BookingInquiry {
  id: string;
  trip_id: string | null;
  trip_slug: string | null;
  trip_title: string;
  name: string;
  phone: string;
  created_at: string;
}

export interface BookingInquiryInput {
  tripId: string | null;
  tripSlug: string | null;
  tripTitle: string;
  name: string;
  phone: string;
}

export async function createBookingInquiry(input: BookingInquiryInput) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("booking_inquiries")
    .insert({
      trip_id: input.tripId,
      trip_slug: input.tripSlug,
      trip_title: input.tripTitle,
      name: input.name,
      phone: input.phone,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as BookingInquiry;
}

export async function listBookingInquiries(): Promise<BookingInquiry[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("booking_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load booking inquiries:", error.message);
      return [];
    }

    return (data ?? []) as BookingInquiry[];
  } catch {
    return [];
  }
}

export function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  return "";
}
