import BlogPost from "../components/blogPost";

export default async function Blog({ params }) {
  const { blog } = await params;
  return <BlogPost slug={blog} />;
}
