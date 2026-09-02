import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDirectory = path.join(process.cwd(), "content");
export function getPostBySlug(slug: string) {
  const fullPath = path.join(postDirectory, `${slug}.mdx`);
  const fileContent = fs.readFileSync(fullPath);
  const { data, content } = matter(fileContent);
  return { slug, metadata: data, content };
}

export function getAllPosts() {
  const filenames = fs.readdirSync(postDirectory);
  return filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    return getPostBySlug(slug);
  });
}
