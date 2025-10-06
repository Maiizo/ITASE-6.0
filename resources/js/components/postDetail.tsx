import { useState } from "react";
import { ArrowLeft, Heart, MessageCircle, Share2, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textArea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import type { Post } from "./postCard";

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    username: string;
  };
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

interface PostDetailProps {
  post: Post;
  comments: Comment[];
  onBack: () => void;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onLikeComment: (commentId: string) => void;
}

export function PostDetail({ 
  post, 
  comments, 
  onBack, 
  onLike, 
  onComment,
  onLikeComment 
}: PostDetailProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onComment(post.id, newComment.trim());
      setNewComment("");
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to feed
      </Button>

      {/* Main post */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <p className="font-medium">{post.author.name}</p>
                <span className="text-muted-foreground">@{post.author.username}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{formatTime(post.timestamp)}</span>
              </div>
              <Badge variant="secondary">{post.category}</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <h1 className="text-xl font-semibold mb-3">{post.title}</h1>
            <p className="whitespace-pre-wrap leading-relaxed">{post.content}</p>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-2 ${post.isLiked ? 'text-red-500' : ''}`}
                onClick={() => onLike(post.id)}
              >
                <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                <span>{post.likes}</span>
              </Button>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span>{comments.length} replies</span>
              </div>
            </div>
            
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add comment */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <Textarea
              placeholder="Share your thoughts or offer support..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Remember to be respectful and supportive in your response.
              </p>
              <Button 
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                size="sm"
                className="gap-2"
              >
                <Send className="h-3 w-3" />
                Reply
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments */}
      <div className="space-y-4">
        <h3 className="font-medium">Replies ({comments.length})</h3>
        {comments.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No replies yet. Be the first to offer support!</p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{comment.author.name}</p>
                      <span className="text-muted-foreground text-sm">@{comment.author.username}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{formatTime(comment.timestamp)}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{comment.content}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`gap-1 h-6 px-2 ${comment.isLiked ? 'text-red-500' : ''}`}
                      onClick={() => onLikeComment(comment.id)}
                    >
                      <Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-xs">{comment.likes}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}