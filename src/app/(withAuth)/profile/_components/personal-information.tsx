"use client";

import EZButton from "@/components/shared/FormBuilder/EZButton";
import { EZForm } from "@/components/shared/FormBuilder/EZForm";
import EZInput from "@/components/shared/FormBuilder/EZInput";
import EZTextArea from "@/components/shared/FormBuilder/EZTextArea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const personalInfoSchema = z.object({});
export type TPersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

export default function PersonalInformation() {
  const defaultValues = {};

  const handleSubmit = (data: TPersonalInfoFormValues) => {};
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <EZForm
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        resolver={zodResolver(personalInfoSchema)}
      >
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <EZInput
              type="text"
              name="name"
              label="Name"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <EZInput
              type="email"
              name="email"
              label="Email"
              disabled
              placeholder="Your email"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed
            </p>
          </div>
          <div className="space-y-2">
            <EZTextArea
              name="bio"
              label="Bio"
              placeholder="Tell us about yourself"
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <EZButton>Update Profile</EZButton>
        </CardFooter>
      </EZForm>
    </Card>
  );
}
