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
          meeting_type: string
          updated_at: string
        }
        Insert: {
          absentee?: number | null
          attendance: number
          created_at?: string
          created_by: string
          id?: never
          meeting_date: string
          meeting_type: string
          updated_at?: string
        }
        Update: {
          absentee?: number | null
          attendance?: number
          created_at?: string
          created_by?: string
          id?: never
          meeting_date?: string
          meeting_type?: string
          updated_at?: string
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
          dob: string
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
          dob: string
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
          dob?: string
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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

