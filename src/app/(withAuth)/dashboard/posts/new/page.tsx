import NewPostForm from "@/components/views/dashboard/posts/new-post-form";

export default function NewPostPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Share a New Food Spot</h1>
      <NewPostForm />
    </div>
  );
}
