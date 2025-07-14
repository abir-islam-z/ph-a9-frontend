"use client";

import type React from "react";

import EZButton from "@/components/shared/FormBuilder/EZButton";
import EZFileInput from "@/components/shared/FormBuilder/EZFileInput";
import { EZForm } from "@/components/shared/FormBuilder/EZForm";
import EZInput from "@/components/shared/FormBuilder/EZInput";
import EZSelect from "@/components/shared/FormBuilder/EZSelect";
import EZTextArea from "@/components/shared/FormBuilder/EZTextArea";
import { useToast } from "@/hooks/use-toast";
import { fetchFormData } from "@/lib/api-client";
import { postSchema, TCreatePost } from "@/schemas/post.schema";
import { FoodSpot, PaginatedResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPostForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const defaultValues = {
    title: "",
    description: "",
    location: "",
    minPrice: 0,
    maxPrice: 0,
    category: "MEALS",
  };

  async function onSubmit(data: TCreatePost) {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("minPrice", data.minPrice.toString());
      formData.append("maxPrice", data.maxPrice.toString());
      formData.append("category", data.category);

      if (data.image) {
        formData.append("image", data.image);
      }

      const response: PaginatedResponse<FoodSpot> = await fetchFormData(
        "/foodspots",
        formData
      );

      if (response.success) {
        toast({
          title: "Post submitted successfully",
          description: "Your post is now pending approval by an admin.",
        });
        router.push("/my-posts");
      } else {
        toast({
          variant: "destructive",
          title: "Failed to submit post",
          description: response.message || "Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // form.setValue("image", file);

      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <EZForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      resolver={zodResolver(postSchema)}
    >
      <EZInput
        name="title"
        label="Title"
        placeholder="Delicious Street Tacos"
      />

      <EZTextArea name="description" label="Description" />

      <EZInput
        name="location"
        label="Location"
        placeholder="123 Main St, City"
      />

      <EZInput
        type="number"
        name="minPrice"
        label="Minimum Price"
        placeholder="0.00"
        className="mt-4"
      />
      <EZInput
        type="number"
        name="maxPrice"
        label="Maximum Price"
        placeholder="100.00"
        className="mt-4"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <EZSelect
          name="category"
          label="Category"
          options={[
            { value: "SNACKS", label: "Snacks" },
            { value: "MEALS", label: "Meals" },
            { value: "SWEETS", label: "Sweets" },
            { value: "DRINKS", label: "Drinks" },
          ]}
        />
      </div>

      <EZFileInput name="image" label="Image" />

      <EZButton>Submit Food Spot</EZButton>
    </EZForm>
  );
}
