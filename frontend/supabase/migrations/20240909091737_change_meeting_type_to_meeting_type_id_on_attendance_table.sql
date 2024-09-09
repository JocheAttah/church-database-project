-- Step 1: Add the new column
ALTER TABLE "public"."attendance" ADD COLUMN "meeting_type_id" integer;

-- Step 2: Update the new column with the corresponding ids from meeting_type table
UPDATE "public"."attendance" a
SET "meeting_type_id" = mt.id
FROM "public"."meeting_type" mt
WHERE a.meeting_type = mt.type_name;

-- Step 3: Make the new column NOT NULL
ALTER TABLE "public"."attendance" ALTER COLUMN "meeting_type_id" SET NOT NULL;

-- Step 4: Add a foreign key constraint
ALTER TABLE "public"."attendance"
ADD CONSTRAINT "attendance_meeting_type_id_fkey"
FOREIGN KEY ("meeting_type_id")
REFERENCES "public"."meeting_type"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- Step 5: Drop the old column
ALTER TABLE "public"."attendance" DROP COLUMN "meeting_type";

-- Step 6: Update the attendance_meeting_type_check constraint
ALTER TABLE "public"."attendance" DROP CONSTRAINT IF EXISTS "attendance_meeting_type_check";
