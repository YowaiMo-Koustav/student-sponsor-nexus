export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      events: {
        Row: {
          audience_size: number | null
          budget_range: string | null
          category: string | null
          created_at: string
          description: string | null
          engagement_metrics: Json | null
          event_date: string | null
          id: string
          location: string | null
          organizer_id: string
          title: string
          updated_at: string
        }
        Insert: {
          audience_size?: number | null
          budget_range?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          engagement_metrics?: Json | null
          event_date?: string | null
          id?: string
          location?: string | null
          organizer_id: string
          title: string
          updated_at?: string
        }
        Update: {
          audience_size?: number | null
          budget_range?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          engagement_metrics?: Json | null
          event_date?: string | null
          id?: string
          location?: string | null
          organizer_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      match_history: {
        Row: {
          action: string
          actor_id: string
          created_at: string
          id: string
          metadata: Json | null
          recommendation_id: string | null
        }
        Insert: {
          action: string
          actor_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          recommendation_id?: string | null
        }
        Update: {
          action?: string
          actor_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          recommendation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "match_history_recommendation_id_fkey"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "recommendations"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          created_at: string
          event_id: string
          id: string
          match_score: number | null
          sponsor_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          match_score?: number | null
          sponsor_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          match_score?: number | null
          sponsor_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          conversation_id: string
          sender_id: string
          updated_at: string
          status: Database["public"]["Enums"]["message_status"]
          attachment_url: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          conversation_id: string
          sender_id: string
          updated_at?: string
          status?: Database["public"]["Enums"]["message_status"]
          attachment_url?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          conversation_id?: string
          sender_id?: string
          updated_at?: string
          status?: Database["public"]["Enums"]["message_status"]
          attachment_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey",
            columns: ["conversation_id"],
            isOneToOne: false,
            referencedRelation: "conversations",
            referencedColumns: ["id"]
          }
        ]
      }
      conversations: {
          Row: {
              id: string
              participant_one: string
              participant_two: string
              created_at: string
              updated_at: string
          }
          Insert: {
              id?: string
              participant_one: string
              participant_two: string
              created_at?: string
              updated_at?: string
          }
          Update: {
              id?: string
              participant_one?: string
              participant_two?: string
              created_at?: string
              updated_at?: string
          }
          Relationships: [
              {
                  foreignKeyName: "conversations_participant_one_fkey",
                  columns: ["participant_one"],
                  isOneToOne: false,
                  referencedRelation: "users",
                  referencedColumns: ["id"]
              },
              {
                  foreignKeyName: "conversations_participant_two_fkey",
                  columns: ["participant_two"],
                  isOneToOne: false,
                  referencedRelation: "users",
                  referencedColumns: ["id"]
              }
          ]
      }
      notification_preferences: {
        Row: {
          created_at: string
          id: string
          match_updates_email: boolean
          match_updates_push: boolean
          new_matches_email: boolean
          new_matches_push: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          match_updates_email?: boolean
          match_updates_push?: boolean
          new_matches_email?: boolean
          new_matches_push?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          match_updates_email?: boolean
          match_updates_push?: boolean
          new_matches_email?: boolean
          new_matches_push?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          created_at: string
          event_id: string | null
          factors: Json
          id: string
          is_starred: boolean
          is_viewed: boolean
          match_score: number
          reasoning: string
          sponsor_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          factors?: Json
          id?: string
          is_starred?: boolean
          is_viewed?: boolean
          match_score: number
          reasoning: string
          sponsor_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          event_id?: string | null
          factors?: Json
          id?: string
          is_starred?: boolean
          is_viewed?: boolean
          match_score?: number
          reasoning?: string
          sponsor_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendations_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsors: {
        Row: {
          budget_range: string | null
          company_name: string
          created_at: string
          id: string
          industry: string | null
          marketing_goals: string | null
          target_demographics: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          budget_range?: string | null
          company_name: string
          created_at?: string
          id?: string
          industry?: string | null
          marketing_goals?: string | null
          target_demographics?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          budget_range?: string | null
          company_name?: string
          created_at?: string
          id?: string
          industry?: string | null
          marketing_goals?: string | null
          target_demographics?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      get_user_conversations: {
        Args: {
            p_user_id: string
        }
        Returns: {
            id: string
            other_user: Json
            last_message: Json
        }[]
      }
      get_event_performance_stats: {
        Args: {
            p_organizer_id: string
        }
        Returns: {
            event_title: string
            views: number
            inquiries: number
            match_rate: number
        }[]
      }
      get_sponsor_response_rates: {
        Args: {
            p_organizer_id: string
        }
        Returns: {
            sponsor_name: string
            response_rate: number
        }[]
      }
      get_top_sponsor_categories: {
        Args: {
            p_organizer_id: string
        }
        Returns: {
            category: string
            count: number
        }[]
      }
      get_revenue_tracking: {
        Args: {
            p_organizer_id: string
        }
        Returns: {
            month: string
            total_revenue: number
        }[]
      }
      get_sponsor_portfolio_stats: {
        Args: {
            p_sponsor_user_id: string
        }
        Returns: {
            total_events_sponsored: number
            total_investment: number
            avg_student_engagement: number
        }
      }
      get_roi_tracking: {
        Args: {
            p_sponsor_user_id: string
        }
        Returns: {
            month: string
            roi: number
        }[]
      }
      get_student_engagement_metrics: {
        Args: {
            p_sponsor_user_id: string
        }
        Returns: {
            event_name: string
            engagement_rate: number
        }[]
      }
    }
    Enums: {
      user_role: "student" | "sponsor"
      message_status: "sent" | "delivered" | "read"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["student", "sponsor"],
    },
  },
} as const
