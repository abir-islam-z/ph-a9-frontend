"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { fetchFormData } from "@/lib/api-client";
import { FoodSpot, PaginatedResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const postSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(100),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
  location: z.string().min(3, { message: "Location is required" }),
  minPrice: z.coerce
    .number()
    .min(0, { message: "Minimum price must be at least 0" }),
  maxPrice: z.coerce
    .number()
    .min(0, { message: "Maximum price must be at least 0" }),
  category: z.enum(["SNACKS", "MEALS", "SWEETS", "DRINKS"], {
    required_error: "Please select a category",
  }),
  image: z.instanceof(File).optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function NewPostForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      minPrice: 0,
      maxPrice: 0,
      category: "MEALS",
    },
  });

  async function onSubmit(data: PostFormValues) {
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
      form.setValue("image", file);

      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Delicious Street Tacos" {...field} />
              </FormControl>
              <FormDescription>
                Give your food spot a catchy title
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the food, taste, atmosphere, etc."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide details about what makes this food spot special
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, City" {...field} />
              </FormControl>
              <FormDescription>
                Where can people find this food spot?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="minPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SNACKS">Snacks</SelectItem>
                    <SelectItem value="MEALS">Meals</SelectItem>
                    <SelectItem value="SWEETS">Sweets</SelectItem>
                    <SelectItem value="DRINKS">Drinks</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormItem>
          <FormLabel>Image</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
          </FormControl>
          <FormDescription>
            Upload an image of the food (max 5MB)
          </FormDescription>
          <FormMessage />

          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="h-40 w-auto rounded-md object-cover"
              />
            </div>
          )}
        </FormItem>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Food Spot"}
        </Button>
      </form>
    </Form>
  );
}
