

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."attendance" (
    "id" bigint NOT NULL,
    "meeting_type" "text" NOT NULL,
    "attendance" integer NOT NULL,
    "absentee" integer,
    "meeting_date" "date" NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "created_by" "text" NOT NULL,
    CONSTRAINT "attendance_meeting_type_check" CHECK (("meeting_type" = ANY (ARRAY['Sunday Service'::"text", 'Midweek Service'::"text", 'Fellowship Meeting'::"text", 'Prayer Group'::"text"])))
);


ALTER TABLE "public"."attendance" OWNER TO "postgres";


ALTER TABLE "public"."attendance" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."attendance_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."class" (
    "id" integer NOT NULL,
    "class_name" "text" NOT NULL,
    CONSTRAINT "class_class_name_check" CHECK (("class_name" = ANY (ARRAY['Working Class'::"text", 'Unemployed'::"text", 'Student'::"text"])))
);


ALTER TABLE "public"."class" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."class_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."class_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."class_id_seq" OWNED BY "public"."class"."id";



CREATE TABLE IF NOT EXISTS "public"."meeting_type" (
    "id" integer NOT NULL,
    "type_name" "text" NOT NULL,
    CONSTRAINT "meeting_type_type_name_check" CHECK (("type_name" = ANY (ARRAY['Sunday Service'::"text", 'Midweek Service'::"text", 'Fellowship Meeting'::"text", 'Prayer Group'::"text"])))
);


ALTER TABLE "public"."meeting_type" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."meeting_type_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."meeting_type_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."meeting_type_id_seq" OWNED BY "public"."meeting_type"."id";



CREATE TABLE IF NOT EXISTS "public"."members" (
    "first_name" "text" NOT NULL,
    "middle_name" "text",
    "last_name" "text" NOT NULL,
    "gender" "text" NOT NULL,
    "marital_status" "text" NOT NULL,
    "qualification" "text" NOT NULL,
    "cell_or_fellowship" "text" NOT NULL,
    "phone" "text",
    "email" "text",
    "dob" "date" NOT NULL,
    "class" "text" NOT NULL,
    "discipled_by" "text",
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "id" bigint NOT NULL,
    CONSTRAINT "members_class_check" CHECK (("class" = ANY (ARRAY['Working Class'::"text", 'Unemployed'::"text", 'Student'::"text"]))),
    CONSTRAINT "members_gender_check" CHECK (("gender" = ANY (ARRAY['Male'::"text", 'Female'::"text"]))),
    CONSTRAINT "members_marital_status_check" CHECK (("marital_status" = ANY (ARRAY['Single'::"text", 'Married'::"text"]))),
    CONSTRAINT "qualification_check" CHECK (("qualification" = ANY (ARRAY['Worker'::"text", 'Member'::"text"])))
);


ALTER TABLE "public"."members" OWNER TO "postgres";


ALTER TABLE "public"."members" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."members_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "public"."class" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."class_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."meeting_type" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."meeting_type_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."attendance"
    ADD CONSTRAINT "attendance_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."class"
    ADD CONSTRAINT "class_class_name_key" UNIQUE ("class_name");



ALTER TABLE ONLY "public"."class"
    ADD CONSTRAINT "class_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."meeting_type"
    ADD CONSTRAINT "meeting_type_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."meeting_type"
    ADD CONSTRAINT "meeting_type_type_name_key" UNIQUE ("type_name");



ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_pkey" PRIMARY KEY ("id");



ALTER TABLE "public"."attendance" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "authenticated users can delete attendance" ON "public"."attendance" FOR DELETE TO "authenticated" USING (true);



CREATE POLICY "authenticated users can delete class" ON "public"."class" FOR DELETE TO "authenticated" USING (true);



CREATE POLICY "authenticated users can delete meeting_type" ON "public"."meeting_type" FOR DELETE TO "authenticated" USING (true);



CREATE POLICY "authenticated users can delete members" ON "public"."members" FOR DELETE TO "authenticated" USING (true);



CREATE POLICY "authenticated users can insert attendance" ON "public"."attendance" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "authenticated users can insert class" ON "public"."class" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "authenticated users can insert meeting_type" ON "public"."meeting_type" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "authenticated users can insert members" ON "public"."members" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "authenticated users can read attendance" ON "public"."attendance" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "authenticated users can read class" ON "public"."class" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "authenticated users can read meeting_type" ON "public"."meeting_type" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "authenticated users can read members" ON "public"."members" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "authenticated users can update attendance" ON "public"."attendance" FOR UPDATE TO "authenticated" USING (true);



CREATE POLICY "authenticated users can update class" ON "public"."class" FOR UPDATE TO "authenticated" USING (true);



CREATE POLICY "authenticated users can update meeting_type" ON "public"."meeting_type" FOR UPDATE TO "authenticated" USING (true);



CREATE POLICY "authenticated users can update members" ON "public"."members" FOR UPDATE TO "authenticated" USING (true);



ALTER TABLE "public"."class" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."meeting_type" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."members" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";


















































































































































































































GRANT ALL ON TABLE "public"."attendance" TO "anon";
GRANT ALL ON TABLE "public"."attendance" TO "authenticated";
GRANT ALL ON TABLE "public"."attendance" TO "service_role";



GRANT ALL ON SEQUENCE "public"."attendance_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."attendance_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."attendance_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."class" TO "anon";
GRANT ALL ON TABLE "public"."class" TO "authenticated";
GRANT ALL ON TABLE "public"."class" TO "service_role";



GRANT ALL ON SEQUENCE "public"."class_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."class_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."class_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."meeting_type" TO "anon";
GRANT ALL ON TABLE "public"."meeting_type" TO "authenticated";
GRANT ALL ON TABLE "public"."meeting_type" TO "service_role";



GRANT ALL ON SEQUENCE "public"."meeting_type_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."meeting_type_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."meeting_type_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."members" TO "anon";
GRANT ALL ON TABLE "public"."members" TO "authenticated";
GRANT ALL ON TABLE "public"."members" TO "service_role";



GRANT ALL ON SEQUENCE "public"."members_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."members_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."members_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
