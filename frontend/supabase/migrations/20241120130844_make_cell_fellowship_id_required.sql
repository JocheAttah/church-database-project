-- Make the column required
ALTER TABLE "public"."members"
ALTER COLUMN "cell_fellowship_id" SET NOT NULL;