-- Make the dob column optional in the members table
ALTER TABLE "public"."members" ALTER COLUMN "dob" DROP NOT NULL;
