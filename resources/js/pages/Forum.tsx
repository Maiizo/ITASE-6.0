import { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/ui/sidebar";
import { PostCard, Post } from "../components/postCard";
import { PostDetail } from "../components/postDetail";
import { CreatePostModal } from "../components/CreatePostModal";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import React from 'react';

// dummy dataa
const mockUser = {
  name: "Sarah Johnson",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b6b7b2be?w=100&h=100&fit=crop&crop=face",
  notifications: 3,
};



const mockPosts: Post[] = [
  {
    id: "1",
    title: "Finding hope after my first therapy session",
    content: "I wanted to share my experience with therapy for anyone who might be hesitant to start. After months of anxiety and feeling overwhelmed, I finally took the step to see a therapist. The first session was nerve-wracking, but my therapist made me feel so comfortable. We talked about my anxiety triggers and she gave me some practical breathing exercises. I know it's just the beginning, but I already feel a bit more hopeful. For anyone considering therapy - it's okay to be scared, but it might be exactly what you need.",
    author: {
      name: "Emma Rodriguez",
      username: "emma_healing",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    timestamp: "2024-09-29T10:30:00Z",
    category: "therapy",
    likes: 34,
    comments: 12,
    isLiked: false,
    tags: ["firsttherapy", "anxiety", "hope"],
  },
  {
    id: "2",
    title: "Coping with seasonal depression - what's working for me",
    content: "As the days get shorter, I can feel my seasonal depression starting to creep in. This year I'm trying to be more proactive about it. I've started using a light therapy lamp in the mornings, making sure to get outside even when it's cloudy, and I've been more consistent with my meditation practice. I also reached out to my support network early this time instead of waiting until I'm really struggling. Small steps, but they're making a difference. What strategies have helped you with seasonal changes?",
    author: {
      name: "Michael Chen",
      username: "mike_wellness",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    timestamp: "2024-09-29T08:15:00Z",
    category: "depression",
    likes: 67,
    comments: 23,
    isLiked: true,
    tags: ["seasonal", "lighttherapy", "meditation"],
  },
  {
    id: "3",
    title: "Support group meeting tonight - you're not alone",
    content: "Reminder that our weekly anxiety support group meets tonight at 7 PM via video call. This week we're focusing on grounding techniques and sharing what's been helping us through difficult moments. New members are always welcome - no pressure to share if you're not ready. Sometimes just listening and knowing you're not alone in your struggles can be incredibly healing. Drop a comment if you're interested in joining!",
    author: {
      name: "Lisa Park",
      username: "lisa_support",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    },
    timestamp: "2024-09-29T14:45:00Z",
    category: "support",
    likes: 45,
    comments: 8,
    isLiked: false,
    tags: ["supportgroup", "anxiety", "community"],
  },
  {
    id: "4",
    title: "Small wins deserve celebration too",
    content: "Today I managed to get out of bed, take a shower, and make myself a proper breakfast. For some people this might seem basic, but for me in this depressive episode, it feels huge. I'm learning to celebrate these small victories instead of focusing on everything I didn't accomplish. My therapist reminded me that progress isn't always linear, and some days just surviving is enough. To anyone else struggling right now - your small wins matter too. You're doing better than you think. ❤️",
    author: {
      name: "Alex Thompson",
      username: "alex_journey",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    timestamp: "2024-09-29T11:20:00Z",
    category: "depression",
    likes: 89,
    comments: 31,
    isLiked: true,
    tags: ["smallwins", "progress", "selfcare"],
  },
];

const mockComments: Record<string, Array<{
  id: string;
  content: string;
  author: { name: string; username: string; avatar?: string };
  timestamp: string;
  likes: number;
  isLiked: boolean;
}>> = {
  "1": [
    {
      id: "c1",
      content: "Thank you for sharing this! I've been putting off therapy for months. Your experience gives me courage to finally book that appointment.",
      author: {
        name: "Jordan Smith",
        username: "jordan_seeking",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      },
      timestamp: "2024-09-29T10:45:00Z",
      likes: 12,
      isLiked: false,
    },
    {
      id: "c2",
      content: "The first session is always the hardest! It gets easier from there. So proud of you for taking this step.",
      author: {
        name: "Maya Patel",
        username: "maya_support",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      },
      timestamp: "2024-09-29T11:00:00Z",
      likes: 8,
      isLiked: true,
    },
  ],
};

interface ForumProps {
  // No props needed for Inertia page
}

export default function Forum({}: ForumProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [posts, selectedCategory, searchQuery]);

  const selectedPost = selectedPostId ? posts.find(p => p.id === selectedPostId) : null;

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleComment = (postId: string, content?: string) => {
    if (content) {
      // Add new comment (in real app, this would be saved to backend)
      toast.success("Reply added successfully!");
    } else {
      // Just show the post detail
      setSelectedPostId(postId);
    }
  };

  const handleShare = (postId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
    toast.success("Link copied to clipboard!");
  };

  const handleCreatePost = (newPost: {
    title: string;
    content: string;
    category: string;
    tags: string[];
  }) => {
    const post: Post = {
      id: Date.now().toString(),
      ...newPost,
      author: {
        name: mockUser.name,
        username: "sarah_j",
        avatar: mockUser.avatar,
      },
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      isLiked: false,
    };

    setPosts(prevPosts => [post, ...prevPosts]);
    toast.success("Your post has been shared with the community!");
  };

  const handleLikeComment = (commentId: string) => {
    toast.success("Comment liked!");
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background dark">
        <Head title="Forum - Post Detail" />
        <Header
          onCreatePost={() => setIsCreateModalOpen(true)}
          onSearch={setSearchQuery}
          user={mockUser}
          onGoToAccount={() => {}}
        />
        <div className="container mx-auto px-4 py-6">
          <PostDetail
            post={selectedPost}
            comments={mockComments[selectedPost.id] || []}
            onBack={() => setSelectedPostId(null)}
            onLike={handleLike}
            onComment={handleComment}
            onLikeComment={handleLikeComment}
          />
        </div>
        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePost}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark">
      <Head title="Forum - Community Discussions" />
      <Header
        onCreatePost={() => setIsCreateModalOpen(true)}
        onSearch={setSearchQuery}
        user={mockUser}
        onGoToAccount={() => {}}
      />
      
      <div className="container mx-auto flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        <main className="flex-1 max-w-2xl mx-auto px-4 py-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">
                  {selectedCategory === "all" ? "All Discussions" : 
                   selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </h2>
                <p className="text-muted-foreground">
                  {filteredPosts.length} posts found
                </p>
              </div>
              <Button onClick={() => setIsCreateModalOpen(true)} className="lg:hidden">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">No posts found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? "Try adjusting your search terms" 
                      : "Be the first to start a discussion in this category"}
                  </p>
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    Create First Post
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                    onClick={setSelectedPostId}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}