"use client";

import Card from "@/components/card";
import ArrowSmallLeftIcon from "@/components/icons/arrow-small-left-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import data from "../../data";

type FellowshipCellMemberProps = {
  params: { name: string; "member-id": string };
};
const FellowshipCellMember = ({ params }: FellowshipCellMemberProps) => {
  const router = useRouter();

  const fieldConfigurations = [
    { name: "id", label: "User ID" },
    { name: "fName", label: "First Name" },
    { name: "lName", label: "Last Name" },
    { name: "gender", label: "Gender" },
    { name: "marital", label: "Marital Status" },
    { name: "qualification", label: "Qualification" },
    { name: "fellowshipsCells", label: "Fellowship/Cell" },
    { name: "phone", label: "Phone" },
    { name: "email", label: "Email Address" },
    { name: "dob", label: "Date of Birth" },
    { name: "class", label: "Class" },
    { name: "discipledBy", label: "Discipled By" },
  ] as const;

  const userData = {
    id: "USER00001",
    fName: "Jonathan",
    lName: "David",
    gender: "male",
    marital: "single",
    qualification: "worker",
    fellowshipsCells: params.name,
    phone: "+2348112345678",
    email: "jonathan@gmail.com",
    dob: "23rd October, 1996",
    class: "student",
    discipledBy: "Pastor",
  };

  const displayData = fieldConfigurations.map(({ name, label }) => ({
    key: label,
    value: userData[name],
  }));

  const formSchema = z.object({
    id: z.string(),
    fName: z.string(),
    lName: z.string(),
    gender: z.string(),
    marital: z.string(),
    qualification: z.string(),
    fellowshipsCells: z.string(),
    phone: z.string(),
    email: z.string(),
    dob: z.string(),
    class: z.string(),
    discipledBy: z.string(),
  });

  const genderConfig = [
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
  ];
  const maritalConfig = [
    { key: "single", label: "Single" },
    { key: "married", label: "Married" },
  ];
  const qualificationConfig = [
    { key: "worker", label: "Worker in Training" },
    { key: "member", label: "Member" },
  ];
  const fellowshipsCellConfig = data.map(({ key, name }) => ({
    key,
    label: name,
  }));
  const classConfig = [
    { key: "working", label: "Working Class" },
    { key: "unemployed", label: "Unemployed" },
    { key: "student", label: "Student" },
  ];

  const selectData = {
    gender: genderConfig,
    marital: maritalConfig,
    qualification: qualificationConfig,
    fellowshipsCells: fellowshipsCellConfig,
    class: classConfig,
  };
  const selectKeys = Object.keys(selectData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: userData.id,
      fName: userData.fName,
      lName: userData.lName,
      gender: userData.gender,
      marital: userData.marital,
      qualification: userData.qualification,
      fellowshipsCells: userData.fellowshipsCells,
      phone: userData.phone,
      email: userData.email,
      dob: userData.dob,
      class: userData.class,
      discipledBy: userData.discipledBy,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <div
        className="mb-11 flex w-fit cursor-pointer items-center gap-1.5 self-end text-dustygray hover:underline"
        onClick={router.back}
      >
        <ArrowSmallLeftIcon />
        <p className="text-xs">Fellowships/Cells</p>
      </div>

      <Card className="p-10">
        <div className="mb-4 flex flex-wrap items-center gap-16">
          {displayData.map(({ key, value }, index) => (
            <div className="space-y-2" key={index}>
              <p className="text-sm text-dustygray">{key}</p>
              <p
                className={cn(
                  "font-semibold",
                  !(key === "Email Address") && "capitalize",
                )}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Edit User</Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl">
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
              </DialogHeader>
              <div className="border-t border-mineshaft pt-7 text-white">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-x-5 gap-y-10">
                      {fieldConfigurations
                        .filter(({ name }) =>
                          [
                            "id",
                            "fName",
                            "lName",
                            "phone",
                            "email",
                            "discipledBy",
                          ].includes(name),
                        )
                        .map(({ name, label }, index) => (
                          <FormField
                            key={index}
                            control={form.control}
                            name={name}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs text-dustygray">
                                  {label}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="border-mineshaft text-sm"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ))}

                      {fieldConfigurations
                        .filter(({ name }) => selectKeys.includes(name))
                        .map(({ name, label }, index) => {
                          const validName = name as keyof typeof selectData;
                          return (
                            <FormField
                              key={index}
                              control={form.control}
                              name={validName}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs text-dustygray">
                                    {label}
                                  </FormLabel>
                                  <FormControl>
                                    <Select defaultValue={field.value}>
                                      <SelectTrigger
                                        className="border border-mineshaft text-white"
                                        {...field}
                                      >
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="border border-mineshaft">
                                        {selectData[validName].map(
                                          ({ key, label }, index) => (
                                            <SelectItem value={key} key={index}>
                                              {label}
                                            </SelectItem>
                                          ),
                                        )}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          );
                        })}

                      <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs text-dustygray">
                              Date of Birth
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="border-mineshaft text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button variant="secondary" type="submit">
                      Submit
                    </Button>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
};

export default FellowshipCellMember;
