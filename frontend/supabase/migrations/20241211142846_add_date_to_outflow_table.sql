-- Add date column to outflow table
ALTER TABLE "public"."outflow"
ADD COLUMN "date" date NOT NULL DEFAULT CURRENT_DATE;

-- Remove default after adding column
ALTER TABLE "public"."outflow"
ALTER COLUMN "date" DROP DEFAULT;