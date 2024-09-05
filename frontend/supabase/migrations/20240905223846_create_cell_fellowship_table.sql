CREATE TABLE IF NOT EXISTS "public"."cell_fellowship" (
    "id" bigint NOT NULL,
    "name" text NOT NULL,
    "type" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "cell_fellowship_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "cell_fellowship_name_key" UNIQUE ("name"),
    CONSTRAINT "cell_fellowship_type_check" CHECK (("type" = ANY (ARRAY['Cell'::text, 'Fellowship'::text])))
);

ALTER TABLE "public"."cell_fellowship" OWNER TO "postgres";

ALTER TABLE "public"."cell_fellowship" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."cell_fellowship_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

-- Now, modify the members table
ALTER TABLE "public"."members"
    ADD COLUMN "cell_fellowship_id" bigint,
    ADD CONSTRAINT "members_cell_fellowship_id_fkey"
    FOREIGN KEY ("cell_fellowship_id")
    REFERENCES "public"."cell_fellowship"("id")
    ON DELETE SET NULL;

-- If the cell_or_fellowship column exists, we'll use it to populate the new column, then remove it
UPDATE "public"."members" m
SET "cell_fellowship_id" = cf.id
FROM "public"."cell_fellowship" cf
WHERE cf.name = m.cell_or_fellowship;

ALTER TABLE "public"."members" DROP COLUMN IF EXISTS "cell_or_fellowship";

-- Enable RLS for the new table
ALTER TABLE "public"."cell_fellowship" ENABLE ROW LEVEL SECURITY;

-- Add policies for the new table
CREATE POLICY "authenticated users can read cell_fellowship" ON "public"."cell_fellowship" FOR SELECT TO "authenticated" USING (true);
CREATE POLICY "authenticated users can insert cell_fellowship" ON "public"."cell_fellowship" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "authenticated users can update cell_fellowship" ON "public"."cell_fellowship" FOR UPDATE TO "authenticated" USING (true);
CREATE POLICY "authenticated users can delete cell_fellowship" ON "public"."cell_fellowship" FOR DELETE TO "authenticated" USING (true);

-- Grant permissions for the new table
GRANT ALL ON TABLE "public"."cell_fellowship" TO "anon";
GRANT ALL ON TABLE "public"."cell_fellowship" TO "authenticated";
GRANT ALL ON TABLE "public"."cell_fellowship" TO "service_role";

GRANT ALL ON SEQUENCE "public"."cell_fellowship_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."cell_fellowship_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."cell_fellowship_id_seq" TO "service_role";