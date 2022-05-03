import React from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function Index() {
  const [loadPosts, setLoadPosts] = React.useState(true);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    async function load() {
      if (!loadPosts) {
        return;
      }

      const allPosts = await fetch("/.netlify/functions/posts").then((res) =>
        res.json()
      );

      setPosts(allPosts);
      setLoadPost(false);
    }

    load();
  }, [loadPosts]);

  async function handleSubmit(event: any) {
    event.preventDefault();

    await fetch("/.netlify/functions/post", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    setLoadPosts(true);
  }

  return (
    <div className="flex flex-col space-y-4 p-2 max-w-xl mx-auto">
      <h1>My Post</h1>
      <ul className="space-y-2">
        {posts.map((post: Post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>Created {new Date(post.createdAt).toLocaleString()}</p>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <label htmlFor="title">Title</label>
        <input
          className="border"
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
        />

        <label htmlFor="content">Content</label>
        <input
          className="border"
          type="text"
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent((e.target as HTMLInputElement).value)}
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white font-bold p-2 rounded !mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
