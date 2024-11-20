export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendance: {
        Row: {
          absentee: number | null
          attendance: number
          created_at: string
          created_by: string
          id: number
          meeting_date: string
          meeting_type_id: number
          updated_at: string
        }
        Insert: {
          absentee?: number | null
          attendance: number
          created_at?: string
          created_by: string
          id?: never
          meeting_date: string
          meeting_type_id: number
          updated_at?: string
        }
        Update: {
          absentee?: number | null
          attendance?: number
          created_at?: string
          created_by?: string
          id?: never
          meeting_date?: string
          meeting_type_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_meeting_type_id_fkey"
            columns: ["meeting_type_id"]
            isOneToOne: false
            referencedRelation: "meeting_type"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_staging: {
        Row: {
          absentee: number
          attendance: number
          created_by: string
          id: number
          meeting_date: string
          meeting_type: string
        }
        Insert: {
          absentee: number
          attendance: number
          created_by: string
          id?: number
          meeting_date: string
          meeting_type: string
        }
        Update: {
          absentee?: number
          attendance?: number
          created_by?: string
          id?: number
          meeting_date?: string
          meeting_type?: string
        }
        Relationships: []
      }
      cell_fellowship: {
        Row: {
          created_at: string
          id: number
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: never
          name: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: never
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      class: {
        Row: {
          class_name: string
          id: number
        }
        Insert: {
          class_name: string
          id?: number
        }
        Update: {
          class_name?: string
          id?: number
        }
        Relationships: []
      }
      inflow: {
        Row: {
          amount: number
          created_at: string
          created_by: string
          date: string
          description: string | null
          id: number
          type: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          created_by: string
          date: string
          description?: string | null
          id?: never
          type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string
          date?: string
          description?: string | null
          id?: never
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      meeting_type: {
        Row: {
          id: number
          type_name: string
        }
        Insert: {
          id?: number
          type_name: string
        }
        Update: {
          id?: number
          type_name?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          cell_fellowship_id: number | null
          class: string
          created_at: string
          discipled_by: string | null
          dob: string | null
          email: string | null
          first_name: string
          gender: string
          id: number
          last_name: string
          marital_status: string
          middle_name: string | null
          phone: string | null
          qualification: string
          updated_at: string
        }
        Insert: {
          cell_fellowship_id?: number | null
          class: string
          created_at?: string
          discipled_by?: string | null
          dob?: string | null
          email?: string | null
          first_name: string
          gender: string
          id?: never
          last_name: string
          marital_status: string
          middle_name?: string | null
          phone?: string | null
          qualification: string
          updated_at?: string
        }
        Update: {
          cell_fellowship_id?: number | null
          class?: string
          created_at?: string
          discipled_by?: string | null
          dob?: string | null
          email?: string | null
          first_name?: string
          gender?: string
          id?: never
          last_name?: string
          marital_status?: string
          middle_name?: string | null
          phone?: string | null
          qualification?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_cell_fellowship_id_fkey"
            columns: ["cell_fellowship_id"]
            isOneToOne: false
            referencedRelation: "cell_fellowship"
            referencedColumns: ["id"]
          },
        ]
      }
      members_staging: {
        Row: {
          cell_fellowship: string
          class: string
          created_at: string
          discipled_by: string | null
          dob: string | null
          email: string | null
          first_name: string
          gender: string
          id: number
          last_name: string
          marital_status: string
          middle_name: string | null
          phone: string | null
          qualification: string
          updated_at: string
        }
        Insert: {
          cell_fellowship: string
          class: string
          created_at?: string
          discipled_by?: string | null
          dob?: string | null
          email?: string | null
          first_name: string
          gender: string
          id?: never
          last_name: string
          marital_status: string
          middle_name?: string | null
          phone?: string | null
          qualification: string
          updated_at?: string
        }
        Update: {
          cell_fellowship?: string
          class?: string
          created_at?: string
          discipled_by?: string | null
          dob?: string | null
          email?: string | null
          first_name?: string
          gender?: string
          id?: never
          last_name?: string
          marital_status?: string
          middle_name?: string | null
          phone?: string | null
          qualification?: string
          updated_at?: string
        }
        Relationships: []
      }
      outflow: {
        Row: {
          amount: number
          approved_by: string | null
          beneficiary: string | null
          created_at: string
          created_by: string
          description: string | null
          id: number
          period: string | null
          type: string
          updated_at: string
        }
        Insert: {
          amount: number
          approved_by?: string | null
          beneficiary?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: never
          period?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          approved_by?: string | null
          beneficiary?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: never
          period?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_giving: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_inflow: number
          total_outflow: number
          balance: number
        }[]
      }
      upsert_attendance_from_staging: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      upsert_members_from_staging: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

